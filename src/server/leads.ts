"use server";

import { prisma } from "@/lib/prisma";
import { requirePermission } from "@/lib/auth";
import { AdmissionStatus } from "@prisma/client";
import { recordAuditLog } from "@/server/audit";
import { invalidateEntity, CACHE_TAGS } from "@/server/cache-tags";

export async function getAdmissionLeads(statusFilter?: AdmissionStatus, search?: string) {
  await requirePermission("pmb", "read");

  try {
    const where: any = {
      deletedAt: null,
    };
    if (statusFilter) {
      where.status = statusFilter;
    }
    if (search && search.trim() !== "") {
      where.OR = [
        { fullName: { contains: search, mode: "insensitive" } },
        { phoneWhatsapp: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { highSchool: { contains: search, mode: "insensitive" } },
      ];
    }

    const leads = await prisma.admissionLead.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        program: {
          select: { name: true, degreeTitle: true },
        },
      },
    });

    return leads.map((l) => ({
      id: l.id,
      fullName: l.fullName,
      phoneWhatsapp: l.phoneWhatsapp,
      email: l.email,
      highSchool: l.highSchool,
      city: l.city,
      targetYear: l.targetYear,
      programName: l.program?.name || "Belum Menentukan",
      status: l.status,
      notes: l.notes,
      source: l.source,
      createdAt: l.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching admission leads:", err);
    return [];
  }
}

export async function updateLeadStatusAction(
  leadId: string,
  newStatus: AdmissionStatus,
  notes?: string
) {
  const session = await requirePermission("pmb", "update");

  try {
    const lead = await prisma.admissionLead.update({
      where: { id: leadId },
      data: {
        status: newStatus,
        notes: notes ? notes.trim() : undefined,
      },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "AdmissionLead",
      entityId: leadId,
      details: { newStatus, studentName: lead.fullName },
    });

    await invalidateEntity(CACHE_TAGS.LEADS);
    return { ok: true, data: lead };
  } catch (error) {
    console.error("Update lead status error:", error);
    return { ok: false, message: "Gagal memperbarui status calon mahasiswa." };
  }
}

export async function getCampusTourBookings() {
  await requirePermission("tours", "read");

  try {
    const tours = await prisma.campusTourBooking.findMany({
      where: { deletedAt: null },
      orderBy: { preferredDate: "asc" },
    });

    return tours.map((t) => ({
      id: t.id,
      fullName: t.fullName,
      phoneWhatsapp: t.phoneWhatsapp,
      email: t.email,
      totalVisitor: t.totalVisitor,
      preferredDate: t.preferredDate.toISOString(),
      confirmed: t.confirmed,
      notes: t.notes,
      createdAt: t.createdAt.toISOString(),
    }));
  } catch (err) {
    console.error("Error fetching campus tour bookings:", err);
    return [];
  }
}

export async function confirmTourBookingAction(tourId: string, confirmed: boolean) {
  const session = await requirePermission("tours", "update");

  try {
    const tour = await prisma.campusTourBooking.update({
      where: { id: tourId },
      data: { confirmed },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "UPDATE",
      entity: "CampusTourBooking",
      entityId: tourId,
      details: JSON.stringify({ confirmed, visitorName: tour.fullName }),
    });

    await invalidateEntity(CACHE_TAGS.TOURS);
    return { ok: true, data: tour };
  } catch (error) {
    console.error("Confirm tour error:", error);
    return { ok: false, message: "Gagal memperbarui status reservasi tour." };
  }
}

export async function softDeleteLeadAction(leadId: string) {
  const session = await requirePermission("pmb", "delete");

  try {
    const lead = await prisma.admissionLead.update({
      where: { id: leadId },
      data: { deletedAt: new Date() },
    });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "DELETE",
      entity: "AdmissionLead",
      entityId: leadId,
      details: JSON.stringify({ studentName: lead.fullName }),
    });

    await invalidateEntity(CACHE_TAGS.LEADS);
    return { ok: true, message: "Data lead pendaftaran berhasil dihapus." };
  } catch (error) {
    console.error("Delete lead error:", error);
    return { ok: false, message: "Gagal menghapus data lead." };
  }
}

// ── Export CSV Aman dengan Proteksi Formula Injection ───────────────────────
function sanitizeCsvCell(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return '""';
  let str = String(value).trim();
  // Formula injection check: if cell starts with =, +, -, @, prefix with '
  if (/^[=+\-@]/.test(str)) {
    str = `'${str}`;
  }
  // Escape quotes
  const escaped = str.replace(/"/g, '""');
  return `"${escaped}"`;
}

export async function exportLeadsCsvAction() {
  const session = await requirePermission("pmb", "read");

  try {
    const leads = await prisma.admissionLead.findMany({
      where: { deletedAt: null },
      orderBy: { createdAt: "desc" },
      include: { program: { select: { name: true } } },
    });

    const headers = [
      "ID",
      "Nama Lengkap",
      "WhatsApp",
      "Email",
      "Asal Sekolah",
      "Kota",
      "Program Studi",
      "Tahun Target",
      "Status",
      "Catatan",
      "Tanggal Masuk",
    ];

    const rows = leads.map((l) => [
      sanitizeCsvCell(l.id),
      sanitizeCsvCell(l.fullName),
      sanitizeCsvCell(l.phoneWhatsapp),
      sanitizeCsvCell(l.email),
      sanitizeCsvCell(l.highSchool),
      sanitizeCsvCell(l.city),
      sanitizeCsvCell(l.program?.name || "Belum Menentukan"),
      sanitizeCsvCell(l.targetYear),
      sanitizeCsvCell(l.status),
      sanitizeCsvCell(l.notes),
      sanitizeCsvCell(l.createdAt.toISOString()),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: "EXPORT",
      entity: "AdmissionLead",
      details: JSON.stringify({ totalExported: leads.length }),
    });

    return { ok: true, csv: csvContent, filename: `Leads-PMB-UPITRA-${new Date().toISOString().split("T")[0]}.csv` };
  } catch (error) {
    console.error("Export leads CSV error:", error);
    return { ok: false, message: "Gagal mengekspor data leads." };
  }
}

