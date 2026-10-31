"use client";

import { useState, useEffect, useMemo } from "react";
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
  Tag,
  Bot,
  Search,
  Database,
  Activity,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  HelpCircle,
  Check
} from "lucide-react";
import { 
  initialAdminCalendarEvents, 
  AdminCalendarEvent, 
  initialAdminArticles, 
  AdminArticleItem, 
  initialAdminRisetList, 
  AdminRisetSection 
} from "@/lib/adminDataStore";

interface AdminUserSession {
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

export default function AdminDashboardPage() {
  const [events, setEvents] = useState<AdminCalendarEvent[]>([]);
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
  const [risetItems, setRisetItems] = useState<AdminRisetSection[]>([]);
  const [aiDatasetCount, setAiDatasetCount] = useState<number>(105);
  const [aiCategoryCount, setAiCategoryCount] = useState<number>(8);
  const [session, setSession] = useState<AdminUserSession | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string>("");

  // Activity Feed States
  const [feedTab, setFeedTab] = useState<"all" | "news" | "events">("all");
  const [feedSearch, setFeedSearch] = useState("");

  // Load institutional data from local storage
  const loadData = () => {
    // 1. Session Info
    const savedSession = localStorage.getItem("upitra_admin_session");
    if (savedSession) {
      try {
        setSession(JSON.parse(savedSession));
      } catch {}
    }

    // 2. Academic Events
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

    // 3. Berita & Artikel
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

    // 4. Riset Dosen
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

    // 5. AI Dataset
    const savedDataset = localStorage.getItem("upitra_ai_dataset");
    if (savedDataset) {
      try {
        const parsed = JSON.parse(savedDataset);
        if (Array.isArray(parsed)) {
          setAiDatasetCount(parsed.length);
          const uniqueCats = new Set(parsed.map((item: { category?: string }) => item.category || "Umum"));
          setAiCategoryCount(uniqueCats.size);
        }
      } catch {}
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
    }, 450);
  };

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) return "Selamat Pagi";
    if (hour >= 11 && hour < 15) return "Selamat Siang";
    if (hour >= 15 && hour < 18) return "Selamat Sore";
    return "Selamat Malam";
  };

  // Key metrics calculations
  const upcomingEventsCount = events.filter((e) => e.status === "Mendatang").length;
  const ongoingEventsCount = events.filter((e) => e.status === "Berlangsung").length;
  const publishedArticlesCount = articles.filter((a) => a.published !== false).length;
  const draftArticlesCount = articles.filter((a) => a.published === false).length;
  const scopusCount = risetItems.filter((r) => r.indexedIn === "Scopus").length;
  const totalEntriesManaged = events.length + articles.length + risetItems.length + aiDatasetCount;

  // Unified Activities List
  const allActivities = useMemo(() => {
    const list = [
      ...articles.map((art) => ({
        id: `art-${art.id}`,
        type: "Berita" as const,
        title: art.title,
        category: art.category,
        date: art.publishedAt || "Baru saja",
        status: art.published !== false ? "Terbit" : "Draf",
        link: "/admin/riset",
        badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
        statusColor: art.published !== false ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-amber-50 text-amber-700 border-amber-200",
        rawDate: art.publishedAt ? new Date(art.publishedAt).getTime() : 0,
      })),
      ...events.map((ev) => ({
        id: `ev-${ev.id}`,
        type: "Event Akademik" as const,
        title: ev.name || ev.title || "Event Kampus",
        category: ev.category,
        date: ev.start_date,
        status: ev.status || "Mendatang",
        link: "/admin/akademik",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        statusColor: ev.status === "Berlangsung" 
          ? "bg-blue-50 text-blue-700 border-blue-200" 
          : ev.status === "Selesai" 
          ? "bg-slate-100 text-slate-700 border-slate-200"
          : "bg-emerald-50 text-emerald-700 border-emerald-200",
        rawDate: ev.start_date ? new Date(ev.start_date).getTime() : 0,
      }))
    ];

    return list;
  }, [articles, events]);

  // Filtered Activities
  const filteredActivities = useMemo(() => {
    let result = allActivities;

    // Filter by Tab
    if (feedTab === "news") {
      result = result.filter((item) => item.type === "Berita");
    } else if (feedTab === "events") {
      result = result.filter((item) => item.type === "Event Akademik");
    }

    // Filter by Search Query
    if (feedSearch.trim()) {
      const q = feedSearch.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.status.toLowerCase().includes(q)
      );
    }

    return result.slice(0, 8);
  }, [allActivities, feedTab, feedSearch]);

  return (
    <div className="space-y-7 select-none font-sans text-slate-800">
      
      {/* ── 1. EXECUTIVE WELCOME BANNER ──────────────────────────────────────── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#06172e] via-[#092244] to-[#06172e] border border-blue-950/80 shadow-xl text-white p-6 sm:p-8">
        
        {/* Ambient Decorative Accents */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Greeting & Identity */}
          <div className="space-y-2.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-sky-200 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Portal Eksekutif Administrator</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sistem Terhubung</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {getGreeting()}, {session?.name || "Administrator"}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Selamat datang di pusat kendali terpadu Universitas Putra Indonesia Cianjur. Kelola agenda akademik, warta berita terkini, dan latih asisten AI secara real-time.
            </p>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                <strong className="text-slate-200">Peran:</strong> {session?.role || "Super Administrator"}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <strong className="text-slate-200">Sinkron:</strong> {lastSynced || "Baru saja"}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-sky-400" />
                <strong className="text-slate-200">Data Terkelola:</strong> {totalEntriesManaged} Item
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
            <button
              onClick={handleRefresh}
              title="Segarkan data institusi dari penyimpanan"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-sky-300" : ""}`} />
              <span>{isRefreshing ? "Menyegarkan..." : "Segarkan"}</span>
            </button>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all cursor-pointer active:scale-95"
            >
              <span>Kunjungi Website Publik</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </div>

      {/* ── 2. EMPAT PILAR UTAMA (BALANCED 4-COLUMN KPI CARDS) ───────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3.5 px-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" />
            <span>Pilar Pengelolaan Institusi</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">Status data aktif</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          
          {/* Pilar 1: Kalender Akademik */}
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
                <span>Kelola Kalender</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                Agenda Kampus
              </span>
            </div>
          </div>

          {/* Pilar 2: Berita & Publikasi */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-sky-500 to-blue-600" />
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Warta &amp; Berita
                </span>
                <div className="p-2.5 rounded-xl bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Newspaper className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-[#06172e] tracking-tight">
                {articles.length}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
                <span className="text-emerald-600 font-bold">{publishedArticlesCount} Terbit</span>
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
                Media Kampus
              </span>
            </div>
          </div>

          {/* Pilar 3: Riset Dosen */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all flex flex-col justify-between overflow-hidden relative group">
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

          {/* Pilar 4: AI Knowledge Base */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs hover:shadow-md hover:border-purple-300 transition-all flex flex-col justify-between overflow-hidden relative group">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600" />
            <div>
              <div className="flex items-center justify-between text-slate-500 mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  AI Knowledge Base
                </span>
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Bot className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-[#06172e] tracking-tight">
                {aiDatasetCount}
              </div>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-2 font-medium">
                <span className="text-purple-600 font-bold">{aiCategoryCount} Kategori Topik</span>
                <span>•</span>
                <span className="text-emerald-600 font-bold">Aktif 24/7</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <Link
                href="/admin/ai-dataset"
                className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 group-hover:underline"
              >
                <span>Kelola AI Dataset</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                Chatbot AI
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. PINTASAN CEPAT OPERASIONAL (ORGANIZED QUICK ACCESS) ───────────── */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
        
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-[#06172e] uppercase tracking-wide">
              Pintasan Cepat Operasional
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Akses langsung fitur dan pratinjau</span>
        </div>

        {/* 2 Logical Groupings: Input Data & Live Previews */}
        <div className="space-y-4">
          
          {/* Sub-Group A: Tindakan Cepat Pembuatan & Kelola Konten */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>Aksi Kelola Konten Utama</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              
              <Link
                href="/admin/akademik"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 hover:bg-blue-100/60 hover:border-blue-300 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Plus className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#06172e] group-hover:text-blue-700 transition-colors">
                    Tambah Event Akademik
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Jadwal seminar, ujian &amp; agenda kampus
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/riset"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-sky-50/60 border border-sky-200/80 hover:bg-sky-100/60 hover:border-sky-300 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="p-2.5 rounded-xl bg-sky-600 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#06172e] group-hover:text-sky-700 transition-colors">
                    Tulis Berita &amp; Warta Baru
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Upload cover foto &amp; editor TipTap lengkap
                  </div>
                </div>
              </Link>

              <Link
                href="/admin/ai-dataset"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 hover:bg-purple-100/60 hover:border-purple-300 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="p-2.5 rounded-xl bg-purple-600 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-[#06172e] group-hover:text-purple-700 transition-colors">
                    Kelola AI Knowledge Base
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Tambah Q&amp;A &amp; uji simulator asisten
                  </div>
                </div>
              </Link>

            </div>
          </div>

          {/* Sub-Group B: Pratinjau Portal Publik */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <span>Pratinjau Portal Publik Langsung</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              
              <a
                href="/kemahasiswaan/kalender-akademik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="p-2.5 rounded-xl bg-slate-700 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <CalendarDays className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#06172e] flex items-center justify-between">
                    <span>Kalender Akademik Publik</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Lihat tampilan kalender bagi mahasiswa
                  </div>
                </div>
              </a>

              <a
                href="/riset"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="p-2.5 rounded-xl bg-slate-700 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Eye className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#06172e] flex items-center justify-between">
                    <span>Portal Riset &amp; Berita</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Lihat feed berita dan publikasi riset
                  </div>
                </div>
              </a>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <div className="p-2.5 rounded-xl bg-slate-700 text-white shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-[#06172e] flex items-center justify-between">
                    <span>Halaman Beranda Utama</span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-slate-700" />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    Kunjungi beranda resmi website UPITRA
                  </div>
                </div>
              </a>

            </div>
          </div>

        </div>

      </div>

      {/* ── 4. SPLIT MONITORING SECTION (FEED AKTIVITAS & PANEL STATUS) ──────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* KOLOM KIRI (2/3): FEED AKTIVITAS TERKINI DENGAN TAB & SEARCH */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
          
          {/* Header Feed */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-sm font-bold text-[#06172e] uppercase tracking-wide flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>Aktivitas &amp; Log Konten Terkini</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Daftar terpadu pembaruan warta berita dan agenda akademik institusi.
              </p>
            </div>

            {/* Tab Controls */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl text-xs font-bold">
              <button
                onClick={() => setFeedTab("all")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  feedTab === "all" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setFeedTab("news")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  feedTab === "news" ? "bg-white text-sky-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Berita
              </button>
              <button
                onClick={() => setFeedTab("events")}
                className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                  feedTab === "events" ? "bg-white text-blue-600 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Event
              </button>
            </div>
          </div>

          {/* Quick Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={feedSearch}
              onChange={(e) => setFeedSearch(e.target.value)}
              placeholder="Cari aktivitas berdasarkan judul, kategori, atau status..."
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
            {feedSearch && (
              <button
                onClick={() => setFeedSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Table Feed */}
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold">
                  <th className="py-3 px-4">Modul / Tipe</th>
                  <th className="py-3 px-4">Judul &amp; Informasi</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Tanggal</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-semibold text-slate-700 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${item.badgeColor}`}>
                          {item.type === "Berita" ? <Newspaper className="w-3 h-3" /> : <CalendarDays className="w-3 h-3" />}
                          <span>{item.type}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 min-w-[220px]">
                        <div className="font-bold text-[#06172e] hover:text-blue-600 transition-colors line-clamp-1">
                          {item.title}
                        </div>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                        <span className="inline-flex items-center gap-1 font-medium text-[11px]">
                          <Tag className="w-3 h-3 text-slate-400" />
                          <span>{item.category}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-slate-500 font-medium text-[11px]">
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
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white font-bold text-[11px] transition-colors shadow-2xs"
                        >
                          <span>Kelola</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400">
                      <div className="max-w-xs mx-auto space-y-2">
                        <Layers className="w-8 h-8 text-slate-300 mx-auto" />
                        <div className="text-xs font-bold text-slate-600">Tidak ada aktivitas ditemukan</div>
                        <p className="text-[11px] text-slate-400">
                          {feedSearch ? "Coba ganti kata kunci pencarian Anda." : "Belum ada riwayat aktivitas yang tersimpan."}
                        </p>
                        {feedSearch && (
                          <button
                            onClick={() => setFeedSearch("")}
                            className="text-xs font-bold text-blue-600 hover:underline"
                          >
                            Reset Pencarian
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer Note */}
          <div className="flex items-center justify-between pt-2 text-[11px] text-slate-400 font-medium">
            <span>Menampilkan maksimal 8 pembaruan teratas</span>
            <div className="flex items-center gap-3">
              <Link href="/admin/akademik" className="text-blue-600 hover:underline font-bold">
                Semua Kalender &rarr;
              </Link>
              <Link href="/admin/riset" className="text-sky-600 hover:underline font-bold">
                Semua Berita &rarr;
              </Link>
            </div>
          </div>

        </div>

        {/* KOLOM KANAN (1/3): STATUS KESEHATAN SISTEM & INFO KAMPUS */}
        <div className="space-y-5">
          
          {/* Card A: Status Operasional Sistem */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-[#06172e] uppercase tracking-wide">
                  Status Sistem &amp; Mesin
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Normal
              </span>
            </div>

            <div className="space-y-3">
              
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-slate-700">AI Chatbot Engine</span>
                </div>
                <span className="text-[11px] font-bold text-emerald-600">Siap 24/7</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="font-semibold text-slate-700">Penyimpanan Lokal</span>
                </div>
                <span className="text-[11px] font-bold text-blue-600">Tersinkron</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                  <span className="font-semibold text-slate-700">Gateway Keamanan</span>
                </div>
                <span className="text-[11px] font-bold text-sky-600">Terproteksi</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-semibold text-slate-700">Portal Publik Live</span>
                </div>
                <span className="text-[11px] font-bold text-purple-600">Terkoneksi</span>
              </div>

            </div>
          </div>

          {/* Card B: Info Semester Akademik */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 shadow-xs space-y-3.5">
            <div className="flex items-center gap-2 pb-2.5 border-b border-slate-100">
              <CalendarDays className="w-4 h-4 text-blue-600" />
              <h3 className="text-xs font-bold text-[#06172e] uppercase tracking-wide">
                Informasi Semester Aktif
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Tahun Akademik:</span>
                <span className="font-bold text-[#06172e]">2025/2026</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Periode:</span>
                <span className="font-bold text-blue-600">Semester Genap</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-100">
                <span className="text-slate-500">Status Kuliah:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Aktif Berjalan</span>
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500">Basis Data:</span>
                <span className="font-bold text-slate-700">UPITRA Knowledge Base</span>
              </div>
            </div>
          </div>

          {/* Card C: Panduan Cepat Navigasi */}
          <div className="rounded-3xl bg-gradient-to-br from-blue-50/80 via-white to-sky-50 border border-blue-200/80 p-5 shadow-xs space-y-2.5">
            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Panduan Ringkas Pengelola</span>
            </div>
            <ul className="text-[11.5px] text-slate-600 space-y-2 leading-relaxed">
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Unggah foto sampul langsung dari komputer di menu <strong>Riset &gt; Berita</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Latih dan uji kecerdasan chatbot interaktif di menu <strong>AI Dataset</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <span>Pantau kalender ujian dan seminar di menu <strong>Akademik</strong>.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
