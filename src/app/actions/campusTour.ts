"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export type CampusTourFormState = {
  success: boolean;
  message: string;
  bookingId?: string;
  errors?: Record<string, string>;
};

export async function submitCampusTourBooking(
  prevState: CampusTourFormState,
  formData: FormData
): Promise<CampusTourFormState> {
  try {
    const fullName = formData.get("fullName") as string;
    const phoneWhatsapp = formData.get("phoneWhatsapp") as string;
    const email = formData.get("email") as string;
    const totalVisitorStr = formData.get("totalVisitor") as string;
    const preferredDateStr = formData.get("preferredDate") as string;
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

    if (!preferredDateStr) {
      errors.preferredDate = "Pilih tanggal rencana kunjungan kampus";
    }

    const totalVisitor = parseInt(totalVisitorStr || "1", 10);
    if (isNaN(totalVisitor) || totalVisitor < 1) {
      errors.totalVisitor = "Jumlah peserta minimal 1 orang";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Silakan periksa kembali formulir reservasi kunjungan Anda.",
        errors,
      };
    }

    const preferredDate = new Date(preferredDateStr);
    if (isNaN(preferredDate.getTime())) {
      return {
        success: false,
        message: "Format tanggal kunjungan tidak valid.",
        errors: { preferredDate: "Format tanggal tidak valid" },
      };
    }

    const booking = await prisma.campusTourBooking.create({
      data: {
        fullName: fullName.trim(),
        phoneWhatsapp: phoneWhatsapp.trim(),
        email: email.trim().toLowerCase(),
        totalVisitor: totalVisitor > 0 ? totalVisitor : 1,
        preferredDate,
        notes: notes ? notes.trim() : null,
      },
    });

    revalidatePath("/admin/tours");

    return {
      success: true,
      message: `Terima kasih, ${fullName}! Reservasi Campus Tour Anda berhasil diajukan untuk tanggal ${preferredDate.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}. Tim Humas UPITRA akan segera mengirimkan konfirmasi via WhatsApp.`,
      bookingId: booking.id,
    };
  } catch (error) {
    console.error("Campus tour booking error:", error);
    return {
      success: false,
      message: "Terjadi kendala saat mengajukan reservasi Campus Tour. Silakan hubungi Humas UPITRA via WhatsApp.",
    };
  }
}

