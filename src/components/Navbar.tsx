"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronDown, 
  ChevronRight,
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  Compass,
  BookOpen,
  Info
} from "lucide-react";

const academicFaculties = [
  {
    id: "fst",
    name: "Faculty Sains & Technology",
    programs: [
      { name: "S1 Informatika", slug: "informatika", degree: "S1" },
      { name: "S1 Sistem Informasi", slug: "sistem-informasi", degree: "S1" },
      { name: "S1 Rekayasa Perangkat Lunak", slug: "rekayasa-perangkat-lunak", degree: "S1" },
    ],
  },
  {
    id: "feb",
    name: "Faculty Ekonomic & Bussiness",
    programs: [
      { name: "S1 Manajemen", slug: "manajemen", degree: "S1" },
      { name: "S1 Akuntansi", slug: "akuntansi", degree: "S1" },
    ],
  },
  {
    id: "fsh",
    name: "Faculty Social Humaniora",
    programs: [
      { name: "S1 Pariwisata", slug: "pariwisata", degree: "S1" },
      { name: "S1 Bahasa Inggris", slug: "bahasa-inggris", degree: "S1" },
    ],
  },
  {
    id: "fh",
    name: "Faculty Health",
    programs: [
      { name: "S1 Kesehatan & Keselamatan Kerja", slug: "kesehatan-dan-keselamatan-kerja", degree: "S1" },
      { name: "S1 Fisioterapi", slug: "fisioterapi", degree: "S1" },
      { name: "D3 Keperawatan", slug: "keperawatan", degree: "D3" },
    ],
  },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
  const [mobileAcademicOpen, setMobileAcademicOpen] = useState(false);
  const [activeFacultyId, setActiveFacultyId] = useState<string>("fst");

  const currentFaculty = academicFaculties.find((f) => f.id === activeFacultyId) || academicFaculties[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-slate-100">
      {/* Top Sub-Header Bar - Minimalist & Sleek */}
      <div className="bg-[#0b2545] text-slate-200 text-[11px] py-1 px-4 sm:px-8 border-b border-blue-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5">
          <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
            <span className="flex items-center gap-1 text-sky-300 font-medium">
              <ShieldCheck className="w-3 h-3 text-sky-400" />
              Akreditasi BAIK SEKALI BAN-PT
            </span>
            <span className="hidden md:inline text-slate-600">|</span>
            <span className="flex items-center gap-1 text-slate-300">
              <MapPin className="w-3 h-3 text-sky-400" />
              Surakarta (Solo), Jawa Tengah
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <a href="tel:08112907500" className="flex items-center gap-1 hover:text-sky-300 transition-colors">
              <Phone className="w-3 h-3 text-sky-400" />
              PMB: 0811-290-7500
            </a>
            <span className="text-slate-600">|</span>
            <Link 
              href="/admin/login" 
              className="flex items-center gap-1 text-slate-300 hover:text-sky-300 transition-colors"
            >
              <User className="w-3 h-3" />
              Portal Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header - Compact & Elegant */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2 flex items-center justify-between">
        {/* Logo Brand UPITRA - persis upitra.ac.id */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-950 to-blue-900 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform duration-200">
            <img
              src="/images/logo.png"
              alt="Logo UPITRA"
              className="w-8 h-8 object-contain drop-shadow-xs"
            />
          </div>
          <div className="flex flex-col">
            <div className="text-base sm:text-lg font-black tracking-tight text-[#0b2545] leading-none group-hover:text-blue-900 transition-colors">
              UPITRA
            </div>
            <div className="text-[8.5px] tracking-wider uppercase font-bold text-blue-600 mt-1">
              Universitas Pignatelli Triputra
            </div>
          </div>
        </Link>

        {/* Desktop Nav Items - Minimalist Typography */}
        <nav className="hidden lg:flex items-center gap-5 text-[12px] font-bold text-slate-700 tracking-normal">
          <Link href="/" className="hover:text-blue-600 transition-colors py-1">
            BERANDA
          </Link>

          {/* 1. TENTANG UPITRA Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 py-1 transition-colors cursor-pointer uppercase">
              TENTANG UPITRA
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50">
              <Link 
                href="/visi-misi" 
                prefetch={true}
                className="block px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
              >
                Visi, Misi & 7 Tujuan Strategis
              </Link>
              <Link 
                href="/pimpinan" 
                prefetch={true}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Pimpinan Universitas (Rektorat)
              </Link>
              <Link 
                href="/life-at-upitra" 
                prefetch={true}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Life at UPITRA (Kehidupan Kampus)
              </Link>
              <Link 
                href="/programs" 
                prefetch={true}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Akreditasi BAIK SEKALI
              </Link>
              <Link 
                href="/life-at-upitra#video-profil" 
                prefetch={true}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Fasilitas & Video Profil Kampus
              </Link>
              <Link 
                href="/mitra-kerjasama" 
                prefetch={true}
                className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Mitra Kerjasama Resmi
              </Link>
            </div>
          </div>

          {/* 2. PROGRAM AKADEMIK - Cascading Flyout 2-Kolom (Sleek) */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 py-1 transition-colors cursor-pointer uppercase group-hover:text-blue-600">
              PROGRAM AKADEMIK
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            
            <div className="absolute top-full left-0 hidden group-hover:flex w-[620px] bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
              {/* Kolom Kiri: 4 Fakultas */}
              <div className="w-[46%] bg-slate-50/90 p-2.5 border-r border-slate-100 space-y-1">
                <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider px-2.5 py-0.5">
                  DAFTAR FAKULTAS
                </div>
                {academicFaculties.map((f) => {
                  const isActive = activeFacultyId === f.id;
                  return (
                    <div
                      key={f.id}
                      onMouseEnter={() => setActiveFacultyId(f.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isActive
                          ? "bg-blue-600 text-white shadow-sm shadow-blue-500/20 translate-x-0.5"
                          : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <span>{f.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? "text-white" : "text-slate-400"}`} />
                    </div>
                  );
                })}
              </div>

              {/* Kolom Kanan: Daftar Program Studi */}
              <div className="w-[54%] p-3 bg-white flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                    <div className="text-[11px] font-extrabold text-[#0b2545]">
                      {currentFaculty.name}
                    </div>
                    <span className="text-[9px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      {currentFaculty.programs.length} Program
                    </span>
                  </div>

                  <div className="space-y-1">
                    {currentFaculty.programs.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/${p.slug}`}
                        className="flex items-center justify-between px-2.5 py-1.5 rounded-lg hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-all group/item"
                      >
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[9px] font-black px-1.5 py-0.5 rounded ${
                            p.degree === "D3" ? "bg-sky-100 text-sky-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {p.degree}
                          </span>
                          <span className="text-xs font-medium group-hover/item:font-bold">
                            {p.name}
                          </span>
                        </div>
                        <ArrowRight className="w-3 h-3 text-slate-300 group-hover/item:text-blue-600 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/programs#${currentFaculty.id}`}
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Detail Fakultas &rarr;
                  </Link>
                  <a
                    href="https://pmb.upitra.ac.id"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-white bg-blue-600 hover:bg-blue-700 px-2.5 py-0.5 rounded-full shadow-sm"
                  >
                    Daftar PMB
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. PENDAFTARAN Dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 hover:text-blue-600 py-1 transition-colors cursor-pointer uppercase">
              PENDAFTARAN
              <ChevronDown className="w-3 h-3 text-slate-400 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block w-64 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50">
              <Link href="/pmb" prefetch={true} className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                Penerimaan Mahasiswa Baru
              </Link>
              <Link href="/pmb#beasiswa" prefetch={true} className="block px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600">
                Beasiswa Triputra Peduli
              </Link>
              <Link href="/ebrochure" prefetch={true} className="block px-3 py-1.5 rounded-lg text-xs font-semibold text-blue-600 hover:bg-blue-50">
                Download E-Brosur UPITRA
              </Link>
              <a 
                href="https://pmb.upitra.ac.id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="block px-3 py-1.5 rounded-lg text-xs font-bold text-blue-600 hover:bg-blue-50"
              >
                Daftar Online Sekarang &rarr;
              </a>
            </div>
          </div>

          <Link href="/mitra-kerjasama" prefetch={true} className="hover:text-blue-600 transition-colors uppercase py-1">
            MITRA
          </Link>
          <Link href="/ebrochure" prefetch={true} className="hover:text-blue-600 transition-colors uppercase py-1">
            E-BROSUR
          </Link>
        </nav>

        {/* Right CTA Button - Sleek & Compact */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://pmb.upitra.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs tracking-normal shadow-sm shadow-blue-500/25 transition-all hover:scale-105"
          >
            <span>DAFTAR SEKARANG</span>
            <ArrowRight className="w-3 h-3 text-sky-200" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-slate-700 hover:text-blue-600"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2.5 max-h-[85vh] overflow-y-auto">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-md font-bold text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600">
            BERANDA
          </Link>
          
          {/* Mobile: TENTANG UPITRA Accordion */}
          <div>
            <button
              onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md font-bold text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            >
              <span>TENTANG UPITRA</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileAboutOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileAboutOpen && (
              <div className="pl-4 pr-2 pt-1.5 space-y-1.5 border-l-2 border-blue-500 ml-3 mt-1">
                <Link
                  href="/visi-misi"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-blue-600 hover:underline py-1"
                >
                  Visi, Misi & 7 Tujuan Strategis
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
                  Life at UPITRA (Kehidupan Kampus)
                </Link>
                <Link
                  href="/programs"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                >
                  Akreditasi BAIK SEKALI
                </Link>
                <Link
                  href="/life-at-upitra#video-profil"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs text-slate-600 hover:text-blue-600 py-1"
                >
                  Fasilitas & Video Profil Kampus
                </Link>
                <Link
                  href="/mitra-kerjasama"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-xs font-semibold text-blue-600 hover:underline py-1"
                >
                  Mitra Kerjasama Resmi
                </Link>
              </div>
            )}
          </div>

          {/* Mobile: PROGRAM AKADEMIK Accordion */}
          <div>
            <button
              onClick={() => setMobileAcademicOpen(!mobileAcademicOpen)}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md font-bold text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            >
              <span>PROGRAM AKADEMIK (4 FAKULTAS)</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mobileAcademicOpen ? "rotate-180" : ""}`} />
            </button>
            {mobileAcademicOpen && (
              <div className="pl-4 pr-2 pt-1.5 space-y-2.5 border-l-2 border-blue-500 ml-3 mt-1">
                {academicFaculties.map((f) => (
                  <div key={f.id} className="space-y-1">
                    <div className="text-[11px] font-bold text-[#0b2545]">{f.name}</div>
                    <div className="space-y-1 pl-2">
                      {f.programs.map((p) => (
                        <Link
                          key={p.slug}
                          href={`/${p.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-blue-600 py-0.5"
                        >
                          <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1 rounded">{p.degree}</span>
                          <span>{p.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link href="/pmb" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-md font-bold text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600">
            PENDAFTARAN & BEASISWA
          </Link>
          <Link href="/mitra-kerjasama" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-md font-bold text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600">
            MITRA KERJASAMA
          </Link>
          <Link href="/ebrochure" onClick={() => setMobileMenuOpen(false)} className="block px-3 py-1.5 rounded-md font-bold text-xs text-slate-800 hover:bg-blue-50 hover:text-blue-600">
            DOWNLOAD E-BROSUR
          </Link>
          <div className="pt-2">
            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-1.5 w-full px-4 py-2.5 rounded-full bg-blue-600 text-white font-bold text-center text-xs shadow-sm hover:bg-blue-700 transition-colors"
            >
              DAFTAR SEKARANG
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
