"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronRight,
  Phone, 
  ExternalLink 
} from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { href: "/profil", label: "Profil" },
  { href: "/akademik", label: "Akademik" },
  { href: "/riset", label: "Riset" },
  { href: "/kemahasiswaan", label: "Kemahasiswaan" },
  { href: "/kerjasama", label: "Kerjasama" },
  { href: "/layanan", label: "Layanan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for sticky shadow elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── MAIN STICKY NAVBAR ── */}
      <header 
        className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 border-b border-slate-100 ${
          isScrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="w-full h-16 flex items-center">
          <div className="w-full max-w-[1440px] mx-auto h-16 px-[clamp(24px,8.8vw,120px)] flex items-center justify-between gap-4">
            
            {/* Logo Sisi Kiri (UPITRA Hexagon Icon + 3 Baris Teks) */}
            <Logo />

            {/* Desktop Navigation Links */}
            <nav className="hidden min-[900px]:flex items-center gap-4 lg:gap-6 xl:gap-8 h-16 text-[12px] lg:text-[13px] font-semibold text-slate-800 tracking-normal">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <div key={link.href} className="relative group h-full flex items-center">
                    <Link
                      href={link.href}
                      className={`transition-colors duration-200 py-1 ${
                        isActive ? "text-[#006bbd] font-semibold" : "text-slate-800 hover:text-[#006bbd]"
                      }`}
                    >
                      {link.label}
                    </Link>
                    {/* Active / hover indicator line at navbar bottom border */}
                    <span 
                      className={`absolute bottom-0 left-0 h-[2.5px] bg-[#006bbd] transition-all duration-200 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`} 
                    />
                  </div>
                );
              })}

              {/* CTA Button */}
              <Link
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="h-6 px-3.5 ml-1 inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-blue-950 font-bold text-[10px] lg:text-[11px] shadow-xs hover:shadow-sm transition-all shrink-0 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Daftar Sekarang</span>
              </Link>
            </nav>

            {/* Mobile Hamburger Button (< 1024px) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              className="cursor-pointer min-[900px]:hidden p-2 rounded-xl text-slate-700 hover:text-[#006bbd] hover:bg-slate-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* ── MOBILE ACCORDION / DRAWER ───────────────────────────────────────── */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="min-[900px]:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden px-6 py-5 space-y-4 max-h-[calc(100vh-64px)] overflow-y-auto"
            >
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-sm font-semibold text-slate-800 hover:bg-blue-50 hover:text-[#006bbd] transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-blue-950 font-bold text-xs shadow-sm hover:from-amber-500 hover:to-orange-600 transition-colors"
                >
                  <span>Daftar Sekarang (PMB Online)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://wa.me/628112907500?text=Halo%20Admisi%20UPITRA%2C%20saya%20ingin%20konsultasi%20informasi%20kampus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 text-blue-800 font-semibold text-xs border border-blue-100 hover:bg-blue-100 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#006bbd]" />
                  <span>Konsultasi WhatsApp Admisi</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
