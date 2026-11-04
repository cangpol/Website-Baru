import { beforeEach, describe, expect, it, vi } from "vitest";
import { Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import sharp from "sharp";
import { requirePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { recordAuditLog } from "@/server/audit";
import { getStorageDriver } from "@/server/storage";
import { POST } from "@/app/api/admin/upload/route";
import { MAX_UPLOAD_FILE_SIZE_BYTES } from "@/server/storage/magic-bytes";

vi.mock("@/lib/auth", () => ({
  requirePermission: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: { mediaAsset: { create: vi.fn() } },
}));

vi.mock("@/server/storage", () => ({
  getStorageDriver: vi.fn(),
}));

vi.mock("@/server/audit", () => ({
  recordAuditLog: vi.fn(),
}));

const createRequest = (headers?: HeadersInit): NextRequest =>
  new Request("http://localhost/api/admin/upload", {
    method: "POST",
    headers,
  }) as NextRequest;

const createUploadRequest = (file: File, altText = "Uploaded test image"): NextRequest => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("altText", altText);
  return new Request("http://localhost/api/admin/upload", {
    method: "POST",
    body: formData,
  }) as NextRequest;
};

const storageDriver = {
  name: "test",
  saveFile: vi.fn(),
  deleteFile: vi.fn(),
  getFileUrl: vi.fn(),
};

describe("POST /api/admin/upload", () => {
  beforeEach(() => {
    vi.mocked(requirePermission).mockReset().mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });
    vi.mocked(prisma.mediaAsset.create).mockReset();
    vi.mocked(recordAuditLog).mockReset();
    vi.mocked(getStorageDriver).mockReset().mockReturnValue(storageDriver as never);
    storageDriver.saveFile.mockReset().mockResolvedValue({
      url: "/uploads/stored-image.png",
      path: "stored-image.png",
      size: 68,
      mimeType: "image/png",
    });
    storageDriver.deleteFile.mockReset().mockResolvedValue(true);
  });

  it("returns 401 when the user is not logged in", async () => {
    vi.mocked(requirePermission).mockRejectedValue(
      new Error("Akses ditolak: Anda harus login terlebih dahulu.")
    );

    const response = await POST(createRequest());

    expect(response.status).toBe(401);
  });

  it("returns 403 when the user lacks media permission", async () => {
    vi.mocked(requirePermission).mockRejectedValue(
      new Error("Content Writer tidak memiliki izin untuk modul ini.")
    );

    const response = await POST(createRequest());

    expect(response.status).toBe(403);
  });

  it("rejects oversized requests before parsing the multipart body", async () => {
    vi.mocked(requirePermission).mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });

    const response = await POST(
      createRequest({
        "content-length": String(MAX_UPLOAD_FILE_SIZE_BYTES + 64 * 1024 + 1),
      })
    );

    expect(response.status).toBe(413);
  });

  it("stores a validated image and creates its media record", async () => {
    const file = new File(
      [await sharp({ create: { width: 1, height: 1, channels: 4, background: "#ffffff" } }).png().toBuffer()],
      "pixel.png",
      { type: "image/png" }
    );
    vi.mocked(prisma.mediaAsset.create).mockResolvedValue({
      id: "media-1",
      filename: "pixel.png",
      path: "/uploads/stored-image.png",
      mimeType: "image/png",
      size: 68,
      width: 1,
      height: 1,
      altText: "A test image",
    } as never);

    const response = await POST(createUploadRequest(file, "A test image"));
    const result = await response.json();

    expect(response.status).toBe(200);
    expect(result).toMatchObject({
      ok: true,
      data: {
        id: "media-1",
        url: "/uploads/stored-image.png",
        filename: "pixel.png",
        altText: "A test image",
      },
    });
    expect(storageDriver.saveFile).toHaveBeenCalledWith(
      expect.any(Buffer),
      expect.stringMatching(/^[0-9a-f-]+\.png$/),
      "image/png"
    );
    expect(prisma.mediaAsset.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        filename: "pixel.png",
        path: "/uploads/stored-image.png",
        mimeType: "image/png",
        altText: "A test image",
        uploadedById: "admin",
      }),
    });
    expect(recordAuditLog).toHaveBeenCalled();
  });

  it("removes the stored file if creating its media record fails", async () => {
    const file = new File(
      [await sharp({ create: { width: 1, height: 1, channels: 4, background: "#ffffff" } }).png().toBuffer()],
      "pixel.png",
      { type: "image/png" }
    );
    vi.mocked(prisma.mediaAsset.create).mockRejectedValue(new Error("database failure"));

    const response = await POST(createUploadRequest(file));

    expect(response.status).toBe(500);
    expect(storageDriver.deleteFile).toHaveBeenCalledWith("/uploads/stored-image.png");
  });

  it("rejects a file with an unsupported binary format before storing it", async () => {
    const file = new File(["not an image"], "fake.png", { type: "image/png" });

    const response = await POST(createUploadRequest(file));

    expect(response.status).toBe(400);
    expect(storageDriver.saveFile).not.toHaveBeenCalled();
    expect(prisma.mediaAsset.create).not.toHaveBeenCalled();
  });
});
