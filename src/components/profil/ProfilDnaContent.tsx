"use client";

import { CheckCircle2 } from "lucide-react";
import { usePageContent } from "@/lib/usePageContent";

const lines = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim() !== "") : []);

export default function ProfilDnaContent() {
  // Isi diatur di Admin → Profil & Pimpinan → UPITRA DNA.
  const { content: c } = usePageContent("profil-dna") as { content: Record<string, any> };
  const keunggulan = lines(c.keunggulan);
  const info = ((c.info as { label: string; nilai: string }[]) ?? []).filter((x) => x?.label?.trim());
  const nilai = ((c.nilai as { judul: string; deskripsi: string }[]) ?? []).filter((x) => x?.judul?.trim());

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="space-y-4 lg:col-span-7">
          <span className="text-xs font-bold uppercase tracking-wider text-[#006bbd]">{c.badge}</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl">{c.judul}</h2>
          <p className="text-sm leading-relaxed text-slate-700">{c.deskripsi}</p>
          {keunggulan.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-1">
              {keunggulan.map((k, i) => (
                <div key={i} className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-[#0b2545]">
                  <CheckCircle2 className="h-4 w-4 text-[#006bbd]" />
                  <span>{k}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          <div className="relative overflow-hidden rounded-2xl border border-blue-900 bg-[#06172e] p-6 text-white shadow-xl sm:p-8">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Logo UPITRA" className="h-full w-full object-contain" />
            </div>
            <h3 className="mb-2 text-xl font-black text-white">{c.lambangJudul}</h3>
            <p className="mb-4 text-xs leading-relaxed text-blue-100 sm:text-sm">{c.lambangIsi}</p>
            {info.length > 0 && (
              <div className="space-y-2 border-t border-blue-900/60 pt-4 text-xs text-blue-100">
                {info.map((x, i) => (
                  <div key={i} className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{x.label}:</span>
                    <span className="text-right font-bold text-sky-300">{x.nilai}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="space-y-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-xs sm:p-12">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">{c.falsafahBadge}</span>
          <h2 className="mt-1 text-2xl font-black text-[#0b2545] sm:text-3xl">{c.falsafahJudul}</h2>
          <p className="mt-2 text-sm text-slate-600">{c.falsafahDeskripsi}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nilai.map((n, i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-sm font-black text-white shadow-xs">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">{n.judul}</h3>
              <p className="text-xs leading-relaxed text-slate-600">{n.deskripsi}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
