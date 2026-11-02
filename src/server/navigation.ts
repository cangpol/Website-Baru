"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { NavItemLocation } from "@prisma/client";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";
import { recordAuditLog } from "@/server/audit";

const navItemInputSchema = z.object({
  label: z.string().min(2, "Label menu minimal 2 karakter").max(60),
  href: z.string().optional().nullable(),
  pageId: z.string().optional().nullable(),
  parentId: z.string().optional().nullable(),
  location: z.enum(["HEADER", "FOOTER"]).default("HEADER"),
  order: z.number().int().default(0),
  isVisible: z.boolean().default(true),
  openInNewTab: z.boolean().default(false),
  moduleKey: z.string().optional().nullable(),
  version: z.number().int().default(1),
});

export type NavItemInput = z.infer<typeof navItemInputSchema>;

export async function getNavItems(location: "HEADER" | "FOOTER" = "HEADER") {
  try {
    const items = await prisma.navItem.findMany({
      where: {
        deletedAt: null,
        location: location === "HEADER" ? NavItemLocation.HEADER : NavItemLocation.FOOTER,
      },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    return items.map((it) => ({
      id: it.id,
      label: it.label,
      href: it.href,
      pageId: it.pageId,
      parentId: it.parentId,
      location: it.location,
      order: it.order,
      isVisible: it.isVisible,
      openInNewTab: it.openInNewTab,
      moduleKey: it.moduleKey,
      version: it.version,
    }));
  } catch (err) {
    console.error("Error fetching nav items:", err);
    return [];
  }
}

export async function saveNavItemAction(id: string | null, rawInput: NavItemInput) {
  const session = await requirePermission("settings", id ? "update" : "create");
  const validated = navItemInputSchema.safeParse(rawInput);
  if (!validated.success) {
    return { ok: false, message: "Validasi item navigasi gagal.", fieldErrors: validated.error.flatten().fieldErrors };
  }
  const data = validated.data;

  try {
    if (id) {
      const existing = await prisma.navItem.findUnique({ where: { id } });
      if (!existing || existing.version !== data.version) {
        return { ok: false, message: "Item navigasi tidak ditemukan atau telah diubah pengguna lain." };
      }
      const updated = await prisma.navItem.update({
        where: { id },
        data: {
          label: data.label,
          href: data.href,
          pageId: data.pageId || null,
          parentId: data.parentId || null,
          location: data.location === "HEADER" ? NavItemLocation.HEADER : NavItemLocation.FOOTER,
          order: data.order,
          isVisible: data.isVisible,
          openInNewTab: data.openInNewTab,
          moduleKey: data.moduleKey || null,
          version: { increment: 1 },
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "UPDATE",
        entity: "NavItem",
        entityId: updated.id,
      });
      await invalidateEntity(CACHE_TAGS.NAV);
      return { ok: true, data: updated, message: "Menu navigasi berhasil diperbarui." };
    } else {
      const created = await prisma.navItem.create({
        data: {
          label: data.label,
          href: data.href,
          pageId: data.pageId || null,
          parentId: data.parentId || null,
          location: data.location === "HEADER" ? NavItemLocation.HEADER : NavItemLocation.FOOTER,
          order: data.order,
          isVisible: data.isVisible,
          openInNewTab: data.openInNewTab,
          moduleKey: data.moduleKey || null,
        },
      });
      await recordAuditLog({
        userId: session.userId,
        userEmail: session.email,
        action: "CREATE",
        entity: "NavItem",
        entityId: created.id,
      });
      await invalidateEntity(CACHE_TAGS.NAV);
      return { ok: true, data: created, message: "Menu navigasi baru berhasil ditambahkan." };
    }
  } catch (err) {
    console.error("Error saving nav item:", err);
    return { ok: false, message: "Gagal menyimpan item navigasi." };
  }
}

export async function deleteNavItemAction(id: string) {
  const session = await requirePermission("settings", "delete");
  try {
    // Soft delete item dan jadikan null parentId bagi child-nya
    await prisma.$transaction([
      prisma.navItem.updateMany({
        where: { parentId: id },
        data: { parentId: null },
      }),
      prisma.navItem.update({
        where: { id },
        data: { deletedAt: new Date() },
      }),
    ]);

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "NavItem",
      entityId: id,
    });
    await invalidateEntity(CACHE_TAGS.NAV);
    return { ok: true, message: "Menu navigasi berhasil dihapus." };
  } catch (err) {
    console.error("Error deleting nav item:", err);
    return { ok: false, message: "Gagal menghapus item navigasi." };
  }
}
