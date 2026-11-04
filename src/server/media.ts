"use server";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { recordAuditLog } from "@/server/audit";
import { getStorageDriver } from "@/server/storage";

function containsExactValue(value: unknown, target: string): boolean {
  if (value === target) return true;
  if (Array.isArray(value)) return value.some((entry) => containsExactValue(entry, target));
  if (value && typeof value === "object") {
    return Object.values(value).some((entry) => containsExactValue(entry, target));
  }
  return false;
}

export async function getMediaAssets(params?: {
  page?: number;
  limit?: number;
  search?: string;
  type?: "ALL" | "IMAGE" | "DOCUMENT";
}) {
  await requirePermission("media", "read");

  try {
    const page =
      typeof params?.page === "number" && Number.isSafeInteger(params.page)
        ? Math.max(1, params.page)
        : 1;
    const limit =
      typeof params?.limit === "number" && Number.isSafeInteger(params.limit)
        ? Math.max(1, Math.min(100, params.limit))
        : 24;
    const skip = (page - 1) * limit;

    const where: Prisma.MediaAssetWhereInput = {};

    const search = params?.search?.trim().slice(0, 200);
    if (search) {
      where.OR = [
        { filename: { contains: search, mode: "insensitive" } },
        { altText: { contains: search, mode: "insensitive" } },
      ];
    }

    if (params?.type === "IMAGE") {
      where.mimeType = { startsWith: "image/" };
    } else if (params?.type === "DOCUMENT") {
      where.mimeType = "application/pdf";
    }

    const [total, assets] = await Promise.all([
      prisma.mediaAsset.count({ where }),
      prisma.mediaAsset.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
    ]);

    return {
      assets: assets.map((a) => ({
        id: a.id,
        filename: a.filename,
        path: a.path,
        mimeType: a.mimeType,
        size: a.size,
        width: a.width,
        height: a.height,
        altText: a.altText || "",
        createdAt: a.createdAt.toISOString(),
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  } catch (err) {
    console.error("Error fetching media assets:", err);
    throw new Error("Gagal memuat pustaka media. Periksa koneksi lalu coba lagi.");
  }
}

export async function updateMediaAltAction(id: string, altText: string) {
  const session = await requirePermission("media", "update");

  try {
    const asset = await prisma.mediaAsset.update({
      where: { id },
      data: { altText: altText.slice(0, 500) },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "MediaAsset",
      entityId: asset.id,
      details: JSON.stringify({ altText }),
    });

    return { ok: true, message: "Alt text berhasil diperbarui." };
  } catch (err) {
    console.error("Error updating media alt:", err);
    return { ok: false, message: "Gagal memperbarui alt text." };
  }
}

export async function deleteMediaAssetAction(id: string) {
  const session = await requirePermission("media", "delete");

  try {
    const asset = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) {
      return { ok: false, message: "Berkas tidak ditemukan." };
    }

    // Check if asset path is in use by articles, programs, staff, or hero slides
    const [
      usedByArticle,
      usedByHero,
      usedByProgram,
      usedByStaff,
      usedByEvent,
      usedByStudentOrg,
      usedByAchievement,
      usedByPartner,
      usedByService,
      usedByDownload,
      settings,
      pages,
    ] = await Promise.all([
      prisma.article.findFirst({ where: { coverImage: asset.path, deletedAt: null } }),
      prisma.heroSlide.findFirst({ where: { imageUrl: asset.path, deletedAt: null } }),
      prisma.program.findFirst({ where: { coverImage: asset.path, deletedAt: null } }),
      prisma.staffMember.findFirst({ where: { photoUrl: asset.path, deletedAt: null } }),
      prisma.event.findFirst({ where: { bannerImage: asset.path, deletedAt: null } }),
      prisma.studentOrg.findFirst({ where: { logoUrl: asset.path, deletedAt: null } }),
      prisma.achievement.findFirst({ where: { photoUrl: asset.path, deletedAt: null } }),
      prisma.partner.findFirst({ where: { logoUrl: asset.path, deletedAt: null } }),
      prisma.serviceItem.findFirst({
        where: { OR: [{ icon: asset.path }, { description: { contains: asset.path } }], deletedAt: null },
      }),
      prisma.downloadDoc.findFirst({ where: { fileUrl: asset.path, deletedAt: null } }),
      prisma.siteSetting.findMany({ select: { key: true, value: true } }),
      prisma.page.findMany({ select: { title: true, blocks: true, draftBlocks: true }, where: { deletedAt: null } }),
    ]);

    const activeReferences: string[] = [];
    if (usedByArticle) activeReferences.push(`Artikel: "${usedByArticle.title}"`);
    if (usedByHero) activeReferences.push(`Hero Slide: "${usedByHero.title}"`);
    if (usedByProgram) activeReferences.push(`Prodi: "${usedByProgram.name}"`);
    if (usedByStaff) activeReferences.push(`Staf: "${usedByStaff.name}"`);
    if (usedByEvent) activeReferences.push(`Event: "${usedByEvent.title}"`);
    if (usedByStudentOrg) activeReferences.push(`Organisasi mahasiswa: "${usedByStudentOrg.name}"`);
    if (usedByAchievement) activeReferences.push(`Prestasi: "${usedByAchievement.title}"`);
    if (usedByPartner) activeReferences.push(`Mitra: "${usedByPartner.name}"`);
    if (usedByService) activeReferences.push(`Layanan: "${usedByService.name}"`);
    if (usedByDownload) activeReferences.push(`Dokumen unduhan: "${usedByDownload.title}"`);
    const settingReferences = settings.filter((setting) => containsExactValue(setting.value, asset.path));
    activeReferences.push(...settingReferences.map((setting) => `Pengaturan konten: "${setting.key}"`));
    const pageReferences = pages.filter((page) =>
      containsExactValue(page.blocks, asset.path) || containsExactValue(page.draftBlocks, asset.path)
    );
    activeReferences.push(...pageReferences.map((page) => `Halaman: "${page.title}"`));

    if (activeReferences.length > 0) {
      return {
        ok: false,
        message: `Berkas tidak dapat dihapus karena masih digunakan oleh: ${activeReferences.join(", ")}. Lepaskan terlebih dahulu dari konten tersebut.`,
      };
    }

    // Delete physically from storage
    const storage = getStorageDriver();
    const deleted = await storage.deleteFile(asset.path);
    if (!deleted) {
      return {
        ok: false,
        message: "Berkas fisik gagal dihapus. Data pustaka media tetap dipertahankan.",
      };
    }

    // Delete record from DB
    await prisma.mediaAsset.delete({ where: { id } });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "MediaAsset",
      entityId: id,
      details: JSON.stringify({ filename: asset.filename, path: asset.path }),
    });

    return { ok: true, message: "Berkas media berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting media asset:", err);
    return { ok: false, message: "Terjadi kesalahan saat menghapus berkas media." };
  }
}
