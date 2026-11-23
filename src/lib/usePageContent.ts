"use client";

import { useEffect, useState } from "react";
import { BANNER_DEFAULTS, CONTENT_DEFAULTS, type PageContentKey, type PageContentMap } from "@/lib/pageContent";

// Defaults first (so the page renders instantly), then DB values override per field.
export function usePageContent<K extends PageContentKey>(key: K) {
  const [content, setContent] = useState<PageContentMap[K]>(CONTENT_DEFAULTS[key]);
  const [banner, setBanner] = useState<{ title: string; description: string; imageUrl: string }>(BANNER_DEFAULTS[key]);

  useEffect(() => {
    fetch(`/api/page-content?page=${key}`)
      .then((r) => r.json())
      .then((j) => j?.ok && j.data && setContent({ ...CONTENT_DEFAULTS[key], ...j.data }))
      .catch(() => {});
    fetch(`/api/banner?page=${key}`)
      .then((r) => r.json())
      .then((j) => {
        if (j?.ok && j.data) {
          setBanner({
            title: j.data.title || BANNER_DEFAULTS[key].title,
            description: j.data.description || BANNER_DEFAULTS[key].description,
            imageUrl: j.data.imageUrl || BANNER_DEFAULTS[key].imageUrl,
          });
        }
      })
      .catch(() => {});
  }, [key]);

  return { content, banner };
}
