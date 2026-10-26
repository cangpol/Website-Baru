import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { 
  getArticleBySlug, 
  getAllArticles, 
  staticArticles,
  getUpcomingEvents,
  NewsArticle 
} from "@/lib/newsData";
import { 
  Calendar, 
  Clock, 
  User, 
  Share2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Newspaper, 
  MapPin, 
  ChevronRight,
  Sparkles,
  MessageCircle,
  GraduationCap,
  Eye
} from "lucide-react";

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

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const sameCategory = allArticles.filter((a) => a.slug !== article.slug && a.category === article.category);
  const otherCategory = allArticles.filter((a) => a.slug !== article.slug && a.category !== article.category);
  const relatedArticles = [...sameCategory, ...otherCategory].slice(0, 4);
  const upcomingEvents = getUpcomingEvents().slice(0, 2);

  // Category badge styling helper
  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Achievement":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Campus Life":
        return "bg-indigo-100 text-indigo-800 border-indigo-300";
      default:
        return "bg-blue-100 text-blue-800 border-blue-300";
    }
  };

  const shareText = encodeURIComponent(`${article.title} - Baca selengkapnya di UPITRA Official`);
  const shareUrl = encodeURIComponent(`https://www.upitra.ac.id/berita/${article.slug}`);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Breadcrumb Header Strip */}
        <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <Link href="/berita" className="hover:text-blue-600 transition-colors">
              Seputar Berita &amp; Informasi
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-800 font-semibold truncate max-w-md">
              {article.title}
            </span>
          </div>
        </div>

        {/* Article Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Main Article Column (8 cols) */}
            <article className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-8">
              
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getCategoryBadgeClass(article.category)}`}>
                    {article.categoryLabel}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    {article.publishedAt}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    {article.readTime}
                  </span>
                  {article.viewsCount ? (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        {article.viewsCount.toLocaleString("id-ID")} pembaca
                      </span>
                    </>
                  ) : null}
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight leading-tight">
                  {article.title}
                </h1>

                {/* Author Info Bar */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-slate-900">
                        {article.author.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {article.author.role}
                      </div>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">Bagikan:</span>
                    <a
                      href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      title="Bagikan ke WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                    <a
                      href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                      title="Bagikan ke Twitter / X"
                    >
                      <Share2 className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Cover Image */}
              <div className="space-y-2">
                <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-200 shadow-xs bg-slate-100">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {article.imageCaption && (
                  <p className="text-xs text-slate-500 italic text-center px-4">
                    Foto: {article.imageCaption}
                  </p>
                )}
              </div>

              {/* Key Takeaways Box */}
              {article.keyTakeaways && article.keyTakeaways.length > 0 && (
                <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 to-sky-50/50 border border-blue-200/90 p-5 sm:p-6 space-y-3">
                  <div className="flex items-center gap-2 text-sm font-black text-[#0b2545]">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>Poin Penting Berita:</span>
                  </div>
                  <ul className="space-y-2">
                    {article.keyTakeaways.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Article Content */}
              {article.htmlContent ? (
                <div
                  className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed [&>p]:mb-4 [&>p]:leading-relaxed [&>p]:text-justify [&>p:first-child]:font-medium [&>p:first-child]:text-slate-900 [&>p:first-child]:text-base sm:[&>p:first-child]:text-lg [&_img]:rounded-2xl [&_img]:shadow-md [&_img]:my-6 [&_img]:mx-auto [&_img]:w-full [&_img]:max-w-2xl [&_img]:object-cover [&_iframe]:w-full [&_iframe]:aspect-video [&_iframe]:rounded-2xl [&_iframe]:my-6 [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_td]:p-2"
                  dangerouslySetInnerHTML={{ __html: article.htmlContent }}
                />
              ) : (
                <div className="space-y-5 text-sm sm:text-base text-slate-700 leading-relaxed">
                  {article.content.map((paragraph, idx) => (
                    <p key={idx} className={idx === 0 ? "font-medium text-slate-900 text-base sm:text-lg leading-relaxed" : ""}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {/* Pull Quote */}
              {article.quote && (
                <div className="p-6 rounded-2xl bg-slate-50 border-l-4 border-blue-600 space-y-2">
                  <p className="text-sm sm:text-base font-semibold text-slate-800 italic leading-relaxed">
                    &ldquo;{article.quote.text}&rdquo;
                  </p>
                  <div className="text-xs font-bold text-[#0b2545] pt-1">
                    — {article.quote.author}
                    <span className="text-slate-500 font-normal">, {article.quote.title}</span>
                  </div>
                </div>
              )}

              {/* Article Bottom Actions */}
              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link
                  href="/berita"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Seluruh Berita</span>
                </Link>

                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-105"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Daftar PMB UPITRA 2026</span>
                </a>
              </div>

            </article>

            {/* Sidebar Column (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* 1. Admission CTA Widget */}
              <div className="bg-gradient-to-br from-[#072b61] via-[#0b2545] to-[#04162e] rounded-3xl p-6 text-white space-y-4 shadow-md">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-sky-200 text-[10px] font-bold tracking-wider uppercase">
                  Konsultasi PMB 2026
                </div>
                <h3 className="text-lg font-black tracking-tight leading-snug">
                  Tertarik Kuliah di UPITRA?
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Konsultasikan minat studimu di 4 fakultas unggulan dan dapatkan beasiswa prestasi Triputra hingga 100%.
                </p>
                <div className="space-y-2 pt-2">
                  <a
                    href="https://pmb.upitra.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <span>Daftar PMB Online</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/628112658884?text=Halo%20Admisi%20UPITRA,%20saya%20tertarik%20dengan%20info%20pendaftaran"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Tim Admisi</span>
                  </a>
                </div>
              </div>

              {/* 2. Upcoming Events Widget */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0b2545]">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Agenda Kampus</span>
                  </div>
                  <Link href="/berita" className="text-[11px] font-bold text-blue-600 hover:underline">
                    Semua &rarr;
                  </Link>
                </div>

                <div className="space-y-3">
                  {upcomingEvents.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-colors space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-700 text-[10px] font-extrabold">
                          {ev.day} {ev.month}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {ev.time}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug hover:text-blue-600">
                        {ev.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Related Articles */}
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-sm font-bold text-[#0b2545] pb-3 border-b border-slate-100">
                  <Newspaper className="w-4 h-4 text-blue-600" />
                  <span>Berita Terkait Lainnya</span>
                </div>

                <div className="space-y-3.5">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/berita/${rel.slug}`}
                      className="group flex items-start gap-3 p-2 rounded-xl hover:bg-blue-50/60 transition-colors cursor-pointer"
                    >
                      <img
                        src={rel.coverImage}
                        alt={rel.title}
                        className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200 group-hover:scale-105 transition-transform"
                      />
                      <div className="min-w-0">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-wider">
                          {rel.category}
                        </span>
                        <h5 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 line-clamp-2 leading-snug mt-0.5">
                          {rel.title}
                        </h5>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {rel.publishedAt}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>

          </div>
        </div>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

