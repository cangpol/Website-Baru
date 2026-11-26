"use client";

import { useState } from "react";
import Link from "next/link";
import { ProdiData } from "@/lib/prodiData";
import { facultyGroupedPrograms } from "@/lib/prodiThemes";
import { Menu, X, ChevronDown, ArrowRight, Home, Layers, Check } from "lucide-react";

// Menu utama dibuat sedikit agar navbar lega; sisanya ada di "Lainnya".
const MAIN_MENU = [
  { label: "Profil", href: "#ringkasan" },
  { label: "Dosen", href: "#dosen" },
  { label: "Kurikulum", href: "#kurikulum" },
  { label: "Prospek Karir", href: "#karir" },
  { label: "Beasiswa & Admisi", href: "#biaya" },
];
const MORE_MENU = [
  { label: "Peminatan", href: "#peminatan" },
  { label: "Fasilitas Lab", href: "#fasilitas" },
  { label: "FAQ", href: "#faq" },
];
const PMB_BUTTON = "bg-[#006bbd] hover:bg-[#00589b] text-white";

interface ProdiNavbarProps {
  prodi: ProdiData;
}

export default function ProdiNavbar({ prodi }: ProdiNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [switchDropdownOpen, setSwitchDropdownOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const navMenuItems = [...MAIN_MENU, ...MORE_MENU];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Brand UPITRA */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group" aria-label="UPITRA Beranda">
            <div className="w-10 h-10 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-[0_10px_25px_-4px_rgba(6,23,46,0.18),0_4px_10px_-2px_rgba(6,23,46,0.08),inset_0_1px_1px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,0,0,0.04)] border border-slate-100 ring-1 ring-slate-900/5 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_-4px_rgba(6,23,46,0.22)] transition-all duration-300 shrink-0">
              <img
                src="/images/logo.png"
                alt="Logo UPITRA"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_6px_rgba(6,23,46,0.22)] drop-shadow-[0_1px_2px_rgba(6,23,46,0.15)] group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-lg sm:text-xl font-black tracking-[0.16em] text-[#06172e] uppercase font-sans leading-none drop-shadow-[0_1px_1px_rgba(0,0,0,0.06)] group-hover:text-blue-700 transition-colors">
                UPITRA
              </div>
              <div className="text-[8px] sm:text-[9px] tracking-[0.24em] uppercase font-bold text-blue-900/90 mt-1 leading-none">
                Pignatelli Triputra
              </div>
            </div>
          </Link>
        </div>

        {/* Menu bagian halaman (layar lebar) */}
        <nav aria-label="Bagian halaman" className="hidden xl:flex items-center gap-1">
          {MAIN_MENU.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-lg text-[13px] font-semibold text-slate-700 hover:text-[#006bbd] hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <div className="relative">
            <button
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(!moreOpen)}
              onBlur={() => setTimeout(() => setMoreOpen(false), 250)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-semibold text-slate-700 hover:text-[#006bbd] hover:bg-blue-50 transition-colors cursor-pointer"
            >
              Lainnya
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${moreOpen ? "rotate-180" : ""}`} />
            </button>
            {moreOpen && (
              <div className="absolute left-0 top-full z-50 mt-2 w-44 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                {MORE_MENU.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className="block rounded-lg px-3 py-2 text-[13px] font-semibold text-slate-700 hover:bg-blue-50 hover:text-[#006bbd]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Right: Switch Prodi Dropdown + CTA Button */}
        <div className="ml-auto hidden md:flex items-center gap-2.5 xl:ml-0">
          
          {/* Switch Prodi Grouped Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSwitchDropdownOpen(!switchDropdownOpen)}
              onBlur={() => setTimeout(() => setSwitchDropdownOpen(false), 250)}
              className="flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 rounded-xl text-[13px] font-semibold text-slate-700 hover:text-[#006bbd] hover:bg-blue-50 border border-slate-200 transition-colors cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Ganti Prodi</span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${switchDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {switchDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    PILIH DARI 10 PROGRAM STUDI
                  </span>
                  <Link 
                    href="/programs" 
                    className="text-[10px] font-bold text-blue-600 hover:underline"
                  >
                    Semua Fakultas &rarr;
                  </Link>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                  {facultyGroupedPrograms.map((fac) => (
                    <div key={fac.facultyCode} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider px-1">
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-black border bg-blue-50 text-[#006bbd] border-blue-200`}>
                          {fac.facultyCode}
                        </span>
                        <span>{fac.facultyName}</span>
                      </div>

                      <div className="space-y-0.5 pl-1">
                        {fac.programs.map((pItem) => {
                          const isCurrent = pItem.slug === prodi.slug;
                          return (
                            <Link
                              key={pItem.slug}
                              href={`/${pItem.slug}`}
                              onClick={() => setSwitchDropdownOpen(false)}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                                isCurrent
                                  ? "bg-blue-50 font-black text-blue-700 border border-blue-200"
                                  : "font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                              }`}
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="text-[9px] font-bold px-1 bg-slate-100 rounded text-slate-500">
                                  {pItem.degree}
                                </span>
                                <span className="line-clamp-1">{pItem.name}</span>
                              </div>
                              {isCurrent && (
                                <span className="flex items-center gap-0.5 text-[9px] font-extrabold text-blue-600 bg-blue-100 px-1.5 py-0.2 rounded">
                                  <Check className="w-2.5 h-2.5" />
                                  Aktif
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PMB Direct CTA Button */}
          <a
            href="https://pmb.upitra.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-[13px] font-bold shadow-sm transition-colors ${PMB_BUTTON}`}
          >
            Daftar PMB
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="https://pmb.upitra.ac.id"
            target="_blank"
            rel="noopener noreferrer"
            className={`md:hidden px-3 py-1.5 rounded-lg text-xs font-bold ${PMB_BUTTON}`}
          >
            Daftar
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-4 max-h-[85vh] overflow-y-auto">
          
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Program Studi Aktif:
            </div>
            <div className="text-sm font-black text-[#0b2545] mt-0.5">
              {prodi.name} ({prodi.degreeTitle})
            </div>
            <div className="text-[11px] text-slate-500">
              {prodi.faculty.name}
            </div>
          </div>

          {/* Navigation Section Anchor Links */}
          <div className="space-y-1 text-xs font-bold text-slate-700 uppercase">
            <div className="text-[10px] text-slate-400 font-extrabold tracking-wider px-2 pt-1">
              NAVIGASI HALAMAN {prodi.name}
            </div>
            {navMenuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Switch to Other Prodi Section */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <div className="text-[10px] text-slate-400 font-extrabold tracking-wider px-2 uppercase">
              PILIH PROGRAM STUDI LAIN
            </div>
            <div className="space-y-2">
              {facultyGroupedPrograms.map((fac) => (
                <div key={fac.facultyCode} className="space-y-1">
                  <div className="text-[10px] font-black text-slate-500 uppercase px-2">
                    {fac.facultyCode} - {fac.facultyName}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                    {fac.programs.map((pItem) => (
                      <Link
                        key={pItem.slug}
                        href={`/${pItem.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-2 rounded-lg border text-left transition-colors ${
                          pItem.slug === prodi.slug
                            ? "bg-blue-50 border-blue-200 text-blue-700 font-bold"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <div className="text-[9px] text-slate-400">{pItem.degree}</div>
                        <div className="font-bold text-[11px] line-clamp-1">{pItem.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action Links */}
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Utama</span>
            </Link>

            <a
              href="https://pmb.upitra.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className={`w-full flex items-center justify-center gap-1.5 py-3 rounded-xl font-black text-xs text-center uppercase tracking-wider ${PMB_BUTTON}`}
            >
              <span>DAFTAR PMB SEKARANG</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      )}

    </header>
  );
}
