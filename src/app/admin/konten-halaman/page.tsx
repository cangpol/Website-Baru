"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import PageContentEditor from "@/components/admin/PageContentEditor";
import {
  BANNER_DEFAULTS as CORE_BANNERS,
  PAGE_CONTENT_KEYS,
  PAGE_LABELS,
  PAGE_PATHS,
  type PageContentKey,
} from "@/lib/pageContent";

const BANNERS = CORE_BANNERS as Record<string, unknown>;

export default function AdminKontenHalamanPage() {
  const [page, setPage] = useState<PageContentKey>("layanan");

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Konten Halaman</h1>
        <p className="text-xs text-slate-500 mt-1">
          Ubah banner, teks, daftar, dan gambar halaman publik (tambah, ubah, hapus item). Katalog layanan dikelola di menu Katalog &amp; Unduhan.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {PAGE_CONTENT_KEYS.filter((k) => BANNERS[k]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setPage(k)}
            className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer ${
              page === k ? "bg-sky-500 text-white" : "bg-blue-50 text-slate-700 border border-blue-200"
            }`}
          >
            {PAGE_LABELS[k]}
          </button>
        ))}
        <select
          aria-label="Halaman lainnya"
          value={BANNERS[page] ? "" : page}
          onChange={(e) => e.target.value && setPage(e.target.value as PageContentKey)}
          className="px-3 py-2 rounded-xl text-xs font-bold bg-blue-50 text-slate-700 border border-blue-200 cursor-pointer"
        >
          <option value="">Halaman lainnya…</option>
          {PAGE_CONTENT_KEYS.filter((k) => !BANNERS[k]).map((k) => (
            <option key={k} value={k}>
              {PAGE_LABELS[k]}
            </option>
          ))}
        </select>
        <Link href={PAGE_PATHS[page] ?? `/${page}`} target="_blank" className="ml-auto text-xs text-blue-600 flex items-center gap-1 self-center">
          Lihat halaman <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <PageContentEditor key={page} pageKey={page} />
    </div>
  );
}
