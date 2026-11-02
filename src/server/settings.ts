import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

export const heroSlideSchema = z.object({
  title: z.string().min(5, "Judul banner minimal 5 karakter"),
  subtitle: z.string().optional().nullable(),
  ctaLabel: z.string().default("Daftar Sekarang"),
  ctaHref: z.string().default("https://pmb.upitra.ac.id"),
  imageUrl: z.string().default("/images/hero-campus.jpg"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type HeroSlideInput = z.infer<typeof heroSlideSchema>;

export async function getActiveHeroSlide() {
  try {
    const slide = await prisma.heroSlide.findFirst({
      where: {
        isActive: true,
        deletedAt: null,
      },
      orderBy: { order: "asc" },
    });

    if (!slide) return null;

    return {
      id: slide.id,
      title: slide.title,
      subtitle: slide.subtitle,
      ctaLabel: slide.ctaLabel,
      ctaHref: slide.ctaHref,
      imageUrl: slide.imageUrl,
      version: slide.version,
    };
  } catch (err) {
    console.error("Error fetching hero slide:", err);
    return null;
  }
}

export async function saveHeroSlideAction(id: string | null, rawInput: HeroSlideInput) {
  const session = await requirePermission("beranda", id ? "update" : "create");

  const validated = heroSlideSchema.safeParse(rawInput);
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
        return { ok: false, message: "Hero slide tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return { ok: false, message: "Data telah diperbarui admin lain. Silakan muat ulang." };
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
        details: { title: updated.title },
      });

      await invalidateEntity(CACHE_TAGS.HERO, "/");
      return { ok: true, data: updated };
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
          version: 1,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "HeroSlide",
        entityId: created.id,
        details: { title: created.title },
      });

      await invalidateEntity(CACHE_TAGS.HERO, "/");
      return { ok: true, data: created };
    }
  } catch (error) {
    console.error("Save hero slide error:", error);
    return { ok: false, message: "Gagal menyimpan pengaturan hero slide." };
  }
}

