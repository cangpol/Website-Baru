"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

const eventInputSchema = z.object({
  title: z.string().min(3, "Judul event minimal 3 karakter").max(200),
  description: z.string().min(5, "Deskripsi event minimal 5 karakter"),
  location: z.string().min(2, "Lokasi wajib diisi"),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().min(1, "Tanggal selesai wajib diisi"),
  bannerImage: z.string().optional().nullable(),
  isOnline: z.boolean().default(false),
  type: z.string().default("Akademik"), // Akademik, Seminar, Workshop, Kemahasiswaan
  registrationUrl: z.string().url("Format URL pendaftaran tidak valid").optional().nullable().or(z.literal("")),
  version: z.number().int().default(1),
});

export type EventInput = z.infer<typeof eventInputSchema>;

export async function getEvents(params?: { type?: string; limit?: number }) {
  try {
    const where: any = { deletedAt: null };
    if (params?.type && params.type !== "ALL") {
      where.type = params.type;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
      take: params?.limit,
    });

    return events.map((ev) => ({
      id: ev.id,
      title: ev.title,
      slug: ev.slug,
      description: ev.description,
      location: ev.location,
      startDate: ev.startDate.toISOString(),
      endDate: ev.endDate.toISOString(),
      bannerImage: ev.bannerImage || "/images/kegiatan.jpg",
      isOnline: ev.isOnline,
      type: ev.type,
      registrationUrl: ev.registrationUrl,
      version: ev.version,
    }));
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
}

export async function saveEventAction(id: string | null, rawInput: EventInput) {
  const session = await requirePermission("akademik", id ? "update" : "create");

  const validated = eventInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data event gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);

  if (end < start) {
    return {
      ok: false,
      message: "Tanggal selesai tidak boleh lebih awal dari tanggal mulai.",
    };
  }

  try {
    // Generate slug
    const baseSlug = data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    let finalSlug = baseSlug;
    if (!id) {
      const existingWithSlug = await prisma.event.findUnique({ where: { slug: baseSlug } });
      if (existingWithSlug) {
        finalSlug = `${baseSlug}-${Date.now().toString().slice(-4)}`;
      }
    }

    if (id) {
      const existing = await prisma.event.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Event tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return {
          ok: false,
          message: "Data telah diperbarui pengguna lain. Silakan refresh halaman.",
        };
      }

      const updated = await prisma.event.update({
        where: { id },
        data: {
          title: data.title,
          description: data.description,
          location: data.location,
          startDate: start,
          endDate: end,
          bannerImage: data.bannerImage,
          isOnline: data.isOnline,
          type: data.type,
          registrationUrl: data.registrationUrl || null,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "Event",
        entityId: updated.id,
        details: JSON.stringify({ title: updated.title }),
      });

      await invalidateEntity(CACHE_TAGS.EVENTS, "/akademik");
      return { ok: true, data: updated, message: "Agenda kegiatan berhasil diperbarui." };
    } else {
      const created = await prisma.event.create({
        data: {
          title: data.title,
          slug: finalSlug,
          description: data.description,
          location: data.location,
          startDate: start,
          endDate: end,
          bannerImage: data.bannerImage,
          isOnline: data.isOnline,
          type: data.type,
          registrationUrl: data.registrationUrl || null,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "Event",
        entityId: created.id,
        details: JSON.stringify({ title: created.title, slug: created.slug }),
      });

      await invalidateEntity(CACHE_TAGS.EVENTS, "/akademik");
      return { ok: true, data: created, message: "Agenda baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving event:", err);
    return { ok: false, message: "Terjadi kesalahan sistem saat menyimpan event." };
  }
}

export async function deleteEventAction(id: string) {
  const session = await requirePermission("akademik", "delete");

  try {
    const existing = await prisma.event.findUnique({ where: { id } });
    if (!existing) {
      return { ok: false, message: "Event tidak ditemukan." };
    }

    await prisma.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Event",
      entityId: id,
      details: JSON.stringify({ title: existing.title }),
    });

    await invalidateEntity(CACHE_TAGS.EVENTS, "/akademik");
    return { ok: true, message: "Agenda berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting event:", err);
    return { ok: false, message: "Gagal menghapus event." };
  }
}
