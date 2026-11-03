"use server";

import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

const staffMemberInputSchema = z.object({
  name: z.string().min(2, "Nama staf/dosen minimal 2 karakter").max(150),
  position: z.string().min(2, "Jabatan wajib diisi").max(150),
  bio: z.string().max(1000).optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  type: z.enum(["PIMPINAN", "DOSEN", "TENAGA_KEPENDIDIKAN"]).default("DOSEN"),
  programId: z.string().optional().nullable(),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  version: z.number().int().default(1),
});

export type StaffMemberInput = z.infer<typeof staffMemberInputSchema>;

export async function getStaffMembers(params?: { type?: string }) {
  try {
    const where: any = { deletedAt: null, isActive: true };
    if (params?.type && params.type !== "ALL") {
      where.type = params.type;
    }

    const staff = await prisma.staffMember.findMany({
      where,
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return staff.map((s) => ({
      id: s.id,
      name: s.name,
      position: s.position,
      bio: s.bio || "",
      photoUrl: s.photoUrl || "/images/pimpinan/rektor-neil-rupidara.jpg",
      type: s.type,
      programId: s.programId,
      order: s.order,
      isActive: s.isActive,
      version: s.version,
    }));
  } catch (err) {
    console.error("Error fetching staff members:", err);
    return [];
  }
}

export async function saveStaffMemberAction(id: string | null, rawInput: StaffMemberInput) {
  const session = await requirePermission("profil", id ? "update" : "create");

  const validated = staffMemberInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data staf/pimpinan gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.staffMember.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Data staf tidak ditemukan." };
      }

      if (existing.version !== data.version) {
        return {
          ok: false,
          message: "Data telah diperbarui pengguna lain. Silakan refresh halaman.",
        };
      }

      const updated = await prisma.staffMember.update({
        where: { id },
        data: {
          name: data.name,
          position: data.position,
          bio: data.bio,
          photoUrl: data.photoUrl,
          type: data.type,
          programId: data.programId || null,
          order: data.order,
          isActive: data.isActive,
          version: { increment: 1 },
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "StaffMember",
        entityId: updated.id,
        details: JSON.stringify({ name: updated.name, type: updated.type }),
      });

      await invalidateEntity(CACHE_TAGS.STAFF, "/profil");
      return { ok: true, data: updated, message: "Data staf/pimpinan berhasil diperbarui." };
    } else {
      const created = await prisma.staffMember.create({
        data: {
          name: data.name,
          position: data.position,
          bio: data.bio,
          photoUrl: data.photoUrl,
          type: data.type,
          programId: data.programId || null,
          order: data.order,
          isActive: data.isActive,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "StaffMember",
        entityId: created.id,
        details: JSON.stringify({ name: created.name, type: created.type }),
      });

      await invalidateEntity(CACHE_TAGS.STAFF, "/profil");
      return { ok: true, data: created, message: "Staf/Pimpinan baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving staff member:", err);
    return { ok: false, message: "Gagal menyimpan data staf." };
  }
}

export async function deleteStaffMemberAction(id: string) {
  const session = await requirePermission("profil", "delete");

  try {
    const existing = await prisma.staffMember.findUnique({ where: { id } });
    if (!existing) {
      return { ok: false, message: "Data staf tidak ditemukan." };
    }

    await prisma.staffMember.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "StaffMember",
      entityId: id,
      details: JSON.stringify({ name: existing.name }),
    });

    await invalidateEntity(CACHE_TAGS.STAFF, "/profil");
    return { ok: true, message: "Data staf berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting staff member:", err);
    return { ok: false, message: "Gagal menghapus data staf." };
  }
}

// ── Profil Sections (Visi Misi, Sejarah, Fasilitas) ─────────────────────────
export interface ProfilSectionItem {
  id: string;
  category?: "tentang" | "visi-misi" | "pimpinan" | "fasilitas" | string;
  type?: "tentang" | "visi_misi" | "pimpinan" | "prestasi" | string;
  title: string;
  subtitle?: string;
  content: string;
  image?: string;
  extraMeta?: string;
  updatedAt?: string;
}

const profileSectionsSchema = z.array(z.object({
  id: z.string().trim().min(1).max(100),
  category: z.string().max(100).optional(),
  type: z.string().max(100).optional(),
  title: z.string().trim().min(1).max(300),
  subtitle: z.string().max(1000).optional(),
  content: z.string().max(20000),
  image: z.string().max(2048).optional(),
  extraMeta: z.string().max(1000).optional(),
  updatedAt: z.string().max(100).optional(),
})).max(500);

const DEFAULT_PROFIL_SECTIONS: ProfilSectionItem[] = [
  {
    id: "prf-01",
    category: "tentang",
    title: "Sejarah & Nilai Dasar Triputra",
    subtitle: "Berakar pada integritas, keunggulan etika, dan kepedulian sosial tinggi.",
    content: "Universitas Pignatelli Triputra (UPITRA) bertransformasi menjadi universitas modern berbasis industri yang berkolaborasi erat dengan Triputra Group dan Yayasan Santo Ignasius.",
    image: "/images/gedung-upitra.jpg",
    extraMeta: "Didirikan 2023",
  },
  {
    id: "prf-02",
    category: "visi-misi",
    title: "Visi & Misi Strategis 2030",
    subtitle: "Menjadi perguruan tinggi berkarakter unggul yang adaptif terhadap disrupsi global.",
    content: "Menyelenggarakan pendidikan vokasi dan sarjana berkualitas industri, riset terapan solutif, serta pengabdian masyarakat bermartabat.",
    image: "/images/wisuda.jpg",
    extraMeta: "Target Akreditasi Unggul",
  },
  {
    id: "prf-03",
    category: "pimpinan",
    title: "Dr. Neil Semuel Rupidara, S.E., M.Sc.",
    subtitle: "Rektor Universitas Pignatelli Triputra",
    content: "Memimpin transformasi akseleratif UPITRA untuk menghasilkan lulusan berkarakter tangguh yang siap memimpin industri nasional.",
    image: "/images/pimpinan/rektor-neil-rupidara.jpg",
    extraMeta: "Periode 2023 - 2027",
  },
];

export async function getProfilSections(): Promise<ProfilSectionItem[]> {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "admin_profil_sections" },
    });
    if (!setting || !Array.isArray(setting.value)) {
      return DEFAULT_PROFIL_SECTIONS;
    }
    const parsed = profileSectionsSchema.safeParse(setting.value);
    return parsed.success ? parsed.data : DEFAULT_PROFIL_SECTIONS;
  } catch {
    return DEFAULT_PROFIL_SECTIONS;
  }
}

export async function saveProfilSectionsAction(rawItems: unknown) {
  const session = await requirePermission("profil", "update");
  const validated = profileSectionsSchema.safeParse(rawItems);
  if (!validated.success) {
    return {
      ok: false,
      message: "Format seksi profil tidak valid.",
      fieldErrors: validated.error.flatten(),
    };
  }
  const items = validated.data;

  try {
    await prisma.siteSetting.upsert({
      where: { key: "admin_profil_sections" },
      create: {
        key: "admin_profil_sections",
        value: items as unknown as Prisma.InputJsonValue,
        description: "Konten seksi profil (Sejarah, Visi Misi, Fasilitas)",
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
      entityId: "admin_profil_sections",
      details: JSON.stringify({ count: items.length }),
    });

    await invalidateEntity(CACHE_TAGS.STAFF, "/profil");
    return { ok: true, message: "Data profil berhasil disimpan ke database." };
  } catch (err) {
    console.error("Error saving profil sections:", err);
    return { ok: false, message: "Gagal menyimpan data profil." };
  }
}
