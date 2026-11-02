"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { recordAuditLog } from "@/server/audit";
import { getStorageDriver } from "@/server/storage";

export async function getMediaAssets(params?: {
  page?: number;
  limit?: number;
  search?: string;
  type?: "ALL" | "IMAGE" | "DOCUMENT";
}) {
  try {
    const page = params?.page || 1;
    const limit = params?.limit || 24;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (params?.search) {
      where.OR = [
        { filename: { contains: params.search, mode: "insensitive" } },
        { altText: { contains: params.search, mode: "insensitive" } },
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
    return { assets: [], total: 0, page: 1, totalPages: 1 };
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
    const [usedByArticle, usedByHero, usedByProgram, usedByStaff] = await Promise.all([
      prisma.article.findFirst({ where: { coverImage: asset.path, deletedAt: null } }),
      prisma.heroSlide.findFirst({ where: { imageUrl: asset.path, deletedAt: null } }),
      prisma.program.findFirst({ where: { coverImage: asset.path, deletedAt: null } }),
      prisma.staffMember.findFirst({ where: { photoUrl: asset.path, deletedAt: null } }),
    ]);

    const activeReferences: string[] = [];
    if (usedByArticle) activeReferences.push(`Artikel: "${usedByArticle.title}"`);
    if (usedByHero) activeReferences.push(`Hero Slide: "${usedByHero.title}"`);
    if (usedByProgram) activeReferences.push(`Prodi: "${usedByProgram.name}"`);
    if (usedByStaff) activeReferences.push(`Staf: "${usedByStaff.name}"`);

    if (activeReferences.length > 0) {
      return {
        ok: false,
        message: `Berkas tidak dapat dihapus karena masih digunakan oleh: ${activeReferences.join(", ")}. Lepaskan terlebih dahulu dari konten tersebut.`,
      };
    }

    // Delete physically from storage
    const storage = getStorageDriver();
    await storage.deleteFile(asset.path);

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
