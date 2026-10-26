import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import FacultyBentoShowcase from "@/components/FacultyBentoShowcase";
import InstitutionalSynergySection from "@/components/InstitutionalSynergySection";
import AdmissionSection from "@/components/AdmissionSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getAllArticles, staticEvents, NewsArticle, CampusEvent } from "@/lib/newsData";
import { Newspaper, Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  let articles: NewsArticle[] = [];
  let events: CampusEvent[] = [];

  try {
    articles = (await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    })) as unknown as NewsArticle[];

    events = (await prisma.event.findMany({
      orderBy: { startDate: "asc" },
      take: 3,
    })) as unknown as CampusEvent[];
  } catch {
    console.warn("Database offline, using UPITRA static defaults");
  }

  const displayArticles = articles && articles.length > 0 ? articles : getAllArticles().slice(0, 3);
  const displayEvents = events && events.length > 0 ? events : staticEvents.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative selection:bg-blue-600 selection:text-white">
      {/* 1. Header & Megamenu */}
      <Navbar />

      <main className="flex-1">
        {/* ACT 1: The Grand Gateway (Cinematic Hero + Fast-Track Dock + Prestige Metrics) */}
        <HeroSlider />

        {/* ACT 2: Academic Excellence (Showcase 4 Fakultas & Gelar Resmi) */}
        <FacultyBentoShowcase />

        {/* ACT 3: Institutional Dignity & The Triputra Advantage (Prakata Rektorat + Mitra Korporat) */}
        <InstitutionalSynergySection />

        {/* ACT 4: Jalur PMB & Beasiswa Emas (4 Jalur Masuk Ringkas & CTA Admisi) */}
        <AdmissionSection />

        {/* ACT 5: Warta Kampus & Agenda Terkini (Campus Dispatch & Calendar) */}
        <section className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
            
            {/* Header Seksi */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Newspaper className="w-3.5 h-3.5 text-blue-600" />
                  <span>Seputar Informasi &amp; Agenda</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
                  WARTA KAMPUS &amp; AGENDA TERKINI
                </h2>
              </div>
              <Link
                href="/berita"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0 group"
              >
                <span>Lihat Seluruh Warta Kampus</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Grid Berita (8 cols) & Agenda (4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Berita Terbaru (8 cols, 3 Articles) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-5">
                {displayArticles.map((art) => (
                  <article
                    key={art.id}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-blue-600/90 text-white text-[9px] font-bold backdrop-blur-sm">
                        {art.categoryLabel || art.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            {art.publishedAt ? (typeof art.publishedAt === "string" ? art.publishedAt : "Terbaru") : "Terbaru"}
                          </span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>

                      <Link
                        href={`/berita/${art.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors pt-2"
                      >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Agenda Kampus Mendatang (4 cols) */}
              <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0b2545]">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Agenda Kampus Mendatang</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {displayEvents.map((ev: CampusEvent) => (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/40 transition-colors flex items-start gap-3"
                    >
                      {/* Calendar Date Block */}
                      <div className="w-12 shrink-0 rounded-xl overflow-hidden border border-blue-200 text-center bg-white shadow-2xs">
                        <div className="bg-blue-600 text-white text-[9px] font-black py-0.5 tracking-wider uppercase">
                          {ev.month || "NOV"}
                        </div>
                        <div className="text-[#0b2545] text-base font-black py-0.5">
                          {ev.day || "20"}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-extrabold uppercase">
                          {ev.category || "AGENDA RESMI"}
                        </span>
                        <h4 className="text-xs font-bold text-[#0b2545] leading-snug hover:text-blue-600 line-clamp-2">
                          {ev.title}
                        </h4>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{ev.time || "09.00 - 15.00 WIB"}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
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
                  className="block text-center py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Daftar PMB Online &rarr;
                </a>
              </div>

            </div>

          </div>
        </section>
      </main>

      {/* Signature Directory Footer */}
      <Footer />

      {/* Floating WhatsApp Contact Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
