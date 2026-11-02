"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

const articleInputSchema = z.object({
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

export async function getAllAdminArticles() {
  await requirePermission("articles", "read");

  try {
    const articles = await prisma.article.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
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
      summary: a.summary || "",
      content: a.content,
      category: a.category,
      coverImage: a.coverImage || "/images/kegiatan.jpg",
      authorName: a.author.name,
      published: a.published,
      publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
      createdAt: a.createdAt.toISOString(),
      version: a.version,
    }));
  } catch (err) {
    console.error("Error fetching all admin articles:", err);
    return [];
  }
}

export async function saveArticleAction(
  id: string | null,
  rawInput: ArticleInput
) {
  const session = await requirePermission("articles", id ? "update" : "create");

  const validated = articleInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data artikel gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;
  const cleanContent = sanitizeRichText(data.content);

  try {
    if (id) {
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

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: data.published ? "PUBLISH" : "UPDATE",
        entity: "Article",
        entityId: updated.id,
        details: JSON.stringify({ title: updated.title, published: updated.published }),
      });

      await invalidateEntity(CACHE_TAGS.ARTICLES, `/riset/${updated.slug}`);
      await invalidateEntity(CACHE_TAGS.page(updated.slug), "/riset");

      return { ok: true, data: updated, message: "Artikel berhasil diperbarui." };
    } else {
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
        details: JSON.stringify({ title: created.title, slug: created.slug }),
      });

      await invalidateEntity(CACHE_TAGS.ARTICLES, "/riset");
      return { ok: true, data: created, message: "Artikel baru berhasil dibuat." };
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
      details: JSON.stringify({ title: article.title }),
    });

    await invalidateEntity(CACHE_TAGS.ARTICLES, "/riset");
    return { ok: true, message: `Artikel "${article.title}" berhasil dipindahkan ke kotak sampah.` };
  } catch (error) {
    console.error("Delete article error:", error);
    return { ok: false, message: "Gagal menghapus artikel." };
  }
}

// ── Publikasi Jurnal & Riset (SiteSetting / Structured Table) ──────────────
export interface RisetPublicationItem {
  id: string;
  title: string;
  researcher: string;
  faculty: string;
  journalName: string;
  indexedIn: string;
  year: number;
  doiOrUrl: string;
  abstractText: string;
}

const DEFAULT_RIS_PUBS: RisetPublicationItem[] = [
  {
    id: "rst-01",
    title: "Penerapan Deep Learning Convolutional Neural Network untuk Klasifikasi Mutu Karet Alam Industri",
    researcher: "Riko Handoko, S.Kom., M.T. & Tim FST UPITRA",
    faculty: "Fakultas Sains & Teknologi",
    journalName: "IEEE Transactions on Industrial Informatics",
    indexedIn: "Scopus",
    year: 2026,
    doiOrUrl: "https://doi.org/10.1109/TII.2026.01428",
    abstractText: "Riset terapan kolaborasi bersama PT Kirana Megatara Tbk untuk otomatisasi inspeksi kualitas getah karet menggunakan computer vision.",
  },
  {
    id: "rst-02",
    title: "Analisis Pengaruh Penerapan Green Supply Chain Management terhadap Kinerja Finansial Agribisnis",
    researcher: "Citra Lestari, S.Psi, M.M. & Dosen FEB",
    faculty: "Fakultas Ekonomi & Bisnis",
    journalName: "Jurnal Riset Manajemen & Bisnis Terapan",
    indexedIn: "SINTA 2",
    year: 2025,
    doiOrUrl: "https://doi.org/10.21009/JRMBT.2025.0210",
    abstractText: "Studi kasus empiris implementasi rantai pasok berkelanjutan pada perkebunan kelapa sawit PT Triputra Agro Persada Tbk.",
  },
];

export async function getRisetPublications(): Promise<RisetPublicationItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "admin_riset_publications" },
    });
    if (!setting || !Array.isArray(setting.value)) {
      return DEFAULT_RIS_PUBS;
    }
    return (setting.value as unknown) as RisetPublicationItem[];
  } catch {
    return DEFAULT_RIS_PUBS;
  }
}

export async function saveRisetPublicationsAction(items: RisetPublicationItem[]) {
  const session = await requirePermission("articles", "update");

  try {
    await prisma.siteSetting.upsert({
      where: { key: "admin_riset_publications" },
      create: {
        key: "admin_riset_publications",
        value: items as unknown as Prisma.InputJsonValue,
        description: "Daftar publikasi jurnal dan riset terapan UPITRA",
      },
      update: {
        value: items as unknown as Prisma.InputJsonValue,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "admin_riset_publications",
      details: JSON.stringify({ total: items.length }),
    });

    await invalidateEntity(CACHE_TAGS.ARTICLES, "/riset");
    return { ok: true, message: "Publikasi riset berhasil disimpan ke database." };
  } catch (err) {
    console.error("Error saving riset publications:", err);
    return { ok: false, message: "Gagal menyimpan publikasi riset." };
  }
}
