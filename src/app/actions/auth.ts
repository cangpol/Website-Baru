"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

// Hash dummy untuk menyamakan waktu respons saat email tidak terdaftar (cegah user enumeration via timing).
const DUMMY_PASSWORD_HASH = "$2b$12$pPokwaWXR0mGNJ8GkrOB.e/LguW2EFVPk38ezl5JkgN.xTOdvt1JO";
const MAX_TRACKED_LOGIN_KEYS = 5000;

// Supplemental per-process limit; account lockout is also persisted in the database.
const loginAttempts = new Map<string, { count: number; lockedUntil: number }>();

function checkRateLimit(key: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(key);

  if (!record) {
    return { allowed: true };
  }

  if (record.lockedUntil > now) {
    return {
      allowed: false,
      remainingSeconds: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  if (record.lockedUntil <= now && record.count >= 5) {
    loginAttempts.delete(key);
    return { allowed: true };
  }

  return { allowed: true };
}

function recordFailedAttempt(key: string) {
  const now = Date.now();
  const record = loginAttempts.get(key) || { count: 0, lockedUntil: 0 };
  if (!loginAttempts.has(key) && loginAttempts.size >= MAX_TRACKED_LOGIN_KEYS) {
    for (const [k, v] of loginAttempts) {
      if (v.lockedUntil <= now) loginAttempts.delete(k);
    }
    if (loginAttempts.size >= MAX_TRACKED_LOGIN_KEYS) loginAttempts.clear();
  }
  record.count += 1;

  if (record.count >= 5) {
    // Kunci selama 15 menit jika 5 kali gagal
    record.lockedUntil = now + 15 * 60 * 1000;
  }

  loginAttempts.set(key, record);
}

function clearFailedAttempts(key: string) {
  loginAttempts.delete(key);
}

const loginSchema = z.object({
  email: z.string().email("Format alamat email tidak valid"),
  password: z.string().min(6, "Kata sandi minimal 6 karakter"),
});

export type LoginActionState = {
  success: boolean;
  message: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
};

export async function loginAdminAction(
  prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const emailRaw = formData.get("email");
  const passwordRaw = formData.get("password");

  const validated = loginSchema.safeParse({
    email: emailRaw,
    password: passwordRaw,
  });

  if (!validated.success) {
    return {
      success: false,
      message: "Data formulir tidak valid.",
      fieldErrors: validated.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validated.data;
  const rateLimitKey = email.toLowerCase().trim();

  // 0. Batasi percobaan per alamat IP (mencegah brute-force lintas akun)
  const ip = await getClientIp();
  const ipLimit = rateLimit(`login:${ip}`, 20, 15 * 60 * 1000);
  if (!ipLimit.allowed) {
    return {
      success: false,
      message: `Terlalu banyak percobaan login. Silakan coba lagi dalam ${ipLimit.retryAfterSeconds} detik.`,
    };
  }

  // 1. Cek Rate Limit per akun
  const accountLimit = checkRateLimit(rateLimitKey);
  if (!accountLimit.allowed) {
    return {
      success: false,
      message: `Terlalu banyak percobaan gagal. Akun dikunci sementara. Silakan coba lagi dalam ${accountLimit.remainingSeconds} detik.`,
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: rateLimitKey },
    });

    if (!user) {
      await bcrypt.compare(password, DUMMY_PASSWORD_HASH);
      recordFailedAttempt(rateLimitKey);
      return {
        success: false,
        message: "Kredensial email atau kata sandi tidak valid.",
      };
    }

    const now = new Date();
    if (user.lockedUntil && user.lockedUntil > now) {
      return {
        success: false,
        message: "Kredensial email atau kata sandi tidak valid.",
      };
    }

    // Verify the password before checking account state to avoid revealing disabled accounts.
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch || !user.isActive) {
      recordFailedAttempt(rateLimitKey);
      const previousAttempts =
        user.lockedUntil && user.lockedUntil <= now ? 0 : user.failedLoginCount;
      const failedLoginCount = previousAttempts + 1;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          failedLoginCount,
          lockedUntil:
            failedLoginCount >= 5
              ? new Date(now.getTime() + 15 * 60 * 1000)
              : null,
        },
      });
      return {
        success: false,
        message: "Kredensial email atau kata sandi tidak valid.",
      };
    }

    // 4. Reset percobaan gagal setelah berhasil
    clearFailedAttempts(rateLimitKey);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        failedLoginCount: 0,
        lockedUntil: null,
        lastLoginAt: now,
      },
    });

    // 5. Terbitkan Session Cookie Terproteksi
    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      success: true,
      message: "Login berhasil. Mengalihkan ke dashboard...",
    };
  } catch (error) {
    console.error("Login server error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan sistem saat memproses login. Silakan coba beberapa saat lagi.",
    };
  }
}

export async function logoutAdminAction(): Promise<void> {
  await clearSessionCookie();
  redirect("/u-gate");
}

export async function getCurrentAdminUser() {
  return await getSession();
}
