"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

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
    const fullName = formData.get("fullName") as string;
    const phoneWhatsapp = formData.get("phoneWhatsapp") as string;
    const email = formData.get("email") as string;
    const highSchool = formData.get("highSchool") as string;
    const city = formData.get("city") as string;
    const programId = formData.get("programId") as string;
    const notes = formData.get("notes") as string;

    const errors: Record<string, string> = {};

    if (!fullName || fullName.trim().length < 3) {
      errors.fullName = "Nama lengkap wajib diisi minimal 3 karakter";
    }

    if (!phoneWhatsapp || phoneWhatsapp.trim().length < 9) {
      errors.phoneWhatsapp = "Nomor WhatsApp aktif wajib diisi";
    }

    if (!email || !email.includes("@")) {
      errors.email = "Alamat email tidak valid";
    }

    if (!highSchool || highSchool.trim().length < 2) {
      errors.highSchool = "Asal sekolah / SMA / SMK wajib diisi";
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
        fullName: fullName.trim(),
        phoneWhatsapp: phoneWhatsapp.trim(),
        email: email.trim().toLowerCase(),
        highSchool: highSchool.trim(),
        city: city ? city.trim() : null,
        programId: programId && programId !== "" ? programId : null,
        notes: notes ? notes.trim() : null,
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

