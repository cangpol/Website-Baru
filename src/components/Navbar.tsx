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
  ArrowRight,
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
  const [mobileRisetOpen, setMobileRisetOpen] = useState(false);
  const [mobileKemahasiswaanOpen, setMobileKemahasiswaanOpen] = useState(false);
  const [mobileKerjasamaOpen, setMobileKerjasamaOpen] = useState(false);
  const [mobileLayananOpen, setMobileLayananOpen] = useState(false);

  // Dynamic Scroll Listener for subtle shadow elevation only (zero height changes)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* MAIN NAVBAR - Fixed Width 1440px & Fixed Height 80px */}
      <header 
        className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-xs"
        }`}
      >
        <div className="w-full h-[80px] flex items-center">
          <div className="w-full max-w-[1440px] mx-auto h-[80px] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
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
          <nav className="hidden xl:flex items-center gap-1.5 2xl:gap-2.5 text-[13px] font-bold text-slate-800 tracking-wide">
            
            {/* 1. PROFIL Dropdown */}
            <Link
              href="/profil"
              className="h-[32px] px-3 max-w-[150px] inline-flex items-center justify-center gap-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            >
              Profil
            </Link>

            {/* 2. AKADEMIK (Tautan Langsung ke /akademik) */}
            <Link
              href="/akademik"
              className="h-[32px] px-3 max-w-[150px] inline-flex items-center justify-center gap-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            >
              Akademik
            </Link>

            {/* 3. RISET Dropdown */}
            <Link
              href="/riset"
              className="h-[32px] px-3 max-w-[150px] inline-flex items-center justify-center gap-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            >
              Riset
            </Link>

            {/* 4. KEMAHASISWAAN Dropdown */}
            <Link
              href="/kemahasiswaan"
              className="h-[32px] px-3 max-w-[150px] inline-flex items-center justify-center gap-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            >
              Kemahasiswaan
            </Link>

            {/* 5. KERJASAMA Dropdown */}
            <Link
              href="/kerjasama"
              className="h-[32px] px-3 max-w-[150px] inline-flex items-center justify-center gap-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            >
              Kerjasama
            </Link>

            {/* 6. LAYANAN Dropdown */}
            <Link
              href="/layanan"
              className="h-[32px] px-3 max-w-[150px] inline-flex items-center justify-center gap-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 transition-colors"
            >
              Layanan
            </Link>

            {/* 7. CTA DAFTAR SEKARANG (Kuning Oranye, Hug Width 150px & Fixed Height 32px) */}
            <Link
              href="https://pmb.upitra.ac.id"
              className="h-[32px] px-4 max-w-[150px] inline-flex items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-sm shadow-orange-500/20 hover:shadow-orange-500/30 transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Daftar Sekarang</span>
            </Link>

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
            {/* Mobile CTA: Daftar Sekarang */}
            <div className="pb-1">
              <Link
                href="https://pmb.upitra.ac.id"
                onClick={() => setMobileMenuOpen(false)}
                className="h-[38px] w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 active:scale-95 transition-all"
              >
                <span>Daftar Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Mobile Accordion 1: Profil */}
            <div className="border-t border-slate-100 pt-1.5">
              <Link
                href="/profil"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Profil
              </Link>
            </div>

            {/* Mobile Link: Akademik */}
            <div className="border-t border-slate-100 pt-1.5">
              <Link
                href="/akademik"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Akademik
              </Link>
            </div>

            {/* Mobile Accordion 3: Riset */}
            <div className="border-t border-slate-100 pt-1.5">
              <Link
                href="/riset"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Riset
              </Link>
            </div>

            {/* Mobile Accordion 4: Kemahasiswaan */}
            <div className="border-t border-slate-100 pt-1.5">
              <Link
                href="/kemahasiswaan"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Kemahasiswaan
              </Link>
            </div>

            {/* Mobile Accordion 5: Kerjasama */}
            <div className="border-t border-slate-100 pt-1.5">
              <Link
                href="/kerjasama"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Kerjasama
              </Link>
            </div>

            {/* Mobile Accordion 6: Layanan */}
            <div className="border-t border-slate-100 pt-1.5">
              <Link
                href="/layanan"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-xl font-bold text-sm text-[#0b2545] hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Layanan
              </Link>
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
    </>
  );
}
