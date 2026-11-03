"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { sanitizeRichText } from "@/lib/sanitize";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { deleteUploadedFile } from "@/server/storage/cleanup";

const articleInputSchema = z.object({
  title: z.string().min(5, "Judul artikel minimal 5 karakter").max(200),
  slug: z.string().min(2, "Slug minimal 2 karakter").optional().nullable().or(z.literal("")),
  category: z.string().min(2, "Kategori wajib dipilih"),
  summary: z.string().max(1000, "Ringkasan maksimal 1000 karakter").optional().nullable(),
  content: z.string().min(10, "Isi artikel minimal 10 karakter"),
  coverImage: z.string().optional().nullable(),
  attachmentUrl: z.string().optional().nullable(),
  attachmentName: z.string().optional().nullable(),
  attachmentSize: z.string().optional().nullable(),
  published: z.boolean().default(false),
  publishedAt: z.string().optional().nullable(),
  version: z.number().int().default(1),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;

// Helper untuk mengekstrak metadata lampiran dari ringkasan/summary artikel
function extractArticleMetadata(rawSummary: string | null) {
  if (!rawSummary) {
    return {
      cleanSummary: "",
      attachmentUrl: null,
      attachmentName: null,
      attachmentSize: null,
    };
  }
  const match = rawSummary.match(/^<!--meta:(\{[\s\S]*?\})-->/);
  if (match) {
    try {
      const meta = JSON.parse(match[1]);
      const cleanSummary = rawSummary.replace(/^<!--meta:(\{[\s\S]*?\})-->\s*/, "");
      return {
        cleanSummary,
        attachmentUrl: meta.attachmentUrl || null,
        attachmentName: meta.attachmentName || null,
        attachmentSize: meta.attachmentSize || null,
      };
    } catch {
      return {
        cleanSummary: rawSummary,
        attachmentUrl: null,
        attachmentName: null,
        attachmentSize: null,
      };
    }
  }
  return {
    cleanSummary: rawSummary,
    attachmentUrl: null,
    attachmentName: null,
    attachmentSize: null,
  };
}

// Helper untuk mengemas metadata lampiran ke dalam summary artikel
function packArticleMetadata(
  cleanSummary: string,
  attachment?: { url?: string | null; name?: string | null; size?: string | null }
) {
  const meta: Record<string, string> = {};
  if (attachment?.url) meta.attachmentUrl = attachment.url;
  if (attachment?.name) meta.attachmentName = attachment.name;
  if (attachment?.size) meta.attachmentSize = attachment.size;
  if (Object.keys(meta).length === 0) return cleanSummary;
  return `<!--meta:${JSON.stringify(meta)}-->\n${cleanSummary}`;
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

    return articles.map((a) => {
      const { cleanSummary, attachmentUrl, attachmentName, attachmentSize } = extractArticleMetadata(a.summary);
      return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        summary: cleanSummary,
        content: a.content,
        category: a.category,
        coverImage: a.coverImage || "/images/kegiatan.jpg",
        attachmentUrl,
        attachmentName,
        attachmentSize,
        authorName: a.author.name,
        publishedAt: a.publishedAt ? a.publishedAt.toISOString() : a.createdAt.toISOString(),
        createdAt: a.createdAt.toISOString(),
        version: a.version,
      };
    });
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

    const { cleanSummary, attachmentUrl, attachmentName, attachmentSize } = extractArticleMetadata(article.summary);

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      summary: cleanSummary,
      content: article.content,
      category: article.category,
      coverImage: article.coverImage || "/images/kegiatan.jpg",
      attachmentUrl,
      attachmentName,
      attachmentSize,
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

    return articles.map((a) => {
      const { cleanSummary, attachmentUrl, attachmentName, attachmentSize } = extractArticleMetadata(a.summary);
      return {
        id: a.id,
        title: a.title,
        slug: a.slug,
        summary: cleanSummary,
        content: a.content,
        category: a.category,
        coverImage: a.coverImage || "/images/kegiatan.jpg",
        attachmentUrl,
        attachmentName,
        attachmentSize,
        authorName: a.author.name,
        published: a.published,
        publishedAt: a.publishedAt ? a.publishedAt.toISOString() : null,
        createdAt: a.createdAt.toISOString(),
        version: a.version,
      };
    });
  } catch (err) {
    console.error("Error fetching all admin articles:", err);
    return [];
  }
}

export async function saveArticleAction(id: string | null, rawInput: ArticleInput) {
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
  const packedSummary = packArticleMetadata(data.summary || "", {
    url: data.attachmentUrl,
    name: data.attachmentName,
    size: data.attachmentSize,
  });

  try {
    let finalSlug: string;

    if (data.slug && data.slug.trim()) {
      const cleaned = data.slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

      // Cek keunikan slug pada artikel lain
      const existingSlug = await prisma.article.findFirst({
        where: {
          slug: cleaned,
          deletedAt: null,
          NOT: id ? { id } : undefined,
        },
      });

      if (existingSlug) {
        return {
          ok: false,
          message: `Slug "${cleaned}" sudah digunakan oleh artikel lain. Silakan pilih slug berbeda.`,
        };
      }
      finalSlug = cleaned;
    } else {
      finalSlug = generateSlug(data.title);
    }

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

      // Pembersihan berkas yatim (orphan file cleanup) jika cover diganti
      if (existing.coverImage && data.coverImage && existing.coverImage !== data.coverImage) {
        await deleteUploadedFile(existing.coverImage);
      }

      // Pembersihan berkas yatim jika lampiran diganti
      const existingMeta = extractArticleMetadata(existing.summary);
      if (existingMeta.attachmentUrl && data.attachmentUrl && existingMeta.attachmentUrl !== data.attachmentUrl) {
        await deleteUploadedFile(existingMeta.attachmentUrl);
      } else if (existingMeta.attachmentUrl && !data.attachmentUrl) {
        await deleteUploadedFile(existingMeta.attachmentUrl);
      }

      const updated = await prisma.article.update({
        where: { id },
        data: {
          title: data.title,
          slug: finalSlug,
          category: data.category,
          summary: packedSummary,
          content: cleanContent,
          coverImage: data.coverImage,
          published: data.published,
          publishedAt: data.published
            ? data.publishedAt
              ? new Date(data.publishedAt)
              : existing.publishedAt || new Date()
            : null,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: data.published ? "PUBLISH" : "UPDATE",
        entity: "Article",
        entityId: updated.id,
        details: JSON.stringify({ title: updated.title, published: updated.published, slug: updated.slug }),
      });

      await invalidateEntity(CACHE_TAGS.ARTICLES, `/riset/${updated.slug}`);
      await invalidateEntity(CACHE_TAGS.page(updated.slug), "/riset");

      return { ok: true, data: updated, message: "Artikel berhasil diperbarui." };
    } else {
      const created = await prisma.article.create({
        data: {
          title: data.title,
          slug: finalSlug,
          category: data.category,
          summary: packedSummary,
          content: cleanContent,
          coverImage: data.coverImage,
          published: data.published,
          authorId: session.userId,
          publishedAt: data.published
            ? data.publishedAt
              ? new Date(data.publishedAt)
              : new Date()
            : null,
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
    const existing = await prisma.article.findUnique({ where: { id } });
    if (!existing) {
      return { ok: false, message: "Artikel tidak ditemukan." };
    }

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

// ── Pengaturan Portal Eksternal LPPM & Jurnal ──────────────────────────────
export interface RisetPortalsConfig {
  lppmUrl: string;
  jurnalUrl: string;
  description: string;
}

const DEFAULT_RIS_PORTALS: RisetPortalsConfig = {
  lppmUrl: "https://lppm.upitra.ac.id",
  jurnalUrl: "https://jurnal.upitra.ac.id",
  description: "LPPM UPITRA memfasilitasi penelitian berorientasi hilirisasi industri bersama ekosistem Triputra Group serta pengabdian masyarakat berbasis teknologi tepat guna di wilayah Surakarta dan sekitarnya.",
};

export async function getRisetPortals(): Promise<RisetPortalsConfig> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "riset_portals_config" },
    });
    if (!setting || typeof setting.value !== "object") {
      return DEFAULT_RIS_PORTALS;
    }
    return setting.value as unknown as RisetPortalsConfig;
  } catch {
    return DEFAULT_RIS_PORTALS;
  }
}

export async function saveRisetPortalsAction(data: RisetPortalsConfig) {
  const session = await requirePermission("articles", "update");

  try {
    await prisma.siteSetting.upsert({
      where: { key: "riset_portals_config" },
      create: {
        key: "riset_portals_config",
        value: data as unknown as Prisma.InputJsonValue,
        description: "Pengaturan portal Website LPPM dan Jurnal Riset",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "riset_portals_config",
      details: JSON.stringify({ lppmUrl: data.lppmUrl }),
    });

    await invalidateEntity(CACHE_TAGS.ARTICLES, "/riset");
    return { ok: true, message: "Pengaturan portal riset berhasil disimpan." };
  } catch (err) {
    console.error("Error saving riset portals:", err);
    return { ok: false, message: "Gagal menyimpan portal riset." };
  }
}
