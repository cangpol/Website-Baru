"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import officialKnowledge from "@/data/upitraAiKnowledge.json";

const aiDatasetItemSchema = z.object({
  id: z.string(),
  category: z.string().min(2, "Kategori wajib diisi"),
  question: z.string().min(3, "Pertanyaan minimal 3 karakter"),
  answer: z.string().min(5, "Jawaban minimal 5 karakter"),
  keywords: z.array(z.string()).default([]),
  active: z.boolean().default(true),
  updatedAt: z.string().optional(),
});

const aiDatasetListSchema = z.array(aiDatasetItemSchema);

export type AIDatasetItem = z.infer<typeof aiDatasetItemSchema>;

// Basis pengetahuan resmi (214 entri) menjadi default agar dashboard admin dan chatbot publik selaras
// sebelum ada dataset kustom yang disimpan ke database.
const DEFAULT_AI_DATASET: AIDatasetItem[] = (
  officialKnowledge as Array<{ id?: string; category?: string; question?: string; answer?: string; keywords?: string[] }>
)
  .filter((item) => item.question && item.answer)
  .map((item, index) => ({
    id: item.id || `ds-default-${index + 1}`,
    category: item.category || "umum",
    question: item.question as string,
    answer: item.answer as string,
    keywords: Array.isArray(item.keywords) ? item.keywords : [],
    active: true,
    updatedAt: "Bawaan Sistem",
  }));

export async function getAIDataset(): Promise<AIDatasetItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "ai_dataset" },
    });
    if (!setting || !setting.value) {
      return DEFAULT_AI_DATASET;
    }
    const parsed = aiDatasetListSchema.safeParse(setting.value);
    if (!parsed.success) {
      return DEFAULT_AI_DATASET;
    }
    return parsed.data;
  } catch (err) {
    console.error("Error fetching AI dataset:", err);
    return DEFAULT_AI_DATASET;
  }
}

export async function saveAIDatasetAction(dataset: AIDatasetItem[]) {
  const session = await requirePermission("aiDataset", "update");

  const validated = aiDatasetListSchema.safeParse(dataset);
  if (!validated.success) {
    return {
      ok: false,
      message: "Format dataset tidak valid. Harap periksa skema Q&A.",
      fieldErrors: validated.error.flatten(),
    };
  }

  try {
    await prisma.siteSetting.upsert({
      where: { key: "ai_dataset" },
      create: {
        key: "ai_dataset",
        value: validated.data,
        description: "Basis pengetahuan Q&A untuk Veronica",
      },
      update: {
        value: validated.data,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "ai_dataset",
      details: JSON.stringify({ totalEntries: validated.data.length }),
    });

    await invalidateEntity(CACHE_TAGS.AI_DATASET);
    return { ok: true, message: "Dataset AI berhasil disimpan ke database." };
  } catch (err) {
    console.error("Error saving AI dataset:", err);
    return { ok: false, message: "Gagal menyimpan dataset ke database." };
  }
}
