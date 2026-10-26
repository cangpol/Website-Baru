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
  GraduationCap,
  Sparkles,
  School,
  FileText,
  MessageCircle,
  ExternalLink
} from "lucide-react";

const academicFaculties = [
  {
    id: "fst",
    name: "Fakultas Sains & Teknologi",
    code: "FST",
    programs: [
      { name: "Informatika", slug: "informatika", degree: "S1", title: "S.Kom." },
      { name: "Sistem Informasi", slug: "sistem-informasi", degree: "S1", title: "S.Kom." },
      { name: "Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak", degree: "S1", title: "S.Kom." },
    ],
  },
  {
    id: "feb",
    name: "Fakultas Ekonomi & Bisnis",
    code: "FEB",
    programs: [
      { name: "Manajemen", slug: "manajemen", degree: "S1", title: "S.M." },
      { name: "Akuntansi", slug: "akuntansi", degree: "S1", title: "S.Ak." },
    ],
  },
  {
    id: "fsh",
    name: "Fakultas Sosial & Humaniora",
    code: "FSH",
    programs: [
      { name: "Pariwisata", slug: "pariwisata", degree: "S1", title: "S.Par." },
      { name: "Bahasa Inggris", slug: "bahasa-inggris", degree: "S1", title: "S.S." },
    ],
  },
  {
    id: "fkes",
    name: "Fakultas Kesehatan",
    code: "FKes",
    programs: [
      { name: "Kesehatan & Keselamatan Kerja", slug: "kesehatan-dan-keselamatan-kerja", degree: "S1", title: "S.K3" },
      { name: "Fisioterapi", slug: "fisioterapi", degree: "S1", title: "S.Ft" },
      { name: "Keperawatan", slug: "d3-keperawatan", degree: "D3", title: "A.Md.Kep" },
    ],
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAcademicOpen, setMobileAcademicOpen] = useState(false);
  const [mobileAdmOpen, setMobileAdmOpen] = useState(false);
  const [activeFacultyId, setActiveFacultyId] = useState<string>("fst");

  // Dynamic Scroll Listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentFaculty = academicFaculties.find((f) => f.id === activeFacultyId) || academicFaculties[0];

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
              <span>Akreditasi BAIK SEKALI BAN-PT</span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          
          {/* Brand Mark UPITRA - Proportionate & Prestige */}
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
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-bold text-slate-800 tracking-wide">
            
            <Link 
              href="/" 
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Beranda
            </Link>

            {/* 1. TENTANG UPITRA Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Tentang UPITRA</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>
              
              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/visi-misi" 
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Visi, Misi &amp; Nilai Karakter
                </Link>
                <Link 
                  href="/pimpinan" 
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Pimpinan Universitas (Rektorat)
                </Link>
                <Link 
                  href="/life-at-upitra" 
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Life at UPITRA (Kampus Solo)
                </Link>
                <Link 
                  href="/mitra-kerjasama" 
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Mitra Industri Triputra Group
                </Link>
              </div>
            </div>

            {/* 2. PROGRAM AKADEMIK 2-Column Megamenu */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Program Akademik</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-1/2 -translate-x-1/2 hidden group-hover:flex w-[640px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Left Column: 4 Faculties */}
                <div className="w-[45%] bg-slate-50 p-3 border-r border-slate-100 space-y-1">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-2.5 py-1">
                    Fakultas UPITRA
                  </div>
                  {academicFaculties.map((f) => {
                    const isActive = activeFacultyId === f.id;
                    return (
                      <div
                        key={f.id}
                        onMouseEnter={() => setActiveFacultyId(f.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isActive
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20"
                            : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                        }`}
                      >
                        <span className="truncate">{f.name}</span>
                        <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-white" : "text-slate-400"}`} />
                      </div>
                    );
                  })}
                </div>

                {/* Right Column: Program Studi in Active Faculty */}
                <div className="w-[55%] p-4 bg-white flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div className="text-xs font-black text-[#0b2545]">
                        {currentFaculty.name}
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                        {currentFaculty.programs.length} Prodi
                      </span>
                    </div>

                    <div className="space-y-1">
                      {currentFaculty.programs.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/${p.slug}`}
                          className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all group/item"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-blue-100 text-blue-800">
                              {p.degree}
                            </span>
                            <span className="text-xs font-semibold group-hover/item:text-blue-700">
                              {p.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium group-hover/item:text-blue-600">
                            {p.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                    <Link
                      href="/programs"
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <span>Lihat Seluruh Prodi</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. PENDAFTARAN Dropdown */}
            <div className="relative group">
              <button className="cursor-pointer flex items-center gap-1 hover:text-blue-600 py-1.5 transition-colors group-hover:text-blue-600">
                <span>Pendaftaran PMB</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <Link 
                  href="/pmb" 
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Informasi Jalur Masuk PMB
                </Link>
                <Link 
                  href="/pmb#beasiswa" 
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Beasiswa Triputra Peduli 100%
                </Link>
                <Link 
                  href="/ebrochure" 
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  Unduh E-Brosur UPITRA
                </Link>
                <a 
                  href="https://pmb.upitra.ac.id" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="block px-3 py-2 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Portal Seleksi Online &rarr;
                </a>
              </div>
            </div>

            <Link 
              href="/mitra-kerjasama" 
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              Mitra
            </Link>

            <Link 
              href="/ebrochure" 
              className="hover:text-blue-600 transition-colors py-1.5"
            >
              E-Brosur
            </Link>

          </nav>

          {/* Right Action Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wide shadow-md shadow-blue-500/20 transition-all hover:scale-105"
            >
              <span>DAFTAR PMB 2026/2027</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="cursor-pointer lg:hidden p-2.5 rounded-xl text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
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
            className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 overflow-hidden shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-700"
            >
              Beranda
            </Link>

            {/* Mobile Accordion: Tentang UPITRA */}
            <div className="border-t border-slate-100 pt-2">
              <button
                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Tentang UPITRA</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileAboutOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileAboutOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/visi-misi"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-slate-700 hover:text-blue-600 py-1"
                    >
                      Visi, Misi &amp; Nilai Karakter
                    </Link>
                    <Link
                      href="/pimpinan"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                    >
                      Pimpinan Universitas (Rektorat)
                    </Link>
                    <Link
                      href="/life-at-upitra"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                    >
                      Life at UPITRA (Kampus Solo)
                    </Link>
                    <Link
                      href="/mitra-kerjasama"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                    >
                      Mitra Industri Triputra Group
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion: Program Akademik */}
            <div className="border-t border-slate-100 pt-2">
              <button
                onClick={() => setMobileAcademicOpen(!mobileAcademicOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Program Akademik (4 Fakultas)</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileAcademicOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileAcademicOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-3 pr-2 py-1 space-y-3 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    {academicFaculties.map((f) => (
                      <div key={f.id} className="space-y-1">
                        <div className="text-[11px] font-black text-blue-800 uppercase tracking-wider">
                          {f.name}
                        </div>
                        <div className="space-y-1 pl-1">
                          {f.programs.map((p) => (
                            <Link
                              key={p.slug}
                              href={`/${p.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-between text-xs text-slate-700 hover:text-blue-600 py-1"
                            >
                              <span>{p.name}</span>
                              <span className="text-[10px] text-slate-400 font-bold">{p.degree}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                    <Link
                      href="/programs"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-bold text-blue-600 hover:underline pt-1"
                    >
                      Lihat Semua Program &rarr;
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Accordion: Pendaftaran PMB */}
            <div className="border-t border-slate-100 pt-2">
              <button
                onClick={() => setMobileAdmOpen(!mobileAdmOpen)}
                className="cursor-pointer w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50"
              >
                <span>Pendaftaran PMB &amp; Beasiswa</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${mobileAdmOpen ? "rotate-180 text-blue-600" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileAdmOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="pl-4 pr-2 py-1 space-y-1.5 border-l-2 border-blue-600 ml-3 mt-1 overflow-hidden"
                  >
                    <Link
                      href="/pmb"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs font-semibold text-slate-700 hover:text-blue-600 py-1"
                    >
                      Informasi Jalur Masuk PMB
                    </Link>
                    <Link
                      href="/pmb#beasiswa"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                    >
                      Beasiswa Triputra Peduli 100%
                    </Link>
                    <Link
                      href="/ebrochure"
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                    >
                      Unduh E-Brosur UPITRA
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link 
              href="/mitra-kerjasama" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-700 border-t border-slate-100 pt-2"
            >
              Mitra Industri
            </Link>

            <Link 
              href="/ebrochure" 
              onClick={() => setMobileMenuOpen(false)} 
              className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-700"
            >
              Unduh E-Brosur
            </Link>

            {/* Mobile Action Buttons (Full Width) */}
            <div className="pt-3 space-y-2 border-t border-slate-200">
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/20"
              >
                <span>DAFTAR PMB ONLINE 2026/2027</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20pendaftaran%20PMB"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 text-[#0b2545] font-bold text-xs hover:bg-blue-50 border border-slate-200"
              >
                <MessageCircle className="w-4 h-4 text-blue-600" />
                <span>WhatsApp Admisi: 0811-290-7500</span>
              </a>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
