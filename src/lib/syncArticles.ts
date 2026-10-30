import { NewsArticle } from "@/lib/newsData";

export interface AdminStoredArticle {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  summary: string;
  content: string;
  coverImage?: string;
  author?: string;
  published?: boolean;
  publishedAt?: string;
  viewCount?: number;
}

export function mapStoredArticleToNewsArticle(item: AdminStoredArticle): NewsArticle {
  const cat = (item.category || "").toLowerCase();
  let category: NewsArticle["category"] = "News";
  if (cat.includes("prestasi")) {
    category = "Achievement";
  } else if (cat.includes("kemahasiswaan") || cat.includes("kegiatan") || cat.includes("festival")) {
    category = "Campus Life";
  } else if (cat.includes("akademik") || cat.includes("riset") || cat.includes("inovasi")) {
    category = "Academic";
  }

  return {
    id: String(item.id),
    slug: item.slug || `berita-${item.id}`,
    title: item.title || "Berita UPITRA",
    summary: item.summary || item.title || "",
    content: [item.summary || item.title || ""],
    htmlContent: item.content || `<p>${item.summary || item.title || ""}</p>`,
    category,
    categoryLabel: item.category || "Berita Kampus",
    coverImage: item.coverImage || "/images/ar-vr.jpg",
    publishedDate: new Date().toISOString().split("T")[0],
    publishedAt: item.publishedAt || "Baru saja",
    readTime: "3 mnt baca",
    viewsCount: item.viewCount || 1,
    author: {
      name: item.author || "Humas UPITRA",
      role: "Biro Komunikasi & Publikasi Kampus",
      avatar: "/images/logo.png",
    },
  };
}

export function getMergedArticles(staticArticles: NewsArticle[]): NewsArticle[] {
  if (typeof window === "undefined") {
    return staticArticles;
  }

  try {
    const saved = localStorage.getItem("upitra_admin_articles");
    if (!saved) return staticArticles;

    const parsed: AdminStoredArticle[] = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length === 0) return staticArticles;

    // Filter published articles
    const validAdminArticles = parsed
      .filter((item) => item.published !== false && (item.title?.trim() || item.content?.trim()))
      .map(mapStoredArticleToNewsArticle);

    // Merge: Admin articles take precedence. If matching slug exists in static, admin replaces it.
    const adminSlugs = new Set(validAdminArticles.map((a) => a.slug));
    const remainingStatic = staticArticles.filter((a) => !adminSlugs.has(a.slug));

    return [...validAdminArticles, ...remainingStatic];
  } catch {
    return staticArticles;
  }
}

export function getMergedArticleBySlug(slug: string, fallbackArticle?: NewsArticle): NewsArticle | undefined {
  if (typeof window === "undefined") {
    return fallbackArticle;
  }

  try {
    const saved = localStorage.getItem("upitra_admin_articles");
    if (saved) {
      const parsed: AdminStoredArticle[] = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        const found = parsed.find(
          (item) => item.slug === slug || String(item.id) === slug || `berita-${item.id}` === slug
        );
        if (found) {
          return mapStoredArticleToNewsArticle(found);
        }
      }
    }
  } catch {}

  return fallbackArticle;
}

