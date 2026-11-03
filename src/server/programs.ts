"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";
import { DegreeLevel } from "@prisma/client";

const programInputSchema = z.object({
  facultyId: z.string().min(1, "Fakultas wajib dipilih"),
  name: z.string().min(3, "Nama prodi minimal 3 karakter"),
  slug: z.string().min(2, "Slug wajib diisi"),
  degreeLevel: z.nativeEnum(DegreeLevel).default(DegreeLevel.BACHELOR),
  degreeTitle: z.string().optional().nullable(),
  accreditation: z.string().default("Baik Sekali"),
  campusLocation: z.string().default("Surakarta"),
  shortDesc: z.string().optional().nullable(),
  fullDesc: z.string().optional().nullable(),
  careerProspect: z.string().optional().nullable(),
  tuitionFeeEst: z.number().optional().nullable(),
  coverImage: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  version: z.number().int().default(1),
});

export type ProgramInput = z.infer<typeof programInputSchema>;

export async function getFacultiesWithPrograms() {
  try {
    const faculties = await prisma.faculty.findMany({
      where: { deletedAt: null },
      include: {
        programs: {
          where: { deletedAt: null },
          orderBy: [{ featured: "desc" }, { name: "asc" }],
        },
      },
      orderBy: { name: "asc" },
    });

    return faculties.map((f) => ({
      id: f.id,
      name: f.name,
      code: f.code,
      slug: f.slug,
      description: f.description,
      icon: f.icon,
      programs: f.programs.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        degreeLevel: p.degreeLevel,
        degreeTitle: p.degreeTitle,
        accreditation: p.accreditation,
        campusLocation: p.campusLocation,
        shortDesc: p.shortDesc,
        fullDesc: p.fullDesc,
        careerProspect: p.careerProspect,
        tuitionFeeEst: p.tuitionFeeEst ? Number(p.tuitionFeeEst) : null,
        coverImage: p.coverImage || "/images/ar-vr.jpg",
        featured: p.featured,
        version: p.version,
      })),
    }));
  } catch (err) {
    console.error("Error fetching faculties and programs:", err);
    return [];
  }
}

export async function getAllAdminPrograms() {
  await requirePermission("akademik", "read");

  try {
    const programs = await prisma.program.findMany({
      where: { deletedAt: null },
      include: { faculty: { select: { id: true, name: true, code: true } } },
      orderBy: [{ faculty: { code: "asc" } }, { name: "asc" }],
    });

    return programs.map((p) => ({
      id: p.id,
      facultyId: p.facultyId,
      facultyCode: p.faculty.code,
      facultyName: p.faculty.name,
      name: p.name,
      slug: p.slug,
      degreeLevel: p.degreeLevel === DegreeLevel.DIPLOMA ? "D3" : "S1",
      degreeTitle: p.degreeTitle || (p.degreeLevel === DegreeLevel.DIPLOMA ? "A.Md." : "S.Kom."),
      accreditation: p.accreditation,
      campusLocation: p.campusLocation,
      shortDesc: p.shortDesc || "",
      fullDesc: p.fullDesc || "",
      careerProspect: p.careerProspect || "",
      tuitionFeeEst: p.tuitionFeeEst ? Number(p.tuitionFeeEst) : null,
      coverImage: p.coverImage || "/images/banners/hero-pmb.jpg",
      featured: p.featured,
      version: p.version,
    }));
  } catch (err) {
    console.error("Error fetching admin programs:", err);
    return [];
  }
}

export async function saveProgramAction(id: string | null, rawInput: ProgramInput) {
  const session = await requirePermission("akademik", id ? "update" : "create");

  const validated = programInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data program studi gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.program.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Program studi tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return { ok: false, message: "Data telah diperbarui admin lain. Silakan muat ulang." };
      }

      const updated = await prisma.program.update({
        where: { id },
        data: {
          facultyId: data.facultyId,
          name: data.name,
          slug: data.slug,
          degreeLevel: data.degreeLevel,
          degreeTitle: data.degreeTitle,
          accreditation: data.accreditation,
          campusLocation: data.campusLocation,
          shortDesc: data.shortDesc,
          fullDesc: data.fullDesc,
          careerProspect: data.careerProspect,
          tuitionFeeEst: data.tuitionFeeEst,
          coverImage: data.coverImage,
          featured: data.featured,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "Program",
        entityId: updated.id,
        details: { name: updated.name, slug: updated.slug },
      });

      await invalidateEntity(CACHE_TAGS.PROGRAMS, `/${updated.slug}`);
      await invalidateEntity(CACHE_TAGS.FACULTIES, "/akademik");

      return { ok: true, data: updated };
    } else {
      const created = await prisma.program.create({
        data: {
          facultyId: data.facultyId,
          name: data.name,
          slug: data.slug,
          degreeLevel: data.degreeLevel,
          degreeTitle: data.degreeTitle,
          accreditation: data.accreditation,
          campusLocation: data.campusLocation,
          shortDesc: data.shortDesc,
          fullDesc: data.fullDesc,
          careerProspect: data.careerProspect,
          tuitionFeeEst: data.tuitionFeeEst,
          coverImage: data.coverImage,
          featured: data.featured,
          version: 1,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "Program",
        entityId: created.id,
        details: { name: created.name, slug: created.slug },
      });

      await invalidateEntity(CACHE_TAGS.PROGRAMS, "/akademik");

      return { ok: true, data: created };
    }
  } catch (error) {
    console.error("Save program error:", error);
    return { ok: false, message: "Gagal menyimpan data program studi." };
  }
}

export async function deleteFacultyAction(facultyId: string) {
  const session = await requirePermission("akademik", "delete");

  try {
    // 1. Cek apakah ada program studi aktif yang berafiliasi
    const prodiCount = await prisma.program.count({
      where: { facultyId, deletedAt: null },
    });

    if (prodiCount > 0) {
      return {
        ok: false,
        message: `Fakultas ini tidak dapat dihapus karena masih menaungi ${prodiCount} program studi aktif. Pindahkan atau hapus program studi terlebih dahulu.`,
      };
    }

    const faculty = await prisma.faculty.update({
      where: { id: facultyId },
      data: { deletedAt: new Date() },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Faculty",
      entityId: facultyId,
      details: { name: faculty.name },
    });

    await invalidateEntity(CACHE_TAGS.FACULTIES, "/akademik");
    return { ok: true, message: `Fakultas ${faculty.name} berhasil dihapus.` };
  } catch (error) {
    console.error("Delete faculty error:", error);
    return { ok: false, message: "Gagal menghapus fakultas." };
  }
}

export async function softDeleteProgramAction(id: string) {
  const session = await requirePermission("akademik", "delete");

  try {
    const program = await prisma.program.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Program",
      entityId: id,
      details: { name: program.name },
    });

    await invalidateEntity(CACHE_TAGS.PROGRAMS, "/akademik");
    return { ok: true, message: `Program studi ${program.name} berhasil dihapus.` };
  } catch (error) {
    console.error("Delete program error:", error);
    return { ok: false, message: "Gagal menghapus program studi." };
  }
}
