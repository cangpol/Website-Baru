"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { PAGE_CONTENT_KEYS, PAGE_PATHS, CONTENT_DEFAULTS, type PageContentKey } from "@/lib/pageContent";

const URL_KEYS = new Set(["image", "logo", "url", "sideImage"]);

function isSafeUrl(value: string) {
  if (value === "") return true;
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

// Walks untrusted JSON: only plain objects/arrays/strings, bounded size, safe URLs.
function sanitize(value: unknown, key = "", depth = 0): unknown {
  if (depth > 4) throw new Error("Struktur terlalu dalam.");
  if (typeof value === "string") {
    if (value.length > 5000) throw new Error("Teks terlalu panjang.");
    if (URL_KEYS.has(key) && !isSafeUrl(value)) throw new Error(`URL tidak valid pada "${key}".`);
    return value;
  }
  if (Array.isArray(value)) {
    if (value.length > 60) throw new Error("Terlalu banyak item.");
    return value.map((v) => sanitize(v, key, depth + 1));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, sanitize(v, k, depth + 1)]));
  }
  throw new Error("Tipe data tidak didukung.");
}

const MODULE_BY_KEY: Record<string, string> = {
  "profil-tentang": "profil", "profil-dna": "profil", "visi-misi": "profil", pimpinan: "profil", "prestasi-capaian": "profil",
  kemahasiswaan: "kemahasiswaan", "galeri-kegiatan": "kemahasiswaan", "kalender-akademik": "kemahasiswaan", "organisasi-mahasiswa": "kemahasiswaan",
  "prestasi-mahasiswa": "kemahasiswaan", "program-pengembangan": "kemahasiswaan", "tugas-dan-fungsi": "kemahasiswaan",
  kerjasama: "kerjasama", "daftar-kerjasama": "kerjasama", "kegiatan-kerjasama": "kerjasama", "kelompok-mitra": "kerjasama", "mitra-kerjasama": "kerjasama",
  layanan: "layanan", "career-center": "layanan", "e-learning": "layanan", "immersion-program": "layanan", perpustakaan: "layanan", "tracer-study": "layanan",
  riset: "articles", "pusat-penelitian": "articles",
};

function moduleForPageKey(pageKey: string) {
  return MODULE_BY_KEY[pageKey] ?? "beranda";
}

function isPageKey(key: string): key is PageContentKey {
  return (PAGE_CONTENT_KEYS as readonly string[]).includes(key);
}

// Server-component helper: stored content merged over the built-in defaults.
export async function getPageContentMerged(pageKey: PageContentKey) {
  const stored = await getPageContent(pageKey);
  return { ...CONTENT_DEFAULTS[pageKey], ...(stored ?? {}) } as Record<string, any>;
}

// Public read: stored content, or null so callers fall back to defaults.
export async function getPageContent(pageKey: string) {
  if (!isPageKey(pageKey)) return null;
  try {
    const setting = await prisma.siteSetting.findUnique({ where: { key: `content_${pageKey}` } });
    return setting && setting.value && typeof setting.value === "object" && !Array.isArray(setting.value)
      ? (setting.value as Record<string, unknown>)
      : null;
  } catch {
    return null;
  }
}

export async function savePageContentAction(pageKey: string, raw: unknown) {
  // Izin mengikuti fitur pemilik halaman (agar saklar fitur Super Admin berlaku tepat sasaran).
  const session = await requirePermission(moduleForPageKey(pageKey), "update");
  if (!isPageKey(pageKey)) return { ok: false, message: "Halaman tidak valid." };

  try {
    const clean = sanitize(raw) as Record<string, unknown>;
    const allowed = new Set(Object.keys(CONTENT_DEFAULTS[pageKey]));
    const extra = Object.keys(clean).filter((k) => !allowed.has(k));
    if (extra.length > 0) return { ok: false, message: `Bidang tidak dikenal: ${extra.join(", ")}` };

    const settingKey = `content_${pageKey}`;
    await prisma.siteSetting.upsert({
      where: { key: settingKey },
      create: { key: settingKey, value: clean as Prisma.InputJsonValue, description: `Konten halaman ${PAGE_PATHS[pageKey] ?? "/" + pageKey}` },
      update: { value: clean as Prisma.InputJsonValue },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: settingKey,
      details: JSON.stringify({ pageKey }),
    });

    await invalidateEntity(CACHE_TAGS.SETTINGS, PAGE_PATHS[pageKey] ?? `/${pageKey}`);
    return { ok: true, message: "Konten halaman berhasil disimpan." };
  } catch (err) {
    console.error(`Error saving page content ${pageKey}:`, err);
    return { ok: false, message: err instanceof Error && err.message ? err.message : "Gagal menyimpan konten halaman." };
  }
}
