"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Laptop, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  ExternalLink,
  Share2,
  FileText,
  ChevronDown,
  Download,
  CheckCircle2,
  HelpCircle,
  Play,
  Clock
} from "lucide-react";
import { initialAdminLayananBanner, AdminLayananBanner } from "@/lib/adminDataStore";

// ── SVG Brand Icons untuk Media Sosial Resmi ──
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function ThreadsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 2c-5.522 0-9.999 4.477-9.999 10 0 5.011 3.69 9.159 8.52 9.878v-2.025c-3.73-.693-6.52-3.945-6.52-7.853 0-4.411 3.589-8 7.999-8 4.412 0 8.001 3.589 8.001 8 0 2.378-1.043 4.512-2.705 5.972-.943.83-2.091 1.378-3.376 1.554-1.29.177-2.618-.04-3.76-.628l-.946 1.782c1.472.782 3.167 1.059 4.846.829 1.67-.229 3.197-.954 4.444-2.05 2.062-1.812 3.497-4.42 3.497-7.459 0-5.523-4.477-10-10.001-10zm.04 6.5c-2.485 0-4.5 2.015-4.5 4.5 0 2.485 2.015 4.5 4.5 4.5 1.724 0 3.226-.97 3.992-2.396l-1.748-.988c-.46.826-1.328 1.384-2.244 1.384-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.928 0 1.784.542 2.227 1.353l1.734-.995c-.751-1.428-2.24-2.358-3.961-2.358z"/>
    </svg>
  );
}

function TiktokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.68 1.68 0 1 0 0-3.36 1.68 1.68 0 0 0 0 3.36M7.85 18.5V10.13H5.06v8.37h2.79z"/>
    </svg>
  );
}

// ── 4 Kotak Layanan Utama (1 Baris di Layar Desktop) ──
const empatKotakLayanan = [
  {
    title: "Perpustakaan",
    href: "https://siper.upitra.ac.id",
    icon: BookOpen,
    desc: "Katalog online OPAC, repositori karya ilmiah, e-book, dan langganan e-journal internasional.",
    tag: "Sumber Belajar",
  },
  {
    title: "Unity E-Learning (LMS)",
    href: "https://unity.upitra.ac.id",
    icon: Laptop,
    desc: "Platform perkuliahan daring modern: akses materi kuliah 24/7, pengumpulan tugas, kuis interaktif, dan video conference.",
    tag: "Perkuliahan Daring",
  },
  {
    title: "Immersion Program",
    href: "https://immersion.upitra.ac.id",
    icon: Sparkles,
    desc: "Program penempatan praktik kerja langsung di unit-unit bisnis Triputra Group se-Indonesia dengan bimbingan mentor eksekutif.",
    tag: "Program Unggulan",
  },
  {
    title: "Tracer Study & Career Center",
    href: "https://ucc.upitra.ac.id",
    icon: Briefcase,
    desc: "Pusat bimbingan karir mahasiswa, campus hiring ekosistem Triputra Group, dan portal survei penelusuran lulusan alumni.",
    tag: "Karir & Alumni",
  },
];

// ── Data Brosur PMB (Diambil dari /layanan/download-center dengan Aksen Biru UPITRA) ──
const pmbBrochureData = {
  title: "Penerimaan Mahasiswa Baru",
  subTitle: "Brosur PMB & Panduan Akademik TA 2026/2027 • PDF (6.2 MB)",
  fileName: "Brosur PMB & Panduan Akademik 2026/2027",
  facultyName: "Universitas Pignatelli Triputra",
  degree: "Sarjana S1 & Diploma D3",
  fileSize: "6.2 MB",
  coverImage: "/images/brochures/1788939036_6aa10b1c44527.jpg",
  pdfUrl: "https://www.upitra.ac.id/files/brochures/1791794242_6acc9c42b5951.pdf",
  description: "Panduan resmi penerimaan mahasiswa baru UPITRA, skema beasiswa Triputra Peduli (potongan SPP s/d 100%), jadwal pendaftaran jalur tanpa tes, dan profil ekosistem kampus.",
  highlights: [
    "Jalur Rapor Bebas Tes",
    "Beasiswa Prestasi Triputra (s/d 100%)",
    "Estimasi Biaya Kuliah & Asrama",
    "Fasilitas Kampus Surakarta"
  ]
};

// ── Data FAQ (Frequently Asked Questions) Layanan & PMB ──
const layananFaqs = [
  {
    q: "Bagaimana cara mendaftar sebagai mahasiswa baru di UPITRA?",
    a: "Pendaftaran dapat dilakukan secara mandiri melalui portal resmi https://pmb.upitra.ac.id atau langsung hadir ke Kantor Admisi Kampus UPITRA di Surakarta. Tersedia Jalur Bebas Tes (Jalur Rapor) serta berbagai skema beasiswa prestasi."
  },
  {
    q: "Bagaimana cara mengakses Perpustakaan Daring (SIPER UPITRA)?",
    a: "Sivitas akademika dapat mengakses sistem perpustakaan melalui https://siper.upitra.ac.id menggunakan akun SSO (Single Sign-On) kampus untuk menelusuri katalog buku fisik, repositori karya ilmiah, dan koleksi e-journal internasional."
  },
  {
    q: "Apa itu platform Unity E-Learning (LMS) dan bagaimana cara login?",
    a: "Unity LMS (https://unity.upitra.ac.id) adalah platform manajemen perkuliahan daring resmi UPITRA. Mahasiswa dan dosen menggunakan kredensial email kampus (@upitra.ac.id) untuk mengakses materi kuliah, kuis interaktif, pengumpulan tugas, dan presensi."
  },
  {
    q: "Apakah ada program beasiswa untuk mahasiswa baru?",
    a: "Ya, UPITRA menyediakan program Beasiswa Triputra Peduli dengan potongan biaya SPP hingga 100%, Beasiswa Prestasi Akademik/Non-Akademik, serta program KIP-Kuliah Kemendikbudristek."
  },
  {
    q: "Bagaimana mekanisme Immersion Program 3+1 di Triputra Group?",
    a: "Melalui kurikulum 3+1, mahasiswa menempuh 3 tahun perkuliahan intensif di kampus dan 1 tahun program immersion (magang profesional bersertifikat dan berbayar) di unit bisnis Triputra Group dengan bimbingan mentor industri eksekutif."
  },
  {
    q: "Ke mana saya dapat menghubungi jika membutuhkan bantuan layanan kampus?",
    a: "Anda dapat menghubungi Pusat Layanan Terpadu & WhatsApp Admisi di 0811-290-7500 atau melalui asisten virtual Veronica yang selalu siap 24 jam di pojok kanan bawah layar website."
  }
];

// ── Daftar Media Sosial Resmi UPITRA Campus ──
const socialMediaList = [
  {
    name: "Instagram",
    handle: "@upitra_campus",
    url: "https://www.instagram.com/upitra_campus/",
    icon: InstagramIcon,
    accent: "bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white",
    badge: "Foto & Reels",
    desc: "Update foto harian kampus, info event, pengumuman beasiswa, dan prestasi mahasiswa.",
  },
  {
    name: "YouTube",
    handle: "UPITRA Official",
    url: "https://www.youtube.com/@upitracampus",
    icon: YoutubeIcon,
    accent: "bg-red-600 text-white",
    badge: "Video Resmi",
    desc: "Dokumentasi wisuda, profil program studi, seminar nasional, dan podcast edukatif.",
  },
  {
    name: "Facebook",
    handle: "UPITRA Campus",
    url: "https://www.facebook.com/upitracampus",
    icon: FacebookIcon,
    accent: "bg-blue-600 text-white",
    badge: "Komunitas",
    desc: "Informasi pendaftaran mahasiswa baru, agenda universitas, dan relasi sivitas.",
  },
  {
    name: "Threads",
    handle: "@upitra_campus",
    url: "https://www.threads.net/@upitra_campus",
    icon: ThreadsIcon,
    accent: "bg-slate-900 text-white",
    badge: "Diskusi Kampus",
    desc: "Obrolan santai, kabar kilat kegiatan kampus, dan interaksi interaktif mahasiswa.",
  },
  {
    name: "TikTok",
    handle: "@upitra_campus",
    url: "https://www.tiktok.com/@upitra_campus",
    icon: TiktokIcon,
    accent: "bg-slate-950 text-cyan-400",
    badge: "Tren & Kreatif",
    desc: "Video seru dinamika kehidupan kampus Solo, tips perkuliahan, dan konten kreatif.",
  },
  {
    name: "LinkedIn",
    handle: "Universitas Pignatelli Triputra",
    url: "https://www.linkedin.com/school/universitas-pignatelli-triputra/",
    icon: LinkedinIcon,
    accent: "bg-[#0a66c2] text-white",
    badge: "Jejaring Karir",
    desc: "Peluang karir, kemitraan Triputra Group, dan jejaring alumni profesional.",
  },
];

export default function LayananIndexPage() {
  const [banner, setBanner] = useState<AdminLayananBanner>(initialAdminLayananBanner);
  const [isPmbExpanded, setIsPmbExpanded] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Load dynamic banner from localStorage (editable via Admin if configured)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_layanan");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER LAYANAN (Full Width 1440px x 480px, Identik dengan /kemahasiswaan, /riset & /akademik) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/perpustakaan.jpg"}
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
                {banner.title || "Layanan"}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-200/95 leading-relaxed drop-shadow-xs max-w-3xl">
                {banner.description || "Ekosistem layanan digital, perpustakaan, karir, dan pembelajaran terpadu untuk mendukung kesuksesan akademik dan profesional seluruh sivitas akademika UPITRA."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. KONTEN UTAMA HALAMAN LAYANAN */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        
        {/* SECTION 1: TERHUBUNG DENGAN KAMI & 4 KOTAK LAYANAN DALAM 1 BARIS */}
        <section className="space-y-8">
          
          {/* Header Section: Terhubung dengan Kami */}
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Ekosistem Layanan Terpadu</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Terhubung dengan Kami
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Akses langsung fasilitas digital, perpustakaan daring, sistem pembelajaran, dan pusat karir Universitas Pignatelli Triputra melalui portal resmi di bawah ini:
            </p>
          </div>

          {/* 4 Kotak Layanan: Dimuat Tepat 1 Baris di Layar Desktop (lg:grid-cols-4) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {empatKotakLayanan.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-xl transition-all flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-[#0b2545] group-hover:text-blue-700 transition-colors leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-800 transition-colors"
                  >
                    <span>Akses Layanan</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Tombol Unduh Brosur PMB (Dengan Pratinjau Interaktif, Tepat di Bawah 4 Kotak Layanan) */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all overflow-hidden">
            
            {/* Header Baris Dokumen */}
            <div 
              onClick={() => setIsPmbExpanded(!isPmbExpanded)}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-slate-50/70 transition-colors"
            >
              {/* Kiri: Icon Dokumen Biru + Judul & Tanggal Update */}
              <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <FileText className="w-6 h-6" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-black text-[#0b2545] truncate">
                    {pmbBrochureData.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                    {pmbBrochureData.subTitle}
                  </p>
                </div>
              </div>

              {/* Kanan: Tombol Unduh (Warna Biru) + Panah Bawah Interaktif */}
              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                {/* Tombol Unduh Langsung */}
                <a
                  href={pmbBrochureData.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh</span>
                </a>

                {/* Tombol Panah Bawah (Chevron Toggle) */}
                <button
                  type="button"
                  aria-label="Tampilkan pratinjau brosur"
                  className="p-2 rounded-full hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform duration-300 ${isPmbExpanded ? "rotate-180 text-blue-600" : ""}`} 
                  />
                </button>
              </div>
            </div>

            {/* Expandable Preview Accordion (Framer Motion) */}
            <AnimatePresence initial={false}>
              {isPmbExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden border-t border-slate-100 bg-slate-50/70"
                >
                  <div className="p-5 sm:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">
                      
                      {/* Kolom Kiri: Visual Pratinjau Cover Brosur */}
                      <div className="md:col-span-5 lg:col-span-4 flex justify-center">
                        <div className="relative w-full max-w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 group">
                          <Image
                            src={pmbBrochureData.coverImage}
                            alt={pmbBrochureData.fileName}
                            fill
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-3 left-3 right-3 text-white text-[11px] font-bold flex items-center justify-between">
                            <span className="px-2 py-0.5 rounded-md bg-blue-600/90 backdrop-blur-xs">Pratinjau Brosur</span>
                            <span className="text-slate-200">{pmbBrochureData.fileSize}</span>
                          </div>
                        </div>
                      </div>

                      {/* Kolom Kanan: Rincian Brosur, Poin Keunggulan & Aksi */}
                      <div className="md:col-span-7 lg:col-span-8 space-y-5">
                        
                        <div className="space-y-1.5">
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                            <span>{pmbBrochureData.degree} • {pmbBrochureData.facultyName}</span>
                          </div>
                          <h4 className="text-xl sm:text-2xl font-black text-[#0b2545] tracking-tight">
                            {pmbBrochureData.fileName}
                          </h4>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                            {pmbBrochureData.description}
                          </p>
                        </div>

                        {/* Poin Unggulan */}
                        <div className="space-y-2 pt-2 border-t border-slate-200/80">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                            Fokus &amp; Informasi Utama:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {pmbBrochureData.highlights.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-blue-100 text-xs text-slate-700 font-medium shadow-2xs">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                <span className="truncate">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tombol Aksi Lanjutan (Seluruhnya Palet Biru) */}
                        <div className="pt-2 flex flex-wrap items-center gap-3">
                          <a
                            href={pmbBrochureData.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all"
                          >
                            <Download className="w-4 h-4" />
                            <span>Unduh Dokumen Lengkap (PDF)</span>
                          </a>

                          <a
                            href="https://pmb.upitra.ac.id"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-[#0b2545] text-white text-xs sm:text-sm font-bold shadow-sm active:scale-95 transition-all"
                          >
                            <span>Daftar PMB Online</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <a
                            href="/layanan/download-center"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 text-xs sm:text-sm font-bold transition-all"
                          >
                            <span>Lihat Semua Brosur Fakultas</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </section>

        {/* SECTION 3: FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section className="space-y-8 pt-6 border-t border-slate-200/80">
          
          {/* Header Section FAQ */}
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
              <HelpCircle className="w-4 h-4 text-blue-600" />
              <span>Pertanyaan Umum Seputar Layanan &amp; PMB</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Jawaban atas pertanyaan yang paling sering diajukan mengenai ekosistem layanan kampus, pembelajaran daring, pendaftaran mahasiswa baru, dan beasiswa UPITRA:
            </p>
          </div>

          {/* Accordion List FAQ */}
          <div className="space-y-3">
            {layananFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:border-blue-300 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="cursor-pointer w-full flex items-center justify-between p-4 sm:p-5 text-left font-bold text-xs sm:text-sm text-slate-800 hover:text-blue-600 transition-colors gap-3"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center text-xs font-black shrink-0">
                        {idx + 1}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDown 
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-blue-600" : ""}`} 
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pl-12.5">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </section>

        {/* SECTION 4: MEDIA SOSIAL RESMI & MINI PREVIEW VIDEO PROFIL KAMPUS (2 KOLOM) */}
        <section className="pt-10 border-t border-slate-200/80 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* KOLOM KIRI: LIST TOMBOL MEDIA SOSIAL (lg:col-span-5) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Header Kolom Media Sosial */}
              <div className="space-y-1.5 text-left">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Kanal Resmi Mahasiswa</span>
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                  Media Sosial UPITRA
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Ikuti ragam update kegiatan akademik, pengumuman beasiswa, dan dinamika kampus melalui akun resmi berikut:
                </p>
              </div>

              {/* List Tombol Media Sosial Vertikal */}
              <div className="space-y-2.5">
                {socialMediaList.map((sosmed, idx) => {
                  const Icon = sosmed.icon;
                  return (
                    <a
                      key={idx}
                      href={sosmed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:shadow-md hover:bg-blue-50/40 transition-all flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Brand Icon */}
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs group-hover:scale-105 transition-transform ${sosmed.accent}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        {/* Name & Handle */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-[#0b2545] group-hover:text-blue-700 transition-colors truncate">
                              {sosmed.name}
                            </h4>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors shrink-0">
                              {sosmed.badge}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                            {sosmed.handle}
                          </p>
                        </div>
                      </div>

                      {/* External Arrow */}
                      <div className="w-8 h-8 rounded-lg bg-slate-50 group-hover:bg-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </a>
                  );
                })}
              </div>

            </div>

            {/* KOLOM KANAN: MINI PREVIEW VIDEO PROFIL 1.5 MENIT DENGAN BORDER CANTIK (lg:col-span-7) */}
            <div className="lg:col-span-7 space-y-4">
              
              {/* Header Video */}
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-xs font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <Play className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                  <span>Video Profil Resmi • Mini Preview 1.5 Menit</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                  Mengenal Kampus UPITRA
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Saksikan cuplikan video profil Universitas Pignatelli Triputra Surakarta, fasilitas pembelajaran modern, serta integrasi ekosistem industri Triputra Group:
                </p>
              </div>

              {/* Pemutar Video dengan Border Mewah & Cantik */}
              <div className="relative group pt-1">
                {/* 1. Ambient Glow Backlight Effect */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-all duration-700 pointer-events-none" />

                {/* 2. Multi-Layer Gradient Frame */}
                <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-tr from-[#06172e] via-[#0b2545] to-blue-600 shadow-2xl shadow-blue-950/25 border border-white/20">
                  
                  {/* Decorative Corner Lights */}
                  <div className="absolute top-2 right-2 w-20 h-20 bg-sky-400/20 rounded-full blur-xl pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-20 h-20 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

                  {/* 3. Inner Screen Wrapper */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10">
                    <iframe
                      src="https://www.youtube-nocookie.com/embed/rVDHh02bbA4?start=1&end=91&rel=0&modestbranding=1"
                      title="Video Profil Universitas Pignatelli Triputra (Mini Preview 1.5 Menit)"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>

                </div>
              </div>

              {/* Keterangan Durasi & CTA Tonton Penuh */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cuplikan otomatis diputar selama <strong>1:30 menit</strong> (detik 1 - 90).</span>
                </div>

                <a
                  href="https://www.youtube.com/watch?v=rVDHh02bbA4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-700 hover:text-red-600 font-bold text-xs transition-colors shrink-0"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                  <span>Tonton Video Lengkap di YouTube</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
