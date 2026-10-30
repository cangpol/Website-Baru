"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  CalendarDays, 
  Newspaper, 
  Microscope, 
  ShieldCheck, 
  Plus, 
  ArrowRight, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Layers,
  Sparkles,
  RefreshCw,
  Eye,
  Tag
} from "lucide-react";
import { 
  initialAdminCalendarEvents, 
  AdminCalendarEvent, 
  initialAdminArticles, 
  AdminArticleItem, 
  initialAdminRisetList, 
  AdminRisetSection 
} from "@/lib/adminDataStore";

export default function AdminDashboardPage() {
  const [events, setEvents] = useState<AdminCalendarEvent[]>([]);
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
  const [risetItems, setRisetItems] = useState<AdminRisetSection[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>("");

  // Load actual institutional data from local storage
  const loadData = () => {
    // 1. Academic Events
    const savedEvents = localStorage.getItem("upitra_academic_events");
    if (savedEvents) {
      try {
        const parsed = JSON.parse(savedEvents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEvents(parsed);
        } else {
          setEvents(initialAdminCalendarEvents);
        }
      } catch {
        setEvents(initialAdminCalendarEvents);
      }
    } else {
      setEvents(initialAdminCalendarEvents);
    }

    // 2. Berita & Artikel
    const savedNews = localStorage.getItem("upitra_admin_articles");
    if (savedNews) {
      try {
        const parsed = JSON.parse(savedNews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArticles(parsed);
        } else {
          setArticles(initialAdminArticles);
        }
      } catch {
        setArticles(initialAdminArticles);
      }
    } else {
      setArticles(initialAdminArticles);
    }

    // 3. Riset Dosen
    const savedRiset = localStorage.getItem("upitra_admin_riset");
    if (savedRiset) {
      try {
        const parsed = JSON.parse(savedRiset);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRisetItems(parsed);
        } else {
          setRisetItems(initialAdminRisetList);
        }
      } catch {
        setRisetItems(initialAdminRisetList);
      }
    } else {
      setRisetItems(initialAdminRisetList);
    }

    const now = new Date();
    setLastSynced(now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB");
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      loadData();
      setIsRefreshing(false);
    }, 400);
  };

  // Metrics Calculations
  const upcomingEventsCount = events.filter((e) => e.status === "Mendatang").length;
  const ongoingEventsCount = events.filter((e) => e.status === "Berlangsung").length;
  const publishedArticlesCount = articles.filter((a) => a.published !== false).length;
  const draftArticlesCount = articles.filter((a) => a.published === false).length;
  const scopusCount = risetItems.filter((r) => r.indexedIn === "Scopus").length;

  // Unified Recent Activities (Combined newest events & articles)
  const recentActivities = [
    ...articles.slice(0, 4).map((art) => ({
      id: `art-${art.id}`,
      type: "Berita",
      title: art.title,
      category: art.category,
      date: art.publishedAt || "Baru saja",
      status: art.published !== false ? "Terbit" : "Draf",
      link: "/admin/riset",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      statusColor: art.published !== false ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200"
    })),
    ...events.slice(0, 4).map((ev) => ({
      id: `ev-${ev.id}`,
      type: "Event Akademik",
      title: ev.name || ev.title || "Event Kampus",
      category: ev.category,
      date: ev.start_date,
      status: ev.status || "Mendatang",
      link: "/admin/akademik",
      badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
      statusColor: ev.status === "Berlangsung" 
        ? "bg-blue-50 text-blue-700 border-blue-200" 
        : ev.status === "Selesai" 
        ? "bg-slate-100 text-slate-700 border-slate-200"
        : "bg-emerald-50 text-emerald-700 border-emerald-200"
    }))
  ].slice(0, 6);

  return (
    <div className="space-y-8 select-none font-sans text-slate-800">
      
      {/* 1. HEADER UTAMA: Pusat Kendali Institusi UPITRA */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Pusat Kendali Institusi</span>
            </span>
            <span className="text-xs text-slate-500 font-medium">Portal UPITRA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            Dashboard Eksekutif Administrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola agenda Kalender Akademik, publikasi Berita &amp; Riset institusi secara terintegrasi langsung dengan portal publik.
          </p>
        </div>

        {/* Action Controls & Sync Status */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 shadow-2xs text-xs text-slate-600">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Sinkron: {lastSynced || "Baru saja"}</span>
          </div>

          <button
            onClick={handleRefresh}
            title="Segarkan Data Institusi"
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-2xs transition-colors cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-blue-600" : ""}`} />
          </button>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <span>Buka Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* 2. KARTU RINGKASAN MODUL INSTITUSI (Palet Biru & Putih) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Modul 1: Kalender Akademik */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400" />
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Kalender Akademik
              </span>
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <CalendarDays className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#06172e] tracking-tight">
              {events.length}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
              <span className="text-blue-600 font-bold">{upcomingEventsCount} Mendatang</span>
              <span>•</span>
              <span className="text-emerald-600 font-bold">{ongoingEventsCount} Berlangsung</span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/akademik"
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group-hover:underline"
            >
              <span>Kelola Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Aktif
            </span>
          </div>
        </div>

        {/* Modul 2: Berita & Publikasi */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600" />
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Berita &amp; Artikel
              </span>
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                <Newspaper className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#06172e] tracking-tight">
              {articles.length}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
              <span className="text-emerald-600 font-bold">{publishedArticlesCount} Diterbitkan</span>
              <span>•</span>
              <span className="text-amber-600 font-bold">{draftArticlesCount} Draf</span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/riset"
              className="text-xs font-bold text-sky-600 hover:text-sky-800 flex items-center gap-1 group-hover:underline"
            >
              <span>Kelola Berita</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
              Live Sync
            </span>
          </div>
        </div>

        {/* Modul 3: Publikasi Riset */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-blue-600" />
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Riset &amp; Jurnal Dosen
              </span>
              <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Microscope className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-black text-[#06172e] tracking-tight">
              {risetItems.length}
            </div>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
              <span className="text-indigo-600 font-bold">{scopusCount} Scopus</span>
              <span>•</span>
              <span className="text-slate-600 font-medium">Terakreditasi</span>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              href="/admin/riset?tab=publikasi"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 group-hover:underline"
            >
              <span>Daftar Riset</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              Repository
            </span>
          </div>
        </div>

        {/* Modul 4: Gateway Keamanan */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between overflow-hidden relative group">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
          <div>
            <div className="flex items-center justify-between text-slate-500 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Gateway &amp; Sesi
              </span>
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl font-black text-[#06172e] tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Terproteksi</span>
            </div>
            <div className="text-xs text-slate-500 mt-1 font-medium truncate">
              Otoritas Administrator Utama
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-700">
              Aktif WIB
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Aman
            </span>
          </div>
        </div>

      </div>

      {/* 3. PINTASAN CEPAT OPERASIONAL (Quick Access Operations) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-[#06172e] uppercase tracking-wide">
              Pintasan Cepat Operasional
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Akses langsung fitur utama</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          <Link
            href="/admin/akademik"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 hover:bg-blue-100/60 hover:border-blue-300 transition-all group"
          >
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Plus className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#06172e] truncate">
                Tambah Event Akademik
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                Kalender &amp; agenda kampus
              </div>
            </div>
          </Link>

          <Link
            href="/admin/riset"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-sky-50/60 border border-sky-200/80 hover:bg-sky-100/60 hover:border-sky-300 transition-all group"
          >
            <div className="p-2 rounded-xl bg-sky-600 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#06172e] truncate">
                Tulis Berita Baru
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                Upload foto &amp; editor TipTap
              </div>
            </div>
          </Link>

          <a
            href="/kemahasiswaan/kalender-akademik"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <div className="p-2 rounded-xl bg-slate-700 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <CalendarDays className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#06172e] truncate flex items-center gap-1">
                <span>Kalender Publik</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                Tampilan agenda mahasiswa
              </div>
            </div>
          </a>

          <a
            href="/berita"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group"
          >
            <div className="p-2 rounded-xl bg-slate-700 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
              <Eye className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-[#06172e] truncate flex items-center gap-1">
                <span>Newsroom Publik</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                Portal kabar terkini UPITRA
              </div>
            </div>
          </a>

        </div>
      </div>

      {/* 4. FEED AKTIVITAS TERKINI (Unified Institutional Activity Feed) */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold text-[#06172e] uppercase tracking-wide flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Aktivitas &amp; Agenda Terkini Institusi</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar pembaruan agenda kalender akademik dan penerbitan berita terkini.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/admin/akademik"
              className="text-xs font-bold text-blue-600 hover:underline px-2.5 py-1 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Semua Event
            </Link>
            <span className="text-slate-300">•</span>
            <Link
              href="/admin/riset"
              className="text-xs font-bold text-sky-600 hover:underline px-2.5 py-1 rounded-lg hover:bg-sky-50 transition-colors"
            >
              Semua Berita
            </Link>
          </div>
        </div>

        {/* List Table Feed */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                <th className="py-3 px-4 rounded-l-xl">Modul / Tipe</th>
                <th className="py-3 px-4">Judul &amp; Informasi</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right rounded-r-xl">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentActivities.length > 0 ? (
                recentActivities.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                        {item.type === "Berita" ? <Newspaper className="w-3 h-3" /> : <CalendarDays className="w-3 h-3" />}
                        <span>{item.type}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 min-w-[240px]">
                      <div className="font-bold text-[#06172e] hover:text-blue-600 transition-colors line-clamp-1">
                        {item.title}
                      </div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                      <span className="inline-flex items-center gap-1 font-medium">
                        <Tag className="w-3 h-3 text-slate-400" />
                        <span>{item.category}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-medium">
                      {item.date}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${item.statusColor}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <Link
                        href={item.link}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-colors"
                      >
                        <span>Kelola</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400">
                    Belum ada data aktivitas institusi yang tersimpan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
