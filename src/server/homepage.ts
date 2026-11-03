"use server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { deleteUploadedFile } from "@/server/storage/cleanup";
import {
  HomepageHero,
  HomepageWaves,
  HomepageStats,
  HomepageInstagram,
  HomepageCta,
  HomepageVisibility,
  defaultHomepageHero,
  defaultHomepageWaves,
  defaultHomepageStats,
  defaultHomepageInstagram,
  defaultHomepageCta,
  defaultHomepageVisibility,
} from "@/lib/homepageData";

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

    return {
      hero: (heroSetting?.value as unknown as HomepageHero) || defaultHomepageHero,
      waves: (wavesSetting?.value as unknown as HomepageWaves) || defaultHomepageWaves,
      stats: (statsSetting?.value as unknown as HomepageStats) || defaultHomepageStats,
      instagram: (igSetting?.value as unknown as HomepageInstagram) || defaultHomepageInstagram,
      cta: (ctaSetting?.value as unknown as HomepageCta) || defaultHomepageCta,
      visibility: (visSetting?.value as unknown as HomepageVisibility) || defaultHomepageVisibility,
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

export async function saveHomepageHeroAction(data: HomepageHero) {
  const session = await requirePermission("beranda", "update");
  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_hero" } });
    if (existing?.value) {
      const oldVal = existing.value as unknown as HomepageHero;
      if (oldVal.imageUrl && oldVal.imageUrl !== data.imageUrl && oldVal.imageUrl.startsWith("/uploads/")) {
        await deleteUploadedFile(oldVal.imageUrl);
      }
    }

    await prisma.siteSetting.upsert({
      where: { key: "homepage_hero" },
      create: {
        key: "homepage_hero",
        value: data as any,
        description: "Konten Hero Banner Utama Beranda",
      },
      update: {
        value: data as any,
      },
    });

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

export async function saveHomepageWavesAction(data: HomepageWaves) {
  const session = await requirePermission("beranda", "update");
  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_waves" } });
    if (existing?.value) {
      const oldVal = existing.value as unknown as HomepageWaves;
      if (Array.isArray(oldVal.waves)) {
        for (const oldWave of oldVal.waves) {
          const stillUsed = data.waves.some((nw) => nw.image === oldWave.image);
          if (!stillUsed && oldWave.image?.startsWith("/uploads/")) {
            await deleteUploadedFile(oldWave.image);
          }
        }
      }
    }

    await prisma.siteSetting.upsert({
      where: { key: "homepage_waves" },
      create: {
        key: "homepage_waves",
        value: data as any,
        description: "Gelombang Pendaftaran Mahasiswa Baru (Welcome Waves)",
      },
      update: {
        value: data as any,
      },
    });

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

export async function saveHomepageStatsAction(data: HomepageStats) {
  const session = await requirePermission("beranda", "update");
  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_stats" } });
    if (existing?.value) {
      const oldVal = existing.value as unknown as HomepageStats;
      if (
        oldVal.studentCutoutImage &&
        oldVal.studentCutoutImage !== data.studentCutoutImage &&
        oldVal.studentCutoutImage.startsWith("/uploads/")
      ) {
        await deleteUploadedFile(oldVal.studentCutoutImage);
      }
    }

    await prisma.siteSetting.upsert({
      where: { key: "homepage_stats" },
      create: {
        key: "homepage_stats",
        value: data as any,
        description: "UPITRA Dalam Angka & Foto Mahasiswi Cutout",
      },
      update: {
        value: data as any,
      },
    });

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

export async function saveHomepageInstagramAction(data: HomepageInstagram) {
  const session = await requirePermission("beranda", "update");
  try {
    const existing = await prisma.siteSetting.findUnique({ where: { key: "homepage_instagram" } });
    if (existing?.value) {
      const oldVal = existing.value as unknown as HomepageInstagram;
      if (Array.isArray(oldVal.posts)) {
        for (const oldPost of oldVal.posts) {
          const stillUsed = data.posts.some((np) => np.mediaUrl === oldPost.mediaUrl);
          if (!stillUsed && oldPost.mediaUrl?.startsWith("/uploads/")) {
            await deleteUploadedFile(oldPost.mediaUrl);
          }
        }
      }
    }

    await prisma.siteSetting.upsert({
      where: { key: "homepage_instagram" },
      create: {
        key: "homepage_instagram",
        value: data as any,
        description: "Kabar & Cerita Kampus Instagram Feed",
      },
      update: {
        value: data as any,
      },
    });

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

export async function saveHomepageCtaAction(data: HomepageCta) {
  const session = await requirePermission("beranda", "update");
  try {
    await prisma.siteSetting.upsert({
      where: { key: "homepage_cta" },
      create: {
        key: "homepage_cta",
        value: data as any,
        description: "Ajakan Bergabung CTA Ready Family",
      },
      update: {
        value: data as any,
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

export async function saveHomepageVisibilityAction(data: HomepageVisibility) {
  const session = await requirePermission("beranda", "update");
  try {
    await prisma.siteSetting.upsert({
      where: { key: "homepage_visibility" },
      create: {
        key: "homepage_visibility",
        value: data as any,
        description: "Pengaturan Visibilitas Section Beranda",
      },
      update: {
        value: data as any,
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
