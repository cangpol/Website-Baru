"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

function isHttpUrl(value: string) {
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const eventInputSchema = z.object({
  title: z.string().min(3, "Judul event minimal 3 karakter").max(200),
  description: z.string().min(3, "Deskripsi event minimal 3 karakter"),
  location: z.string().min(2, "Lokasi wajib diisi"),
  startDate: z.string().min(1, "Tanggal mulai wajib diisi"),
  endDate: z.string().min(1, "Tanggal selesai wajib diisi"),
  bannerImage: z.string().optional().nullable(),
  isOnline: z.boolean().default(false),
  type: z.string().default("Akademik"), // Akademik, Ujian, Libur, Wisuda, PMB, Kemahasiswaan, Seminar, Workshop, dll
  registrationUrl: z.string().max(2048).url("Format URL pendaftaran tidak valid").refine(isHttpUrl).optional().nullable().or(z.literal("")),
  academicYear: z.string().optional().nullable(), // e.g. "2025/2026", "2026/2027"
  semester: z.string().optional().nullable(), // e.g. "Gasal", "Genap", "Antara"
  version: z.number().int().default(1),
});

export type EventInput = z.infer<typeof eventInputSchema>;

export interface AcademicCalendarDoc {
  fileUrl: string;
  fileName: string;
  fileSize?: string;
  academicYear: string;
  updatedAt?: string;
}

function isSafeCalendarUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const academicCalendarDocSchema = z.object({
  fileUrl: z.string().trim().min(1).max(2048).refine(isSafeCalendarUrl),
  fileName: z.string().trim().min(1).max(255),
  fileSize: z.string().trim().max(100).optional(),
  academicYear: z.string().trim().min(1).max(20),
  updatedAt: z.string().max(100).optional(),
});

const academicCalendarInputSchema = z.object({
  fileUrl: z.string().trim().min(1).max(2048).refine(isSafeCalendarUrl),
  fileName: z.string().max(255).optional(),
  fileSize: z.string().max(100).optional(),
  academicYear: z.string().max(20).optional(),
});

// Helper untuk mengekstrak metadata dari deskripsi event
function extractEventMetadata(rawDesc: string) {
  if (!rawDesc) return { meta: {} as Record<string, string>, cleanDesc: "" };
  const match = rawDesc.match(/^<!--meta:(\{[\s\S]*?\})-->/);
  if (match) {
    try {
      const meta = JSON.parse(match[1]);
      const cleanDesc = rawDesc.replace(/^<!--meta:(\{[\s\S]*?\})-->\s*/, "");
      return { meta, cleanDesc };
    } catch {
      return { meta: {} as Record<string, string>, cleanDesc: rawDesc };
    }
  }
  return { meta: {} as Record<string, string>, cleanDesc: rawDesc };
}

// Helper untuk mengemas metadata ke dalam deskripsi event
function packEventMetadata(cleanDesc: string, academicYear?: string | null, semester?: string | null) {
  const meta: Record<string, string> = {};
  if (academicYear) meta.academicYear = academicYear;
  if (semester) meta.semester = semester;
  if (Object.keys(meta).length === 0) return cleanDesc;
  return `<!--meta:${JSON.stringify(meta)}-->\n${cleanDesc}`;
}

export async function getEvents(params?: { type?: string; academicYear?: string; semester?: string; limit?: number }) {
  try {
    const where: any = { deletedAt: null };
    if (params?.type && params.type !== "ALL" && params.type !== "Semua") {
      where.type = params.type;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: "asc" },
      take: params?.limit,
    });

    return events.map((ev) => {
      const { meta, cleanDesc } = extractEventMetadata(ev.description);
      return {
        id: ev.id,
        title: ev.title,
        slug: ev.slug,
        description: cleanDesc,
        location: ev.location,
        startDate: ev.startDate.toISOString(),
        endDate: ev.endDate.toISOString(),
        bannerImage: ev.bannerImage || "/images/kegiatan.jpg",
        isOnline: ev.isOnline,
        type: ev.type,
        registrationUrl: ev.registrationUrl,
        academicYear: meta.academicYear || "2025/2026",
        semester: meta.semester || "Gasal",
        version: ev.version,
      };
    });
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
    const packedDescription = packEventMetadata(data.description, data.academicYear, data.semester);

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
          description: packedDescription,
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
        details: JSON.stringify({ title: updated.title, academicYear: data.academicYear, semester: data.semester }),
      });

      await invalidateEntity(CACHE_TAGS.EVENTS, "/akademik");
      return { ok: true, data: updated, message: "Agenda kegiatan berhasil diperbarui." };
    } else {
      const created = await prisma.event.create({
        data: {
          title: data.title,
          slug: finalSlug,
          description: packedDescription,
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
        details: JSON.stringify({ title: created.title, slug: created.slug, academicYear: data.academicYear }),
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

// ── MANAJEMEN DOKUMEN PDF KALENDER AKADEMIK RESMI ───────────────────────────

export async function getAcademicCalendarDoc(): Promise<AcademicCalendarDoc | null> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "academic_calendar_document" },
    });
    if (!setting || !setting.value) return null;
    const parsed = academicCalendarDocSchema.safeParse(setting.value);
    return parsed.success ? parsed.data : null;
  } catch (err) {
    console.error("Error fetching academic calendar doc:", err);
    return null;
  }
}

export async function saveAcademicCalendarDocAction(rawData: unknown) {
  const session = await requirePermission("akademik", "update");
  const validated = academicCalendarInputSchema.safeParse(rawData);
  if (!validated.success) {
    return {
      ok: false,
      message: "Data dokumen kalender akademik tidak valid.",
      fieldErrors: validated.error.flatten(),
    };
  }
  const data = validated.data;

  try {
    const payload: AcademicCalendarDoc = {
      fileUrl: data.fileUrl,
      fileName: data.fileName || "Kalender-Akademik-Resmi-UPITRA.pdf",
      fileSize: data.fileSize || "PDF",
      academicYear: data.academicYear || "2025/2026",
      updatedAt: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    await prisma.$transaction(async (tx) => {
      await tx.siteSetting.upsert({
        where: { key: "academic_calendar_document" },
        create: {
          key: "academic_calendar_document",
          value: payload as unknown as Prisma.InputJsonValue,
          description: "Dokumen PDF Resmi Kalender Akademik UPITRA",
        },
        update: {
          value: payload as unknown as Prisma.InputJsonValue,
        },
      });

      const existingDoc = await tx.downloadDoc.findFirst({
        where: { category: "Kalender Akademik", deletedAt: null },
      });
      if (existingDoc) {
        await tx.downloadDoc.update({
          where: { id: existingDoc.id },
          data: {
            title: `Kalender Akademik Resmi TA ${payload.academicYear}`,
            fileUrl: payload.fileUrl,
            fileSize: payload.fileSize,
          },
        });
      } else {
        await tx.downloadDoc.create({
          data: {
            title: `Kalender Akademik Resmi TA ${payload.academicYear}`,
            category: "Kalender Akademik",
            fileUrl: payload.fileUrl,
            fileSize: payload.fileSize,
          },
        });
      }
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "academic_calendar_document",
      details: JSON.stringify({ fileUrl: payload.fileUrl, academicYear: payload.academicYear }),
    });

    await invalidateEntity(CACHE_TAGS.EVENTS, "/akademik");
    await invalidateEntity(CACHE_TAGS.DOWNLOADS, "/layanan");
    return { ok: true, data: payload, message: "Dokumen PDF kalender akademik resmi berhasil disimpan." };
  } catch (err) {
    console.error("Error saving academic calendar doc:", err);
    return { ok: false, message: "Gagal menyimpan dokumen PDF kalender akademik." };
  }
}

export async function deleteAcademicCalendarDocAction() {
  const session = await requirePermission("akademik", "delete");

  try {
    await prisma.$transaction(async (tx) => {
      await tx.siteSetting.deleteMany({
        where: { key: "academic_calendar_document" },
      });
      await tx.downloadDoc.updateMany({
        where: { category: "Kalender Akademik", deletedAt: null },
        data: { deletedAt: new Date() },
      });
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "SiteSetting",
      entityId: "academic_calendar_document",
      details: "Hapus dokumen resmi kalender akademik",
    });

    await invalidateEntity(CACHE_TAGS.EVENTS, "/akademik");
    await invalidateEntity(CACHE_TAGS.DOWNLOADS, "/layanan");
    return { ok: true, message: "Dokumen PDF kalender akademik resmi berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting academic calendar doc:", err);
    return { ok: false, message: "Gagal menghapus dokumen PDF kalender akademik." };
  }
}
