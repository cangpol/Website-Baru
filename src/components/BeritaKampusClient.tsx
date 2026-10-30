"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NewsArticle } from "@/lib/newsData";
import { getMergedArticles } from "@/lib/syncArticles";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BeritaKampusClientProps {
  initialArticles: NewsArticle[];
}

export default function BeritaKampusClient({ initialArticles }: BeritaKampusClientProps) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);

  useEffect(() => {
    setArticles(getMergedArticles(initialArticles));
  }, [initialArticles]);

  const featuredArticle = articles[0];
  const regularArticles = articles.slice(1, 13);

  return (
    <div className="space-y-12">
      {/* Featured News Hero */}
      {featuredArticle && (
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto bg-slate-900 overflow-hidden">
            <img
              src={featuredArticle.coverImage}
              alt={featuredArticle.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold tracking-wide shadow-md">
              Utama
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  <span>{featuredArticle.publishedAt}</span>
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{featuredArticle.readTime}</span>
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] leading-tight hover:text-blue-700 transition-colors">
                <Link href={`/berita/${featuredArticle.slug}`}>
                  {featuredArticle.title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
                {featuredArticle.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                {featuredArticle.categoryLabel}
              </span>

              <Link
                href={`/berita/${featuredArticle.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
              >
                <span>Baca Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Regular Articles Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-black text-[#0b2545]">
            Arsip Berita Terbaru
          </h3>
          <span className="text-xs font-medium text-slate-500">
            Menampilkan {regularArticles.length} Warta Pilihan
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {regularArticles.map((art) => (
            <article
              key={art.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-900 overflow-hidden">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-md bg-blue-950/80 text-[10px] font-bold text-sky-300 border border-blue-800/60">
                    {art.categoryLabel}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>{art.publishedAt}</span>
                  </div>

                  <h4 className="text-sm font-bold text-[#0b2545] leading-snug line-clamp-2 hover:text-blue-600 transition-colors">
                    <Link href={`/berita/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h4>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/berita/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 pt-3 border-t border-slate-100 w-full justify-between"
                >
                  <span>Baca Artikel</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

