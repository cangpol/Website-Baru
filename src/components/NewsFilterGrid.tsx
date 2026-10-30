"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { NewsArticle } from "@/lib/newsData";
import { getMergedArticles } from "@/lib/syncArticles";
import { BookOpen, Calendar, Clock, ArrowRight, Search, Filter, ArrowUpDown, Eye } from "lucide-react";

interface NewsFilterGridProps {
  articles: NewsArticle[];
}

export default function NewsFilterGrid({ articles }: NewsFilterGridProps) {
  const [syncedArticles, setSyncedArticles] = useState<NewsArticle[]>(articles);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "oldest">("latest");

  useEffect(() => {
    setSyncedArticles(getMergedArticles(articles));
  }, [articles]);

  const categories = [
    { key: "all", label: "Semua" },
    { key: "Achievement", label: "Prestasi" },
    { key: "Academic", label: "Akademik & Riset" },
    { key: "Campus Life", label: "Kemahasiswaan & Event" },
    { key: "News", label: "Kerjasama Industri" },
  ];

  const filteredArticles = syncedArticles.filter((art) => {
    const matchesCategory =
      selectedCategory === "all" || art.category === selectedCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Explicit sort by selected option (default: latest publish date)
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (sortBy === "popular") {
      return (b.viewsCount || 0) - (a.viewsCount || 0);
    }
    if (sortBy === "oldest") {
      return new Date(a.publishedDate).getTime() - new Date(b.publishedDate).getTime();
    }
    // Default: latest (b.publishedDate - a.publishedDate)
    return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
  });

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
    <div className="space-y-6">
      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari berita, prestasi, atau kegiatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Sort Selector Dropdown */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "latest" | "popular" | "oldest")}
                aria-label="Urutkan berita"
                className="pl-8 pr-7 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-slate-300 focus:outline-hidden focus:border-blue-500 cursor-pointer appearance-none"
              >
                <option value="latest">Tanggal Terakhir (Terbaru)</option>
                <option value="popular">Paling Populer (Views)</option>
                <option value="oldest">Terlama (Arsip)</option>
              </select>
              <span className="absolute right-2.5 pointer-events-none text-slate-400 text-[10px]">▼</span>
            </div>
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:inline" />
          {categories.map((cat) => {
            const count =
              cat.key === "all"
                ? articles.length
                : articles.filter((a) => a.category === cat.key).length;
            return (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`cursor-pointer px-3 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.key
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Header Result Count & Sort Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <div className="flex items-center gap-2 font-bold text-[#0b2545] text-sm">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span>Katalog Berita ({sortedArticles.length} artikel)</span>
        </div>
        <div className="text-[11px] text-slate-500">
          Urutan: <strong className="text-slate-800">{sortBy === "latest" ? "Tanggal Terakhir Publish" : sortBy === "popular" ? "Terpopuler" : "Terlama"}</strong>
        </div>
      </div>

      {/* Grid of Articles */}
      {sortedArticles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedArticles.map((art) => (
            <article
              key={art.id}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                <img
                  src={art.coverImage}
                  alt={art.title}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.dataset.triedFallback) {
                      target.dataset.triedFallback = "true";
                      target.src = "/images/gedung-upitra.jpg";
                    }
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-3 left-3 px-3 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${getCategoryBadgeClass(
                    art.category
                  )}`}
                >
                  {art.categoryLabel}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1 font-medium text-slate-600">
                      <Calendar className="w-3 h-3 text-blue-600" />
                      {art.publishedAt}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-sky-600" />
                      {art.readTime}
                    </span>
                    {art.viewsCount ? (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Eye className="w-3 h-3 text-emerald-600" />
                          {art.viewsCount}
                        </span>
                      </>
                    ) : null}
                  </div>
                  <h3 className="text-sm font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                    <Link href={`/riset/${art.slug}`}>
                      {art.title}
                    </Link>
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <Link
                  href={`/riset/${art.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors pt-2"
                >
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="text-sm font-bold text-slate-700">Tidak ada artikel yang cocok</h4>
          <p className="text-xs text-slate-500">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
        </div>
      )}
    </div>
  );
}
