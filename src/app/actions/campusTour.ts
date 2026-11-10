"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getClientIp, rateLimit } from "@/lib/rateLimit";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9\s().-]{9,20}$/;

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
    if (String(formData.get("website") ?? "").trim() !== "") {
      return { success: true, message: "Terima kasih! Reservasi Campus Tour Anda berhasil diajukan." };
    }

    const ip = await getClientIp();
    const limit = rateLimit(`campus-tour:${ip}`, 5, 10 * 60 * 1000);
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
    const totalVisitorStr = text("totalVisitor");
    const preferredDateStr = text("preferredDate");
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

    if (!preferredDateStr) {
      errors.preferredDate = "Pilih tanggal rencana kunjungan kampus";
    }

    if (notes.length > 2000) {
      errors.notes = "Catatan maksimal 2000 karakter";
    }

    const totalVisitor = parseInt(totalVisitorStr || "1", 10);
    if (isNaN(totalVisitor) || totalVisitor < 1 || totalVisitor > 100) {
      errors.totalVisitor = "Jumlah peserta harus antara 1 dan 100 orang";
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Silakan periksa kembali formulir reservasi kunjungan Anda.",
        errors,
      };
    }

    const preferredDate = new Date(preferredDateStr);
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 2);
    if (isNaN(preferredDate.getTime()) || preferredDate > maxDate) {
      return {
        success: false,
        message: "Format tanggal kunjungan tidak valid.",
        errors: { preferredDate: "Format tanggal tidak valid" },
      };
    }

    const booking = await prisma.campusTourBooking.create({
      data: {
        fullName,
        phoneWhatsapp,
        email: email.toLowerCase(),
        totalVisitor,
        preferredDate,
        notes: notes || null,
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

