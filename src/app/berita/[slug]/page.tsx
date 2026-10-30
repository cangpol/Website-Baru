import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BeritaDetailClientView from "@/components/BeritaDetailClientView";
import { 
  getArticleBySlug, 
  getAllArticles, 
  staticArticles,
  getUpcomingEvents,
  NewsArticle 
} from "@/lib/newsData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return staticArticles.map((art) => ({
    slug: art.slug,
  }));
}

export default async function BeritaDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  const allArticles = getAllArticles();
  const sameCategory = article ? allArticles.filter((a) => a.slug !== article.slug && a.category === article.category) : [];
  const otherCategory = article ? allArticles.filter((a) => a.slug !== article.slug && a.category !== article.category) : allArticles;
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
