"use client";

import { useState } from "react";
import { ExternalLink, FileText } from "lucide-react";
import PageContentEditor from "@/components/admin/PageContentEditor";
import { AccordionRow } from "@/components/admin/AccordionRow";
import type { PageContentKey } from "@/lib/pageContent";
import { ADMIN_PAGE_RULES } from "@/lib/adminFeatures";
import { PAGE_PATHS } from "@/lib/pageContent";

export interface ContentSection {
  key: PageContentKey;
  title: string;
  desc: string;
  /** Sembunyikan editor banner bila banner halaman tersebut bukan bagian yang dikelola di sini. */
  hideBanner?: boolean;
  /** Alamat publik bila berbeda dari bawaan. */
  href?: string;
}

/**
 * Halaman admin berisi satu atau beberapa halaman publik yang boleh disunting admin.
 * Isian yang tampil mengikuti ADMIN_PAGE_RULES, sama dengan yang diterima server.
 */
export default function ContentArea({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro: string;
  sections: ContentSection[];
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState<string | null>(sections.length === 1 ? sections[0].key : null);

  return (
    <div className="space-y-5">
      <div className="border-b border-blue-100 pb-4">
        <h1 className="text-xl font-black text-slate-900 sm:text-2xl">{title}</h1>
        <p className="mt-1 text-xs text-slate-500">{intro}</p>
      </div>

      {children}

      <div className="space-y-3">
        {sections.map((section, index) => {
          const isOpen = open === section.key;
          const href = section.href ?? PAGE_PATHS[section.key] ?? `/${section.key}`;
          return (
            <AccordionRow
              key={section.key}
              number={index + 1}
              title={section.title}
              summary={section.desc}
              icon={FileText}
              open={isOpen}
              onToggle={() => setOpen(isOpen ? null : section.key)}
            >
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:underline"
              >
                Lihat halaman <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <PageContentEditor
                pageKey={section.key}
                onlyFields={ADMIN_PAGE_RULES[section.key]?.fields}
                hideBanner={section.hideBanner}
              />
            </AccordionRow>
          );
        })}
      </div>
    </div>
  );
}
