import { notFound } from "next/navigation";
import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BeritaDetailClientView from "@/components/BeritaDetailClientView";
import { 
  getArticleBySlug as getStaticArticleBySlug, 
  getAllArticles, 
  staticArticles,
  getUpcomingEvents,
  NewsArticle
} from "@/lib/newsData";
import { getArticleBySlug as getDbArticleBySlug } from "@/server/articles";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const dbArticle = await getDbArticleBySlug(slug);
  const staticArticle = getStaticArticleBySlug(slug);
  const article = dbArticle || staticArticle;

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan - UPITRA",
    };
  }

  return {
    title: `${article.title} - UPITRA Surakarta`,
    description: article.summary || ("excerpt" in article ? (article as any).excerpt : article.title),
    openGraph: {
      title: article.title,
      description: article.summary || ("excerpt" in article ? (article as any).excerpt : article.title),
      images: [article.coverImage || ("imageUrl" in article ? (article as any).imageUrl : "/images/kegiatan.jpg")],
    },
  };
}

export function generateStaticParams() {
  return staticArticles
    .filter((art) => art.slug !== "pusat-penelitian-dan-publikasi")
    .map((art) => ({
      slug: art.slug,
    }));
}

export default async function RisetBeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // 1. Coba baca dari database Prisma
  const dbArticle = await getDbArticleBySlug(slug);
  const staticArticle = getStaticArticleBySlug(slug);

  let article: NewsArticle | undefined;

  if (dbArticle) {
    article = {
      id: dbArticle.id,
      slug: dbArticle.slug,
      title: dbArticle.title,
      summary: dbArticle.summary || dbArticle.title,
      content: [dbArticle.content],
      htmlContent: dbArticle.content,
      category: "News",
      categoryLabel: dbArticle.category || "Berita Kampus",
      coverImage: dbArticle.coverImage || "/images/kegiatan.jpg",
      publishedDate: dbArticle.publishedAt?.split("T")[0] || new Date().toISOString().split("T")[0],
      publishedAt: dbArticle.publishedAt || "Hari ini",
      readTime: "3 menit baca",
      author: {
        name: dbArticle.authorName || "Humas UPITRA",
        role: "Redaksi Kampus",
        avatar: "/images/logo.png",
      },
    };
  } else if (staticArticle) {
    article = staticArticle;
  }

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const sameCategory = allArticles.filter((a) => a.slug !== article.slug && a.category === article.category);
  const otherCategory = allArticles.filter((a) => a.slug !== article.slug && a.category !== article.category);
  const relatedArticles = [...sameCategory, ...otherCategory].slice(0, 4);
  const upcomingEvents = getUpcomingEvents().slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      <Navbar />

      <BeritaDetailClientView
        initialArticle={article}
        slug={slug}
        initialRelatedArticles={relatedArticles}
        upcomingEvents={upcomingEvents}
      />

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
