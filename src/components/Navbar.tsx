"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  User,
  ExternalLink,
  Building2,
  Cpu,
  Briefcase,
  Globe,
  Stethoscope,
  Microscope,
  Users,
  Handshake,
  BookOpen,
  Sparkles
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mobile Accordion States
  const [mobileProfilOpen, setMobileProfilOpen] = useState(false);
  const [mobileAkademikOpen, setMobileAkademikOpen] = useState(false);
  const [mobileRisetOpen, setMobileRisetOpen] = useState(false);
  const [mobileKemahasiswaanOpen, setMobileKemahasiswaanOpen] = useState(false);
  const [mobileKerjasamaOpen, setMobileKerjasamaOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);

  // Dynamic Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      
      {/* 1. TOP SUB-HEADER BAR - Compact, Clean & Responsive */}
      <div 
        className={`bg-[#06172e] text-slate-200 transition-all duration-300 overflow-hidden border-b border-blue-950 ${
          isScrolled ? "h-0 py-0 opacity-0" : "h-auto py-1.5 opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center text-[11px] sm:text-xs">
          
          {/* Left: Accreditation & Location */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-sky-300 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Akreditasi Institusi BAIK SEKALI BAN-PT</span>
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>Surakarta (Solo), Jawa Tengah</span>
            </span>
          </div>

          {/* Right: PMB Hotline & Admin Portal */}
          <div className="flex items-center gap-3">
            <a 
              href="https://wa.me/628112907500" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-slate-200 hover:text-sky-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>PMB: <strong>0811-290-7500</strong></span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <Link 
              href="/admin/login" 
              className="hidden sm:inline-flex items-center gap-1 text-slate-300 hover:text-sky-300 transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Portal Admin</span>
            </Link>
          </div>

        </div>
      </div>

      {/* 2. MAIN NAVBAR - Fluid, Dynamic & Flexible */}
      <div 
        className={`w-full bg-white/95 backdrop-blur-md transition-all duration-300 border-b border-slate-200/80 ${
          isScrolled ? "py-2 shadow-md" : "py-3 shadow-xs"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          
          {/* Brand Mark UPITRA - 3D White Badge & Refined Authoritative Typography */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0" aria-label="UPITRA Beranda">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white p-1.5 sm:p-2 flex items-center justify-center shadow-[0_10px_25px_-4px_rgba(6,23,46,0.18),0_4px_10px_-2px_rgba(6,23,46,0.08),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.04)] border border-slate-100/90 ring-1 ring-slate-900/5 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_32px_-4px_rgba(6,23,46,0.22),0_6px_12px_-2px_rgba(6,23,46,0.1)] transition-all duration-300 shrink-0">
              <img
                src="/images/logo.png"
                alt="Logo UPITRA"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(6,23,46,0.22)] drop-shadow-[0_1px_2px_rgba(6,23,46,0.15)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="text-lg sm:text-2xl font-black tracking-[0.16em] text-[#06172e] uppercase font-sans drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)] group-hover:text-blue-700 transition-colors leading-none">
                  UPITRA
                </span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-blue-600/70" />
              </div>
              <span className="text-[8px] sm:text-[9.5px] font-bold tracking-[0.24em] text-blue-900/90 uppercase mt-1 leading-none">
                Universitas Pignatelli Triputra
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-5 2xl:gap-7 text-[13px] font-bold text-slate-800 tracking-wide">
            
            {/* 1. PROFIL Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Profil</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/profil/tentang-upitra" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Tentang UPITRA
                </Link>
                <Link 
                  href="/profil/visi-misi-tujuan" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Visi Misi Tujuan
                </Link>
                <Link 
                  href="/profil/pimpinan-universitas" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Pimpinan Universitas
                </Link>
                <Link 
                  href="/profil/berita-kampus" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Berita Kampus
                </Link>
                <Link 
                  href="/profil/pengumuman" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Pengumuman
                </Link>
                <Link 
                  href="/profil/prestasi-dan-capaian" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Prestasi &amp; Capaian
                </Link>
              </div>
            </div>

            {/* 2. AKADEMIK Dropdown (4 Fakultas Langsung) */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Akademik</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/fst" 
                  className="block px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors group/item"
                >
                  <div className="text-xs font-bold text-[#0b2545] group-hover/item:text-blue-700 flex items-center justify-between">
                    <span>Fakultas Sains &amp; Teknologi</span>
                    <span className="text-[10px] text-blue-600 font-mono">FST</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Informatika, SI, Rekayasa Perangkat Lunak
                  </div>
                </Link>

                <Link 
                  href="/feb" 
                  className="block px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors group/item"
                >
                  <div className="text-xs font-bold text-[#0b2545] group-hover/item:text-blue-700 flex items-center justify-between">
                    <span>Fakultas Ekonomi &amp; Bisnis</span>
                    <span className="text-[10px] text-blue-600 font-mono">FEB</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Manajemen, Akuntansi
                  </div>
                </Link>

                <Link 
                  href="/fsh" 
                  className="block px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors group/item"
                >
                  <div className="text-xs font-bold text-[#0b2545] group-hover/item:text-blue-700 flex items-center justify-between">
                    <span>Fakultas Sosial Humaniora</span>
                    <span className="text-[10px] text-blue-600 font-mono">FSH</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    Pariwisata, Bahasa Inggris
                  </div>
                </Link>

                <Link 
                  href="/fkes" 
                  className="block px-3 py-2 rounded-xl hover:bg-blue-50 transition-colors group/item"
                >
                  <div className="text-xs font-bold text-[#0b2545] group-hover/item:text-blue-700 flex items-center justify-between">
                    <span>Fakultas Kesehatan</span>
                    <span className="text-[10px] text-blue-600 font-mono">FKes</span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    K3, Fisioterapi, D3 Keperawatan
                  </div>
                </Link>

                <div className="pt-2 mt-1 border-t border-slate-100 px-3">
                  <Link 
                    href="/akademik" 
                    className="text-[11px] font-bold text-blue-600 hover:text-blue-800 flex items-center justify-between"
                  >
                    <span>Portal Akademik Utama</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. RISET Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Riset</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/riset/pusat-penelitian-dan-publikasi" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Pusat Penelitian &amp; Publikasi
                </Link>
              </div>
            </div>

            {/* 4. KEMAHASISWAAN Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Kemahasiswaan</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-72 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/kemahasiswaan/tugas-dan-fungsi" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Tugas dan Fungsi Kemahasiswaan
                </Link>
                <Link 
                  href="/kemahasiswaan/program-pengembangan" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Program Pengembangan Mahasiswa
                </Link>
                <Link 
                  href="/kemahasiswaan/organisasi-mahasiswa" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Organisasi Mahasiswa (Ormawa)
                </Link>
                <Link 
                  href="/kemahasiswaan/prestasi-mahasiswa" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Prestasi Mahasiswa
                </Link>
                <Link 
                  href="/kemahasiswaan/galeri-kegiatan" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Galeri Kegiatan Mahasiswa
                </Link>
                <Link 
                  href="/kemahasiswaan/kalender-akademik" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Kalender Akademik
                </Link>
              </div>
            </div>

            {/* 5. KERJASAMA Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Kerjasama</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/kerjasama/mitra-kerjasama" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Mitra Kerjasama
                </Link>
                <Link 
                  href="/kerjasama/daftar-kerjasama" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Daftar Kerjasama (MoU/MoA)
                </Link>
                <Link 
                  href="/kerjasama/kegiatan-kerjasama" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Kegiatan Kerjasama
                </Link>
              </div>
            </div>

            {/* 6. LAYANAN Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Layanan</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full right-0 hidden group-hover:block w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/layanan/perpustakaan" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Perpustakaan
                </Link>
                <Link 
                  href="/layanan/e-learning" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  E-Learning (LMS)
                </Link>
                <Link 
                  href="/layanan/career-center" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Career Center (CDC)
                </Link>
                <Link 
                  href="/layanan/tracer-study" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Tracer Studi
                </Link>
                <Link 
                  href="/layanan/immersion-program" 
                  className="block px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Immersion Program
                </Link>
              </div>
            </div>

          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="cursor-pointer xl:hidden p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* 3. MOBILE DRAWER WITH FRAMER MOTION ANIMATION */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="xl:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2.5 overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Mobile Accordion 1: Profil */}
            <div>
              <button
                onClick={() => setMobileProfilOpen(!mobileProfilOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Profil</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileProfilOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileProfilOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/profil/tentang-upitra"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Tentang UPITRA
                    </Link>
                    <Link
                      href="/profil/visi-misi-tujuan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Visi Misi Tujuan
                    </Link>
                    <Link
                      href="/profil/pimpinan-universitas"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Pimpinan Universitas
                    </Link>
                    <Link
                      href="/profil/berita-kampus"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Berita Kampus
                    </Link>
                    <Link
                      href="/profil/pengumuman"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Pengumuman
                    </Link>
                    <Link
                      href="/profil/prestasi-dan-capaian"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Prestasi &amp; Capaian
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion 2: Akademik */}
            <div className="border-t border-slate-100 pt-1.5">
              <button
                onClick={() => setMobileAkademikOpen(!mobileAkademikOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Akademik (Fakultas)</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileAkademikOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileAkademikOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/fst"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Fakultas Sains &amp; Teknologi (FST)
                    </Link>
                    <Link
                      href="/feb"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Fakultas Ekonomi &amp; Bisnis (FEB)
                    </Link>
                    <Link
                      href="/fsh"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Fakultas Sosial Humaniora (FSH)
                    </Link>
                    <Link
                      href="/fkes"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Fakultas Kesehatan (FKes)
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion 3: Riset */}
            <div className="border-t border-slate-100 pt-1.5">
              <button
                onClick={() => setMobileRisetOpen(!mobileRisetOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Riset</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileRisetOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileRisetOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/riset/pusat-penelitian-dan-publikasi"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Pusat Penelitian &amp; Publikasi
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion 4: Kemahasiswaan */}
            <div className="border-t border-slate-100 pt-1.5">
              <button
                onClick={() => setMobileKemahasiswaanOpen(!mobileKemahasiswaanOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Kemahasiswaan</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileKemahasiswaanOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileKemahasiswaanOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/kemahasiswaan/tugas-dan-fungsi"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Tugas dan Fungsi Kemahasiswaan
                    </Link>
                    <Link
                      href="/kemahasiswaan/program-pengembangan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Program Pengembangan Mahasiswa
                    </Link>
                    <Link
                      href="/kemahasiswaan/organisasi-mahasiswa"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Organisasi Mahasiswa (Ormawa)
                    </Link>
                    <Link
                      href="/kemahasiswaan/prestasi-mahasiswa"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Prestasi Mahasiswa
                    </Link>
                    <Link
                      href="/kemahasiswaan/galeri-kegiatan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Galeri Kegiatan Mahasiswa
                    </Link>
                    <Link
                      href="/kemahasiswaan/kalender-akademik"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Kalender Akademik
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion 5: Kerjasama */}
            <div className="border-t border-slate-100 pt-1.5">
              <button
                onClick={() => setMobileKerjasamaOpen(!mobileKerjasamaOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Kerjasama</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileKerjasamaOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileKerjasamaOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/kerjasama/mitra-kerjasama"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Mitra Kerjasama
                    </Link>
                    <Link
                      href="/kerjasama/daftar-kerjasama"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Daftar Kerjasama (MoU/MoA)
                    </Link>
                    <Link
                      href="/kerjasama/kegiatan-kerjasama"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Kegiatan Kerjasama
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion 6: Layanan */}
            <div className="border-t border-slate-100 pt-1.5">
              <button
                onClick={() => setMobileLayananOpen(!mobileLayananOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Layanan</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileLayananOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileLayananOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/layanan/perpustakaan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Perpustakaan
                    </Link>
                    <Link
                      href="/layanan/e-learning"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      E-Learning (LMS)
                    </Link>
                    <Link
                      href="/layanan/career-center"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Career Center (CDC)
                    </Link>
                    <Link
                      href="/layanan/tracer-study"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Tracer Studi
                    </Link>
                    <Link
                      href="/layanan/immersion-program"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-medium text-slate-700 hover:text-blue-600 py-1"
                    >
                      Immersion Program
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Contact & Hotline */}
            <div className="pt-3 border-t border-slate-200">
              <a
                href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20informasi%20kampus"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-[#0b2545] font-bold text-xs hover:bg-blue-50 border border-slate-200 active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>WhatsApp Hotline Admisi: 0811-290-7500</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
