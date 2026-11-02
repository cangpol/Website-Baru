"use server";

import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

// Rate limiting in-memory per IP / email (5 percobaan per 15 menit)
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

  // 1. Cek Rate Limit
  const rateLimit = checkRateLimit(rateLimitKey);
  if (!rateLimit.allowed) {
    return {
      success: false,
      message: `Terlalu banyak percobaan gagal. Akun dikunci sementara. Silakan coba lagi dalam ${rateLimit.remainingSeconds} detik.`,
    };
  }

  try {
    // 2. Cari user di Database
    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email: rateLimitKey },
      });
    } catch {
      // Fallback jika database belum aktif atau error
      console.warn("Database offline during admin login, checking emergency admin fallback");
      const emergencyPass = process.env.SEED_ADMIN_PASSWORD;
      const emergencyEmail = process.env.SEED_ADMIN_EMAIL || "admin@upitra.ac.id";
      if (emergencyPass && rateLimitKey === emergencyEmail && password === emergencyPass) {
        clearFailedAttempts(rateLimitKey);
        await setSessionCookie({
          userId: "emergency-superadmin",
          email: emergencyEmail,
          name: "Administrator Utama UPITRA",
          role: "SUPERADMIN",
        });
        return {
          success: true,
          message: "Login berhasil.",
        };
      }
    }

    if (!user) {
      recordFailedAttempt(rateLimitKey);
      return {
        success: false,
        message: "Kredensial email atau kata sandi tidak valid.",
      };
    }

    // 3. Verifikasi Password dengan bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      recordFailedAttempt(rateLimitKey);
      return {
        success: false,
        message: "Kredensial email atau kata sandi tidak valid.",
      };
    }

    // 4. Reset percobaan gagal setelah berhasil
    clearFailedAttempts(rateLimitKey);

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
