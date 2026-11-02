"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

const heroSlideInputSchema = z.object({
  title: z.string().min(2, "Judul slide minimal 2 karakter").max(200),
  subtitle: z.string().max(500).optional().nullable(),
  ctaLabel: z.string().max(50).optional().nullable(),
  ctaHref: z.string().max(200).optional().nullable(),
  imageUrl: z.string().min(1, "Gambar banner wajib diisi"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type HeroSlideInput = z.infer<typeof heroSlideInputSchema>;

export async function getHeroSlides() {
  try {
    const slides = await prisma.heroSlide.findMany({
      where: { deletedAt: null },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return slides.map((s) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle || "",
      ctaLabel: s.ctaLabel || "Daftar Sekarang",
      ctaHref: s.ctaHref || "/#daftar",
      imageUrl: s.imageUrl,
      order: s.order,
      isActive: s.isActive,
      version: s.version,
    }));
  } catch (err) {
    console.error("Error fetching hero slides:", err);
    return [];
  }
}

export async function saveHeroSlideAction(id: string | null, rawInput: HeroSlideInput) {
  const session = await requirePermission("beranda", id ? "update" : "create");

  const validated = heroSlideInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data hero slide gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.heroSlide.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Slide tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return {
          ok: false,
          message: "Data telah diperbarui pengguna lain. Silakan refresh halaman.",
        };
      }

      const updated = await prisma.heroSlide.update({
        where: { id },
        data: {
          title: data.title,
          subtitle: data.subtitle,
          ctaLabel: data.ctaLabel,
          ctaHref: data.ctaHref,
          imageUrl: data.imageUrl,
          order: data.order,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "HeroSlide",
        entityId: updated.id,
        details: JSON.stringify({ title: updated.title, order: updated.order }),
      });

      await invalidateEntity(CACHE_TAGS.HERO, "/");
      return { ok: true, data: updated, message: "Slide berhasil diperbarui." };
    } else {
      const created = await prisma.heroSlide.create({
        data: {
          title: data.title,
          subtitle: data.subtitle,
          ctaLabel: data.ctaLabel,
          ctaHref: data.ctaHref,
          imageUrl: data.imageUrl,
          order: data.order,
          isActive: data.isActive,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "HeroSlide",
        entityId: created.id,
        details: JSON.stringify({ title: created.title }),
      });

      await invalidateEntity(CACHE_TAGS.HERO, "/");
      return { ok: true, data: created, message: "Slide baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving hero slide:", err);
    return { ok: false, message: "Terjadi kesalahan internal saat menyimpan slide." };
  }
}

export async function deleteHeroSlideAction(id: string) {
  const session = await requirePermission("beranda", "delete");

  try {
    const existing = await prisma.heroSlide.findUnique({ where: { id } });
    if (!existing) {
      return { ok: false, message: "Slide tidak ditemukan." };
    }

    await prisma.heroSlide.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "HeroSlide",
      entityId: id,
      details: JSON.stringify({ title: existing.title }),
    });

    await invalidateEntity(CACHE_TAGS.HERO, "/");
    return { ok: true, message: "Slide berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting hero slide:", err);
    return { ok: false, message: "Gagal menghapus slide." };
  }
}

export async function toggleHeroSlideActiveAction(id: string, currentState: boolean) {
  const session = await requirePermission("beranda", "update");

  try {
    const updated = await prisma.heroSlide.update({
      where: { id },
      data: {
        isActive: !currentState,
        version: { increment: 1 },
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "HeroSlide",
      entityId: id,
      details: JSON.stringify({ isActive: !currentState }),
    });

    await invalidateEntity(CACHE_TAGS.HERO, "/");
    return { ok: true, message: `Slide ${!currentState ? "diaktifkan" : "dinonaktifkan"}.` };
  } catch (err) {
    console.error("Error toggling hero slide active:", err);
    return { ok: false, message: "Gagal mengubah status aktif slide." };
  }
}

// ── Header Banners per Halaman (Akademik, Riset, Kerjasama, dll.) ───────────
export async function getPageHeaderBanner(pageKey: string) {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: `banner_${pageKey}` },
    });
    if (!setting) return null;
    return setting.value as { title: string; description: string; imageUrl?: string; updatedAt?: string };
  } catch {
    return null;
  }
}

export async function savePageHeaderBannerAction(
  pageKey: string,
  data: { title: string; description: string; imageUrl?: string }
) {
  const session = await requirePermission("beranda", "update");

  try {
    const updated = await prisma.siteSetting.upsert({
      where: { key: `banner_${pageKey}` },
      create: {
        key: `banner_${pageKey}`,
        value: {
          ...data,
          updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        },
        description: `Header banner untuk halaman /${pageKey}`,
      },
      update: {
        value: {
          ...data,
          updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
        },
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: updated.id,
      details: JSON.stringify({ pageKey, title: data.title }),
    });

    await invalidateEntity(CACHE_TAGS.SETTINGS, `/${pageKey}`);
    return { ok: true, message: `Banner ${pageKey} berhasil diperbarui.` };
  } catch (err) {
    console.error(`Error saving header banner for ${pageKey}:`, err);
    return { ok: false, message: "Gagal menyimpan banner header." };
  }
}
