"use client";

import { useEffect, useState } from "react";
import { BANNER_DEFAULTS as CORE_BANNERS, CONTENT_DEFAULTS, type PageContentKey, type PageContentMap } from "@/lib/pageContent";

type Banner = { title: string; description: string; imageUrl: string };
const BANNER_DEFAULTS = CORE_BANNERS as Record<string, Banner>;
const NO_BANNER: Banner = { title: "", description: "", imageUrl: "" };

// Defaults first (so the page renders instantly), then DB values override per field.
export function usePageContent<K extends PageContentKey>(key: K) {
  const [content, setContent] = useState<PageContentMap[K]>(CONTENT_DEFAULTS[key]);
  const [banner, setBanner] = useState<Banner>(BANNER_DEFAULTS[key] ?? NO_BANNER);

  useEffect(() => {
    fetch(`/api/page-content?page=${key}`)
      .then((r) => r.json())
      .then((j) => j?.ok && j.data && setContent({ ...CONTENT_DEFAULTS[key], ...j.data }))
      .catch(() => {});
    if (!BANNER_DEFAULTS[key]) return;
    fetch(`/api/banner?page=${key}`)
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && j.data) {
          setBanner({
            title: j.data.title || (BANNER_DEFAULTS[key] ?? NO_BANNER).title,
            description: j.data.description || (BANNER_DEFAULTS[key] ?? NO_BANNER).description,
            imageUrl: j.data.imageUrl || (BANNER_DEFAULTS[key] ?? NO_BANNER).imageUrl,
          });
        }
      })
      .catch(() => {});
  }, [key]);

  return { content, banner };
}
