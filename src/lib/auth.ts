import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { Role } from "@prisma/client";

export interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
  exp: number; // UNIX timestamp in seconds
}

const SESSION_COOKIE_NAME = "upitra_session";
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 hari

function getSecretKey(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET;
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("ADMIN_SESSION_SECRET wajib diatur di lingkungan produksi.");
    }
    return "dev-signing-key-minimum-32-characters-upitra";
  }
  return secret;
}

// Menandatangani payload dengan HMAC-SHA256
export function signSessionToken(payload: Omit<SessionPayload, "exp">): string {
  const exp = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE_SECONDS;
  const fullPayload: SessionPayload = { ...payload, exp };
  const payloadB64 = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = createHmac("sha256", getSecretKey())
    .update(payloadB64)
    .digest("base64url");
  return `${payloadB64}.${signature}`;
}

// Memverifikasi token tanda tangan
export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [payloadB64, signature] = parts;

    const expectedSignature = createHmac("sha256", getSecretKey())
      .update(payloadB64)
      .digest("base64url");

    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSignature);
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      return null;
    }

    const jsonStr = Buffer.from(payloadB64, "base64url").toString("utf-8");
    const payload = JSON.parse(jsonStr) as SessionPayload;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// Membaca sesi saat ini dari HTTP cookies
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

// Menetapkan cookie sesi httpOnly aman
export async function setSessionCookie(payload: Omit<SessionPayload, "exp">): Promise<void> {
  const token = signSessionToken(payload);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

// Menghapus cookie sesi saat logout
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

// Wajib Login: Helper untuk Server Actions & Route Handlers
export async function requireUser(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("Akses ditolak: Anda harus login terlebih dahulu.");
  }
  return session;
}

// Wajib Role Tertentu
export async function requireRole(...allowedRoles: Role[]): Promise<SessionPayload> {
  const session = await requireUser();
  if (!allowedRoles.includes(session.role)) {
    throw new Error(`Akses ditolak: Peran ${session.role} tidak memiliki hak akses untuk tindakan ini.`);
  }
  return session;
}

// Izin Spesifik Berdasarkan Modul & Aksi
export type AdminAction = "read" | "create" | "update" | "delete" | "publish";

export async function requirePermission(
  moduleKey: string,
  action: AdminAction = "read"
): Promise<SessionPayload> {
  const session = await requireUser();
  const { role } = session;

  // SUPERADMIN memiliki akses penuh tanpa batas
  if (role === Role.SUPERADMIN) {
    return session;
  }

  // STAFF_PMB hak akses
  if (role === Role.STAFF_PMB) {
    const allowedModules = ["pmb", "tours", "events", "programs", "dashboard"];
    if (allowedModules.includes(moduleKey)) {
      if (moduleKey === "programs" && action !== "read") {
        throw new Error("Staff PMB hanya memiliki hak baca pada kurikulum program studi.");
      }
      return session;
    }
    throw new Error("Staff PMB tidak memiliki izin untuk modul ini.");
  }

  // CONTENT_WRITER hak akses
  if (role === Role.CONTENT_WRITER) {
    const allowedModules = ["articles", "media", "dashboard"];
    if (allowedModules.includes(moduleKey)) {
      return session;
    }
    throw new Error("Content Writer hanya dapat mengakses modul Berita/Riset dan Media.");
  }

  throw new Error("Akses ditolak: Hak akses tidak mencukupi.");
}

