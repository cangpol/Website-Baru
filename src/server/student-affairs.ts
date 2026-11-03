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

// ── 1. Organisasi Mahasiswa & UKM ──────────────────────────────────────────
const studentOrgInputSchema = z.object({
  name: z.string().min(2, "Nama organisasi minimal 2 karakter").max(150),
  category: z.string().min(2, "Kategori wajib diisi"), // BEM, HIMA, UKM
  description: z.string().max(500).optional().nullable(),
  logoUrl: z.string().optional().nullable(),
  instagram: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type StudentOrgInput = z.infer<typeof studentOrgInputSchema>;

export async function getStudentOrgs() {
  try {
    const orgs = await prisma.studentOrg.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
    });
    return orgs.map((o) => ({
      id: o.id,
      name: o.name,
      category: o.category,
      description: o.description || "",
      logoUrl: o.logoUrl || "/images/kegiatan.jpg",
      instagram: o.instagram || "",
      order: o.order,
      isActive: o.isActive,
      version: o.version,
    }));
  } catch (err) {
    console.error("Error fetching student orgs:", err);
    return [];
  }
}

export async function saveStudentOrgAction(id: string | null, rawInput: StudentOrgInput) {
  const session = await requirePermission("kemahasiswaan", id ? "update" : "create");
  const validated = studentOrgInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return { ok: false, message: "Validasi organisasi gagal.", fieldErrors: validated.error.flatten().fieldErrors };
  }
  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.studentOrg.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Data tidak ditemukan atau telah diubah pengguna lain." };
      }
      const updated = await prisma.studentOrg.update({
        where: { id },
        data: {
          name: data.name,
          category: data.category,
          description: data.description,
          logoUrl: data.logoUrl,
          instagram: data.instagram,
          order: data.order,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "StudentOrg",
        entityId: updated.id,
      });
      await invalidateEntity(CACHE_TAGS.STUDENT_ORGS, "/kemahasiswaan");
      return { ok: true, data: updated, message: "Organisasi berhasil diperbarui." };
    } else {
      const created = await prisma.studentOrg.create({
        data: {
          name: data.name,
          category: data.category,
          description: data.description,
          logoUrl: data.logoUrl,
          instagram: data.instagram,
          order: data.order,
          isActive: data.isActive,
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "StudentOrg",
        entityId: created.id,
      });
      await invalidateEntity(CACHE_TAGS.STUDENT_ORGS, "/kemahasiswaan");
      return { ok: true, data: created, message: "Organisasi baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving student org:", err);
    return { ok: false, message: "Gagal menyimpan data organisasi." };
  }
}

export async function deleteStudentOrgAction(id: string) {
  const session = await requirePermission("kemahasiswaan", "delete");
  try {
    await prisma.studentOrg.update({ where: { id }, data: { deletedAt: new Date() } });
    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "StudentOrg",
      entityId: id,
    });
    await invalidateEntity(CACHE_TAGS.STUDENT_ORGS, "/kemahasiswaan");
    return { ok: true, message: "Organisasi berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting student org:", err);
    return { ok: false, message: "Gagal menghapus organisasi." };
  }
}

// ── 2. Beasiswa (Scholarship) ──────────────────────────────────────────────
const scholarshipInputSchema = z.object({
  title: z.string().min(3, "Judul beasiswa minimal 3 karakter").max(200),
  provider: z.string().min(2, "Penyelenggara beasiswa wajib diisi"),
  requirements: z.string().optional().nullable(),
  deadline: z.string().optional().nullable(),
  linkUrl: z.string().max(2048).url("Format link tidak valid").refine(isHttpUrl).optional().nullable().or(z.literal("")),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type ScholarshipInput = z.infer<typeof scholarshipInputSchema>;

export async function getScholarships() {
  try {
    const list = await prisma.scholarship.findMany({
      where: { deletedAt: null, isActive: true },
      orderBy: { createdAt: "desc" },
    });
    return list.map((s) => ({
      id: s.id,
      title: s.title,
      provider: s.provider,
      requirements: s.requirements || "",
      deadline: s.deadline?.toISOString() || null,
      linkUrl: s.linkUrl || "",
      isActive: s.isActive,
      version: s.version,
    }));
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    return [];
  }
}

export async function saveScholarshipAction(id: string | null, rawInput: ScholarshipInput) {
  const session = await requirePermission("kemahasiswaan", id ? "update" : "create");
  const validated = scholarshipInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return { ok: false, message: "Validasi beasiswa gagal.", fieldErrors: validated.error.flatten().fieldErrors };
  }
  const data = validated.data;
  const deadlineDate = data.deadline ? new Date(data.deadline) : null;

  try {
    if (id) {
      const existing = await prisma.scholarship.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Data tidak ditemukan atau telah diubah pengguna lain." };
      }
      const updated = await prisma.scholarship.update({
        where: { id },
        data: {
          title: data.title,
          provider: data.provider,
          requirements: data.requirements,
          deadline: deadlineDate,
          linkUrl: data.linkUrl || null,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "Scholarship",
        entityId: updated.id,
      });
      await invalidateEntity(CACHE_TAGS.SCHOLARSHIPS, "/kemahasiswaan");
      return { ok: true, data: updated, message: "Program beasiswa berhasil diperbarui." };
    } else {
      const created = await prisma.scholarship.create({
        data: {
          title: data.title,
          provider: data.provider,
          requirements: data.requirements,
          deadline: deadlineDate,
          linkUrl: data.linkUrl || null,
          isActive: data.isActive,
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "Scholarship",
        entityId: created.id,
      });
      await invalidateEntity(CACHE_TAGS.SCHOLARSHIPS, "/kemahasiswaan");
      return { ok: true, data: created, message: "Beasiswa baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving scholarship:", err);
    return { ok: false, message: "Gagal menyimpan data beasiswa." };
  }
}

export async function deleteScholarshipAction(id: string) {
  const session = await requirePermission("kemahasiswaan", "delete");
  try {
    await prisma.scholarship.update({ where: { id }, data: { deletedAt: new Date() } });
    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Scholarship",
      entityId: id,
    });
    await invalidateEntity(CACHE_TAGS.SCHOLARSHIPS, "/kemahasiswaan");
    return { ok: true, message: "Program beasiswa berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting scholarship:", err);
    return { ok: false, message: "Gagal menghapus beasiswa." };
  }
}

// ── 3. Prestasi Mahasiswa (Achievement) ────────────────────────────────────
const achievementInputSchema = z.object({
  title: z.string().min(3, "Judul prestasi minimal 3 karakter").max(200),
  studentName: z.string().min(2, "Nama mahasiswa minimal 2 karakter"),
  competition: z.string().min(2, "Nama kompetisi wajib diisi"),
  rank: z.string().min(1, "Peringkat / Juara wajib diisi"),
  level: z.string().default("Nasional"), // Regional, Nasional, Internasional
  year: z.number().int().min(2010).max(2100).default(2026),
  photoUrl: z.string().optional().nullable(),
  version: z.number().int().default(1),
});

export type AchievementInput = z.infer<typeof achievementInputSchema>;

export async function getAchievements() {
  try {
    const list = await prisma.achievement.findMany({
      where: { deletedAt: null },
      orderBy: [{ year: "desc" }, { createdAt: "desc" }],
    });
    return list.map((a) => ({
      id: a.id,
      title: a.title,
      studentName: a.studentName,
      competition: a.competition,
      rank: a.rank,
      level: a.level,
      year: a.year,
      photoUrl: a.photoUrl || "/images/anugerah.jpg",
      version: a.version,
    }));
  } catch (err) {
    console.error("Error fetching achievements:", err);
    return [];
  }
}

export async function saveAchievementAction(id: string | null, rawInput: AchievementInput) {
  const session = await requirePermission("kemahasiswaan", id ? "update" : "create");
  const validated = achievementInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return { ok: false, message: "Validasi prestasi gagal.", fieldErrors: validated.error.flatten().fieldErrors };
  }
  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.achievement.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Data tidak ditemukan atau telah diubah pengguna lain." };
      }
      const updated = await prisma.achievement.update({
        where: { id },
        data: {
          title: data.title,
          studentName: data.studentName,
          competition: data.competition,
          rank: data.rank,
          level: data.level,
          year: data.year,
          photoUrl: data.photoUrl,
          version: { increment: 1 },
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "Achievement",
        entityId: updated.id,
      });
      await invalidateEntity(CACHE_TAGS.ACHIEVEMENTS, "/kemahasiswaan");
      return { ok: true, data: updated, message: "Data prestasi mahasiswa berhasil diperbarui." };
    } else {
      const created = await prisma.achievement.create({
        data: {
          title: data.title,
          studentName: data.studentName,
          competition: data.competition,
          rank: data.rank,
          level: data.level,
          year: data.year,
          photoUrl: data.photoUrl,
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "Achievement",
        entityId: created.id,
      });
      await invalidateEntity(CACHE_TAGS.ACHIEVEMENTS, "/kemahasiswaan");
      return { ok: true, data: created, message: "Prestasi baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving achievement:", err);
    return { ok: false, message: "Gagal menyimpan data prestasi." };
  }
}

export async function deleteAchievementAction(id: string) {
  const session = await requirePermission("kemahasiswaan", "delete");
  try {
    await prisma.achievement.update({ where: { id }, data: { deletedAt: new Date() } });
    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "Achievement",
      entityId: id,
    });
    await invalidateEntity(CACHE_TAGS.ACHIEVEMENTS, "/kemahasiswaan");
    return { ok: true, message: "Prestasi berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting achievement:", err);
    return { ok: false, message: "Gagal menghapus prestasi." };
  }
}

// ── 4. Seksi Kemahasiswaan (Ormawa, Beasiswa, Prestasi, Kegiatan) ───────────
export interface KemahasiswaanSectionItem {
  id: string;
  type: "ormawa" | "beasiswa" | "prestasi" | "kegiatan" | "tugas_fungsi" | "pengembangan" | "galeri" | "kalender";
  title: string;
  category?: string;
  description: string;
  dateOrSemester?: string;
  image?: string;
  link?: string;
  updatedAt?: string;
}

function isSafeContentUrl(value: string) {
  if (value.startsWith("/") && !value.startsWith("//")) return true;
  try {
    return ["http:", "https:"].includes(new URL(value).protocol);
  } catch {
    return false;
  }
}

const kemahasiswaanSectionsSchema = z.array(z.object({
  id: z.string().trim().min(1).max(100),
  type: z.enum(["ormawa", "beasiswa", "prestasi", "kegiatan", "tugas_fungsi", "pengembangan", "galeri", "kalender"]),
  title: z.string().trim().min(1).max(300),
  category: z.string().max(200).optional(),
  description: z.string().max(10000),
  dateOrSemester: z.string().max(200).optional(),
  image: z.string().max(2048).refine(isSafeContentUrl).optional(),
  link: z.string().max(2048).refine(isSafeContentUrl).optional(),
  updatedAt: z.string().max(100).optional(),
})).max(500);

const DEFAULT_KEMAHASISWAAN_SECTIONS: KemahasiswaanSectionItem[] = [
  {
    id: "kmh-01",
    type: "ormawa",
    title: "Badan Eksekutif Mahasiswa (BEM) UPITRA",
    category: "Organisasi Eksekutif",
    description: "Wadah representasi aspirasi sivitas akademika mahasiswa UPITRA dalam kepemimpinan, advokasi, dan pengabdian masyarakat.",
    dateOrSemester: "Periode 2026",
    image: "/images/kegiatan.jpg",
    link: "https://instagram.com/upitra_campus",
  },
  {
    id: "kmh-02",
    type: "beasiswa",
    title: "Beasiswa Unggulan Triputra DNA 100%",
    category: "Beasiswa Industri",
    description: "Pembebasan biaya kuliah DPP dan SKS penuh hingga lulus untuk mahasiswa berprestasi dan siap berkarier di Triputra Group.",
    dateOrSemester: "Tahun Akademik 2026/2027",
    image: "/images/pmb/wave-ready-achievement.jpg",
    link: "/#daftar",
  },
];

export async function getKemahasiswaanSections(): Promise<KemahasiswaanSectionItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "admin_kemahasiswaan_sections" },
    });
    if (!setting || !Array.isArray(setting.value)) {
      return DEFAULT_KEMAHASISWAAN_SECTIONS;
    }
    const parsed = kemahasiswaanSectionsSchema.safeParse(setting.value);
    return parsed.success ? parsed.data : DEFAULT_KEMAHASISWAAN_SECTIONS;
  } catch {
    return DEFAULT_KEMAHASISWAAN_SECTIONS;
  }
}

export async function saveKemahasiswaanSectionsAction(rawItems: unknown) {
  const session = await requirePermission("kemahasiswaan", "update");
  const validated = kemahasiswaanSectionsSchema.safeParse(rawItems);
  if (!validated.success) {
    return {
      ok: false,
      message: "Format seksi kemahasiswaan tidak valid.",
      fieldErrors: validated.error.flatten(),
    };
  }
  const items = validated.data;

  try {
    await prisma.siteSetting.upsert({
      where: { key: "admin_kemahasiswaan_sections" },
      create: {
        key: "admin_kemahasiswaan_sections",
        value: items as unknown as Prisma.InputJsonValue,
        description: "Konten seksi kemahasiswaan (Ormawa, Beasiswa, Prestasi)",
      },
      update: {
        value: items as unknown as Prisma.InputJsonValue,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: "admin_kemahasiswaan_sections",
      details: JSON.stringify({ count: items.length }),
    });

    await invalidateEntity(CACHE_TAGS.STUDENT_ORGS, "/kemahasiswaan");
    return { ok: true, message: "Data kemahasiswaan berhasil disimpan ke database." };
  } catch (err) {
    console.error("Error saving kemahasiswaan sections:", err);
    return { ok: false, message: "Gagal menyimpan data kemahasiswaan." };
  }
}
