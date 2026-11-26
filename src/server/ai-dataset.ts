"use server";

import { randomUUID } from "node:crypto";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission, type AdminAction } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog, type AuditAction } from "@/server/audit";
import {
  DEFAULT_AI_DATASET,
  addEntry,
  aiEntryInputSchema,
  normalizeDataset,
  parseImport,
  removeEntry,
  setEntryActive,
  updateEntry,
  type AIDatasetItem,
  type DatasetChange,
} from "@/lib/aiDataset";

const SETTING_KEY = "ai_dataset";

export type AIDatasetResult = { ok: true; message: string; data: AIDatasetItem[] } | { ok: false; message: string };

async function readDataset(db: Prisma.TransactionClient): Promise<AIDatasetItem[]> {
  const setting = await db.siteSetting.findUnique({ where: { key: SETTING_KEY } });
  if (!setting) return DEFAULT_AI_DATASET;
  if (!Array.isArray(setting.value)) throw new Error("Isi dataset di database tidak dikenali.");
  return normalizeDataset(setting.value);
}

/** Dipakai chatbot publik: bila database bermasalah, chatbot tetap menjawab dengan data bawaan. */
export async function getAIDataset(): Promise<AIDatasetItem[]> {
  try {
    return await readDataset(prisma);
  } catch (err) {
    console.error("Error fetching AI dataset:", err);
    return DEFAULT_AI_DATASET;
  }
}

async function authorize(action: AdminAction) {
  try {
    return { session: await requirePermission("aiDataset", action) };
  } catch (err) {
    return { message: err instanceof Error ? err.message : "Akses ditolak." };
  }
}

/** Untuk halaman admin. Tidak pernah diam-diam memakai data bawaan, supaya data tersimpan tidak tertimpa. */
export async function loadAIDatasetAction(): Promise<AIDatasetResult> {
  const auth = await authorize("read");
  if (!auth.session) return { ok: false, message: auth.message };
  try {
    return { ok: true, message: "Dataset dimuat.", data: await readDataset(prisma) };
  } catch (err) {
    console.error("Error loading AI dataset:", err);
    return { ok: false, message: "Dataset gagal dimuat dari database. Coba muat ulang." };
  }
}

async function mutate(options: {
  permission: AdminAction;
  audit: AuditAction;
  entityId: string;
  details: Record<string, unknown>;
  success: string;
  change: (list: AIDatasetItem[]) => DatasetChange;
}): Promise<AIDatasetResult> {
  const auth = await authorize(options.permission);
  if (!auth.session) return { ok: false, message: auth.message };

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        // Kunci selama baca-ubah-tulis agar dua admin yang menyimpan bersamaan tidak saling menimpa.
        await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${SETTING_KEY}))`;
        const change = options.change(await readDataset(tx));
        if (!change.ok) return change;
        const value = change.list as unknown as Prisma.InputJsonValue;
        await tx.siteSetting.upsert({
          where: { key: SETTING_KEY },
          create: { key: SETTING_KEY, value, description: "Basis pengetahuan Q&A untuk Veronica" },
          update: { value },
        });
        return change;
      },
      { maxWait: 10000, timeout: 20000 }
    );
    if (!result.ok) return { ok: false, message: result.message };

    await recordAuditLog({
      userId: auth.session.userId,
      userEmail: auth.session.email,
      action: options.audit,
      entity: "AIDataset",
      entityId: options.entityId,
      details: { ...options.details, totalEntries: result.list.length },
    });
    await invalidateEntity(CACHE_TAGS.AI_DATASET);
    return { ok: true, message: options.success, data: result.list };
  } catch (err) {
    console.error("Error saving AI dataset:", err);
    return { ok: false, message: "Gagal menyimpan ke database. Perubahan belum tersimpan, silakan coba lagi." };
  }
}

const today = () =>
  new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Jakarta" });

const invalidInput = (issues: { message: string }[]): AIDatasetResult => ({
  ok: false,
  message: issues[0]?.message ?? "Isian tidak valid.",
});

export async function createAIEntryAction(raw: unknown): Promise<AIDatasetResult> {
  const input = aiEntryInputSchema.safeParse(raw);
  if (!input.success) return invalidInput(input.error.issues);
  const id = `qa-${randomUUID().slice(0, 8)}`;
  return mutate({
    permission: "create",
    audit: "CREATE",
    entityId: id,
    details: { question: input.data.question },
    success: "Tanya jawab baru tersimpan.",
    change: (list) => addEntry(list, input.data, id, today()),
  });
}

export async function updateAIEntryAction(id: string, raw: unknown): Promise<AIDatasetResult> {
  const input = aiEntryInputSchema.safeParse(raw);
  if (!input.success) return invalidInput(input.error.issues);
  return mutate({
    permission: "update",
    audit: "UPDATE",
    entityId: String(id),
    details: { question: input.data.question },
    success: "Perubahan tersimpan.",
    change: (list) => updateEntry(list, String(id), input.data, today()),
  });
}

export async function setAIEntryActiveAction(id: string, active: boolean): Promise<AIDatasetResult> {
  return mutate({
    permission: "update",
    audit: "UPDATE",
    entityId: String(id),
    details: { active: active === true },
    success: active === true ? "Entri diaktifkan dan dipakai chatbot." : "Entri dinonaktifkan dari chatbot.",
    change: (list) => setEntryActive(list, String(id), active === true, today()),
  });
}

export async function deleteAIEntryAction(id: string): Promise<AIDatasetResult> {
  return mutate({
    permission: "delete",
    audit: "DELETE",
    entityId: String(id),
    details: {},
    success: "Entri dihapus.",
    change: (list) => removeEntry(list, String(id)),
  });
}

/** Mengganti seluruh dataset dengan isi file impor. */
export async function importAIDatasetAction(raw: unknown): Promise<AIDatasetResult> {
  const parsed = parseImport(raw);
  if (!parsed.ok) return { ok: false, message: parsed.message };
  return mutate({
    permission: "delete",
    audit: "UPDATE",
    entityId: SETTING_KEY,
    details: { via: "import" },
    success: `${parsed.list.length} entri berhasil diimpor.`,
    change: () => parsed,
  });
}

export async function resetAIDatasetAction(): Promise<AIDatasetResult> {
  return mutate({
    permission: "delete",
    audit: "RESTORE",
    entityId: SETTING_KEY,
    details: { via: "reset" },
    success: "Dataset dikembalikan ke data bawaan.",
    change: () => ({ ok: true, list: DEFAULT_AI_DATASET }),
  });
}
