"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  BarChart3, 
  GraduationCap, 
  FileText, 
  Download, 
  Users, 
  Handshake, 
  Building2, 
  Sliders, 
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Clock, 
  Camera, 
  FileCheck2,
  BellRing
} from "lucide-react";

interface AdminUserSession {
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AdminUserSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Cek otorisasi sesi admin
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("upitra_admin_session");
    if (!saved) {
      router.push("/upitra-sys-gate/portal-auth-2026");
    } else {
      try {
        setSession(JSON.parse(saved));
      } catch {
        router.push("/upitra-sys-gate/portal-auth-2026");
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
    router.push("/upitra-sys-gate/portal-auth-2026");
  };

  const navItems = [
    {
      group: "INTELIJEN ANALITIK",
      items: [
        {
          label: "Overview Pengunjung",
          href: "/admin",
          icon: BarChart3,
          badge: "Live",
          description: "Analitik pengunjung dari setiap lini",
        },
      ],
    },
    {
      group: "MANAJEMEN KONTEN & CRUD",
      items: [
        {
          label: "Program Studi & 4 Fakultas",
          href: "/admin/prodi",
          icon: GraduationCap,
          badge: "10 Prodi",
          description: "Kelola kurikulum & data fakultas",
        },
        {
          label: "Pendaftaran PMB & Leads",
          href: "/admin/pmb-leads",
          icon: FileCheck2,
          badge: "Admisi",
          description: "Kelola calon mahasiswa baru",
        },
        {
          label: "Berita & Pengumuman",
          href: "/admin/berita",
          icon: FileText,
          description: "Artikel, inovasi & kalender",
        },
        {
          label: "Download Center (Brosur)",
          href: "/admin/download-center",
          icon: Download,
          badge: "PDF",
          description: "Katalog e-brosur & dokumen",
        },
        {
          label: "Mitra & Kerjasama",
          href: "/admin/mitra",
          icon: Handshake,
          description: "Korporasi Triputra & industri",
        },
        {
          label: "Fasilitas & Layanan",
          href: "/admin/layanan",
          icon: Building2,
          description: "Unit perpustakaan, karir, dsb",
        },
        {
          label: "Banner Hero Beranda",
          href: "/admin/banner-hero",
          icon: Sliders,
          description: "Hero promo utama website",
        },
      ],
    },
    {
      group: "INTEGRASI & SISTEM",
      items: [
        {
          label: "Sinkronisasi Instagram",
          href: "/admin/instagram-sync",
          icon: Camera,
          badge: "Live Sync",
          description: "Status @upitra_campus real-time",
        },
        {
          label: "Pengguna & Hak Akses",
          href: "/admin/users",
          icon: Users,
          description: "Kelola staff & otoritas",
        },
      ],
    },
  ];

  if (!mounted || !session) {
    return (
      <div className="min-h-screen bg-[#040e1e] flex flex-col items-center justify-center text-white font-sans">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-sky-400 animate-spin mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-xs font-semibold tracking-wider text-slate-300">
          MEMVERIFIKASI AKSES GATEWAY UPITRA...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06172e] flex text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      
      {/* 1. DESKTOP PERMANENT SIDEBAR */}
      <aside className="hidden lg:flex lg:flex-col w-72 shrink-0 bg-[#071a33] border-r border-blue-900/50 shadow-2xl z-30">
        
        {/* Brand Header */}
        <div className="p-5 border-b border-blue-900/60 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-black text-white tracking-tight flex items-center gap-1.5">
                <span>UPITRA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-600/60 text-sky-200 border border-blue-400/30 font-bold uppercase">
                  Admin
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-medium">
                Pusat Kendali Institusi
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 custom-scrollbar">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1.5">
              <div className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                {group.group}
              </div>
              
              <div className="space-y-1">
                {group.items.map((item, iIdx) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={iIdx}
                      href={item.href}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-sky-600 text-white shadow-md shadow-blue-600/30"
                          : "text-slate-300 hover:bg-blue-950/70 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-sky-400 group-hover:text-sky-300"}`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-blue-900/80 text-sky-300 border border-blue-700/60"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Card in Sidebar Footer */}
        <div className="p-4 border-t border-blue-900/60 bg-[#051427]/80">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-xs">
                {session.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {session.name}
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{session.role}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar dari sesi admin"
              className="p-2 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* 2. MAIN VIEWPORT & TOPBAR */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-[#040e1e]">
        
        {/* Top Header Bar */}
        <header className="h-16 shrink-0 bg-[#071a33]/90 border-b border-blue-900/60 backdrop-blur-md px-4 sm:px-8 flex items-center justify-between z-20">
          
          {/* Left: Mobile Drawer Trigger & Clock */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-blue-950 border border-blue-800 text-slate-200 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400 bg-blue-950/60 px-3.5 py-1.5 rounded-xl border border-blue-900/80">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              <span>{currentTime || "Sinkronisasi waktu..."}</span>
            </div>
          </div>

          {/* Right: Live Status, Quick Links & Logout */}
          <div className="flex items-center gap-3">
            {/* Live Indicator */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>26 Pengunjung Online</span>
            </div>

            {/* Direct Link to Live Site */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-sky-200 text-xs font-bold border border-blue-700/60 transition-colors"
            >
              <span>Website Live</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Logout Mobile/Tablet */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors lg:hidden"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </header>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div 
              className="fixed inset-0 bg-black/70 backdrop-blur-xs" 
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="fixed top-0 bottom-0 left-0 w-72 bg-[#071a33] p-5 flex flex-col justify-between shadow-2xl z-50">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-blue-900/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-sm text-white">UPITRA Admin</span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1.5 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="py-4 space-y-4 overflow-y-auto max-h-[70vh]">
                  {navItems.map((group, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">
                        {group.group}
                      </div>
                      {group.items.map((it, iIdx) => (
                        <Link
                          key={iIdx}
                          href={it.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                            pathname === it.href ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-blue-950"
                          }`}
                        >
                          <span>{it.label}</span>
                          {it.badge && (
                            <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-900 text-sky-200">
                              {it.badge}
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
                className="w-full py-2.5 rounded-xl bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Keluar dari Sesi</span>
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

