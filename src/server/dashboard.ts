"use server";

import { Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getFeatureFlags, requireUser } from "@/lib/auth";
import { ADMIN_FEATURES, isFeatureEnabled } from "@/lib/adminFeatures";

/** Jumlah leads PMB yang belum ditindaklanjuti, untuk lonceng notifikasi. Null bila peran tidak berhak. */
export async function getNewLeadCount() {
  const session = await requireUser();
  if (session.role !== Role.SUPERADMIN) {
    const pmb = ADMIN_FEATURES.find((f) => f.id === "pmb");
    if (!pmb || !isFeatureEnabled(pmb, session.role, await getFeatureFlags())) return null;
  }
  try {
    return await prisma.admissionLead.count({ where: { deletedAt: null, status: "LEAD_SUBMITTED" } });
  } catch {
    return null;
  }
}
