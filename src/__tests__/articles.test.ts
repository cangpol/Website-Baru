import { beforeEach, describe, expect, it, vi } from "vitest";
import { prisma } from "@/lib/prisma";
import { getArticleBySlug } from "@/server/articles";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    article: {
      findFirst: vi.fn(),
    },
  },
}));

vi.mock("@/lib/auth", () => ({
  requirePermission: vi.fn(),
}));

vi.mock("@/lib/sanitize", () => ({
  sanitizeRichText: vi.fn((value: string) => value),
}));

vi.mock("@/server/cache-tags", () => ({
  CACHE_TAGS: { ARTICLES: "articles", page: vi.fn() },
  invalidateEntity: vi.fn(),
}));

vi.mock("@/server/audit", () => ({
  recordAuditLog: vi.fn(),
}));

vi.mock("@/server/storage/cleanup", () => ({
  deleteUploadedFile: vi.fn(),
}));

describe("Public article lookup", () => {
  beforeEach(() => {
    vi.mocked(prisma.article.findFirst).mockReset().mockResolvedValue(null);
  });

  it("only queries published articles", async () => {
    const result = await getArticleBySlug("draft-article");

    expect(result).toBeNull();
    expect(prisma.article.findFirst).toHaveBeenCalledWith({
      where: {
        slug: "draft-article",
        published: true,
        deletedAt: null,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
  });
});
