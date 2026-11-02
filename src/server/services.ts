"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

// ── 1. ServiceItem ──────────────────────────────────────────────────────────
const serviceItemInputSchema = z.object({
  name: z.string().min(2, "Nama layanan minimal 2 karakter").max(150),
  description: z.string().max(500).optional().nullable(),
  icon: z.string().optional().nullable(),
  url: z.string().url("Format URL tidak valid").optional().nullable().or(z.literal("")),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type ServiceItemInput = z.infer<typeof serviceItemInputSchema>;

export async function getServiceItems() {
  try {
    const list = await prisma.serviceItem.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return list.map((s) => ({
      id: s.id,
      name: s.name,
      description: s.description || "",
      icon: s.icon || "HelpCircle",
      url: s.url || "",
      order: s.order,
      isActive: s.isActive,
      version: s.version,
    }));
  } catch (err) {
    console.error("Error fetching service items:", err);
    return [];
  }
}

export async function saveServiceItemAction(id: string | null, rawInput: ServiceItemInput) {
  const session = await requirePermission("layanan", id ? "update" : "create");
  const validated = serviceItemInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return { ok: false, message: "Validasi layanan gagal.", fieldErrors: validated.error.flatten().fieldErrors };
  }
  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.serviceItem.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Data tidak ditemukan atau telah diubah pengguna lain." };
      }
      const updated = await prisma.serviceItem.update({
        where: { id },
        data: {
          name: data.name,
          description: data.description,
          icon: data.icon,
          url: data.url || null,
          order: data.order,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "ServiceItem",
        entityId: updated.id,
      });
      await invalidateEntity(CACHE_TAGS.SERVICES, "/layanan");
      return { ok: true, data: updated, message: "Layanan berhasil diperbarui." };
    } else {
      const created = await prisma.serviceItem.create({
        data: {
          name: data.name,
          description: data.description,
          icon: data.icon,
          url: data.url || null,
          order: data.order,
          isActive: data.isActive,
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "ServiceItem",
        entityId: created.id,
      });
      await invalidateEntity(CACHE_TAGS.SERVICES, "/layanan");
      return { ok: true, data: created, message: "Layanan baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving service item:", err);
    return { ok: false, message: "Gagal menyimpan data layanan." };
  }
}

export async function deleteServiceItemAction(id: string) {
  const session = await requirePermission("layanan", "delete");
  try {
    await prisma.serviceItem.update({ where: { id }, data: { deletedAt: new Date() } });
    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "ServiceItem",
      entityId: id,
    });
    await invalidateEntity(CACHE_TAGS.SERVICES, "/layanan");
    return { ok: true, message: "Layanan berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting service item:", err);
    return { ok: false, message: "Gagal menghapus layanan." };
  }
}

// ── 2. DownloadDoc ──────────────────────────────────────────────────────────
const downloadDocInputSchema = z.object({
  title: z.string().min(2, "Judul dokumen minimal 2 karakter").max(200),
  category: z.string().min(2, "Kategori dokumen wajib diisi"), // Brosur PMB, Formulir Akademik, Panduan, SK Rektor
  fileUrl: z.string().min(1, "URL file dokumen wajib diisi"),
  fileSize: z.string().optional().nullable(),
  version: z.number().int().default(1),
});

export type DownloadDocInput = z.infer<typeof downloadDocInputSchema>;

export async function getDownloadDocs(params?: { category?: string }) {
  try {
    const where: any = { deletedAt: null };
    if (params?.category && params.category !== "ALL") {
      where.category = params.category;
    }
    const docs = await prisma.downloadDoc.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
    return docs.map((d) => ({
      id: d.id,
      title: d.title,
      category: d.category,
      fileUrl: d.fileUrl,
      fileSize: d.fileSize || "1.2 MB",
      downloadCount: d.downloadCount,
      version: d.version,
    }));
  } catch (err) {
    console.error("Error fetching download docs:", err);
    return [];
  }
}

export async function saveDownloadDocAction(id: string | null, rawInput: DownloadDocInput) {
  const session = await requirePermission("layanan", id ? "update" : "create");
  const validated = downloadDocInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return { ok: false, message: "Validasi dokumen unduhan gagal.", fieldErrors: validated.error.flatten().fieldErrors };
  }
  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.downloadDoc.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Dokumen tidak ditemukan atau telah diubah pengguna lain." };
      }
      const updated = await prisma.downloadDoc.update({
        where: { id },
        data: {
          title: data.title,
          category: data.category,
          fileUrl: data.fileUrl,
          fileSize: data.fileSize,
          version: { increment: 1 },
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "DownloadDoc",
        entityId: updated.id,
      });
      await invalidateEntity(CACHE_TAGS.DOWNLOADS, "/layanan");
      return { ok: true, data: updated, message: "Dokumen unduhan berhasil diperbarui." };
    } else {
      const created = await prisma.downloadDoc.create({
        data: {
          title: data.title,
          category: data.category,
          fileUrl: data.fileUrl,
          fileSize: data.fileSize,
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "DownloadDoc",
        entityId: created.id,
      });
      await invalidateEntity(CACHE_TAGS.DOWNLOADS, "/layanan");
      return { ok: true, data: created, message: "Dokumen baru berhasil ditambahkan ke pusat unduhan." };
    }
  } catch (err) {
    console.error("Error saving download doc:", err);
    return { ok: false, message: "Gagal menyimpan dokumen unduhan." };
  }
}

export async function deleteDownloadDocAction(id: string) {
  const session = await requirePermission("layanan", "delete");
  try {
    await prisma.downloadDoc.update({ where: { id }, data: { deletedAt: new Date() } });
    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "DownloadDoc",
      entityId: id,
    });
    await invalidateEntity(CACHE_TAGS.DOWNLOADS, "/layanan");
    return { ok: true, message: "Dokumen berhasil dihapus dari pusat unduhan." };
  } catch (err) {
    console.error("Error deleting download doc:", err);
    return { ok: false, message: "Gagal menghapus dokumen." };
  }
}
