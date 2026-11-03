import { prisma } from "@/lib/prisma";
import { deleteUploadedFile } from "./cleanup";

function containsExactValue(value: unknown, target: string): boolean {
  if (value === target) return true;
  if (Array.isArray(value)) return value.some((entry) => containsExactValue(entry, target));
  if (value && typeof value === "object") {
    return Object.values(value).some((entry) => containsExactValue(entry, target));
  }
  return false;
}

export async function deleteUploadedFileIfUnused(fileUrl?: string | null): Promise<boolean> {
  if (!fileUrl) return false;

  const [
    article,
    hero,
    program,
    staff,
    event,
    studentOrg,
    achievement,
    partner,
    service,
    download,
    settings,
    pages,
  ] = await Promise.all([
    prisma.article.findFirst({
      where: {
        deletedAt: null,
        OR: [{ coverImage: fileUrl }, { summary: { contains: fileUrl } }],
      },
      select: { id: true },
    }),
    prisma.heroSlide.findFirst({ where: { imageUrl: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.program.findFirst({ where: { coverImage: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.staffMember.findFirst({ where: { photoUrl: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.event.findFirst({ where: { bannerImage: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.studentOrg.findFirst({ where: { logoUrl: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.achievement.findFirst({ where: { photoUrl: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.partner.findFirst({ where: { logoUrl: fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.serviceItem.findFirst({
      where: { OR: [{ icon: fileUrl }, { description: { contains: fileUrl } }], deletedAt: null },
      select: { id: true },
    }),
    prisma.downloadDoc.findFirst({ where: { fileUrl, deletedAt: null }, select: { id: true } }),
    prisma.siteSetting.findMany({ select: { value: true } }),
    prisma.page.findMany({ where: { deletedAt: null }, select: { blocks: true, draftBlocks: true } }),
  ]);

  const isReferenced = [
    article,
    hero,
    program,
    staff,
    event,
    studentOrg,
    achievement,
    partner,
    service,
    download,
  ].some(Boolean) ||
    settings.some((setting) => containsExactValue(setting.value, fileUrl)) ||
    pages.some((page) =>
      containsExactValue(page.blocks, fileUrl) || containsExactValue(page.draftBlocks, fileUrl)
    );

  if (isReferenced) return false;
  return deleteUploadedFile(fileUrl);
}
