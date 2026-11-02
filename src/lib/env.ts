import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL wajib diisi"),
  NEXTAUTH_SECRET: z.string().min(32, "NEXTAUTH_SECRET minimal 32 karakter demi keamanan enkripsi").optional(),
  ADMIN_SESSION_SECRET: z.string().min(32, "ADMIN_SESSION_SECRET minimal 32 karakter").optional(),
  SEED_ADMIN_EMAIL: z.string().email().optional().default("admin@upitra.ac.id"),
  SEED_ADMIN_PASSWORD: z.string().min(8).optional(),
  PORT: z.string().optional().default("3000"),
});

export const env = envSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV === "development" ? "development_upitra_session_secret_key_32_chars_min" : undefined),
  ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET || process.env.NEXTAUTH_SECRET || (process.env.NODE_ENV === "development" ? "development_upitra_session_secret_key_32_chars_min" : undefined),
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASSWORD: process.env.SEED_ADMIN_PASSWORD,
  PORT: process.env.PORT,
});

