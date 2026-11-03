import { beforeEach, describe, expect, it, vi } from "vitest";
import { requirePermission } from "@/lib/auth";
import { POST } from "@/app/api/instagram/route";
import { getHomepageContent, saveHomepageInstagramAction } from "@/server/homepage";
import { Role } from "@prisma/client";

vi.mock("@/lib/auth", () => ({
  requirePermission: vi.fn(),
}));

vi.mock("@/server/homepage", () => ({
  getHomepageContent: vi.fn(),
  saveHomepageInstagramAction: vi.fn(),
}));

const createRequest = (body: unknown) =>
  new Request("http://localhost/api/instagram", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });

describe("POST /api/instagram", () => {
  beforeEach(() => {
    vi.mocked(requirePermission).mockReset();
    vi.mocked(getHomepageContent).mockReset();
    vi.mocked(saveHomepageInstagramAction).mockReset();
  });

  it("rejects write requests without an authenticated session", async () => {
    vi.mocked(requirePermission).mockRejectedValue(
      new Error("Akses ditolak: Anda harus login terlebih dahulu.")
    );

    const response = await POST(createRequest({ action: "ADD_POST", post: {} }));

    expect(response.status).toBe(401);
    expect(requirePermission).toHaveBeenCalledWith("beranda", "update");
  });

  it("rejects write requests from a role without homepage permission", async () => {
    vi.mocked(requirePermission).mockRejectedValue(
      new Error("Staff PMB tidak memiliki izin untuk modul ini.")
    );

    const response = await POST(createRequest({ action: "LOGOUT" }));

    expect(response.status).toBe(403);
  });

  it("validates the action payload after authorization", async () => {
    vi.mocked(requirePermission).mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });

    const response = await POST(createRequest({ action: "ADD_POST" }));

    expect(response.status).toBe(400);
  });

  it("does not simulate a successful Instagram OAuth login", async () => {
    vi.mocked(requirePermission).mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });

    const response = await POST(createRequest({ action: "LOGIN", username: "upitra_campus" }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({ success: false });
  });

  it("persists manual feed posts to the homepage CMS", async () => {
    vi.mocked(requirePermission).mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });
    vi.mocked(getHomepageContent).mockResolvedValue({
      instagram: {
        title: "Feed",
        subtitle: "Subtitle",
        handle: "@upitra_campus",
        profileUrl: "https://www.instagram.com/upitra_campus/",
        posts: [],
      },
    } as never);
    vi.mocked(saveHomepageInstagramAction).mockResolvedValue({
      ok: true,
      data: {
        posts: [{
          id: "ig_post_1",
          caption: "Kegiatan kampus terbaru",
          mediaUrl: "/images/kegiatan.jpg",
          permalink: "https://www.instagram.com/upitra_campus/",
          timeAgo: "Baru saja",
          category: "Kegiatan",
        }],
      },
      message: "Tersimpan",
    } as never);

    const response = await POST(createRequest({
      action: "ADD_POST",
      post: {
        caption: "Kegiatan kampus terbaru",
        mediaUrl: "/images/kegiatan.jpg",
        permalink: "https://www.instagram.com/upitra_campus/",
        category: "Kegiatan",
      },
    }));

    expect(response.status).toBe(200);
    expect(saveHomepageInstagramAction).toHaveBeenCalledWith(expect.objectContaining({
      posts: [expect.objectContaining({ caption: "Kegiatan kampus terbaru" })],
    }));
  });
});
