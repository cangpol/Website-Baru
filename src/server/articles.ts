import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

export const articleInputSchema = z.object({
  title: z.string().min(5, "Judul artikel minimal 5 karakter").max(200),
  category: z.string().min(2, "Kategori wajib dipilih"),
  summary: z.string().max(500).optional(),
  content: z.string().min(10, "Isi artikel minimal 10 karakter"),
  coverImage: z.string().url("URL cover image tidak valid").or(z.string().startsWith("/")).optional().nullable(),
  published: z.boolean().default(false),
  version: z.number().int().default(1),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;

export async function getPublishedArticles(limit = 10, category?: string) {
  try {
    const where: any = {
      published: true,
      deletedAt: null,
    };
    if (category && category !== "Semua") {
      where.category = category;
    }

    const articles = await prisma.article.findMany({
      where,
      orderBy: { publishedAt: "desc" },
      take: limit,
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    return articles.map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      content: a.content,
      category: a.category,
      coverImage: a.coverImage,
      authorName: a.author.name,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString() : a.createdAt.toISOString(),
      createdAt: a.createdAt.toISOString(),
      version: a.version,
    }));
  } catch (err) {
    console.error("Error fetching published articles:", err);
    return [];
  }
}

export async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findFirst({
      where: {
        slug,
        deletedAt: null,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!article) return null;

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      summary: article.summary,
      content: article.content,
      category: article.category,
      coverImage: article.coverImage,
      authorName: article.author.name,
      published: article.published,
      publishedAt: article.publishedAt ? article.publishedAt.toISOString() : article.createdAt.toISOString(),
      createdAt: article.createdAt.toISOString(),
      version: article.version,
    };
  } catch (err) {
    console.error("Error fetching article by slug:", err);
    return null;
  }
}

function generateSlug(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const suffix = Math.random().toString(36).substring(2, 7);
  return `${base}-${suffix}`;
}

export async function saveArticleAction(
  id: string | null,
  rawInput: ArticleInput
) {
  // 1. Otorisasi
  const session = await requirePermission("articles", id ? "update" : "create");

  // 2. Validasi Skema
  const validated = articleInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data artikel gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  // 3. Sanitasi Konten RichText Tiptap
  const cleanContent = sanitizeRichText(data.content);

  try {
    if (id) {
      // 4. Update dengan Optimistic Concurrency Check
      const existing = await prisma.article.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Artikel tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return {
          ok: false,
          message: "Data telah diubah oleh administrator lain. Silakan muat ulang halaman sebelum menyimpan.",
        };
      }

      const updated = await prisma.article.update({
        where: { id },
        data: {
          title: data.title,
          category: data.category,
          summary: data.summary,
          content: cleanContent,
          coverImage: data.coverImage,
          published: data.published,
          publishedAt: data.published && !existing.publishedAt ? new Date() : existing.publishedAt,
          version: { increment: 1 },
        },
      });

      // 5. Catat Audit Log & Invalidasi Cache
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: data.published ? "PUBLISH" : "UPDATE",
        entity: "Article",
        entityId: updated.id,
        details: { title: updated.title, published: updated.published },
      });

      await invalidateEntity(CACHE_TAGS.ARTICLES, `/riset/${updated.slug}`);
      await invalidateEntity(CACHE_TAGS.page(updated.slug), "/riset");

      return { ok: true, data: updated };
    } else {
      // 6. Create Baru
      const slug = generateSlug(data.title);
      const created = await prisma.article.create({
        data: {
          title: data.title,
          slug,
          category: data.category,
          summary: data.summary,
          content: cleanContent,
          coverImage: data.coverImage,
          published: data.published,
          authorId: session.userId,
          publishedAt: data.published ? new Date() : null,
          version: 1,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: data.published ? "PUBLISH" : "CREATE",
        entity: "Article",
        entityId: created.id,
        details: { title: created.title, slug: created.slug },
      });

      await invalidateEntity(CACHE_TAGS.ARTICLES, "/riset");

      return { ok: true, data: created };
    }
  } catch (error) {
    console.error("Save article error:", error);
    return { ok: false, message: "Terjadi kesalahan sistem saat menyimpan artikel." };
  }
}

export async function softDeleteArticleAction(id: string) {
  const session = await requirePermission("articles", "delete");

  try {
    const article = await prisma.article.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        published: false,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Article",
      entityId: id,
      details: { title: article.title },
    });

    await invalidateEntity(CACHE_TAGS.ARTICLES, "/riset");
    return { ok: true, message: `Artikel "${article.title}" berhasil dipindahkan ke kotak sampah.` };
  } catch (error) {
    console.error("Delete article error:", error);
    return { ok: false, message: "Gagal menghapus artikel." };
  }
}

