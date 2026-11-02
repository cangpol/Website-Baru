import { revalidateTag, updateTag, revalidatePath } from "next/cache";

export const CACHE_TAGS = {
  NAV: "nav",
  SETTINGS: "settings",
  HERO: "hero",
  ARTICLES: "articles",
  EVENTS: "events",
  PROGRAMS: "programs",
  FACULTIES: "faculties",
  PARTNERS: "partners",
  SERVICES: "services",
  DOWNLOADS: "downloads",
  LEADS: "leads",
  TOURS: "tours",
  STAFF: "staff",
  STUDENT_ORGS: "student_orgs",
  SCHOLARSHIPS: "scholarships",
  ACHIEVEMENTS: "achievements",
  AI_DATASET: "ai_dataset",
  page: (idOrSlug: string) => `page:${idOrSlug}`,
};

export async function invalidateEntity(entity: keyof typeof CACHE_TAGS | string, extraPath?: string) {
  try {
    const tag = typeof entity === "string" ? entity : String(CACHE_TAGS[entity]);
    // 1. Immediately expire cache for read-your-own-writes (Server Actions)
    try {
      updateTag(tag);
    } catch {
      // updateTag is Server Action only
    }

    // 2. Background stale-while-revalidate for edge visitors
    revalidateTag(tag, "max");

    // 3. Revalidate path if provided
    if (extraPath) {
      revalidatePath(extraPath);
    }
  } catch (err) {
    console.warn("Cache invalidation notice:", err);
  }
}

