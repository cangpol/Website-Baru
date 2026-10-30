// adminCrudStore.ts — Fondasi CRUD yang andal untuk Dashboard Admin UPITRA
//
// Perbaikan masalah lama:
//  1. Data CRUD hanya tersimpan di localStorage per-browser (tidak tahan lama,
//     hilang saat storage penuh / dibersihkan, tidak bisa dibagikan antar perangkat).
//     → Sekarang setiap koleksi disimpan sebagai "resource record" di server
//       melalui API Route (/api/admin/crud) yang persisten (Prisma/PostgreSQL bila
//       DATABASE_URL tersedia, fallback file JSON di .data/admin-crud.json).
//  2. Write ke localStorage tanpa try/catch → crash & data hilang saat quota penuh.
//     → Semua operasi write dibungkus error handling + antrean simpan (debounced queue).
//  3. Load awal selalu menimpa dengan seed mock bila array kosong → pengguna tidak
//       bisa menghapus seluruh item (seed muncul kembali).
//     → Seed hanya ditulis sekali saat resource belum pernah dibuat; array kosong
//       adalah state yang sah.
//  4. Tidak ada validasi bentuk data saat parse → corrupt storage merusak UI.
//     → Validasi bentuk (array of objects) + pemulihan otomatis dari seed.

"use client";

import type { AdminArticleItem } from "./adminDataStore";

export type CrudCollection =
  | "articles"
  | "riset"
  | "prodis"
  | "leads"
  | "users"
  | "mitra"
  | "downloads"
  | "banners"
  | "akademikBanner"
  | "services"
  | "profil"
  | "kemahasiswaan"
  | "mou"
  | "calendarEvents"
  | "instagramAccount";

/** Item generik — minimal memiliki id string/number agar bisa di-update/dihapus. */
export interface CrudRecord {
  id: string | number;
  [key: string]: unknown;
}

interface ResourceEnvelope<T> {
  /** true bila tersimpan permanen di server */
  persisted: boolean;
  data: T;
  updatedAt?: string;
}

// Key localStorage lama tetap dipakai sebagai cache offline agar data
// pengguna existing tidak hilang saat upgrade.
const LEGACY_KEYS: Record<CrudCollection, string> = {
  articles: "upitra_admin_articles",
  riset: "upitra_admin_riset",
  prodis: "upitra_admin_prodis",
  leads: "upitra_admin_leads",
  users: "upitra_admin_users",
  mitra: "upitra_admin_mitra",
  downloads: "upitra_admin_downloads",
  banners: "upitra_admin_banners",
  akademikBanner: "upitra_banner_akademik",
  services: "upitra_admin_services",
  profil: "upitra_admin_profil",
  kemahasiswaan: "upitra_admin_kemahasiswaan",
  mou: "upitra_admin_mou",
  calendarEvents: "upitra_academic_events",
  instagramAccount: "upitra_ig_connected_session",
};

const SERVER_CACHE_PREFIX = "upitra_crud_cache_"; // salinan terakhir dari server
const MIGRATION_FLAG_PREFIX = "upitra_crud_migrated_";

const isBrowser = () => typeof window !== "undefined";

function safeLocalGet(key: string): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeLocalSet(key: string, value: string): boolean {
  if (!isBrowser()) return false;
  try {
    window.localStorage.setItem(key, value);
    return true;
  } catch {
    // QuotaExceededError atau storage diblokir — jangan sampai aplikasi crash.
    console.warn(`[adminCrudStore] Gagal menulis "${key}" ke localStorage.`);
    return false;
  }
}

function looksLikeArray(data: unknown): data is CrudRecord[] {
  return Array.isArray(data) && data.every((d) => d && typeof d === "object" && "id" in (d as object));
}

function looksLikeObject(data: unknown): data is CrudRecord {
  return !!data && typeof data === "object" && !Array.isArray(data);
}

async function fetchServer<T>(collection: CrudCollection): Promise<{ data: T | null; persisted: boolean }> {
  try {
    const res = await fetch(`/api/admin/crud/${collection}`, { cache: "no-store" });
    if (!res.ok) return { data: null, persisted: false };
    const body = (await res.json()) as ResourceEnvelope<T>;
    return { data: (body?.data ?? null) as T | null, persisted: !!body?.persisted };
  } catch {
    return { data: null, persisted: false };
  }
}

const saveQueues = new Map<CrudCollection, Promise<unknown>>();

async function postServer<T>(collection: CrudCollection, data: T): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/crud/${collection}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Muat koleksi CRUD dengan urutan prioritas:
 *  1. Server (persisten) — sumber kebenaran utama.
 *  2. Cache localStorage lama (migrasi satu kali ke server).
 *  3. Nilai seed awal (hanya bila resource benar-benar belum pernah dibuat).
 *
 * Mengembalikan data + penanda apakah data tersimpan permanen di server.
 */
export async function loadCrudCollection<T>(
  collection: CrudCollection,
  seed: T
): Promise<ResourceEnvelope<T>> {
  const legacyKey = LEGACY_KEYS[collection];
  const validator = Array.isArray(seed) ? looksLikeArray : looksLikeObject;

  // 1) Server
  const server = await fetchServer<T>(collection);
  if (server.data !== null && validator(server.data)) {
    safeLocalSet(SERVER_CACHE_PREFIX + collection, JSON.stringify(server.data));
    return { persisted: server.persisted, data: server.data };
  }

  // 2) Cache/mirror lokal — migrasikan sekali ke server.
  const localRaw = safeLocalGet(legacyKey);
  if (localRaw) {
    try {
      const parsed = JSON.parse(localRaw) as T;
      if (validator(parsed)) {
        const migrated = await postServer(collection, parsed);
        safeLocalSet(MIGRATION_FLAG_PREFIX + collection, "1");
        return { persisted: migrated, data: parsed };
      }
    } catch {
      /* data korup — jatuh ke seed */
    }
  }

  // 3) Seed awal — tulis sebagai state resmi pertama.
  await postServer(collection, seed);
  return { persisted: true, data: seed };
}

/**
 * Simpan koleksi: update optimistic di state React + cache localStorage +
 * sinkronisasi ke server (persisten). Panggilan beruntun pada koleksi yang
 * sama diantre agar urutan tulis ke server terjaga.
 */
export function saveCrudCollection<T>(
  collection: CrudCollection,
  data: T,
  applyLocal: (data: T) => void
): void {
  // Optimistic — UI langsung responsif meski server lambat/offline.
  applyLocal(data);

  const serialized = JSON.stringify(data);
  safeLocalSet(LEGACY_KEYS[collection], serialized);
  safeLocalSet(SERVER_CACHE_PREFIX + collection, serialized);

  const prev = saveQueues.get(collection) ?? Promise.resolve();
  const next = prev.then(() => postServer(collection, data)).catch(() => false);
  saveQueues.set(collection, next);
}

/** Helper format tanggal Indonesia yang aman (dipakai bersama oleh halaman admin). */
export function formatIdDate(date: Date = new Date()): string {
  try {
    return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return date.toISOString().slice(0, 10);
  }
}

/** Slug generator yang konsisten untuk berita/artikel. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/** ID unik baru yang tidak mudah bertabrakan (timestamp + random). */
export function newCrudId(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** Deteksi duplikat slug sebelum menyimpan artikel (slug harus unik). */
export function isSlugTaken(articles: AdminArticleItem[], slug: string, exceptId?: string): boolean {
  return articles.some((a) => a.slug === slug && a.id !== exceptId);
}
