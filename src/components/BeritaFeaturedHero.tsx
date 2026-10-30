"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NewsArticle } from "@/lib/newsData";
import { getMergedArticles } from "@/lib/syncArticles";
import { Calendar, Clock, ArrowRight } from "lucide-react";

interface BeritaFeaturedHeroProps {
  initialFeatured?: NewsArticle;
  allStaticArticles: NewsArticle[];
}

export default function BeritaFeaturedHero({ initialFeatured, allStaticArticles }: BeritaFeaturedHeroProps) {
  const [featured, setFeatured] = useState<NewsArticle | undefined>(initialFeatured);

  useEffect(() => {
    const merged = getMergedArticles(allStaticArticles);
    if (merged.length > 0) {
      setFeatured(merged[0]);
    }
  }, [allStaticArticles]);

  if (!featured) return null;

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
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-slate-100">
          <img
            src={featured.coverImage}
            alt={featured.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
          <span className={`absolute top-4 left-4 px-3.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getCategoryBadgeClass(featured.category)}`}>
            {featured.categoryLabel}
          </span>
        </div>
        <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {featured.publishedAt}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                {featured.readTime}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-[#0b2545] hover:text-blue-600 transition-colors leading-snug">
              <Link href={`/berita/${featured.slug}`}>
                {featured.title}
              </Link>
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
              {featured.summary}
            </p>
          </div>

          <Link
            href={`/berita/${featured.slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all hover:scale-105 w-fit"
          >
            <span>Baca Selengkapnya</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

