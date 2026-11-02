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
      details: { confirmed, visitorName: tour.fullName },
    });

    await invalidateEntity(CACHE_TAGS.TOURS);
    return { ok: true, data: tour };
  } catch (error) {
    console.error("Confirm tour error:", error);
    return { ok: false, message: "Gagal memperbarui status reservasi tour." };
  }
}

