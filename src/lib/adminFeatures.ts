// Fitur admin yang dapat dinyalakan/dimatikan oleh Super Admin (dipakai klien dan server).
// Fitur ditentukan per modul izin (requirePermission) dan per menu sidebar.

export type AdminRoleKey = "STAFF_PMB" | "CONTENT_WRITER";

export interface AdminFeature {
  id: string;
  label: string;
  description: string;
  /** Kunci modul pada requirePermission() yang tercakup fitur ini. */
  modules: string[];
  /** ID menu sidebar yang tercakup fitur ini. */
  menuIds: string[];
  /** Peran admin yang mendapat fitur ini secara bawaan (sebelum Super Admin mengubahnya). */
  defaultRoles: AdminRoleKey[];
}

export const ADMIN_FEATURES: AdminFeature[] = [
  {
    id: "beranda",
    label: "Halaman Depan, Banner & Konten",
    description: "Mengubah isi beranda, hero & banner, serta teks halaman publik.",
    modules: ["beranda", "settings"],
    menuIds: ["halaman-depan", "beranda", "konten-halaman"],
    defaultRoles: [],
  },
  {
    id: "profil",
    label: "Profil & Pimpinan",
    description: "Mengelola data profil universitas dan pimpinan.",
    modules: ["profil"],
    menuIds: ["profil"],
    defaultRoles: [],
  },
  {
    id: "akademik",
    label: "Kalender & Program Studi",
    description: "Kalender akademik, agenda, dan data program studi.",
    modules: ["akademik", "events", "programs"],
    menuIds: ["akademik", "prodi"],
    defaultRoles: ["STAFF_PMB"],
  },
  {
    id: "riset",
    label: "Berita & Riset",
    description: "Menulis dan menerbitkan berita, publikasi, dan portal riset.",
    modules: ["articles"],
    menuIds: ["riset"],
    defaultRoles: ["CONTENT_WRITER"],
  },
  {
    id: "kemahasiswaan",
    label: "Ormawa & Prestasi",
    description: "Data kemahasiswaan, organisasi, dan prestasi.",
    modules: ["kemahasiswaan"],
    menuIds: ["kemahasiswaan"],
    defaultRoles: [],
  },
  {
    id: "kerjasama",
    label: "Mitra & MoU",
    description: "Dokumen kerjasama (MoU) dan logo mitra.",
    modules: ["kerjasama"],
    menuIds: ["kerjasama", "mitra"],
    defaultRoles: [],
  },
  {
    id: "layanan",
    label: "Katalog & Unduhan",
    description: "Katalog layanan, FAQ, brosur, dan pusat unduhan.",
    modules: ["layanan"],
    menuIds: ["layanan", "download-center"],
    defaultRoles: [],
  },
  {
    id: "pmb",
    label: "Data Leads & Tour PMB",
    description: "Calon mahasiswa (leads) dan booking campus tour.",
    modules: ["pmb", "tours"],
    menuIds: ["pmb"],
    defaultRoles: ["STAFF_PMB"],
  },
  {
    id: "ai-dataset",
    label: "AI Dataset Q&A",
    description: "Basis pengetahuan asisten AI.",
    modules: ["aiDataset"],
    menuIds: ["ai-dataset"],
    defaultRoles: [],
  },
  {
    id: "instagram",
    label: "Feed Instagram",
    description: "Sinkronisasi dan pengaturan feed Instagram beranda.",
    modules: [],
    menuIds: ["instagram-sync"],
    defaultRoles: [],
  },
  {
    id: "media",
    label: "Pustaka Media",
    description: "Unggah dan kelola berkas gambar/dokumen.",
    modules: ["media"],
    menuIds: ["media"],
    defaultRoles: ["CONTENT_WRITER"],
  },
];

export type FeatureFlags = Record<string, boolean>;

export const FEATURE_FLAGS_SETTING_KEY = "admin_feature_flags";

export function featureForModule(moduleKey: string): AdminFeature | undefined {
  return ADMIN_FEATURES.find((f) => f.modules.includes(moduleKey));
}

export function featureForMenu(menuId: string): AdminFeature | undefined {
  return ADMIN_FEATURES.find((f) => f.menuIds.includes(menuId));
}

/** Status efektif sebuah fitur untuk satu peran admin: pilihan Super Admin, atau bawaan peran bila belum dipilih. */
export function isFeatureEnabled(feature: AdminFeature, role: string, flags: FeatureFlags): boolean {
  const flag = flags[feature.id];
  if (typeof flag === "boolean") return flag;
  return feature.defaultRoles.includes(role as AdminRoleKey);
}

/** Status yang ditampilkan di halaman Super Admin (tanpa memandang peran). */
export function isFeatureOnForDisplay(feature: AdminFeature, flags: FeatureFlags): boolean {
  const flag = flags[feature.id];
  return typeof flag === "boolean" ? flag : feature.defaultRoles.length > 0;
}
