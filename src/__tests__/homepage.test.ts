import { beforeEach, describe, expect, it, vi } from "vitest";
import { requirePermission } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteUploadedFileIfUnused } from "@/server/storage/cleanup-if-unused";
import { defaultHomepageHero } from "@/lib/homepageData";
import { getHomepageContent, saveHomepageHeroAction } from "@/server/homepage";
import { Role } from "@prisma/client";

vi.mock("@/lib/auth", () => ({
  requirePermission: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    siteSetting: {
      findUnique: vi.fn(),
      upsert: vi.fn(),
    },
  },
}));

vi.mock("@/server/storage/cleanup-if-unused", () => ({
  deleteUploadedFileIfUnused: vi.fn(),
}));

vi.mock("@/server/audit", () => ({
  recordAuditLog: vi.fn(),
}));

vi.mock("@/server/cache-tags", () => ({
  CACHE_TAGS: { HERO: "hero", SETTINGS: "settings" },
  invalidateEntity: vi.fn(),
}));

describe("Homepage content", () => {
  beforeEach(() => {
    vi.mocked(requirePermission).mockReset().mockResolvedValue({
      userId: "admin",
      email: "admin@upitra.ac.id",
      name: "Admin",
      role: Role.SUPERADMIN,
      exp: Math.floor(Date.now() / 1000) + 60,
    });
    vi.mocked(prisma.siteSetting.findUnique).mockReset().mockResolvedValue(null);
    vi.mocked(prisma.siteSetting.upsert).mockReset();
    vi.mocked(deleteUploadedFileIfUnused).mockReset();
  });

  it("rejects unsafe hero links before writing data", async () => {
    const result = await saveHomepageHeroAction({
      ...defaultHomepageHero,
      ctaHref: "javascript:alert(1)",
    });

    expect(result.ok).toBe(false);
    expect(prisma.siteSetting.upsert).not.toHaveBeenCalled();
  });

  it("rejects remote image hosts that Next Image is not configured to load", async () => {
    const result = await saveHomepageHeroAction({
      ...defaultHomepageHero,
      imageUrl: "https://untrusted.example/hero.jpg",
    });

    expect(result.ok).toBe(false);
    expect(prisma.siteSetting.upsert).not.toHaveBeenCalled();
  });

  it("keeps the previous uploaded image when saving the setting fails", async () => {
    vi.mocked(prisma.siteSetting.findUnique).mockResolvedValue({
      value: { ...defaultHomepageHero, imageUrl: "/uploads/previous.jpg" },
    } as never);
    vi.mocked(prisma.siteSetting.upsert).mockRejectedValue(new Error("database failure"));

    const result = await saveHomepageHeroAction({
      ...defaultHomepageHero,
      imageUrl: "/uploads/next.jpg",
    });

    expect(result.ok).toBe(false);
    expect(deleteUploadedFileIfUnused).not.toHaveBeenCalled();
  });

  it("uses safe defaults when stored homepage JSON is malformed", async () => {
    vi.mocked(prisma.siteSetting.findUnique).mockResolvedValue({
      value: { waves: "invalid" },
    } as never);

    const content = await getHomepageContent();

    expect(content.waves).toEqual(expect.objectContaining({ waves: expect.any(Array) }));
  });

  it("does not inject a badge into legacy homepage data and keeps explicit edits", async () => {
    const storedWaves = {
      title: "Selamat Datang di UPITRA",
      subtitle: "Gelombang pendaftaran yang sedang kami buka.",
      waves: [{
        id: "ready-early",
        title: "Ready Early",
        benefit: "Beasiswa 100% DPP & SKS",
        image: "/images/pmb/wave-ready-early-hq.jpg",
        link: "https://pmb.upitra.ac.id",
      }],
    };
    const mockStoredWaves = (value: unknown) => {
      vi.mocked(prisma.siteSetting.findUnique)
        .mockReset()
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ value } as never)
        .mockResolvedValue(null);
    };

    mockStoredWaves(storedWaves);
    const legacyContent = await getHomepageContent();
    expect(legacyContent.waves.waves[0].badge).toBe("");

    mockStoredWaves({ ...storedWaves, waves: [{ ...storedWaves.waves[0], badge: "Baru" }] });
    const badgedContent = await getHomepageContent();
    expect(badgedContent.waves.waves[0].badge).toBe("Baru");

    mockStoredWaves({ ...storedWaves, waves: [{ ...storedWaves.waves[0], badge: "" }] });
    const editedContent = await getHomepageContent();
    expect(editedContent.waves.waves[0].badge).toBe("");
  });
});

describe("homepage immersion defaults", () => {
  it("includes immersion content and visibility by default", async () => {
    const { defaultHomepageImmersion, defaultHomepageVisibility } = await import("@/lib/homepageData");
    expect(defaultHomepageVisibility.immersion).toBe(true);
    expect(defaultHomepageImmersion.pillars.length).toBeGreaterThanOrEqual(4);
    expect(defaultHomepageImmersion.concepts[0].note).toContain("Semester");
  });
});
