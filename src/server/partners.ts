"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

function isHttpUrl(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const partnerInputSchema = z.object({
  name: z.string().min(2, "Nama mitra minimal 2 karakter").max(150),
  category: z.string().min(2, "Kategori mitra wajib diisi"),
  logoUrl: z.string().optional().nullable(),
  websiteUrl: z.string().max(2048).url("Format website URL tidak valid").refine(isHttpUrl).optional().nullable().or(z.literal("")),
  description: z.string().max(500).optional().nullable(),
  startYear: z.number().int().min(1950).max(2100).optional().nullable(),
  mouStatus: z.string().default("Aktif"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type PartnerInput = z.infer<typeof partnerInputSchema>;

export async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return partners.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      logoUrl: p.logoUrl || "/images/mitra/mitra1.png",
      websiteUrl: p.websiteUrl,
      description: p.description,
      startYear: p.startYear,
      mouStatus: p.mouStatus,
      order: p.order,
      isActive: p.isActive,
      version: p.version,
    }));
  } catch (err) {
    console.error("Error fetching partners:", err);
    return [];
  }
}

export async function savePartnerAction(id: string | null, rawInput: PartnerInput) {
  const session = await requirePermission("kerjasama", id ? "update" : "create");

  const validated = partnerInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data mitra kerjasama gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.partner.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Mitra tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return {
          ok: false,
          message: "Data telah diperbarui pengguna lain. Silakan refresh.",
        };
      }

      const updated = await prisma.partner.update({
        where: { id },
        data: {
          name: data.name,
          category: data.category,
          logoUrl: data.logoUrl,
          websiteUrl: data.websiteUrl || null,
          description: data.description,
          startYear: data.startYear,
          mouStatus: data.mouStatus,
          order: data.order,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "Partner",
        entityId: updated.id,
        details: { name: updated.name },
      });

      await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
      return { ok: true, data: updated };
    } else {
      const created = await prisma.partner.create({
        data: {
          name: data.name,
          category: data.category,
          logoUrl: data.logoUrl,
          websiteUrl: data.websiteUrl || null,
          description: data.description,
          startYear: data.startYear,
          mouStatus: data.mouStatus,
          order: data.order,
          isActive: data.isActive,
          version: 1,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "Partner",
        entityId: created.id,
        details: { name: created.name },
      });

      await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
      return { ok: true, data: created };
    }
  } catch (error) {
    console.error("Save partner error:", error);
    return { ok: false, message: "Gagal menyimpan data mitra kerjasama." };
  }
}

export async function softDeletePartnerAction(id: string) {
  const session = await requirePermission("kerjasama", "delete");

  try {
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Partner",
      entityId: id,
      details: { name: partner.name },
    });

    await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
    return { ok: true, message: `Mitra "${partner.name}" berhasil dihapus.` };
  } catch (error) {
    console.error("Delete partner error:", error);
    return { ok: false, message: "Gagal menghapus data mitra." };
  }
}

// ── MoU / MoA Dokumen Kerjasama ─────────────────────────────────────────────
export interface KerjasamaMouItem {
  id: string;
  partnerName: string;
  documentType: "MoU" | "MoA" | "IA" | "Surat Tugas";
  scope: string;
  startYear: string;
  endYear: string;
  signatory: string;
  status: "Aktif" | "Perpanjangan" | "Selesai";
  fileUrl?: string;
}

function isSafeMouUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const mouListSchema = z.array(z.object({
  id: z.string().trim().min(1).max(100),
  partnerName: z.string().trim().min(1).max(300),
  documentType: z.enum(["MoU", "MoA", "IA", "Surat Tugas"]),
  scope: z.string().max(5000),
  startYear: z.string().max(20),
  endYear: z.string().max(20),
  signatory: z.string().max(300),
  status: z.enum(["Aktif", "Perpanjangan", "Selesai"]),
  fileUrl: z.string().max(2048).refine(isSafeMouUrl).optional(),
})).max(1000);

const DEFAULT_MOU_LIST: KerjasamaMouItem[] = [
  {
    id: "mou-01",
    partnerName: "Triputra Group",
    documentType: "MoU",
    scope: "Penyelenggaraan Program Immersion 3+1, Magang Industri Berbayar, Beasiswa Penuh, dan Penyerapan Karir Lulusan",
    startYear: "2023",
    endYear: "2028",
    signatory: "Rektor UPITRA & CEO Triputra Group",
    status: "Aktif",
    fileUrl: "/images/logo.png",
  },
  {
    id: "mou-02",
    partnerName: "Pemerintah Provinsi Jawa Tengah",
    documentType: "MoU",
    scope: "Pengembangan SDM Daerah, Riset Kebijakan Publik, dan Pelatihan Kompetensi Digital ASN dan Pemuda Jawa Tengah",
    startYear: "2026",
    endYear: "2031",
    signatory: "Rektor UPITRA & Gubernur Jawa Tengah",
    status: "Aktif",
    fileUrl: "/images/logo.png",
  },
];

export async function getMouList(): Promise<KerjasamaMouItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "admin_kerjasama_mou" },
    });
    if (!setting || !Array.isArray(setting.value)) {
      return DEFAULT_MOU_LIST;
    }
    const parsed = mouListSchema.safeParse(setting.value);
    return parsed.success ? parsed.data : DEFAULT_MOU_LIST;
  } catch {
    return DEFAULT_MOU_LIST;
  }
}

export async function saveMouListAction(rawItems: unknown) {
  const session = await requirePermission("kerjasama", "update");
  const validated = mouListSchema.safeParse(rawItems);
  if (!validated.success) {
    return {
      ok: false,
      message: "Format daftar dokumen kerja sama tidak valid.",
      fieldErrors: validated.error.flatten(),
    };
  }
  const items = validated.data;

  try {
    await prisma.siteSetting.upsert({
      where: { key: "admin_kerjasama_mou" },
      create: {
        key: "admin_kerjasama_mou",
        value: items as unknown as Prisma.InputJsonValue,
        description: "Daftar MoU dan MoA Kerjasama UPITRA",
      },
      update: {
        value: items as unknown as Prisma.InputJsonValue,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "admin_kerjasama_mou",
      details: JSON.stringify({ count: items.length }),
    });

    await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
    return { ok: true, message: "Daftar MoU kerjasama berhasil disimpan ke database." };
  } catch (err) {
    console.error("Error saving MoU list:", err);
    return { ok: false, message: "Gagal menyimpan daftar MoU." };
  }
}
