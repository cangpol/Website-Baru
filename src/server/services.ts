"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { deleteUploadedFile } from "@/server/storage/cleanup";
import {
  ServiceMetadata,
  FaqItem,
  defaultLayananFaqs,
  PmbBrochureSetting,
  defaultPmbBrochure,
} from "@/lib/servicesTypes";

// ── Helper Metadata Packing untuk ServiceItem ──────────────────────────────
function extractServiceMetadata(rawDescription: string | null): ServiceMetadata {
  if (!rawDescription) {
    return {
      cleanDescription: "",
      attachmentUrl: null,
      attachmentName: null,
      attachmentSize: null,
      tag: null,
      category: null,
    };
  }
  const match = rawDescription.match(/^<!--meta:(\{[\s\S]*?\})-->/);
  if (match) {
    try {
      const meta = JSON.parse(match[1]);
      const cleanDescription = rawDescription.replace(/^<!--meta:(\{[\s\S]*?\})-->\s*/, "");
      return {
        cleanDescription,
        attachmentUrl: meta.attachmentUrl || null,
        attachmentName: meta.attachmentName || null,
        attachmentSize: meta.attachmentSize || null,
        tag: meta.tag || null,
        category: meta.category || null,
      };
    } catch {
      return {
        cleanDescription: rawDescription,
        attachmentUrl: null,
        attachmentName: null,
        attachmentSize: null,
        tag: null,
        category: null,
      };
    }
  }
  return {
    cleanDescription: rawDescription,
    attachmentUrl: null,
    attachmentName: null,
    attachmentSize: null,
    tag: null,
    category: null,
  };
}

function packServiceMetadata(
  cleanDescription: string,
  meta?: {
    attachmentUrl?: string | null;
    attachmentName?: string | null;
    attachmentSize?: string | null;
    tag?: string | null;
    category?: string | null;
  }
) {
  const metaObj: Record<string, string> = {};
  if (meta?.attachmentUrl) metaObj.attachmentUrl = meta.attachmentUrl;
  if (meta?.attachmentName) metaObj.attachmentName = meta.attachmentName;
  if (meta?.attachmentSize) metaObj.attachmentSize = meta.attachmentSize;
  if (meta?.tag) metaObj.tag = meta.tag;
  if (meta?.category) metaObj.category = meta.category;
  if (Object.keys(metaObj).length === 0) return cleanDescription;
  return `<!--meta:${JSON.stringify(metaObj)}-->\n${cleanDescription}`;
}

// ── 1. ServiceItem ──────────────────────────────────────────────────────────
const serviceItemInputSchema = z.object({
  name: z.string().min(2, "Nama layanan minimal 2 karakter").max(150),
  description: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  url: z.string().url("Format URL tidak valid").optional().nullable().or(z.literal("")),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  attachmentUrl: z.string().optional().nullable(),
  attachmentName: z.string().optional().nullable(),
  attachmentSize: z.string().optional().nullable(),
  tag: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  version: z.number().int().default(1),
});

export type ServiceItemInput = z.infer<typeof serviceItemInputSchema>;

export async function getServiceItems(onlyActive = false) {
  try {
    const where: any = { deletedAt: null };
    if (onlyActive) {
      where.isActive = true;
    }
    const list = await prisma.serviceItem.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    return list.map((s) => {
      const meta = extractServiceMetadata(s.description);
      return {
        id: s.id,
        name: s.name,
        description: meta.cleanDescription,
        rawDescription: s.description || "",
        attachmentUrl: meta.attachmentUrl,
        attachmentName: meta.attachmentName,
        attachmentSize: meta.attachmentSize,
        tag: meta.tag || "Layanan Kampus",
        category: meta.category || "Umum",
        icon: s.icon || "BookOpen",
        url: s.url || "",
        order: s.order,
        isActive: s.isActive,
        version: s.version,
      };
    });
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
  const sanitizedDesc = data.description ? sanitizeRichText(data.description) : "";
  const packedDescription = packServiceMetadata(sanitizedDesc, {
    attachmentUrl: data.attachmentUrl,
    attachmentName: data.attachmentName,
    attachmentSize: data.attachmentSize,
    tag: data.tag,
    category: data.category,
  });

  try {
    if (id) {
      const existing = await prisma.serviceItem.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Data tidak ditemukan atau telah diubah pengguna lain." };
      }

      // Pembersihan file fisik yatim jika icon atau attachment diganti
      if (existing.icon && existing.icon !== data.icon && existing.icon.startsWith("/uploads/")) {
        await deleteUploadedFile(existing.icon);
      }
      const oldMeta = extractServiceMetadata(existing.description);
      if (
        oldMeta.attachmentUrl &&
        oldMeta.attachmentUrl !== data.attachmentUrl &&
        oldMeta.attachmentUrl.startsWith("/uploads/")
      ) {
        await deleteUploadedFile(oldMeta.attachmentUrl);
      }

      const updated = await prisma.serviceItem.update({
        where: { id },
        data: {
          name: data.name,
          description: packedDescription,
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
          description: packedDescription,
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
    const existing = await prisma.serviceItem.findUnique({ where: { id } });
    if (existing) {
      if (existing.icon && existing.icon.startsWith("/uploads/")) {
        await deleteUploadedFile(existing.icon);
      }
      const meta = extractServiceMetadata(existing.description);
      if (meta.attachmentUrl && meta.attachmentUrl.startsWith("/uploads/")) {
        await deleteUploadedFile(meta.attachmentUrl);
      }
    }

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
  category: z.string().min(2, "Kategori dokumen wajib diisi"),
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

      if (existing.fileUrl !== data.fileUrl && existing.fileUrl.startsWith("/uploads/")) {
        await deleteUploadedFile(existing.fileUrl);
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
    const existing = await prisma.downloadDoc.findUnique({ where: { id } });
    if (existing && existing.fileUrl.startsWith("/uploads/")) {
      await deleteUploadedFile(existing.fileUrl);
    }

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

// ── 3. FAQ Layanan Terpadu (SiteSetting) ───────────────────────────────────
export async function getLayananFaqs(): Promise<FaqItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "layanan_faqs" },
    });
    if (setting?.value && Array.isArray(setting.value)) {
      return setting.value as unknown as FaqItem[];
    }
  } catch (err) {
    console.error("Error getLayananFaqs:", err);
  }
  return defaultLayananFaqs;
}

export async function saveLayananFaqsAction(faqs: FaqItem[]) {
  const session = await requirePermission("layanan", "update");
  try {
    const sanitized = faqs.map((f, idx) => ({
      id: f.id || `faq-${Date.now()}-${idx}`,
      q: f.q.trim(),
      a: sanitizeRichText(f.a.trim()),
      category: f.category || "Umum",
      order: f.order ?? idx + 1,
    }));

    await prisma.siteSetting.upsert({
      where: { key: "layanan_faqs" },
      create: {
        key: "layanan_faqs",
        value: sanitized as any,
        description: "Daftar FAQ Layanan Terpadu Kampus UPITRA",
      },
      update: {
        value: sanitized as any,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "layanan_faqs",
    });
    await invalidateEntity(CACHE_TAGS.SERVICES, "/layanan");
    return { ok: true, data: sanitized, message: "Daftar FAQ berhasil disimpan." };
  } catch (err) {
    console.error("Error saveLayananFaqsAction:", err);
    return { ok: false, message: "Gagal menyimpan daftar FAQ." };
  }
}

// ── 4. Brosur PMB (SiteSetting) ──────────────────────────────────────────
export async function getPmbBrochureSetting(): Promise<PmbBrochureSetting> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "pmb_brochure_setting" },
    });
    if (setting?.value) {
      return setting.value as unknown as PmbBrochureSetting;
    }
  } catch (err) {
    console.error("Error getPmbBrochureSetting:", err);
  }
  return defaultPmbBrochure;
}

export async function savePmbBrochureSettingAction(data: PmbBrochureSetting) {
  const session = await requirePermission("layanan", "update");
  try {
    const existing = await prisma.siteSetting.findUnique({
      where: { key: "pmb_brochure_setting" },
    });

    if (existing?.value) {
      const oldVal = existing.value as unknown as PmbBrochureSetting;
      if (oldVal.pdfUrl && oldVal.pdfUrl !== data.pdfUrl && oldVal.pdfUrl.startsWith("/uploads/")) {
        await deleteUploadedFile(oldVal.pdfUrl);
      }
      if (oldVal.coverImage && oldVal.coverImage !== data.coverImage && oldVal.coverImage.startsWith("/uploads/")) {
        await deleteUploadedFile(oldVal.coverImage);
      }
    }

    await prisma.siteSetting.upsert({
      where: { key: "pmb_brochure_setting" },
      create: {
        key: "pmb_brochure_setting",
        value: data as any,
        description: "Pengaturan Brosur Resmi PMB UPITRA",
      },
      update: {
        value: data as any,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "pmb_brochure_setting",
    });
    await invalidateEntity(CACHE_TAGS.SERVICES, "/layanan");
    return { ok: true, data, message: "Pengaturan Brosur PMB berhasil disimpan." };
  } catch (err) {
    console.error("Error savePmbBrochureSettingAction:", err);
    return { ok: false, message: "Gagal menyimpan pengaturan Brosur PMB." };
  }
}
