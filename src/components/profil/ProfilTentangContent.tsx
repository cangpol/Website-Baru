"use client";

import Image from "next/image";
import { usePageContent } from "@/lib/usePageContent";

interface SejarahBlock {
  judul: string;
  pengantar: string;
  butir: string[];
  penutup: string;
}

const lines = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string" && x.trim() !== "") : []);

export default function ProfilTentangContent() {
  // Isi diatur di Admin → Profil & Pimpinan → Tentang UPITRA.
  const { content: c } = usePageContent("profil-tentang") as { content: Record<string, any> };
  const paragraf = lines(c.paragraf);
  const sejarah = ((c.sejarah as SejarahBlock[]) ?? []).filter((b) => b?.judul?.trim());

  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl">{c.judul}</h2>
          {paragraf.map((p, i) => (
            <p key={i} className="text-justify text-[13px] leading-relaxed text-slate-800 sm:text-sm">
              {p}
            </p>
          ))}
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-[0_4px_16px_rgba(0,107,189,0.25)] ring-1 ring-blue-100">
          <Image
            src={c.gambar || "/images/gedung-upitra.jpg"}
            alt="Gedung Universitas Pignatelli Triputra"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      {sejarah.length > 0 && (
        <section className="space-y-5" aria-labelledby="sejarah-heading">
          <h2 id="sejarah-heading" className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl">
            {c.sejarahJudul}
          </h2>

          {sejarah.map((b, i) => {
            const butir = lines(b.butir);
            return (
              <div key={i} className="space-y-2">
                <h3 className="text-lg font-bold text-slate-900">{b.judul}</h3>
                {b.pengantar && <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">{b.pengantar}</p>}
                {butir.length > 0 && (
                  <ul className="list-disc space-y-1 pl-6 text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                    {butir.map((x, k) => (
                      <li key={k}>{x}</li>
                    ))}
                  </ul>
                )}
                {b.penutup && <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">{b.penutup}</p>}
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
