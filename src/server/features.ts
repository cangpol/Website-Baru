"use server";

import { Prisma, Role } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getFeatureFlags, requireUser } from "@/lib/auth";
import { recordAuditLog } from "@/server/audit";
import { ADMIN_FEATURES, FEATURE_FLAGS_SETTING_KEY, type FeatureFlags } from "@/lib/adminFeatures";

/** Saklar fitur saat ini. Hanya Super Admin yang boleh membaca daftar lengkapnya. */
export async function getAdminFeatureFlags(): Promise<{ ok: boolean; flags: FeatureFlags; message?: string }> {
  const session = await requireUser();
  if (session.role !== Role.SUPERADMIN) return { ok: false, flags: {}, message: "Hanya Super Admin yang dapat mengakses halaman ini." };
  return { ok: true, flags: await getFeatureFlags() };
}

/** Menyalakan/mematikan satu fitur untuk peran admin. */
export async function setAdminFeatureAction(featureId: string, enabled: boolean) {
  const session = await requireUser();
  if (session.role !== Role.SUPERADMIN) return { ok: false, message: "Hanya Super Admin yang dapat mengubah pengaturan fitur." };

  const feature = ADMIN_FEATURES.find((f) => f.id === featureId);
  if (!feature) return { ok: false, message: "Fitur tidak dikenal." };

  try {
    const flags = { ...(await getFeatureFlags()), [featureId]: Boolean(enabled) };
    await prisma.siteSetting.upsert({
      where: { key: FEATURE_FLAGS_SETTING_KEY },
      create: { key: FEATURE_FLAGS_SETTING_KEY, value: flags as Prisma.InputJsonValue, description: "Saklar fitur admin (diatur Super Admin)" },
      update: { value: flags as Prisma.InputJsonValue },
    });
    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "SiteSetting",
      entityId: FEATURE_FLAGS_SETTING_KEY,
      details: JSON.stringify({ feature: featureId, enabled: Boolean(enabled) }),
    });
    return { ok: true, flags, message: `Fitur "${feature.label}" ${enabled ? "diaktifkan" : "dinonaktifkan"} untuk admin.` };
  } catch (err) {
    console.error("setAdminFeatureAction error:", err);
    return { ok: false, message: "Gagal menyimpan pengaturan fitur." };
  }
}
