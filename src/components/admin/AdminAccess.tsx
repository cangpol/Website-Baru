"use client";

import { createContext, useContext } from "react";
import { SUPERADMIN_ROLE } from "@/lib/adminFeatures";

/** Hak akses pengguna yang sedang login. Hanya untuk tampilan; penjagaan sebenarnya ada di server. */
export interface AdminAccess {
  role: string;
  /** Bagian yang menyala untuk pengguna ini (id fitur). */
  features: Record<string, boolean>;
}

const AdminAccessContext = createContext<AdminAccess>({ role: "", features: {} });

export const AdminAccessProvider = AdminAccessContext.Provider;

export function useAdminAccess() {
  const access = useContext(AdminAccessContext);
  const isSuper = access.role === SUPERADMIN_ROLE;
  return { ...access, isSuper, can: (featureId: string) => isSuper || access.features[featureId] === true };
}
