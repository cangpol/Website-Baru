"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard,
  ShieldCheck, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  Clock,
  CalendarDays,
  Newspaper,
  GraduationCap,
  Microscope,
  Bot,
  ChevronRight,
  Handshake,
  Award,
  HelpCircle,
  Users,
  UserCheck,
  Building2,
  FileDown,
  Camera,
  BookOpen
} from "lucide-react";
import Image from "next/image";
import { logoutAdminAction } from "@/app/actions/auth";

interface AdminUserSession {
  email: string;
  name: string;
  role: string;
  loginAt: string;
}

interface SidebarItem {
  id: string;
  groupTitle: string;
  label: string;
  href: string;
  icon: any;
  badge: string;
  badgeColor: string;
  /** Peran yang boleh melihat menu ini. Kosong = semua peran. Harus selaras dengan requirePermission di server. */
  roles?: string[];
}

const sidebarNavigation: SidebarItem[] = [
  {
    id: "halaman-depan",
    roles: ["SUPERADMIN"],
    groupTitle: "BERANDA",
    label: "Halaman Depan",
    href: "/admin/halaman-depan",
    icon: LayoutDashboard,
    badge: "Utama",
    badgeColor: "bg-blue-500/20 text-sky-200 border-blue-400/30",
  },
  {
    id: "beranda",
    roles: ["SUPERADMIN"],
    groupTitle: "BERANDA",
    label: "Hero & Banner",
    href: "/admin/banner-hero",
    icon: LayoutDashboard,
    badge: "1440x810",
    badgeColor: "bg-blue-500/20 text-sky-200 border-blue-400/30",
  },
  {
    id: "profil",
    roles: ["SUPERADMIN"],
    groupTitle: "PROFIL",
    label: "Profil & Pimpinan",
    href: "/admin/profil",
    icon: ShieldCheck,
    badge: "Info",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "akademik",
    roles: ["SUPERADMIN", "STAFF_PMB"],
    groupTitle: "AKADEMIK",
    label: "Kalender & Prodi",
    href: "/admin/akademik",
    icon: GraduationCap,
    badge: "Kurikulum",
    badgeColor: "bg-blue-500/20 text-sky-200 border-blue-400/30",
  },
  {
    id: "riset",
    roles: ["SUPERADMIN", "CONTENT_WRITER"],
    groupTitle: "RISET",
    label: "Berita & Riset",
    href: "/admin/riset",
    icon: Newspaper,
    badge: "Publikasi",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "kemahasiswaan",
    roles: ["SUPERADMIN"],
    groupTitle: "KEMAHASISWAAN",
    label: "Ormawa & Prestasi",
    href: "/admin/kemahasiswaan",
    icon: Award,
    badge: "Kegiatan",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "kerjasama",
    roles: ["SUPERADMIN"],
    groupTitle: "KERJASAMA",
    label: "Mitra & MoU",
    href: "/admin/kerjasama",
    icon: Handshake,
    badge: "43+ Mitra",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "layanan",
    roles: ["SUPERADMIN"],
    groupTitle: "LAYANAN",
    label: "Katalog & Unduhan",
    href: "/admin/layanan",
    icon: HelpCircle,
    badge: "Download",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "pmb",
    roles: ["SUPERADMIN", "STAFF_PMB"],
    groupTitle: "PMB & TOUR",
    label: "Data Leads & Tour",
    href: "/admin/pmb-leads",
    icon: Users,
    badge: "Leads",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "ai-dataset",
    roles: ["SUPERADMIN"],
    groupTitle: "AI ASSISTANT",
    label: "AI Dataset Q&A",
    href: "/admin/ai-dataset",
    icon: Bot,
    badge: "Dataset",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "instagram-sync",
    roles: ["SUPERADMIN"],
    groupTitle: "BERANDA",
    label: "Feed Instagram",
    href: "/admin/instagram-sync",
    icon: Camera,
    badge: "Sinkron",
    badgeColor: "bg-blue-500/20 text-sky-200 border-blue-400/30",
  },
  {
    id: "prodi",
    roles: ["SUPERADMIN", "STAFF_PMB"],
    groupTitle: "AKADEMIK",
    label: "Program Studi",
    href: "/admin/prodi",
    icon: BookOpen,
    badge: "Prodi",
    badgeColor: "bg-blue-500/20 text-sky-200 border-blue-400/30",
  },
  {
    id: "mitra",
    roles: ["SUPERADMIN"],
    groupTitle: "KERJASAMA",
    label: "Logo Mitra",
    href: "/admin/mitra",
    icon: Handshake,
    badge: "Mitra",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "download-center",
    roles: ["SUPERADMIN"],
    groupTitle: "LAYANAN",
    label: "Pusat Unduhan",
    href: "/admin/download-center",
    icon: FileDown,
    badge: "Berkas",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "media",
    roles: ["SUPERADMIN", "CONTENT_WRITER"],
    groupTitle: "PENDUKUNG",
    label: "Pustaka Media",
    href: "/admin/media",
    icon: Building2,
    badge: "Aset",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
  {
    id: "users",
    roles: ["SUPERADMIN"],
    groupTitle: "SISTEM",
    label: "Manajemen Staf",
    href: "/admin/users",
    icon: UserCheck,
    badge: "Role",
    badgeColor: "bg-blue-500/20 text-blue-100 border-blue-400/30",
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState<AdminUserSession | null>(null);
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Cek otorisasi sesi admin via server cookie
  useEffect(() => {
    setMounted(true);

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && json.user) {
          setSession({
            email: json.user.email,
            name: json.user.name,
            role: json.user.role,
            loginAt: new Date().toISOString(),
          });
        } else {
          router.push("/u-gate");
        }
      })
      .catch(() => router.push("/u-gate"));

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

  // Breadcrumb Contextual Resolver
  const getBreadcrumb = () => {
    if (pathname === "/admin") {
      return { group: "Pusat Kendali", page: "Dashboard Utama" };
    }
    const match = sidebarNavigation.find((item) => pathname.startsWith(item.href));
    if (match) {
      return { group: match.groupTitle, page: match.label };
    }
    return { group: "Administrator", page: "Portal UPITRA" };
  };
  const breadcrumb = getBreadcrumb();
  const visibleNavigation = sidebarNavigation.filter(
    (item) => !item.roles || (session && item.roles.includes(session.role))
  );

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/u-gate");
  };

  if (!mounted || !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/80 via-white to-sky-50 flex flex-col items-center justify-center text-[#06172e] font-sans">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/10 border border-blue-200 flex items-center justify-center text-blue-600 animate-spin mb-4">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <p className="text-xs font-semibold text-slate-500">Memuat Portal Administrator UPITRA...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white">
      
      {/* 1. SIDEBAR (Navy Blue #06172e matching UPITRA Branding) */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col shrink-0 bg-[#06172e] text-white border-r border-blue-950 z-30 select-none shadow-xl">
        
        {/* Brand Header */}
        <div className="h-16 flex items-center px-5 border-b border-blue-950 bg-[#040e1e]/60">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md border border-white/20 shrink-0 group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="Logo UPITRA"
                width={28}
                height={28}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-sm font-black tracking-wider text-white uppercase">UPITRA</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-extrabold uppercase tracking-wide">CMS</span>
              </div>
              <span className="text-[9.5px] text-sky-300/80 font-medium tracking-tight mt-1 truncate">
                Admin Control Center
              </span>
            </div>
          </Link>
        </div>

        {/* Dashboard Quick Switcher */}
        <div className="px-3 pt-3">
          <Link
            href="/admin"
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              pathname === "/admin"
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <LayoutDashboard className={`w-4 h-4 shrink-0 ${pathname === "/admin" ? "text-white" : "text-sky-400"}`} />
              <span className="truncate">Dashboard Utama</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 rounded-full font-bold uppercase bg-blue-500/20 text-sky-200 border border-blue-400/30">
              Home
            </span>
          </Link>
        </div>

        {/* Navigation Groups - Clean, Complete & Mapped 1-to-1 to Navbar */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 custom-scrollbar">
          {visibleNavigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <div key={item.id}>
                <div className="px-3 text-[9.5px] font-extrabold uppercase tracking-widest text-sky-300/60 mb-1 flex items-center justify-between">
                  <span>{item.groupTitle}</span>
                </div>
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-sky-400"}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  <span className={`text-[8.5px] px-1.5 py-0.5 rounded font-bold uppercase border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </Link>
              </div>
            );
          })}
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
                <div className="text-[9.5px] text-blue-300 flex items-center gap-1 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-300 animate-pulse"></span>
                  <span>{session.role}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              title="Keluar dari sesi admin (/u-gate)"
              className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-blue-800 transition-colors cursor-pointer"
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
          
          {/* Left: Mobile Drawer Trigger & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Buka Menu Navigasi"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">{breadcrumb.group}</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-bold text-[#06172e] bg-blue-50/80 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-200/60 shadow-2xs">
                {breadcrumb.page}
              </span>
            </nav>
          </div>

          {/* Right: Live Status, Quick Links & Logout */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Clock Widget */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{currentTime || "Sinkronisasi waktu..."}</span>
            </div>

            {/* Website Preview Link */}
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-200 text-xs font-bold transition-all"
            >
              <span className="hidden sm:inline">Pratinjau Web</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Logout Button in Header */}
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 text-xs font-bold transition-all cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
          </div>

        </header>

        {/* Dynamic Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          {children}
        </main>

      </div>

      {/* 3. MOBILE SLIDE-OVER DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-xs bg-[#06172e] text-white flex flex-col p-4 z-10 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-blue-950">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
                  <Image src="/images/logo.png" alt="Logo" width={24} height={24} />
                </div>
                <span className="font-black text-sm text-white">UPITRA CMS</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 space-y-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold ${
                  pathname === "/admin" ? "bg-blue-600 text-white" : "text-slate-300"
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard Utama</span>
              </Link>

              {visibleNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold ${
                      isActive ? "bg-blue-600 text-white" : "text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.5 rounded font-bold uppercase bg-white/10 text-slate-200">
                      {item.badge}
                    </span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-blue-950 flex items-center justify-between text-xs">
              <span className="text-slate-400">{session.name}</span>
              <button onClick={handleLogout} className="text-blue-200 hover:text-white font-bold">Keluar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
