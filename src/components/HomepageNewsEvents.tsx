import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { initialAdminArticles, initialAdminCalendarEvents } from "@/lib/adminDataStore";
import { Newspaper, Calendar, ArrowRight, MapPin, Clock } from "lucide-react";

interface ArticleItem {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  category: string;
  coverImage?: string | null;
  publishedAt?: Date | string | null;
  createdAt: Date | string;
}

interface EventItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  location: string;
  startDate: Date | string;
  endDate?: Date | string;
  isOnline?: boolean;
}

export default async function HomepageNewsEvents() {
  let articles: ArticleItem[] = [];
  let events: EventItem[] = [];

  try {
    const dbArticles = await prisma.article.findMany({
      where: { published: true },
      take: 3,
      orderBy: { createdAt: "desc" },
    });

    if (dbArticles && dbArticles.length > 0) {
      articles = dbArticles.map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        category: a.category,
        coverImage: a.coverImage,
        publishedAt: a.publishedAt,
        createdAt: a.createdAt,
      }));
    } else {
      articles = initialAdminArticles.slice(0, 3).map((a) => ({
        id: a.id,
        title: a.title,
        slug: a.slug,
        summary: a.summary,
        category: a.category,
        coverImage: a.coverImage,
        createdAt: a.publishedAt || new Date().toISOString(),
      }));
    }
  } catch (err) {
    articles = initialAdminArticles.slice(0, 3).map((a) => ({
      id: a.id,
      title: a.title,
      slug: a.slug,
      summary: a.summary,
      category: a.category,
      coverImage: a.coverImage,
      createdAt: a.publishedAt || new Date().toISOString(),
    }));
  }

  try {
    const dbEvents = await prisma.event.findMany({
      take: 3,
      orderBy: { startDate: "asc" },
    });

    if (dbEvents && dbEvents.length > 0) {
      events = dbEvents.map((e) => ({
        id: e.id,
        title: e.title,
        slug: e.slug,
        description: e.description,
        location: e.location,
        startDate: e.startDate,
        endDate: e.endDate,
        isOnline: e.isOnline,
      }));
    } else {
      events = initialAdminCalendarEvents.slice(0, 3).map((e) => ({
        id: String(e.id),
        title: e.title || e.name || "Agenda Kampus UPITRA",
        slug: String(e.id),
        description: e.description || e.name || "Kegiatan akademik dan kemahasiswaan di lingkungan UPITRA.",
        location: e.location || "Kampus UPITRA Surakarta",
        startDate: new Date(e.start_date),
        endDate: e.end_date ? new Date(e.end_date) : undefined,
        isOnline: false,
      }));
    }
  } catch (err) {
    events = initialAdminCalendarEvents.slice(0, 3).map((e) => ({
      id: String(e.id),
      title: e.title || e.name || "Agenda Kampus UPITRA",
      slug: String(e.id),
      description: e.description || e.name || "Kegiatan akademik dan kemahasiswaan di lingkungan UPITRA.",
      location: e.location || "Kampus UPITRA Surakarta",
      startDate: new Date(e.start_date),
      endDate: e.end_date ? new Date(e.end_date) : undefined,
      isOnline: false,
    }));
  }

  return (
    <section className="py-20 bg-white border-b border-slate-200 select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px] space-y-16">
        
        {/* ── PART A: BERITA & RISET TERBARU ─────────────────────────────── */}
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 text-[#006bbd] text-xs font-bold uppercase tracking-wider">
                <Newspaper className="w-4 h-4 text-[#006bbd]" />
                <span>Publikasi &amp; Inovasi</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#06172e] tracking-tight">
                Berita &amp; Riset Terkini
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
                Kabar pencapaian civitas akademika, riset terapan inovatif, dan kolaborasi strategis industri di Universitas Pignatelli Triputra.
              </p>
            </div>

            <Link
              href="/riset"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#006bbd] hover:text-[#072b61] transition-colors shrink-0"
            >
              <span>Semua Publikasi</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((item) => {
              const dateStr = item.publishedAt || item.createdAt;
              const formattedDate = new Date(dateStr).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              });

              return (
                <article
                  key={item.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#006bbd]/60 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                      <Image
                        src={item.coverImage || "/images/anugerah.jpg"}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full bg-[#006bbd] text-white text-[11px] font-bold shadow-xs">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Clock className="w-3.5 h-3.5" />
                        <time>{formattedDate}</time>
                      </div>

                      <h3 className="text-lg font-bold text-[#06172e] group-hover:text-[#006bbd] transition-colors duration-200 line-clamp-2 leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                        {item.summary || "Pelajari selengkapnya mengenai perkembangan riset terapan dan kegiatan di UPITRA."}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-1">
                    <Link
                      href={`/riset/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006bbd] group-hover:text-[#072b61] transition-colors"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* ── PART B: EVENT & AGENDA MENDATANG ───────────────────────────── */}
        <div className="space-y-8 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold uppercase tracking-wider">
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Agenda Akademik &amp; Kampus</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
                Event &amp; Agenda Mendatang
              </h2>
            </div>

            <Link
              href="/kemahasiswaan"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#006bbd] hover:text-[#072b61] transition-colors shrink-0"
            >
              <span>Kalender Lengkap</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((evt) => {
              const startDateObj = new Date(evt.startDate);
              const dayStr = isNaN(startDateObj.getTime()) ? "15" : startDateObj.getDate().toString().padStart(2, "0");
              const monthStr = isNaN(startDateObj.getTime())
                ? "NOV"
                : startDateObj.toLocaleDateString("id-ID", { month: "short" }).toUpperCase();
              const yearStr = isNaN(startDateObj.getTime()) ? "2026" : startDateObj.getFullYear().toString();

              return (
                <div
                  key={evt.id}
                  className="bg-slate-50 hover:bg-blue-50/50 rounded-2xl border border-slate-200 p-6 flex gap-5 transition-all duration-300 hover:border-[#006bbd]/50 shadow-xs"
                >
                  {/* Calendar Date Block */}
                  <div className="w-16 h-18 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col items-center justify-center shrink-0">
                    <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider">
                      {monthStr}
                    </span>
                    <span className="text-2xl font-black text-[#06172e] leading-none my-0.5">
                      {dayStr}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {yearStr}
                    </span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-[#006bbd] shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>

                    <h4 className="text-base font-bold text-[#06172e] line-clamp-2 leading-snug">
                      {evt.title}
                    </h4>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
