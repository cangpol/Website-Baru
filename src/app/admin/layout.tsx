"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  BarChart3, 
  GraduationCap, 
  Building2, 
  Sliders, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Clock, 
  Camera, 
  ChevronDown,
  Info,
  Microscope,
  Award,
  Handshake,
} from "lucide-react";
import Image from "next/image";

interface AdminUserSession {
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

interface NavSubItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  icon: any;
  defaultOpen?: boolean;
  items: NavSubItem[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AdminUserSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    "Profil Kampus": true,
    "Akademik & Fakultas": true,
    "Kerjasama": true,
  });

  // Toggle accordion group
  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Cek otorisasi sesi admin
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("upitra_admin_session");
    if (!saved) {
      router.push("/u-gate");
    } else {
      try {
        setSession(JSON.parse(saved));
      } catch {
        router.push("/u-gate");
      }
    }

    // Jam Real-Time
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "short",
          year: "numeric",
        }) + " • " + now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" }) + " WIB"
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("upitra_admin_session");
      document.cookie = "upitra_admin_auth=; path=/; max-age=0";
    }
    router.push("/u-gate");
  };

  // Navigasi Terstruktur Sesuai Navbar Depan 1:1 + Fitur Admin
  const navSections: NavSection[] = [
    {
      title: "Profil Kampus",
      icon: Info,
      items: [
        { label: "Tentang UPITRA", href: "/admin/profil?tab=tentang" },
        { label: "Visi Misi Tujuan", href: "/admin/profil?tab=visi-misi" },
        { label: "Pimpinan Universitas", href: "/admin/profil?tab=pimpinan" },
        { label: "Berita Kampus", href: "/admin/berita?tab=berita" },
        { label: "Pengumuman", href: "/admin/berita?tab=pengumuman" },
        { label: "Prestasi & Capaian", href: "/admin/profil?tab=prestasi" },
      ],
    },
    {
      title: "Akademik & Fakultas",
      icon: GraduationCap,
      items: [
        { label: "Fakultas Sains & Teknologi (FST)", href: "/admin/prodi?fakultas=FST" },
        { label: "Fakultas Ekonomi & Bisnis (FEB)", href: "/admin/prodi?fakultas=FEB" },
        { label: "Fakultas Sosial Humaniora (FSH)", href: "/admin/prodi?fakultas=FSH" },
        { label: "Fakultas Kesehatan (FKes)", href: "/admin/prodi?fakultas=FKES" },
        { label: "Semua 10 Program Studi", href: "/admin/prodi", badge: "10 Prodi" },
      ],
    },
    {
      title: "Riset & Inovasi",
      icon: Microscope,
      items: [
        { label: "Pusat Penelitian & Publikasi", href: "/admin/riset" },
      ],
    },
    {
      title: "Kemahasiswaan",
      icon: Award,
      items: [
        { label: "Tugas & Fungsi", href: "/admin/kemahasiswaan?tab=tugas-fungsi" },
        { label: "Program Pengembangan", href: "/admin/kemahasiswaan?tab=pengembangan" },
        { label: "Organisasi Mahasiswa (Ormawa)", href: "/admin/kemahasiswaan?tab=ormawa" },
        { label: "Prestasi Mahasiswa", href: "/admin/kemahasiswaan?tab=prestasi" },
        { label: "Galeri Kegiatan", href: "/admin/kemahasiswaan?tab=galeri" },
        { label: "Kalender Akademik", href: "/admin/kemahasiswaan?tab=kalender" },
      ],
    },
    {
      title: "Kerjasama",
      icon: Handshake,
      items: [
        { label: "Mitra Kerjasama", href: "/admin/mitra", badge: "49 Mitra" },
        { label: "Daftar Kerjasama (MoU/MoA)", href: "/admin/kerjasama?tab=mou" },
        { label: "Kegiatan Kerjasama", href: "/admin/kerjasama?tab=kegiatan" },
      ],
    },
    {
      title: "Layanan Kampus",
      icon: Building2,
      items: [
        { label: "Perpustakaan", href: "/admin/layanan?unit=perpustakaan" },
        { label: "E-Learning (LMS)", href: "/admin/layanan?unit=elearning" },
        { label: "Career Center (CDC)", href: "/admin/layanan?unit=career-center" },
        { label: "Tracer Study", href: "/admin/layanan?unit=tracer-study" },
        { label: "Immersion Program", href: "/admin/layanan?unit=immersion" },
      ],
    },
    {
      title: "Admisi & Beranda",
      icon: Sliders,
      items: [
        { label: "Pendaftaran PMB & Leads", href: "/admin/pmb-leads", badge: "PMB" },
        { label: "Banner Hero Beranda", href: "/admin/banner-hero" },
      ],
    },
    {
      title: "Integrasi & Sistem",
      icon: Camera,
      items: [
        { label: "Sinkronisasi Instagram", href: "/admin/instagram-sync", badge: "Login IG" },
        { label: "Pengguna & Hak Akses", href: "/admin/users" },
      ],
    },
  ];

  if (!mounted || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-sky-50 flex flex-col items-center justify-center text-[#06172e] font-sans">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-200 flex items-center justify-center text-blue-600 animate-spin mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-xs font-bold tracking-wider text-slate-600 uppercase">
          Memverifikasi Akses Gateway UPITRA...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. DESKTOP PERMANENT SIDEBAR - Executive Imperial Navy UPITRA */}
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 bg-[#06172e] border-r border-blue-950 shadow-2xl z-30">
        
        {/* Brand Header */}
        <div className="p-4 border-b border-blue-950/80 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white p-1.5 shadow-md border border-slate-100 ring-1 ring-blue-50 flex items-center justify-center shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo UPITRA"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                <span>UPITRA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold uppercase tracking-wider">
                  Admin
                </span>
              </div>
              <div className="text-[10px] text-sky-200/70 font-medium">
                Pusat Kendali Institusi
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
          
          {/* Top Link: Overview Pengunjung */}
          <div>
            <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-sky-300/60 mb-1.5">
              INTELIJEN ANALITIK
            </div>
            <Link
              href="/admin"
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                pathname === "/admin"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <BarChart3 className={`w-4 h-4 shrink-0 ${pathname === "/admin" ? "text-white" : "text-sky-400"}`} />
                <span className="truncate">Overview Pengunjung</span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Live
              </span>
            </Link>
          </div>

          {/* Collapsible Sections matching Navbar & Dropdowns */}
          <div>
            <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-sky-300/60 mb-2">
              MENU UTAMA & DROPDOWN CRUD
            </div>

            <div className="space-y-1.5">
              {navSections.map((section, sIdx) => {
                const Icon = section.icon;
                const isOpen = openSections[section.title] ?? false;
                const isSectionActive = section.items.some((it) => pathname === it.href.split("?")[0]);

                return (
                  <div key={sIdx} className="rounded-xl border border-blue-900/40 overflow-hidden bg-blue-950/30">
                    {/* Accordion Header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.title)}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold transition-colors cursor-pointer ${
                        isSectionActive
                          ? "text-sky-300 bg-blue-900/50"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className="w-4 h-4 text-sky-400 shrink-0" />
                        <span className="truncate">{section.title}</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Body (Submenus) */}
                    {isOpen && (
                      <div className="px-2 py-1.5 space-y-0.5 border-t border-blue-900/30 bg-[#040e1e]/60">
                        {section.items.map((sub, subIdx) => {
                          const isSubActive = pathname === sub.href.split("?")[0];
                          return (
                            <Link
                              key={subIdx}
                              href={sub.href}
                              className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-all group ${
                                isSubActive
                                  ? "bg-blue-600 text-white font-semibold shadow-xs"
                                  : "text-slate-300 hover:text-white hover:bg-white/10"
                              }`}
                            >
                              <span className="truncate">• {sub.label}</span>
                              {sub.badge && (
                                <span className="text-[8.5px] px-1.5 py-0.2 rounded font-bold uppercase bg-blue-500/20 text-sky-200 border border-blue-400/30 shrink-0">
                                  {sub.badge}
                                </span>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* User Card in Sidebar Footer */}
        <div className="p-3.5 border-t border-blue-950 bg-[#040e1e]/90">
          <div className="flex items-center justify-between gap-2.5">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                {session.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {session.name}
                </div>
                <div className="text-[9.5px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{session.role}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar dari sesi admin (/u-gate)"
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* 2. MAIN VIEWPORT & TOPBAR */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 text-slate-800">
        
        {/* Top Header Bar - Crisp Pure White */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200/90 shadow-2xs px-4 sm:px-6 flex items-center justify-between z-20">
          
          {/* Left: Mobile Drawer Trigger & Clock */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#06172e] bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-200/80">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentTime || "Sinkronisasi waktu..."}</span>
            </div>
          </div>

          {/* Right: Live Status, Quick Links & Logout */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>26 Pengunjung Online</span>
            </div>

            {/* Direct Link to Live Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <span>Website Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout Mobile/Tablet */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors lg:hidden"
              title="Logout ke /u-gate"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 bottom-0 left-0 w-80 bg-[#06172e] p-4 flex flex-col justify-between shadow-2xl z-50">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-blue-950">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-black text-sm text-white">UPITRA Admin</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-slate-400 hover:text-white">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-3 space-y-3 overflow-y-auto max-h-[75vh] custom-scrollbar">
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                      pathname === "/admin" ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-white/10"
                    }`}
                  >
                    <span>Overview Pengunjung</span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">Live</span>
                  </Link>

                  {navSections.map((section, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[10px] font-bold text-sky-300/60 uppercase tracking-widest px-2">
                        {section.title}
                      </div>
                      {section.items.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-white/10"
                        >
                          <span className="truncate">{sub.label}</span>
                          {sub.badge && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-900 text-sky-200">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2 mt-4"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Sesi (/u-gate)</span>
              </button>
            </div>
          </div>
        )}

        {/* Scrollable Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>

      </div>

    </div>
  );
}
