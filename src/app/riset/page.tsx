"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import Link from "next/link";
import { 
  Globe, 
  ExternalLink, 
  Calendar, 
  Clock, 
  ArrowRight, 
  Newspaper,
  BookOpen 
} from "lucide-react";
import { initialAdminRisetBanner, AdminRisetBanner } from "@/lib/adminDataStore";
import { getAllArticles, NewsArticle } from "@/lib/newsData";
import { getMergedArticles } from "@/lib/syncArticles";

export default function RisetPortalPage() {
  const [banner, setBanner] = useState<AdminRisetBanner>(initialAdminRisetBanner);
  const [recentArticles, setRecentArticles] = useState<NewsArticle[]>(() => getAllArticles().slice(0, 4));

  // Load dynamic banner and merged articles from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_riset");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
      } catch {}
    }

    const merged = getMergedArticles(getAllArticles());
    setRecentArticles(merged.slice(0, 4));
  }, []);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Achievement":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Campus Life":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Academic":
        return "bg-sky-50 text-sky-700 border-sky-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER RISET & PUBLIKASI (Full Width 1440px x 480px, Tanpa Border Melengkung, Full Gambar Edge-to-Edge) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/kegiatan.jpg"}
          alt={banner.title}
          fill
          priority
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Executive Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/60 to-[#06172e]/30 flex flex-col justify-center text-white">
          <div className="w-full max-w-[1440px] mx-auto h-full flex flex-col justify-center p-6 sm:p-10 lg:p-12">
            {/* Center Rata Kiri Content: Title & Description */}
            <div className="space-y-3 sm:space-y-4 max-w-4xl text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight drop-shadow-md">
                {banner.title || "Riset & Publikasi"}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-200/95 leading-relaxed drop-shadow-xs max-w-3xl">
                {banner.description || "LPPM Lembaga Penelitian & Pengabdian Universitas Pignatelli Triputra sebagai tempat keilmuan dan riset terapan untuk menjawab Kebutuhan nyata industri modern dan memajukan kesejahteraan masyarakat luas."}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        
        {/* 2. Banner Riset LPPM dengan 2 Tombol Website Portal */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Lembaga Penelitian &amp; Pengabdian (LPPM)</span>
            <h2 className="text-2xl font-black text-[#0b2545]">
              Riset Berdampak Transformatif untuk Bangsa
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              LPPM UPITRA memfasilitasi penelitian berorientasi hilirisasi industri bersama ekosistem Triputra Group serta pengabdian masyarakat berbasis teknologi tepat guna di wilayah Surakarta dan sekitarnya.
            </p>
          </div>

          {/* 2 Tombol Website: lppm.upitra.ac.id & jurnal.upitra.ac.id */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
            <a
              href="https://lppm.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 hover:shadow-blue-600/30 transition-all group/btn"
            >
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-sky-200" />
                <span>Website LPPM UPITRA</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-sky-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://jurnal.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between gap-3 px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#0b2545] border border-slate-200 hover:border-blue-400 font-bold text-xs shadow-xs transition-all group/btn"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <span>Portal Jurnal (OJS) UPITRA</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/btn:text-blue-600 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* 3. RECENT POST: 4 Kotak Berita dalam 1 Baris di Layar Desktop */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5" />
                <span>Recent Post</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                Berita &amp; Publikasi Terkini
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                Kabar terbaru seputar inovasi riset terapan, hilirisasi industri, publikasi ilmiah, serta prestasi civitas akademika UPITRA.
              </p>
            </div>

            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors shrink-0 group"
            >
              <span>Lihat Semua Berita</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Grid 4 Kolom: Dimuat hanya 1 Baris di Layar Desktop (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recentArticles.map((art) => (
              <Link
                key={art.id}
                href={`/berita/${art.slug}`}
                className="group bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-400 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <img
                      src={art.coverImage}
                      alt={art.title}
                      loading="lazy"
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
                      className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border backdrop-blur-md ${getCategoryBadgeClass(
                        art.category
                      )}`}
                    >
                      {art.categoryLabel}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-5 space-y-2.5">
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
                    </div>

                    <h3 className="text-sm font-bold text-[#0b2545] leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {art.title}
                    </h3>

                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {art.summary}
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="px-4 sm:px-5 pb-4 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
