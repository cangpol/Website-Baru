import { Role } from "@prisma/client";

export interface AdminModuleConfig {
  key: string;
  label: string;
  description: string;
  iconName: string;
  adminRoute: string;
  publicRoute: string;
  allowedRoles: Role[];
  revalidateTags: string[];
  submenus: {
    label: string;
    href: string;
  }[];
}

export const ADMIN_MODULES_REGISTRY: Record<string, AdminModuleConfig> = {
  beranda: {
    key: "beranda",
    label: "Beranda & Hero",
    description: "Pengelolaan banner hero 1440x810, judul, subjudul, tombol CTA, dan urutan seksi beranda.",
    iconName: "LayoutDashboard",
    adminRoute: "/admin/banner-hero",
    publicRoute: "/",
    allowedRoles: [Role.SUPERADMIN],
    revalidateTags: ["hero", "settings", "home"],
    submenus: [
      { label: "Hero Banner", href: "/admin/banner-hero" },
      { label: "Seksi Beranda", href: "/admin/banner-hero?tab=sections" },
    ],
  },
  profil: {
    key: "profil",
    label: "Profil & Pimpinan",
    description: "Visi Misi, Sejarah, Pimpinan Universitas, Dosen, dan Sambutan Rektor.",
    iconName: "ShieldCheck",
    adminRoute: "/admin/profil",
    publicRoute: "/profil",
    allowedRoles: [Role.SUPERADMIN],
    revalidateTags: ["profile", "staff", "settings"],
    submenus: [
      { label: "Pimpinan & Staf", href: "/admin/profil" },
      { label: "Halaman Profil", href: "/admin/profil?tab=pages" },
    ],
  },
  akademik: {
    key: "akademik",
    label: "Akademik & Prodi",
    description: "Kurikulum 4 Fakultas & 10 Program Studi, Akreditasi, Biaya, dan Kalender Akademik.",
    iconName: "GraduationCap",
    adminRoute: "/admin/akademik",
    publicRoute: "/akademik",
    allowedRoles: [Role.SUPERADMIN, Role.STAFF_PMB],
    revalidateTags: ["programs", "faculties", "calendar"],
    submenus: [
      { label: "Kalender Akademik", href: "/admin/akademik" },
      { label: "Program Studi", href: "/admin/prodi" },
    ],
  },
  riset: {
    key: "riset",
    label: "Riset & Berita",
    description: "Publikasi artikel riset, berita kampus, inovasi terapan, dan kategori.",
    iconName: "Newspaper",
    adminRoute: "/admin/riset",
    publicRoute: "/riset",
    allowedRoles: [Role.SUPERADMIN, Role.CONTENT_WRITER],
    revalidateTags: ["articles", "research"],
    submenus: [
      { label: "Berita & Riset", href: "/admin/riset" },
      { label: "Publikasi Jurnal", href: "/admin/riset?tab=publikasi" },
    ],
  },
  kemahasiswaan: {
    key: "kemahasiswaan",
    label: "Kemahasiswaan",
    description: "Organisasi Mahasiswa (BEM/UKM), Skema Beasiswa, dan Arsip Prestasi Mahasiswa.",
    iconName: "Award",
    adminRoute: "/admin/kemahasiswaan",
    publicRoute: "/kemahasiswaan",
    allowedRoles: [Role.SUPERADMIN, Role.STAFF_PMB],
    revalidateTags: ["student", "scholarships", "achievements"],
    submenus: [
      { label: "Organisasi & UKM", href: "/admin/kemahasiswaan" },
      { label: "Beasiswa", href: "/admin/kemahasiswaan?tab=beasiswa" },
      { label: "Prestasi Mahasiswa", href: "/admin/kemahasiswaan?tab=prestasi" },
    ],
  },
  kerjasama: {
    key: "kerjasama",
    label: "Kerjasama & Mitra",
    description: "Daftar 43+ Mitra Korporasi Triputra Group, MoU Kerjasama, dan Program Magang 3+1.",
    iconName: "Handshake",
    adminRoute: "/admin/kerjasama",
    publicRoute: "/kerjasama",
    allowedRoles: [Role.SUPERADMIN],
    revalidateTags: ["partners", "mou"],
    submenus: [
      { label: "Mitra Industri", href: "/admin/kerjasama" },
      { label: "MoU & Dokumen", href: "/admin/kerjasama?tab=mou" },
    ],
  },
  layanan: {
    key: "layanan",
    label: "Layanan & Unduhan",
    description: "Katalog Layanan Kampus, Download Center Formulir, dan Tanya Jawab (FAQ).",
    iconName: "HelpCircle",
    adminRoute: "/admin/layanan",
    publicRoute: "/layanan",
    allowedRoles: [Role.SUPERADMIN],
    revalidateTags: ["services", "downloads", "faq"],
    submenus: [
      { label: "Katalog Layanan", href: "/admin/layanan" },
      { label: "Download Center", href: "/admin/download-center" },
    ],
  },
  pmb: {
    key: "pmb",
    label: "PMB & Campus Tour",
    description: "Pendaftaran calon mahasiswa baru, follow-up WhatsApp, dan jadwal Campus Tour.",
    iconName: "Users",
    adminRoute: "/admin/pmb-leads",
    publicRoute: "/#daftar",
    allowedRoles: [Role.SUPERADMIN, Role.STAFF_PMB],
    revalidateTags: ["leads", "tours"],
    submenus: [
      { label: "Data Leads PMB", href: "/admin/pmb-leads" },
      { label: "Reservasi Tour", href: "/admin/pmb-leads?tab=tour" },
    ],
  },
  aiDataset: {
    key: "aiDataset",
    label: "AI Dataset",
    description: "Kelola basis pengetahuan tanya-jawab chatbot asisten cerdas UPITRA.",
    iconName: "Bot",
    adminRoute: "/admin/ai-dataset",
    publicRoute: "/",
    allowedRoles: [Role.SUPERADMIN],
    revalidateTags: ["ai-dataset"],
    submenus: [
      { label: "Knowledge Base", href: "/admin/ai-dataset" },
    ],
  },
  users: {
    key: "users",
    label: "Manajemen Pengguna",
    description: "Kelola akun staf administrator, pengaturan peran, dan audit aktivitas.",
    iconName: "UserCheck",
    adminRoute: "/admin/users",
    publicRoute: "/admin/users",
    allowedRoles: [Role.SUPERADMIN],
    revalidateTags: ["users"],
    submenus: [
      { label: "Daftar Staf", href: "/admin/users" },
    ],
  },
};

export const ADMIN_MODULES_LIST = Object.values(ADMIN_MODULES_REGISTRY);

export function getModulesForRole(role: Role): AdminModuleConfig[] {
  return ADMIN_MODULES_LIST.filter((mod) => mod.allowedRoles.includes(role));
}

