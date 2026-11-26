"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { PAGE_CONTENT_KEYS, PAGE_PATHS, CONTENT_DEFAULTS, type PageContentKey } from "@/lib/pageContent";
import { ADMIN_PAGE_RULES, SUPERADMIN_ONLY_MODULE, SUPERADMIN_ROLE } from "@/lib/adminFeatures";
import { youtubeId } from "@/lib/youtube";

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
  // Halaman di luar daftar izin admin hanya dapat diubah Super Admin.
  const rule = Object.hasOwn(ADMIN_PAGE_RULES, pageKey) ? ADMIN_PAGE_RULES[pageKey] : undefined;
  const session = await requirePermission(rule?.module ?? SUPERADMIN_ONLY_MODULE, "update");
  if (!isPageKey(pageKey)) return { ok: false, message: "Halaman tidak valid." };

  try {
    let clean = sanitize(raw) as Record<string, unknown>;
    const allowed = new Set(Object.keys(CONTENT_DEFAULTS[pageKey]));
    const extra = Object.keys(clean).filter((k) => !allowed.has(k));
    if (extra.length > 0) return { ok: false, message: `Bidang tidak dikenal: ${extra.join(", ")}` };

    // Admin dengan izin sebagian: hanya isian yang diizinkan yang diterapkan, sisanya tetap.
    if (session.role !== SUPERADMIN_ROLE && rule?.fields) {
      const stored = (await getPageContent(pageKey)) ?? {};
      const permitted = rule.fields.filter((k) => k in clean).map((k) => [k, clean[k]]);
      clean = { ...stored, ...Object.fromEntries(permitted) };
    }

    if (typeof clean.videoUrl === "string" && clean.videoUrl.trim() && !youtubeId(clean.videoUrl)) {
      return { ok: false, message: "Tautan video harus berupa tautan YouTube yang valid, atau dikosongkan." };
    }

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
