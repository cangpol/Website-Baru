"use server";

import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

/** Jumlah leads PMB yang belum ditindaklanjuti, untuk lonceng notifikasi. Null bila peran tidak berhak. */
export async function getNewLeadCount() {
  const session = await requireUser();
  if (session.role !== Role.SUPERADMIN) return null; // data pendaftar khusus Super Admin
  try {
    return await prisma.admissionLead.count({ where: { deletedAt: null, status: "LEAD_SUBMITTED" } });
  } catch {
    return null;
  }
}
