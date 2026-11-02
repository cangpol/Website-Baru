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
          
          {/* Brand Mark UPITRA - Logo Icon & 3-Line Authoritative Typography */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0" aria-label="UPITRA Beranda">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-xs border border-slate-100 ring-1 ring-slate-900/5 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <img
                src="/images/logo.png"
                alt="Logo UPITRA"
                className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(6,23,46,0.18)]"
              />
            </div>
            <div className="flex flex-col justify-center leading-tight">
              <span className="text-[10px] sm:text-[11.5px] font-black tracking-[0.08em] text-[#06172e] uppercase font-sans leading-[1.1]">
                UNIVERSITAS
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-black tracking-[0.08em] text-[#06172e] uppercase font-sans leading-[1.1]">
                PIGNATELLI
              </span>
              <span className="text-[10px] sm:text-[11.5px] font-black tracking-[0.08em] text-[#06172e] uppercase font-sans leading-[1.1]">
                TRIPUTRA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-2 2xl:gap-3 text-[14px] text-slate-800 tracking-normal">
            
            {/* 1. PROFIL with active blue underline indicator */}
            <div className="relative flex flex-col items-center">
              <Link
                href="/profil"
                className="h-[36px] px-3.5 inline-flex items-center justify-center rounded-lg text-slate-800 font-bold hover:text-blue-700 transition-colors"
              >
                Profil
              </Link>
              <div className="absolute -bottom-[22px] inset-x-2 h-[3px] bg-blue-600 rounded-full" />
            </div>

            {/* 2. AKADEMIK */}
            <Link
              href="/akademik"
              className="h-[36px] px-3.5 inline-flex items-center justify-center rounded-lg text-slate-700 font-semibold hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              Akademik
            </Link>

            {/* 3. RISET */}
            <Link
              href="/riset"
              className="h-[36px] px-3.5 inline-flex items-center justify-center rounded-lg text-slate-700 font-semibold hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              Riset
            </Link>

            {/* 4. KEMAHASISWAAN */}
            <Link
              href="/kemahasiswaan"
              className="h-[36px] px-3.5 inline-flex items-center justify-center rounded-lg text-slate-700 font-semibold hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              Kemahasiswaan
            </Link>

            {/* 5. KERJASAMA */}
            <Link
              href="/kerjasama"
              className="h-[36px] px-3.5 inline-flex items-center justify-center rounded-lg text-slate-700 font-semibold hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              Kerjasama
            </Link>

            {/* 6. LAYANAN */}
            <Link
              href="/layanan"
              className="h-[36px] px-3.5 inline-flex items-center justify-center rounded-lg text-slate-700 font-semibold hover:text-blue-700 hover:bg-slate-50 transition-colors"
            >
              Layanan
            </Link>

            {/* 7. CTA DAFTAR SEKARANG (Yellow Button matching Figma) */}
            <Link
              href="https://pmb.upitra.ac.id"
              className="h-[38px] px-5 ml-2 inline-flex items-center justify-center rounded-xl bg-[#FFD400] hover:bg-[#F2C900] text-slate-900 font-bold text-xs sm:text-[13px] shadow-xs hover:shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
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
