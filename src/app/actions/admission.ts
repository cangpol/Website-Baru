"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{9,20}$/;

export type AdmissionFormState = {
  success: boolean;
  message: string;
  leadId?: string;
  errors?: Record<string, string>;
};

export async function submitAdmissionLead(
  prevState: AdmissionFormState,
  formData: FormData
): Promise<AdmissionFormState> {
  try {
    // Honeypot: kolom tersembunyi yang tidak diisi manusia. Bot yang mengisinya diabaikan diam-diam.
    if (String(formData.get("website") ?? "").trim() !== "") {
      return { success: true, message: "Terima kasih! Pendaftaran Anda berhasil dikirim." };
    }

    const ip = await getClientIp();
    const limit = rateLimit(`admission:${ip}`, 5, 10 * 60 * 1000);
    if (!limit.allowed) {
      return {
        success: false,
        message: `Terlalu banyak pengiriman formulir. Silakan coba lagi dalam ${Math.ceil(limit.retryAfterSeconds / 60)} menit.`,
      };
    }

    const text = (key: string) => {
      const value = formData.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const fullName = text("fullName");
    const phoneWhatsapp = text("phoneWhatsapp");
    const email = text("email");
    const highSchool = text("highSchool");
    const city = text("city");
    const programId = text("programId");
    const notes = text("notes");

    const errors: Record<string, string> = {};

    if (fullName.length < 3 || fullName.length > 100) {
      errors.fullName = "Nama lengkap wajib diisi (3–100 karakter)";
    }

    if (!PHONE_PATTERN.test(phoneWhatsapp)) {
      errors.phoneWhatsapp = "Nomor WhatsApp aktif tidak valid";
    }

    if (!EMAIL_PATTERN.test(email) || email.length > 254) {
      errors.email = "Alamat email tidak valid";
    }

    if (highSchool.length < 2 || highSchool.length > 150) {
      errors.highSchool = "Asal sekolah / SMA / SMK wajib diisi (2–150 karakter)";
    }

    if (city.length > 100) {
      errors.city = "Nama kota terlalu panjang";
    }

    if (notes.length > 2000) {
      errors.notes = "Catatan maksimal 2000 karakter";
    }

    if (programId && !/^[A-Za-z0-9_-]{1,64}$/.test(programId)) {
      errors.programId = "Program studi tidak valid";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Silakan lengkapi formulir dengan benar.",
        errors,
      };
    }

    // Save to Database
    const lead = await prisma.admissionLead.create({
      data: {
        fullName,
        phoneWhatsapp,
        email: email.toLowerCase(),
        highSchool,
        city: city || null,
        programId: programId || null,
        notes: notes || null,
        targetYear: 2026,
      },
    });

    revalidatePath("/admin/leads");

    return {
      success: true,
      message: `Terima kasih, ${fullName}! Pendaftaran Anda berhasil dikirim. Tim Admisi UPITRA (Universitas Pignatelli Triputra) akan menghubungi Anda via WhatsApp dalam waktu 1x24 jam.`,
      leadId: lead.id,
    };
  } catch (error) {
    console.error("Admission submission error:", error);
    return {
      success: false,
      message: "Terjadi kesalahan sistem saat menyimpan pendaftaran. Silakan coba lagi.",
    };
  }
}

