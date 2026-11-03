import { beforeEach, describe, expect, it, vi } from "vitest";
import { Role } from "@prisma/client";
import type { NextRequest } from "next/server";
import { requirePermission } from "@/lib/auth";
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

describe("POST /api/admin/upload", () => {
  beforeEach(() => {
    vi.mocked(requirePermission).mockReset();
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
});
