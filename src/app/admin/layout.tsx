"use client";

import { useEffect, useState } from "react";
import { Figtree } from "next/font/google";
import "./admin-theme.css";
import { getNewLeadCount } from "@/server/dashboard";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  ShieldCheck,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  Handshake,
  Award,
  CalendarDays,
  Newspaper,
  GraduationCap,
  Microscope,
  Bot,
  HelpCircle,
  Users,
  UserCheck,
  Building2,
  FileDown,
  Camera,
  BookOpen,
  Search,
  Bell,
  Sun,
  Moon
} from "lucide-react";
import Image from "next/image";
import { logoutAdminAction } from "@/app/actions/auth";
import { featureForMenu } from "@/lib/adminFeatures";

const adminFont = Figtree({ subsets: ["latin"], variable: "--font-admin" });

const ROLE_LABELS: Record<string, string> = {
  SUPERADMIN: "Super Admin",
  STAFF_PMB: "Staf PMB",
  CONTENT_WRITER: "Penulis Konten",
};

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
    id: "konten-halaman",
    roles: ["SUPERADMIN"],
    groupTitle: "BERANDA",
    label: "Konten Halaman",
    href: "/admin/konten-halaman",
    icon: LayoutDashboard,
    badge: "Gambar & Teks",
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
    id: "fitur",
    roles: ["SUPERADMIN"],
    groupTitle: "SISTEM",
    label: "Fitur Admin (On/Off)",
    href: "/admin/fitur",
    icon: ShieldCheck,
    badge: "Super",
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
  // Fitur yang diizinkan Super Admin untuk peran ini (dari /api/auth/me).
  const [features, setFeatures] = useState<Record<string, boolean> | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [query, setQuery] = useState("");
  const [userMenu, setUserMenu] = useState(false);
  const [newLeads, setNewLeads] = useState<number | null>(null);

  // Cek otorisasi sesi admin via server cookie
  useEffect(() => {
    setMounted(true);

    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && json.user) {
          setFeatures(json.features ?? {});
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
  }, [router]);

  // Tema dipasang di <html> agar popup (SweetAlert) ikut bertema, dan dilepas saat keluar dari admin.
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem("adm-theme");
    } catch {}
    if (saved === "light") setTheme("light");
    const root = document.documentElement;
    root.classList.add(adminFont.variable);
    return () => {
      root.classList.remove(adminFont.variable);
      root.removeAttribute("data-admin-theme");
    };
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-admin-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      window.localStorage.setItem("adm-theme", next);
    } catch {}
  };

  // Lonceng: jumlah leads PMB yang belum ditindaklanjuti (hanya untuk peran yang berhak).
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenu(false);
    setQuery("");
    getNewLeadCount()
      .then(setNewLeads)
      .catch(() => setNewLeads(null));
  }, [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setUserMenu(false);
        setQuery("");
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isSuper = session?.role === "SUPERADMIN";
  const visibleNavigation = sidebarNavigation.filter((item) => {
    if (!session) return false;
    if (isSuper) return true;
    const feature = featureForMenu(item.id);
    if (feature) return features?.[feature.id] === true; // diatur Super Admin di halaman Fitur Admin
    return !item.roles || item.roles.includes(session.role);
  });

  // Halaman yang fiturnya dimatikan tidak dapat dibuka lewat URL langsung.
  const activeItem = sidebarNavigation.find((i) => pathname.startsWith(i.href));
  const blockedFeature = !isSuper && activeItem ? featureForMenu(activeItem.id) : undefined;
  const isBlocked = Boolean(blockedFeature && features && features[blockedFeature.id] !== true);
  const superOnlyBlocked = !isSuper && Boolean(activeItem && !featureForMenu(activeItem.id) && activeItem.roles && !activeItem.roles.includes(session?.role ?? ""));

  // Kelompokkan menu per grup (urutan sesuai kemunculan pertama).
  const navGroups: { title: string; items: SidebarItem[] }[] = [];
  for (const item of visibleNavigation) {
    const g = navGroups.find((n) => n.title === item.groupTitle);
    if (g) g.items.push(item);
    else navGroups.push({ title: item.groupTitle, items: [item] });
  }

  // Pencarian cepat menu.
  const q = query.trim().toLowerCase();
  const results = q ? visibleNavigation.filter((i) => `${i.label} ${i.groupTitle} ${i.badge}`.toLowerCase().includes(q)).slice(0, 7) : [];

  const handleLogout = async () => {
    await logoutAdminAction();
    router.push("/u-gate");
  };

  if (!mounted || !session) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[var(--adm-bg,#0a0b0d)] text-[var(--adm-muted,#9ca3af)]">
        <ShieldCheck className="mb-4 h-8 w-8 animate-pulse text-[var(--adm-accent,#4da3ff)]" />
        <p className="text-xs font-semibold">Memuat panel admin UPITRA…</p>
      </div>
    );
  }

  const itemClass = (active: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors ${
      active
        ? "bg-[var(--adm-accent-soft)] text-[var(--adm-accent)] font-semibold"
        : "text-[var(--adm-muted)] hover:bg-[var(--adm-surface-2)] hover:text-[var(--adm-text)]"
    }`;

  const renderGroup = (group: { title: string; items: SidebarItem[] }) => {
    const first = group.items[0];
    const GroupIcon = first.icon;
    const groupActive = group.items.some((i) => pathname.startsWith(i.href));

    if (group.items.length === 1) {
      return (
        <Link key={group.title} href={first.href} className={itemClass(groupActive)} aria-current={groupActive ? "page" : undefined}>
          <GroupIcon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          <span className="truncate">{first.label}</span>
        </Link>
      );
    }

    const isOpen = openGroups[group.title] ?? groupActive;
    return (
      <div key={group.title}>
        <button
          type="button"
          onClick={() => setOpenGroups((prev) => ({ ...prev, [group.title]: !isOpen }))}
          aria-expanded={isOpen}
          className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[13px] font-medium transition-colors hover:bg-[var(--adm-surface-2)] hover:text-[var(--adm-text)] ${
            groupActive ? "text-[var(--adm-text)]" : "text-[var(--adm-muted)]"
          }`}
        >
          <span className="flex min-w-0 items-center gap-3">
            <GroupIcon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <span className="truncate capitalize">{group.title.toLowerCase()}</span>
          </span>
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
        </button>
        {isOpen && (
          <div className="mt-1 space-y-0.5">
            {group.items.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`block truncate rounded-lg py-2 pl-[42px] pr-3 text-[13px] transition-colors ${
                    active
                      ? "bg-[var(--adm-accent-soft)] font-semibold text-[var(--adm-accent)]"
                      : "text-[var(--adm-muted)] hover:bg-[var(--adm-surface-2)] hover:text-[var(--adm-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const mainGroups = navGroups.filter((g) => g.title !== "SISTEM" && g.title !== "PENDUKUNG");
  const systemGroups = navGroups.filter((g) => g.title === "SISTEM" || g.title === "PENDUKUNG");

  const sidebar = (
    <>
      <Link href="/admin" className="flex h-[72px] shrink-0 items-center gap-3 px-6">
        <span className="adm-keep-white flex h-9 w-9 items-center justify-center rounded-lg bg-white p-1">
          <Image src="/images/logo.png" alt="" width={28} height={28} className="object-contain" priority />
        </span>
        <span className="text-xl font-bold tracking-tight text-[var(--adm-text)]">UPITRA</span>
      </Link>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-2" aria-label="Menu admin">
        <Link href="/admin" className={itemClass(pathname === "/admin")} aria-current={pathname === "/admin" ? "page" : undefined}>
          <LayoutDashboard className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
          Dashboard
        </Link>
        {mainGroups.map(renderGroup)}

        {systemGroups.length > 0 && (
          <div className="mt-4 space-y-1 border-t border-[var(--adm-border)] pt-4">
            <p className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-[var(--adm-muted)]">Lainnya</p>
            {systemGroups.map(renderGroup)}
          </div>
        )}

        <div className="mt-4 space-y-1 border-t border-[var(--adm-border)] pt-4">
          <button type="button" onClick={handleLogout} className={`w-full ${itemClass(false)}`}>
            <LogOut className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            Keluar
          </button>
        </div>
      </nav>
    </>
  );

  const iconButton =
    "relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[var(--adm-text)] transition-colors hover:bg-[var(--adm-surface-2)]";

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--adm-bg)] font-sans text-[var(--adm-text)] antialiased">
      <aside className="hidden w-64 shrink-0 select-none flex-col border-r border-[var(--adm-border)] bg-[var(--adm-surface)] lg:flex">{sidebar}</aside>

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <header className="z-20 flex h-[72px] shrink-0 items-center gap-3 px-4 sm:px-8">
          <button type="button" onClick={() => setMobileMenuOpen(true)} className={`${iconButton} lg:hidden`} aria-label="Buka menu">
            <Menu className="h-5 w-5" />
          </button>

          {/* Pencarian menu */}
          <form
            role="search"
            className="relative w-full max-w-md"
            onSubmit={(e) => {
              e.preventDefault();
              if (results[0]) {
                router.push(results[0].href);
                setQuery("");
              }
            }}
          >
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--adm-muted)]" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari menu…"
              aria-label="Cari menu admin"
              autoComplete="off"
              className="h-10 w-full rounded-full border border-[var(--adm-border)] bg-[var(--adm-surface)] pl-11 pr-4 text-[13px] text-[var(--adm-text)] placeholder:text-[var(--adm-muted)]"
            />
            {q && (
              <ul className="absolute left-0 right-0 top-12 z-40 overflow-hidden rounded-xl border border-[var(--adm-border)] bg-[var(--adm-surface)] p-1.5 shadow-xl">
                {results.length === 0 && <li className="px-3 py-2 text-xs text-[var(--adm-muted)]">Menu tidak ditemukan.</li>}
                {results.map((r) => {
                  const Icon = r.icon;
                  return (
                    <li key={r.id}>
                      <Link href={r.href} onClick={() => setQuery("")} className={itemClass(false)}>
                        <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span className="flex-1 truncate">{r.label}</span>
                        <span className="text-[11px] capitalize">{r.groupTitle.toLowerCase()}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </form>

          <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
            {newLeads !== null && (
              <Link href="/admin/pmb-leads" className={iconButton} aria-label={`${newLeads} pendaftar baru`} title={`${newLeads} pendaftar baru`}>
                <Bell className="h-5 w-5" />
                {newLeads > 0 && (
                  <span className="absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#e5484d] px-1 text-[10px] font-bold text-white">
                    {newLeads > 99 ? "99+" : newLeads}
                  </span>
                )}
              </Link>
            )}

            <button type="button" onClick={toggleTheme} className={iconButton} aria-label={theme === "dark" ? "Pakai tema terang" : "Pakai tema gelap"} title={theme === "dark" ? "Tema terang" : "Tema gelap"}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenu((v) => !v)}
                aria-expanded={userMenu}
                aria-haspopup="menu"
                className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 hover:bg-[var(--adm-surface-2)]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">{session.name.charAt(0).toUpperCase()}</span>
                <span className="hidden text-left leading-tight sm:block">
                  <span className="block max-w-40 truncate text-[13px] font-semibold">{session.name}</span>
                  <span className="block text-xs text-[var(--adm-muted)]">{ROLE_LABELS[session.role] ?? session.role}</span>
                </span>
                <ChevronDown className="hidden h-4 w-4 text-[var(--adm-muted)] sm:block" aria-hidden="true" />
              </button>

              {userMenu && (
                <>
                  <button type="button" tabIndex={-1} aria-hidden="true" onClick={() => setUserMenu(false)} className="fixed inset-0 z-30 cursor-default" />
                  <div role="menu" className="absolute right-0 top-12 z-40 w-60 rounded-xl border border-[var(--adm-border)] bg-[var(--adm-surface)] p-1.5 shadow-xl">
                    <p className="truncate px-3 py-2 text-xs text-[var(--adm-muted)]">{session.email}</p>
                    <Link role="menuitem" href="/" target="_blank" rel="noopener noreferrer" className={itemClass(false)}>
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> Lihat situs
                    </Link>
                    <button role="menuitem" type="button" onClick={handleLogout} className={`w-full ${itemClass(false)}`}>
                      <LogOut className="h-4 w-4" aria-hidden="true" /> Keluar
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="custom-scrollbar flex-1 overflow-y-auto px-4 pb-8 pt-2 sm:px-8">
          {isBlocked || superOnlyBlocked ? (
            <div className="mx-auto mt-16 max-w-md rounded-xl border border-[var(--adm-border)] bg-[var(--adm-surface)] p-8 text-center">
              <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-[var(--adm-accent)]" />
              <h2 className="text-lg font-bold">Fitur tidak tersedia</h2>
              <p className="mt-2 text-xs leading-relaxed text-[var(--adm-muted)]">
                {isBlocked
                  ? "Fitur ini sedang dinonaktifkan oleh Super Admin. Hubungi Super Admin bila Anda memerlukannya."
                  : "Halaman ini hanya dapat diakses oleh Super Admin."}
              </p>
              <Link href="/admin" className="mt-5 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700">
                Kembali ke Dashboard
              </Link>
            </div>
          ) : (
            children
          )}
        </main>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <button type="button" aria-label="Tutup menu" className="fixed inset-0 bg-black/60" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative z-10 flex w-72 max-w-[85%] flex-col border-r border-[var(--adm-border)] bg-[var(--adm-surface)] shadow-2xl">
            <button type="button" onClick={() => setMobileMenuOpen(false)} className={`${iconButton} absolute right-2 top-4`} aria-label="Tutup menu">
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </div>
        </div>
      )}
    </div>
  );
}
