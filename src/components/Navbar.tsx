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
          
          {/* Brand Mark UPITRA */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#06172e] to-[#0b2545] flex items-center justify-center p-1.5 shadow-sm group-hover:scale-105 transition-transform duration-300 border border-blue-900/30">
              <img
                src="/images/logo.png"
                alt="Logo UPITRA"
                className="w-full h-full object-contain drop-shadow-xs"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tight text-[#0b2545] leading-none group-hover:text-blue-700 transition-colors">
                UPITRA
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest uppercase font-bold text-blue-700 mt-1 leading-none">
                Universitas Pignatelli Triputra
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-4 2xl:gap-5 text-[13px] font-bold text-slate-800 tracking-wide">
            
            <Link 
              href="/" 
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Beranda
            </Link>

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

          {/* Right Action Button - Desktop */}
          <div className="hidden xl:flex items-center gap-3 shrink-0">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <span>DAFTAR PMB</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

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
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-700"
            >
              Beranda
            </Link>

            {/* Mobile Accordion 1: Profil */}
            <div className="border-t border-slate-100 pt-1.5">
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

            {/* Mobile Action Buttons (Full Width) */}
            <div className="pt-3 space-y-2 border-t border-slate-200">
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 active:scale-95 transition-transform"
              >
                <span>DAFTAR PMB ONLINE 2026/2027</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20pendaftaran%20PMB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-[#0b2545] font-bold text-xs hover:bg-blue-50 border border-slate-200 active:scale-95 transition-transform"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>WhatsApp Admisi: 0811-290-7500</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
