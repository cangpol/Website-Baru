"use client";

import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Baris bagian yang bisa dibuka-tutup, dengan tampilan yang sama seperti menu Halaman Depan.
 * Isinya hanya dirender saat terbuka, jadi data form harus disimpan di komponen induk.
 */
export function AccordionRow({
  number,
  title,
  summary,
  icon: Icon,
  badge,
  open,
  onToggle,
  children,
}: {
  number?: number;
  title: string;
  summary?: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const clicked = useRef(false);

  // Saat baris panjang di atasnya tertutup, judul baris yang baru dibuka bisa terdorong ke luar layar.
  useEffect(() => {
    if (open && clicked.current && ref.current && ref.current.getBoundingClientRect().top < 80) {
      ref.current.scrollIntoView({ block: "start" });
    }
    clicked.current = false;
  }, [open]);

  // Tanpa overflow-hidden, agar tombol Simpan yang menempel (sticky) di dalam baris tetap berfungsi.
  return (
    <section
      ref={ref}
      className={`scroll-mt-24 rounded-2xl border bg-white transition-shadow ${open ? "border-blue-300 shadow-md" : "border-blue-100 hover:border-blue-200"}`}
    >
      <button
        type="button"
        onClick={() => {
          clicked.current = true;
          onToggle();
        }}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left"
      >
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${open ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"}`}>
          <Icon className="h-5 w-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold text-slate-900">
            {number ? `${number}. ` : ""}
            {title}
          </span>
          {summary && <span className="block truncate text-xs text-slate-500">{summary}</span>}
        </span>
        {badge && (
          <span className="shrink-0 rounded-full border border-blue-200 bg-blue-100 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">{badge}</span>
        )}
        <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="rounded-b-2xl border-t border-blue-100 bg-blue-50/30 p-4 sm:p-5">{children}</div>}
    </section>
  );
}
