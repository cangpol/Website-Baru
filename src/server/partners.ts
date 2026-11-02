import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

export const partnerInputSchema = z.object({
  name: z.string().min(2, "Nama mitra minimal 2 karakter").max(150),
  category: z.string().min(2, "Kategori mitra wajib diisi"),
  logoUrl: z.string().optional().nullable(),
  websiteUrl: z.string().url("Format website URL tidak valid").optional().nullable().or(z.literal("")),
  description: z.string().max(500).optional().nullable(),
  startYear: z.number().int().min(1950).max(2100).optional().nullable(),
  mouStatus: z.string().default("Aktif"),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type PartnerInput = z.infer<typeof partnerInputSchema>;

export async function getPartners() {
  try {
    const partners = await prisma.partner.findMany({
      where: {
        deletedAt: null,
        isActive: true,
      },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });

    return partners.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      logoUrl: p.logoUrl || "/images/mitra/mitra1.png",
      websiteUrl: p.websiteUrl,
      description: p.description,
      startYear: p.startYear,
      mouStatus: p.mouStatus,
      order: p.order,
      isActive: p.isActive,
      version: p.version,
    }));
  } catch (err) {
    console.error("Error fetching partners:", err);
    return [];
  }
}

export async function savePartnerAction(id: string | null, rawInput: PartnerInput) {
  const session = await requirePermission("kerjasama", id ? "update" : "create");

  const validated = partnerInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data mitra kerjasama gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.partner.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Mitra tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return {
          ok: false,
          message: "Data telah diperbarui pengguna lain. Silakan refresh.",
        };
      }

      const updated = await prisma.partner.update({
        where: { id },
        data: {
          name: data.name,
          category: data.category,
          logoUrl: data.logoUrl,
          websiteUrl: data.websiteUrl || null,
          description: data.description,
          startYear: data.startYear,
          mouStatus: data.mouStatus,
          order: data.order,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "Partner",
        entityId: updated.id,
        details: { name: updated.name },
      });

      await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
      return { ok: true, data: updated };
    } else {
      const created = await prisma.partner.create({
        data: {
          name: data.name,
          category: data.category,
          logoUrl: data.logoUrl,
          websiteUrl: data.websiteUrl || null,
          description: data.description,
          startYear: data.startYear,
          mouStatus: data.mouStatus,
          order: data.order,
          isActive: data.isActive,
          version: 1,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "Partner",
        entityId: created.id,
        details: { name: created.name },
      });

      await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
      return { ok: true, data: created };
    }
  } catch (error) {
    console.error("Save partner error:", error);
    return { ok: false, message: "Gagal menyimpan data mitra kerjasama." };
  }
}

export async function softDeletePartnerAction(id: string) {
  const session = await requirePermission("kerjasama", "delete");

  try {
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        isActive: false,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Partner",
      entityId: id,
      details: { name: partner.name },
    });

    await invalidateEntity(CACHE_TAGS.PARTNERS, "/kerjasama");
    return { ok: true, message: `Mitra "${partner.name}" berhasil dihapus.` };
  } catch (error) {
    console.error("Delete partner error:", error);
    return { ok: false, message: "Gagal menghapus data mitra." };
  }
}

