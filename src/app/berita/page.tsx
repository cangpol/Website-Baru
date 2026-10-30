import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import NewsFilterGrid from "@/components/NewsFilterGrid";
import BeritaFeaturedHero from "@/components/BeritaFeaturedHero";
import { getAllArticles, getUpcomingEvents, NewsArticle } from "@/lib/newsData";
import { 
  Newspaper, 
  Calendar, 
  Clock, 
  ArrowRight, 
  ChevronRight, 
  MapPin, 
  Sparkles,
  BookOpen
} from "lucide-react";

export default function BeritaIndexPage() {
  const articles = getAllArticles();
  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  const events = getUpcomingEvents();

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

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      <Navbar />

      <main className="flex-1">
        
        {/* Breadcrumb Header */}
        <div className="bg-white border-b border-slate-200 py-3.5 px-4 sm:px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Beranda
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-800 font-semibold">
              Seputar Informasi &amp; Berita
            </span>
          </div>
        </div>

        {/* Page Header */}
        <section className="bg-gradient-to-br from-[#072b61] via-[#0b2545] to-[#04162e] text-white py-12 sm:py-16 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <Newspaper className="w-4 h-4 text-sky-400" />
              UPITRA Newsroom &amp; Media
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
              Kabar &amp; Informasi Terkini UPITRA
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Dapatkan berita terbaru seputar penerimaan mahasiswa baru, prestasi mahasiswa, inovasi riset, kegiatan kampus, dan kolaborasi industri Triputra Group.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14 space-y-12">
          
          {/* Featured Article Card (Reactive with Admin Storage) */}
          <BeritaFeaturedHero initialFeatured={featuredArticle} allStaticArticles={articles} />

          {/* Grid of Other Articles & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Articles Grid with Search & Filter (8 cols) */}
            <div className="lg:col-span-8">
              <NewsFilterGrid articles={otherArticles} />
            </div>

            {/* Sidebar Column: Agenda Acara (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-slate-200/90 p-6 space-y-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0b2545]">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Agenda Kampus Mendatang</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {events.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 hover:border-blue-400 transition-colors flex items-start gap-3.5"
                    >
                      {/* Calendar Block */}
                      <div className="w-14 shrink-0 rounded-xl overflow-hidden border border-blue-200 shadow-2xs text-center">
                        <div className="bg-blue-600 text-white text-[10px] font-black py-0.5 tracking-wider uppercase">
                          {ev.month}
                        </div>
                        <div className="bg-white text-[#0b2545] text-lg font-black py-1">
                          {ev.day}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-extrabold uppercase tracking-wider">
                          {ev.category}
                        </span>
                        <h4 className="text-xs font-bold text-[#0b2545] leading-snug hover:text-blue-600">
                          {ev.title}
                        </h4>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sky-600 shrink-0" />
                          <span>{ev.time}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Daftar PMB Online &rarr;
                </a>
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

