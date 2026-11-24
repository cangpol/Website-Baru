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


// ── Tambah / ubah lead dari panel admin ─────────────────────────────────────
export interface SaveLeadInput {
  fullName: string;
  phoneWhatsapp: string;
  email: string;
  highSchool: string;
  city?: string | null;
  targetYear: number;
  programName?: string | null;
  status: AdmissionStatus;
  notes?: string | null;
}

export async function saveLeadAction(id: string | null, input: SaveLeadInput) {
  const session = await requirePermission("pmb", id ? "update" : "create");

  const fullName = input.fullName?.trim();
  const phone = input.phoneWhatsapp?.trim();
  if (!fullName || fullName.length < 2) return { ok: false, message: "Nama calon mahasiswa minimal 2 karakter." };
  if (!phone || phone.replace(/\D/g, "").length < 8) return { ok: false, message: "Nomor WhatsApp tidak valid." };
  if (input.email && !/^\S+@\S+\.\S+$/.test(input.email.trim())) return { ok: false, message: "Format email tidak valid." };
  const targetYear = Number.isFinite(input.targetYear) ? Math.trunc(input.targetYear) : 2026;
  if (targetYear < 2000 || targetYear > 2100) return { ok: false, message: "Tahun target tidak valid." };

  try {
    let programId: string | null = null;
    const programName = input.programName?.trim();
    if (programName && programName !== "Belum Menentukan") {
      const program = await prisma.program.findFirst({
        where: { deletedAt: null, name: { equals: programName.replace(/^(S1|D3)\s+/i, ""), mode: "insensitive" } },
        select: { id: true },
      });
      programId = program?.id ?? null;
    }

    const data = {
      fullName,
      phoneWhatsapp: phone,
      email: input.email?.trim() ?? "",
      highSchool: input.highSchool?.trim() ?? "",
      city: input.city?.trim() || null,
      targetYear,
      programId,
      status: input.status,
      notes: input.notes?.trim() || null,
    };

    const lead = id
      ? await prisma.admissionLead.update({ where: { id }, data })
      : await prisma.admissionLead.create({ data: { ...data, source: "Admin" } });

    await recordAuditLog({
      userId: session.userId,
      userEmail: session.email,
      action: id ? "UPDATE" : "CREATE",
      entity: "AdmissionLead",
      entityId: lead.id,
      details: { studentName: lead.fullName, status: lead.status },
    });

    await invalidateEntity(CACHE_TAGS.LEADS);
    return { ok: true, message: id ? "Data calon mahasiswa berhasil diperbarui." : "Calon mahasiswa baru berhasil ditambahkan." };
  } catch (error) {
    console.error("Save lead error:", error);
    return { ok: false, message: "Gagal menyimpan data calon mahasiswa." };
  }
}
