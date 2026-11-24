"use client";

import { useEffect, type ReactNode } from "react";
import { Inbox, Loader2, Plus } from "lucide-react";

/** Tampilan saat daftar kosong (data belum ada atau hasil filter nihil). */
export function EmptyState({
  title = "Belum ada data",
  hint,
  actionLabel,
  onAction,
  icon,
}: {
  title?: string;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/50 px-6 py-14">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600">
        {icon ?? <Inbox className="h-6 w-6" />}
      </div>
      <h3 className="text-base font-bold text-slate-900">{title}</h3>
      {hint && <p className="mt-1 max-w-sm text-xs leading-relaxed text-slate-500">{hint}</p>}
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/** Indikator saat data sedang dimuat dari database. */
export function LoadingState({ label = "Memuat data…" }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl border border-blue-100 bg-white px-6 py-14 text-xs font-semibold text-slate-500">
      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
      {label}
    </div>
  );
}

/** Esc menutup modal, dan halaman di belakangnya tidak ikut ter-scroll selama modal terbuka. */
export function useModalKeys(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
}

// ── Paginasi (mengikuti pola tabel di proyek upitra) ────────────────────────
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export function usePagination<T>(list: T[], defaultSize = 10) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(defaultSize);
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / size));
  const current = Math.min(page, pages); // otomatis mundur bila hasil filter menyusut
  const items = useMemo(() => list.slice((current - 1) * size, current * size), [list, current, size]);
  return { items, page: current, pages, size, total, setPage, setSize: (n: number) => { setSize(n); setPage(1); } };
}

export type Pager = ReturnType<typeof usePagination>;

export function Pagination({ pg, noun = "data" }: { pg: Pager; noun?: string }) {
  if (pg.total <= 5) return null;
  const from = (pg.page - 1) * pg.size + 1;
  const to = Math.min(pg.page * pg.size, pg.total);
  const btn =
    "inline-flex h-8 w-8 items-center justify-center rounded-lg border border-blue-200 bg-white text-blue-700 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40";
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-blue-100 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-slate-500">
        Menampilkan <b className="text-slate-800">{from}–{to}</b> dari <b className="text-slate-800">{pg.total}</b> {noun}
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <select
          aria-label="Jumlah per halaman"
          value={pg.size}
          onChange={(e) => pg.setSize(Number(e.target.value))}
          className="h-8 rounded-lg border border-blue-200 bg-white px-2 text-xs font-medium text-slate-700 focus:outline-none focus:border-blue-500"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n} per halaman
            </option>
          ))}
        </select>
        <button type="button" className={btn} onClick={() => pg.setPage(1)} disabled={pg.page === 1} aria-label="Halaman pertama">
          <ChevronsLeft className="h-4 w-4" />
        </button>
        <button type="button" className={btn} onClick={() => pg.setPage(pg.page - 1)} disabled={pg.page === 1} aria-label="Sebelumnya">
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="px-1 text-xs font-semibold text-slate-700">
          {pg.page} / {pg.pages}
        </span>
        <button type="button" className={btn} onClick={() => pg.setPage(pg.page + 1)} disabled={pg.page === pg.pages} aria-label="Berikutnya">
          <ChevronRight className="h-4 w-4" />
        </button>
        <button type="button" className={btn} onClick={() => pg.setPage(pg.pages)} disabled={pg.page === pg.pages} aria-label="Halaman terakhir">
          <ChevronsRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
