"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { deleteUploadedFileIfUnused } from "@/server/storage/cleanup-if-unused";
import {
  defaultHomepageHero,
  defaultHomepageWaves,
  defaultHomepageStats,
  defaultHomepageInstagram,
  defaultHomepageCta,
  defaultHomepageVisibility,
} from "@/lib/homepageData";

const safeUrlSchema = z.string().trim().min(1).max(2048).refine((value) => {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}, "URL harus berupa tautan lokal atau HTTP/HTTPS yang valid.");

const imageUrlSchema = z.string().trim().min(1).max(2048).refine((value) => {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && (
      url.hostname === "images.unsplash.com" ||
      url.hostname === "placehold.co" ||
      url.hostname.endsWith(".upitra.ac.id")
    );
  } catch {
    return false;
  }
}, "Gambar harus berasal dari penyimpanan lokal atau host gambar yang diizinkan.");
const homepageHeroSchema = z.object({
  title: z.string().trim().min(1).max(200),
  subtitle: z.string().max(1000),
  ctaLabel: z.string().trim().min(1).max(80),
  ctaHref: safeUrlSchema,
  imageUrl: imageUrlSchema,
});
const homepageWavesSchema = z.object({
  title: z.string().trim().min(1).max(150),
  subtitle: z.string().max(500),
  waves: z.array(z.object({
    id: z.string().trim().min(1).max(80),
    title: z.string().trim().min(1).max(150),
    benefit: z.string().trim().min(1).max(300),
    badge: z.string().trim().max(80).optional(),
    image: imageUrlSchema,
    link: safeUrlSchema,
  })).max(12),
});
const homepageStatsSchema = z.object({
  title: z.string().trim().min(1).max(150),
  subtitle: z.string().max(500),
  studentCutoutImage: imageUrlSchema,
  metrics: z.array(z.object({
    id: z.string().trim().min(1).max(80),
    value: z.string().trim().min(1).max(80),
    label: z.string().trim().min(1).max(150),
  })).max(12),
});
const homepageInstagramSchema = z.object({
  title: z.string().trim().min(1).max(150),
  subtitle: z.string().max(1000),
  handle: z.string().trim().min(1).max(100),
  profileUrl: safeUrlSchema,
  posts: z.array(z.object({
    id: z.string().trim().min(1).max(100),
    caption: z.string().max(2200),
    mediaUrl: imageUrlSchema,
    permalink: safeUrlSchema,
    timeAgo: z.string().trim().min(1).max(100),
    category: z.string().trim().min(1).max(100),
  })).max(12),
});
const homepageCtaSchema = z.object({
  eyebrow: z.string().trim().min(1).max(150),
  title: z.string().trim().min(1).max(500),
  ctaLabel: z.string().trim().min(1).max(80),
  ctaHref: safeUrlSchema,
});
const homepageVisibilitySchema = z.object({
  hero: z.boolean(),
  waves: z.boolean(),
  stats: z.boolean(),
  instagram: z.boolean(),
  cta: z.boolean(),
});

// ── GET COMPLETE HOMEPAGE CONTENT ───────────────────────────────────────────
export async function getHomepageContent() {
  try {
    const [heroSetting, wavesSetting, statsSetting, igSetting, ctaSetting, visSetting] =
      await Promise.all([
        prisma.siteSetting.findUnique({ where: { key: "homepage_hero" } }),
        prisma.siteSetting.findUnique({ where: { key: "homepage_waves" } }),
        prisma.siteSetting.findUnique({ where: { key: "homepage_stats" } }),
        prisma.siteSetting.findUnique({ where: { key: "homepage_instagram" } }),
        prisma.siteSetting.findUnique({ where: { key: "homepage_cta" } }),
        prisma.siteSetting.findUnique({ where: { key: "homepage_visibility" } }),
      ]);

    const hero = homepageHeroSchema.safeParse(heroSetting?.value);
    const waves = homepageWavesSchema.safeParse(wavesSetting?.value);
    const stats = homepageStatsSchema.safeParse(statsSetting?.value);
    const instagram = homepageInstagramSchema.safeParse(igSetting?.value);
    const cta = homepageCtaSchema.safeParse(ctaSetting?.value);
    const visibility = homepageVisibilitySchema.safeParse(visSetting?.value);

    return {
      hero: hero.success ? hero.data : defaultHomepageHero,
      waves: waves.success
        ? {
            ...waves.data,
            waves: waves.data.waves.map((wave, index) => ({
              ...wave,
              badge: wave.badge ?? (index === 0 ? "Limited" : ""),
            })),
          }
        : defaultHomepageWaves,
      stats: stats.success ? stats.data : defaultHomepageStats,
      instagram: instagram.success ? instagram.data : defaultHomepageInstagram,
      cta: cta.success ? cta.data : defaultHomepageCta,
      visibility: visibility.success ? visibility.data : defaultHomepageVisibility,
    };
  } catch (err) {
    console.error("Error getHomepageContent:", err);
    return {
      hero: defaultHomepageHero,
      waves: defaultHomepageWaves,
      stats: defaultHomepageStats,
      instagram: defaultHomepageInstagram,
      cta: defaultHomepageCta,
      visibility: defaultHomepageVisibility,
    };
  }
}

// ── SAVE ACTIONS WITH SECURITY & ORPHAN FILE CLEANUP ────────────────────────

export async function saveHomepageHeroAction(rawData: unknown) {
  const session = await requirePermission("beranda", "update");
  const validated = homepageHeroSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data hero beranda gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  const data = validated.data;

  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_hero" } });

    await prisma.siteSetting.upsert({
      where: { key: "homepage_hero" },
      create: {
        key: "homepage_hero",
        value: data as unknown as Prisma.InputJsonValue,
        description: "Konten Hero Banner Utama Beranda",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    const oldHero = existing?.value
      ? homepageHeroSchema.safeParse(existing.value).data
      : undefined;
    if (oldHero?.imageUrl && oldHero.imageUrl !== data.imageUrl) {
      await deleteUploadedFileIfUnused(oldHero.imageUrl);
    }

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "homepage_hero",
    });
    await invalidateEntity(CACHE_TAGS.HERO, "/");
    return { ok: true, data, message: "Hero banner beranda berhasil diperbarui." };
  } catch (err) {
    console.error("Error saveHomepageHeroAction:", err);
    return { ok: false, message: "Gagal menyimpan hero banner." };
  }
}

export async function saveHomepageWavesAction(rawData: unknown) {
  const session = await requirePermission("beranda", "update");
  const validated = homepageWavesSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data gelombang PMB gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  const data = validated.data;

  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_waves" } });

    await prisma.siteSetting.upsert({
      where: { key: "homepage_waves" },
      create: {
        key: "homepage_waves",
        value: data as unknown as Prisma.InputJsonValue,
        description: "Gelombang Pendaftaran Mahasiswa Baru (Welcome Waves)",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    const oldWaves = existing?.value
      ? homepageWavesSchema.safeParse(existing.value).data?.waves
      : undefined;
    for (const oldWave of oldWaves || []) {
      const stillUsed = data.waves.some((newWave) => newWave.image === oldWave.image);
      if (!stillUsed) await deleteUploadedFileIfUnused(oldWave.image);
    }

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "homepage_waves",
    });
    await invalidateEntity(CACHE_TAGS.SETTINGS, "/");
    return { ok: true, data, message: "Gelombang PMB berhasil diperbarui." };
  } catch (err) {
    console.error("Error saveHomepageWavesAction:", err);
    return { ok: false, message: "Gagal menyimpan gelombang PMB." };
  }
}

export async function saveHomepageStatsAction(rawData: unknown) {
  const session = await requirePermission("beranda", "update");
  const validated = homepageStatsSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data statistik beranda gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  const data = validated.data;

  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_stats" } });

    await prisma.siteSetting.upsert({
      where: { key: "homepage_stats" },
      create: {
        key: "homepage_stats",
        value: data as unknown as Prisma.InputJsonValue,
        description: "UPITRA Dalam Angka & Foto Mahasiswi Cutout",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    const oldStats = existing?.value
      ? homepageStatsSchema.safeParse(existing.value).data
      : undefined;
    if (
      oldStats?.studentCutoutImage &&
      oldStats.studentCutoutImage !== data.studentCutoutImage
    ) {
      await deleteUploadedFileIfUnused(oldStats.studentCutoutImage);
    }

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "homepage_stats",
    });
    await invalidateEntity(CACHE_TAGS.SETTINGS, "/");
    return { ok: true, data, message: "Statistik UPITRA Dalam Angka berhasil diperbarui." };
  } catch (err) {
    console.error("Error saveHomepageStatsAction:", err);
    return { ok: false, message: "Gagal menyimpan statistik beranda." };
  }
}

export async function saveHomepageInstagramAction(rawData: unknown) {
  const session = await requirePermission("beranda", "update");
  const validated = homepageInstagramSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data Instagram beranda gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  const data = validated.data;

  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_instagram" } });

    await prisma.siteSetting.upsert({
      where: { key: "homepage_instagram" },
      create: {
        key: "homepage_instagram",
        value: data as unknown as Prisma.InputJsonValue,
        description: "Kabar & Cerita Kampus Instagram Feed",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    const oldPosts = existing?.value
      ? homepageInstagramSchema.safeParse(existing.value).data?.posts
      : undefined;
    for (const oldPost of oldPosts || []) {
      const stillUsed = data.posts.some((newPost) => newPost.mediaUrl === oldPost.mediaUrl);
      if (!stillUsed) await deleteUploadedFileIfUnused(oldPost.mediaUrl);
    }

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "homepage_instagram",
    });
    await invalidateEntity(CACHE_TAGS.SETTINGS, "/");
    return { ok: true, data, message: "Feed Instagram Kabar & Cerita berhasil diperbarui." };
  } catch (err) {
    console.error("Error saveHomepageInstagramAction:", err);
    return { ok: false, message: "Gagal menyimpan feed Instagram." };
  }
}

export async function saveHomepageCtaAction(rawData: unknown) {
  const session = await requirePermission("beranda", "update");
  const validated = homepageCtaSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data CTA beranda gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  const data = validated.data;

  try {
    await prisma.siteSetting.upsert({
      where: { key: "homepage_cta" },
      create: {
        key: "homepage_cta",
        value: data as unknown as Prisma.InputJsonValue,
        description: "Ajakan Bergabung CTA Ready Family",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "homepage_cta",
    });
    await invalidateEntity(CACHE_TAGS.SETTINGS, "/");
    return { ok: true, data, message: "CTA Ajakan Bergabung berhasil diperbarui." };
  } catch (err) {
    console.error("Error saveHomepageCtaAction:", err);
    return { ok: false, message: "Gagal menyimpan CTA beranda." };
  }
}

export async function saveHomepageVisibilityAction(rawData: unknown) {
  const session = await requirePermission("beranda", "update");
  const validated = homepageVisibilitySchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi visibilitas beranda gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }
  const data = validated.data;

  try {
    await prisma.siteSetting.upsert({
      where: { key: "homepage_visibility" },
      create: {
        key: "homepage_visibility",
        value: data as unknown as Prisma.InputJsonValue,
        description: "Pengaturan Visibilitas Section Beranda",
      },
      update: {
        value: data as unknown as Prisma.InputJsonValue,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "homepage_visibility",
    });
    await invalidateEntity(CACHE_TAGS.SETTINGS, "/");
    return { ok: true, data, message: "Visibilitas section beranda berhasil diperbarui." };
  } catch (err) {
    console.error("Error saveHomepageVisibilityAction:", err);
    return { ok: false, message: "Gagal menyimpan visibilitas section." };
  }
}
