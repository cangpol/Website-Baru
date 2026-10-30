"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Building2, 
  FileText, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Handshake, 
  Sparkles, 
  CheckCircle2,
  ExternalLink,
  Award
} from "lucide-react";
import { 
  initialAdminKerjasamaBanner, 
  AdminKerjasamaBanner, 
  initialAdminMitra,
  initialAdminMouList
} from "@/lib/adminDataStore";

// ── 3 Menu Subnav Tabs (Sesuai Gambar Referensi Pengguna) ──
const subnavTabs = [
  { id: "mitra", label: "Mitra Kerjasama", href: "/kerjasama/mitra-kerjasama" },
  { id: "daftar", label: "Daftar Kerjasama (MoU / MoA)", href: "/kerjasama/daftar-kerjasama" },
  { id: "kegiatan", label: "Kegiatan Kerjasama", href: "/kerjasama/kegiatan-kerjasama" },
];

// ── Kurasi Mitra Unggulan untuk Marquee 1 Baris Berjalan Pelan ──
const marqueePartners = initialAdminMitra.slice(0, 18);

export default function KerjasamaIndexPage() {
  const [banner, setBanner] = useState<AdminKerjasamaBanner>(initialAdminKerjasamaBanner);
  const [activeTab, setActiveTab] = useState<string>("mitra");

  // Load dynamic banner from localStorage (editable via Admin if configured)
  useEffect(() => {
    const saved = localStorage.getItem("upitra_banner_kerjasama");
    if (saved) {
      try {
        setBanner(JSON.parse(saved));
      } catch {}
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* 1. HEADER BANNER KERJASAMA (Full Width 1440px x 480px, Serupa dengan /kemahasiswaan, /layanan, /riset, Tanpa Breadcrumb) */}
      <header className="w-full h-[420px] sm:h-[460px] lg:h-[480px] relative overflow-hidden group bg-[#06172e]">
        {/* Background Image: Full Cover 1440x480 */}
        <Image
          src={banner.imageUrl || "/images/banners/hero-karir.jpg"}
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
                {banner.title || "Kerjasama & Kemitraan"}
              </h1>

              <p className="text-base sm:text-lg lg:text-xl font-bold text-sky-200/95 leading-relaxed drop-shadow-xs max-w-3xl">
                {banner.description || "Membangun sinergi kokoh antara perguruan tinggi dan dunia usaha/dunia industri (DUDI) untuk menghadirkan pendidikan yang relevan dan siap kerja."}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BARIS TOMBOL SUBNAV PILL DENGAN JARAK BERSIH (Framer Motion Sliding Indicator Biru UPITRA) */}
      <div className="w-full bg-slate-50 pt-8 sm:pt-10 pb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <nav 
            aria-label="Subnav Kerjasama"
            className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-full p-1.5 shadow-sm inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-1 sm:gap-2 max-w-full"
          >
            {subnavTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 select-none cursor-pointer ${
                    isActive 
                      ? "text-white" 
                      : "text-slate-600 hover:text-blue-700 hover:bg-slate-100/70"
                  }`}
                >
                  {/* Sliding Pill Indicator (Biru UPITRA dengan Clean Shadow) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeKerjasamaTab"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      className="absolute inset-0 bg-blue-600 rounded-xl sm:rounded-full shadow-md shadow-blue-500/30"
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* 3. KONTEN RESPONSIF SESUAI TAB TERPILIH */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full space-y-12">
        
        {/* ── TAB 1: MITRA KERJASAMA (DEFAULT) ── */}
        {activeTab === "mitra" && (
          <section className="space-y-8 animate-fadeIn">
            
            {/* Header Seksi & Tombol Lihat Semua Mitra Kerjasama */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>Konektivitas Industri Nyata</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                  Mitra Industri &amp; Korporasi Terpercaya
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  UPITRA didukung langsung oleh afiliasi erat bersama <strong>Triputra Group</strong> serta jejaring korporasi nasional, perbankan, dan rumah sakit terkemuka untuk memastikan peluang magang riil dan percepatan karir lulusan.
                </p>
              </div>

              {/* Tombol Lihat Semua Data Mitra Kerjasama */}
              <Link
                href="/kerjasama/mitra-kerjasama"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all shrink-0 self-start md:self-center group cursor-pointer"
              >
                <span>Lihat Semua Mitra Kerjasama</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* MARQUEE 1 BARIS BERJALAN OTOMATIS KE KIRI SECARA PELAN (Logo, Bidang Kerjasama, Nama PT) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>Direktori Mitra Aktif • Geser Otomatis (Arahkan Kursor untuk Jeda)</span>
                </span>
                <span className="text-xs font-semibold text-blue-600 hidden sm:inline">
                  50+ Korporasi Nasional
                </span>
              </div>

              {/* Marquee Track Container with Edge Gradient Fade */}
              <div className="relative w-full overflow-hidden py-2 bg-gradient-to-r from-blue-50/40 via-white to-blue-50/40 rounded-3xl border border-slate-200/90 shadow-2xs">
                {/* Left & Right Edge Gradient Masks */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

                {/* 1 Row Marquee Track (Slow Continuous Leftward Scroll, Pauses on Hover) */}
                <div 
                  className="animate-marquee-track-1 gap-4 px-3"
                  style={{ animationDuration: "50s" }}
                >
                  {[...marqueePartners, ...marqueePartners].map((partner, idx) => (
                    <div
                      key={`marquee-${idx}`}
                      className="group shrink-0 w-72 sm:w-80 bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all flex items-center gap-3.5 select-none cursor-pointer"
                    >
                      {/* Logo Mitra */}
                      <div className="w-14 h-14 rounded-xl bg-slate-50 border border-slate-100 p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      </div>

                      {/* Detail: Bidang Kerjasama & Nama PT */}
                      <div className="min-w-0 flex-1">
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 truncate mb-1">
                          {partner.partnershipType}
                        </span>
                        <h4 className="text-xs sm:text-sm font-bold text-[#0b2545] group-hover:text-blue-700 transition-colors truncate leading-snug">
                          {partner.name}
                        </h4>
                        <p className="text-[11px] text-slate-400 truncate">
                          {partner.category}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3 Pilar Kemitraan Strategis UPITRA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                  <Handshake className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Pilar Utama</span>
                  <h3 className="text-lg font-black text-[#0b2545]">Ekosistem Triputra Group</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Penempatan immersion 3+1 berbayar, bimbingan mentor eksekutif, serta prioritas rekrutmen kerja langsung ke anak perusahaan Triputra.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Perbankan &amp; Industri</span>
                  <h3 className="text-lg font-black text-[#0b2545]">Finansial &amp; Manufaktur</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Kolaborasi kurikulum perbankan digital, Tax Center, edukasi pasar modal BEI, serta sertifikasi otomotif dan rekayasa perangkat lunak.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition-all space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Layanan Medis</span>
                  <h3 className="text-lg font-black text-[#0b2545]">Rumah Sakit &amp; Klinik</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Fasilitas praktik klinis komprehensif bagi mahasiswa Fakultas Kesehatan (K3, Fisioterapi, Keperawatan) di rumah sakit terkemuka.
                </p>
              </div>
            </div>

          </section>
        )}

        {/* ── TAB 2: DAFTAR KERJASAMA (MOU / MOA) ── */}
        {activeTab === "daftar" && (
          <section className="space-y-8 animate-fadeIn">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>Legalitas &amp; Akuntabilitas</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                  Direktori Kerjasama Resmi (MoU / MoA)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Transparansi direktori nota kesepahaman (Memorandum of Understanding) dan perjanjian kerjasama teknis (Memorandum of Agreement) aktif yang teregistrasi.
                </p>
              </div>

              <Link
                href="/kerjasama/daftar-kerjasama"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all shrink-0 self-start md:self-center group cursor-pointer"
              >
                <span>Buka Direktori Lengkap MoU / MoA</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Cuplikan Dokumen MoU / MoA Terbaru */}
            <div className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
              <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#0b2545] uppercase tracking-wider">
                  Daftar Dokumen MoU / MoA Aktif Terbaru
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Status: 100% Aktif &amp; Tersertifikasi
                </span>
              </div>

              <div className="divide-y divide-slate-100">
                {initialAdminMouList.slice(0, 5).map((mou) => (
                  <div key={mou.id} className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">
                          {mou.documentType}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {mou.startYear} – {mou.endYear}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-[#0b2545]">
                        {mou.partnerName}
                      </h4>
                      <p className="text-xs text-slate-600">
                        Fokus: {mou.scope} • Penandatangan: {mou.signatory}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
                        ✓ {mou.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <Link
                  href="/kerjasama/daftar-kerjasama"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800"
                >
                  <span>Lihat Seluruh Direktori Dokumen MoU / MoA</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </section>
        )}

        {/* ── TAB 3: KEGIATAN KERJASAMA ── */}
        {activeTab === "kegiatan" && (
          <section className="space-y-8 animate-fadeIn">
            
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Program Nyata &amp; Berdampak</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                  Implementasi &amp; Kegiatan Kemitraan
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Realisasi konkrit program kerjasama: rekrutmen kerja langsung sebelum wisuda, program immersion industri 3+1, dan kuliah tamu CEO praktisi.
                </p>
              </div>

              <Link
                href="/kerjasama/kegiatan-kerjasama"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 hover:shadow-lg transition-all shrink-0 self-start md:self-center group cursor-pointer"
              >
                <span>Lihat Semua Kegiatan Kerjasama</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* 3 Program Nyata Kerjasama */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#0b2545]">Immersion Program 3+1</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mahasiswa menjalani 1 tahun penuh di industri nyata Triputra Group dengan uang saku, asuransi, dan bimbingan mentor eksekutif.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                  <span>95% Lulusan Langsung Berkarir</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#0b2545]">Campus Hiring &amp; Fast Track</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Sesi rekrutmen eksklusif di dalam kampus UPITRA bersama korporasi mitra sebelum wisuda kelulusan mahasiswa dilaksanakan.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                  <span>Ratusan Alumni Terserap</span>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-black text-[#0b2545]">Dosen Praktisi Eksekutif</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Para CEO dan General Manager industri mengajar langsung di kelas membagikan studi kasus bisnis nyata dan wawasan industri terkini.
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center text-xs font-bold text-blue-600">
                  <span>Relevansi Kurikulum Nyata</span>
                </div>
              </div>
            </div>

          </section>
        )}

      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
