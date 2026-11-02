"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { Role } from "@prisma/client";
import { recordAuditLog } from "@/server/audit";

const userInputSchema = z.object({
  name: z.string().min(2, "Nama staf minimal 2 karakter").max(100),
  email: z.string().email("Format email tidak valid").toLowerCase(),
  role: z.enum(["SUPERADMIN", "STAFF_PMB", "CONTENT_WRITER"]),
  password: z.string().min(8, "Password minimal 8 karakter").optional().nullable().or(z.literal("")),
  isActive: z.boolean().default(true),
});

export type UserInput = z.infer<typeof userInputSchema>;

export async function getUsers() {
  await requirePermission("users", "read");

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        mustChangePassword: true,
        createdAt: true,
      },
    });

    return users.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString(),
      lastLoginAt: u.lastLoginAt?.toISOString() || null,
    }));
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}

export async function saveUserAction(id: string | null, rawInput: UserInput) {
  const session = await requirePermission("users", id ? "update" : "create");

  const validated = userInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return {
      ok: false,
      message: "Validasi data staf gagal.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.user.findUnique({ where: { id } });
      if (!existing) {
        return { ok: false, message: "Pengguna tidak ditemukan." };
      }

      // Cegah penurunan peran SUPERADMIN terakhir
      if (existing.role === Role.SUPERADMIN && data.role !== Role.SUPERADMIN) {
        const superadminCount = await prisma.user.count({
          where: { role: Role.SUPERADMIN, isActive: true },
        });
        if (superadminCount <= 1) {
          return {
            ok: false,
            message: "Tidak dapat menurunkan peran SUPERADMIN terakhir dari sistem.",
          };
        }
      }

      const updateData: any = {
        name: data.name,
        email: data.email,
        role: data.role,
        isActive: data.isActive,
      };

      if (data.password && data.password.trim().length >= 8) {
        updateData.password = await bcrypt.hash(data.password, 12);
        updateData.mustChangePassword = true;
      }

      const updated = await prisma.user.update({
        where: { id },
        data: updateData,
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "User",
        entityId: updated.id,
        details: JSON.stringify({ name: updated.name, role: updated.role, email: updated.email }),
      });

      return { ok: true, message: `Akun staf "${updated.name}" berhasil diperbarui.` };
    } else {
      // Pembuatan staf baru wajib ada password awal
      if (!data.password || data.password.trim().length < 8) {
        return { ok: false, message: "Password awal minimal 8 karakter wajib diisi untuk akun baru." };
      }

      // Cek apakah email sudah terdaftar
      const emailExists = await prisma.user.findUnique({ where: { email: data.email } });
      if (emailExists) {
        return { ok: false, message: "Email sudah digunakan oleh staf lain." };
      }

      const hashedPassword = await bcrypt.hash(data.password, 12);
      const created = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          role: data.role,
          password: hashedPassword,
          isActive: data.isActive,
          mustChangePassword: true,
        },
      });

      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "User",
        entityId: created.id,
        details: JSON.stringify({ name: created.name, role: created.role, email: created.email }),
      });

      return { ok: true, message: `Akun staf "${created.name}" berhasil dibuat.` };
    }
  } catch (err) {
    console.error("Error saving user:", err);
    return { ok: false, message: "Terjadi kesalahan internal saat menyimpan akun staf." };
  }
}

export async function deleteUserAction(id: string) {
  const session = await requirePermission("users", "delete");

  // Cegah menghapus diri sendiri
  if (session.userId === id) {
    return { ok: false, message: "Anda tidak dapat menghapus akun Anda sendiri saat sedang aktif." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return { ok: false, message: "Pengguna tidak ditemukan." };
    }

    if (existing.role === Role.SUPERADMIN) {
      const superadminCount = await prisma.user.count({
        where: { role: Role.SUPERADMIN, isActive: true },
      });
      if (superadminCount <= 1) {
        return { ok: false, message: "Tidak dapat menghapus SUPERADMIN terakhir." };
      }
    }

    await prisma.user.delete({ where: { id } });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "User",
      entityId: id,
      details: JSON.stringify({ name: existing.name, email: existing.email }),
    });

    return { ok: true, message: `Akun "${existing.name}" berhasil dihapus.` };
  } catch (err) {
    console.error("Error deleting user:", err);
    return { ok: false, message: "Gagal menghapus pengguna." };
  }
}
