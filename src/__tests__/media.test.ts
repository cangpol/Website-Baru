import { beforeEach, describe, expect, it, vi } from "vitest";
import { Role } from "@prisma/client";
import { requirePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordAuditLog } from "@/server/audit";
import { getStorageDriver } from "@/server/storage";
import { deleteMediaAssetAction, getMediaAssets, updateMediaAltAction } from "@/server/media";

const mockPrisma = vi.hoisted(() => {
  const referenceModel = { findFirst: vi.fn() };
  return {
    mediaAsset: {
      count: vi.fn(),
      findMany: vi.fn(),
      findUnique: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    },
    article: referenceModel,
    heroSlide: referenceModel,
    program: referenceModel,
    staffMember: referenceModel,
    event: referenceModel,
    studentOrg: referenceModel,
    achievement: referenceModel,
    partner: referenceModel,
    serviceItem: referenceModel,
    downloadDoc: referenceModel,
    siteSetting: { findMany: vi.fn() },
    page: { findMany: vi.fn() },
  };
});

vi.mock("@/lib/auth", () => ({
  requirePermission: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: mockPrisma,
}));

vi.mock("@/server/audit", () => ({
  recordAuditLog: vi.fn(),
}));

vi.mock("@/server/storage", () => ({
  getStorageDriver: vi.fn(),
}));

const storageDriver = {
  name: "test",
  saveFile: vi.fn(),
  deleteFile: vi.fn(),
  getFileUrl: vi.fn(),
};

const mediaAsset = {
  id: "media-1",
  filename: "campus.png",
  path: "/uploads/campus.png",
  mimeType: "image/png",
  size: 128,
  width: 1,
  height: 1,
  altText: "Campus",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("Media library CRUD", () => {
  beforeEach(() => {
    vi.mocked(requirePermission).mockReset().mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });
    vi.mocked(recordAuditLog).mockReset();
    vi.mocked(getStorageDriver).mockReset().mockReturnValue(storageDriver as never);
    vi.mocked(prisma.mediaAsset.count).mockReset().mockResolvedValue(1);
    vi.mocked(prisma.mediaAsset.findMany).mockReset().mockResolvedValue([mediaAsset] as never);
    vi.mocked(prisma.mediaAsset.findUnique).mockReset().mockResolvedValue(mediaAsset as never);
    vi.mocked(prisma.mediaAsset.update).mockReset().mockResolvedValue({
      ...mediaAsset,
      altText: "Updated description",
    } as never);
    vi.mocked(prisma.mediaAsset.delete).mockReset();

    for (const model of [
      prisma.article,
      prisma.heroSlide,
      prisma.program,
      prisma.staffMember,
      prisma.event,
      prisma.studentOrg,
      prisma.achievement,
      prisma.partner,
      prisma.serviceItem,
      prisma.downloadDoc,
    ]) {
      vi.mocked(model.findFirst).mockReset().mockResolvedValue(null);
    }

    vi.mocked(prisma.siteSetting.findMany).mockReset().mockResolvedValue([]);
    vi.mocked(prisma.page.findMany).mockReset().mockResolvedValue([]);
    storageDriver.deleteFile.mockReset().mockResolvedValue(true);
  });

  it("reads uploaded media and returns the paginated record", async () => {
    const result = await getMediaAssets({ page: 1, limit: 20 });

    expect(requirePermission).toHaveBeenCalledWith("media", "read");
    expect(result).toMatchObject({
      total: 1,
      page: 1,
      totalPages: 1,
      assets: [{ id: "media-1", path: "/uploads/campus.png", altText: "Campus" }],
    });
  });

  it("surfaces read failures instead of reporting an empty media library", async () => {
    vi.mocked(prisma.mediaAsset.count).mockRejectedValue(new Error("database unavailable"));
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(getMediaAssets()).rejects.toThrow("Gagal memuat pustaka media.");

    consoleError.mockRestore();
  });

  it("updates the alt text of an uploaded media record", async () => {
    const result = await updateMediaAltAction("media-1", "Updated description");

    expect(result.ok).toBe(true);
    expect(prisma.mediaAsset.update).toHaveBeenCalledWith({
      where: { id: "media-1" },
      data: { altText: "Updated description" },
    });
    expect(recordAuditLog).toHaveBeenCalled();
  });

  it("keeps the media record when its physical file cannot be deleted", async () => {
    storageDriver.deleteFile.mockResolvedValue(false);

    const result = await deleteMediaAssetAction("media-1");

    expect(result.ok).toBe(false);
    expect(prisma.mediaAsset.delete).not.toHaveBeenCalled();
  });

  it("deletes the file and its media record when the asset is unused", async () => {
    const result = await deleteMediaAssetAction("media-1");

    expect(result.ok).toBe(true);
    expect(storageDriver.deleteFile).toHaveBeenCalledWith("/uploads/campus.png");
    expect(prisma.mediaAsset.delete).toHaveBeenCalledWith({ where: { id: "media-1" } });
    expect(recordAuditLog).toHaveBeenCalled();
  });
});
