// Aturan hak akses panel admin (dipakai klien dan server).
// Super Admin boleh mengubah semua konten. Admin (peran selain Super Admin) hanya boleh mengelola
// bagian di bawah ini; Super Admin dapat menyalakan/mematikan tiap bagian untuk admin.

export const SUPERADMIN_ROLE = "SUPERADMIN";
export const ADMIN_ROLES = ["STAFF_PMB", "CONTENT_WRITER"];

export const ROLE_LABELS: Record<string, string> = {
  SUPERADMIN: "Super Admin",
  STAFF_PMB: "Admin",
  CONTENT_WRITER: "Penulis Konten",
};

export interface AdminFeature {
  id: string;
  label: string;
  description: string;
  /** Kunci modul pada requirePermission() yang tercakup bagian ini. */
  modules: string[];
  /** ID menu sidebar yang tercakup bagian ini. */
  menuIds: string[];
}

export const ADMIN_FEATURES: AdminFeature[] = [
  {
    id: "gelombang",
    label: "Gelombang PMB",
    description: "Gelombang pendaftaran yang tampil di beranda.",
    modules: ["gelombang"],
    menuIds: ["halaman-depan"],
  },
  {
    id: "feed-instagram",
    label: "Feed Instagram",
    description: "Postingan Kabar & Cerita Kampus di beranda.",
    modules: ["instagram"],
    menuIds: ["halaman-depan", "instagram-sync"],
  },
  {
    id: "video-profil",
    label: "Video Profil UPITRA",
    description: "Tautan, judul, dan deskripsi video di halaman Profil.",
    modules: ["videoProfil"],
    menuIds: ["video-profil"],
  },
  {
    id: "fakultas-prodi",
    label: "Fakultas & Program Studi",
    description: "Data fakultas, program studi, dan halaman tiap fakultas.",
    modules: ["programs"],
    menuIds: ["prodi", "halaman-fakultas"],
  },
  {
    id: "kalender-akademik",
    label: "Kalender Akademik",
    description: "Agenda kalender dan dokumen PDF kalender di halaman Akademik.",
    modules: ["kalender"],
    menuIds: ["akademik"],
  },
  {
    id: "penelitian",
    label: "Penelitian Terbaru",
    description: "Daftar Penelitian Terbaru di halaman Riset.",
    modules: ["penelitian"],
    menuIds: ["penelitian"],
  },
  {
    id: "halaman-kemahasiswaan",
    label: "Halaman Kemahasiswaan",
    description: "Isi halaman /kemahasiswaan beserta subhalamannya.",
    modules: ["kemahasiswaan"],
    menuIds: ["kemahasiswaan"],
  },
  {
    id: "galeri-kerjasama",
    label: "Galeri Kerjasama",
    description: "Galeri dan daftar kegiatan kerjasama.",
    modules: ["galeriKerjasama"],
    menuIds: ["galeri-kerjasama"],
  },
];

/**
 * Halaman publik yang kontennya boleh disunting admin. `fields` membatasi isian yang boleh diubah;
 * tanpa `fields` seluruh isian halaman boleh diubah. Halaman lain hanya untuk Super Admin.
 */
export const ADMIN_PAGE_RULES: Record<string, { module: string; fields?: string[] }> = {
  kemahasiswaan: { module: "kemahasiswaan" },
  "tugas-dan-fungsi": { module: "kemahasiswaan" },
  "program-pengembangan": { module: "kemahasiswaan" },
  "organisasi-mahasiswa": { module: "kemahasiswaan" },
  "prestasi-mahasiswa": { module: "kemahasiswaan" },
  "galeri-kegiatan": { module: "kemahasiswaan" },
  "kalender-akademik": { module: "kemahasiswaan" },
  kerjasama: { module: "galeriKerjasama", fields: ["kegiatan"] },
  "kegiatan-kerjasama": { module: "galeriKerjasama" },
  riset: { module: "penelitian", fields: ["research"] },
  "profil-tentang": { module: "videoProfil", fields: ["videoUrl", "videoJudul", "videoDeskripsi"] },
  "fakultas-feb": { module: "programs" },
  "fakultas-fst": { module: "programs" },
  "fakultas-fsh": { module: "programs" },
  "fakultas-fkes": { module: "programs" },
};

/** Modul semu untuk bagian yang tidak tercantum di atas; tidak dimiliki fitur mana pun. */
export const SUPERADMIN_ONLY_MODULE = "superadmin";

export type FeatureFlags = Record<string, boolean>;

export const FEATURE_FLAGS_SETTING_KEY = "admin_feature_flags";

export function featureForModule(moduleKey: string): AdminFeature | undefined {
  return ADMIN_FEATURES.find((f) => f.modules.includes(moduleKey));
}

/** Satu menu bisa memuat beberapa bagian (contoh: Halaman Depan berisi Gelombang dan Feed Instagram). */
export function featuresForMenu(menuId: string): AdminFeature[] {
  return ADMIN_FEATURES.filter((f) => f.menuIds.includes(menuId));
}

/** Menyala kecuali dimatikan Super Admin. */
export function isFeatureEnabled(feature: AdminFeature, flags: FeatureFlags): boolean {
  return flags[feature.id] !== false;
}

/** Keputusan izin untuk satu peran. Mengembalikan null bila boleh, atau alasan penolakannya. */
export function denialReason(role: string, moduleKey: string, flags: FeatureFlags): string | null {
  if (role === SUPERADMIN_ROLE) return null;
  if (!ADMIN_ROLES.includes(role)) return "Akses ditolak: Hak akses tidak mencukupi.";
  if (moduleKey === "dashboard") return null;
  // Unggah berkas dibutuhkan untuk mengisi bagian mana pun yang masih menyala.
  if (moduleKey === "upload") {
    return ADMIN_FEATURES.some((f) => isFeatureEnabled(f, flags))
      ? null
      : "Akses ditolak: tidak ada bagian yang boleh Anda kelola saat ini.";
  }
  const feature = featureForModule(moduleKey);
  if (!feature) return "Akses ditolak: bagian ini hanya dapat diubah oleh Super Admin.";
  return isFeatureEnabled(feature, flags) ? null : "Fitur ini dinonaktifkan oleh Super Admin.";
}
