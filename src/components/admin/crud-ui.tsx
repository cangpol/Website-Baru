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
