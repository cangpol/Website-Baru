"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Award, ChevronDown, Dna, ExternalLink, Info, Target, Users2 } from "lucide-react";
import PageContentEditor from "@/components/admin/PageContentEditor";
import type { PageContentKey } from "@/lib/pageContent";

// Setiap baris mengedit data yang sama dengan halaman publik di kolom "Tampil di".
const SECTIONS: {
  id: string;
  title: string;
  desc: string;
  key: PageContentKey;
  icon: typeof Info;
  href: string;
}[] = [
  { id: "tentang", title: "Tentang UPITRA", desc: "Transformasi, sejarah, dan teks video profil", key: "profil-tentang", icon: Info, href: "/profil" },
  { id: "visi-misi", title: "Visi, Misi & Tujuan", desc: "Daftar misi, tujuan strategis, dan nilai Triputra", key: "visi-misi", icon: Target, href: "/profil?tab=visi-misi" },
  { id: "pimpinan", title: "Pimpinan Universitas", desc: "Rektorat, dekanat, foto, jabatan, dan kompetensi", key: "pimpinan", icon: Users2, href: "/profil?tab=pimpinan" },
  { id: "prestasi", title: "Prestasi & Capaian", desc: "Capaian kelembagaan dan prestasi mahasiswa", key: "prestasi-capaian", icon: Award, href: "/profil/prestasi-dan-capaian" },
  { id: "dna", title: "UPITRA DNA", desc: "Sinergi yayasan, makna lambang, dan nilai pokok", key: "profil-dna", icon: Dna, href: "/profil?tab=dna" },
];

function ProfilManager() {
  const params = useSearchParams();
  const initial = SECTIONS.find((s) => s.id === params.get("tab"))?.id ?? "pimpinan";
  const [open, setOpen] = useState<string | null>(initial);

  return (
    <div className="max-w-5xl space-y-6">
      <div className="rounded-2xl border border-blue-100 bg-white p-6">
        <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600">
          <Info className="h-4 w-4" /> Manajemen Konten Profil
        </div>
        <h1 className="text-2xl font-black text-slate-900">Profil & Pimpinan</h1>
        <p className="mt-1 text-sm text-slate-500">
          Klik sebuah baris untuk membuka detailnya. Ubah, tambah, atau hapus data, lalu tekan <b>Simpan</b> di bagian bawah. Perubahan langsung tampil
          di halaman Profil situs.
        </p>
      </div>

      <div className="space-y-3">
        {SECTIONS.map((s, i) => {
          const isOpen = open === s.id;
          const Icon = s.icon;
          return (
            <section
              key={s.id}
              className={`overflow-hidden rounded-2xl border bg-white transition-shadow ${
                isOpen ? "border-blue-300 shadow-md" : "border-blue-100 hover:border-blue-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : s.id)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isOpen ? "bg-blue-600 text-white" : "bg-blue-50 text-blue-600"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-slate-900">
                    {i + 1}. {s.title}
                  </span>
                  <span className="block truncate text-xs text-slate-500">{s.desc}</span>
                </span>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="hidden shrink-0 items-center gap-1 rounded-lg border border-blue-200 px-2.5 py-1 text-[11px] font-bold text-blue-600 hover:bg-blue-50 sm:inline-flex"
                >
                  Lihat <ExternalLink className="h-3 w-3" />
                </a>
                <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && (
                <div className="border-t border-blue-100 bg-blue-50/30 p-5">
                  <PageContentEditor key={s.key} pageKey={s.key} />
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminProfilPage() {
  return (
    <Suspense fallback={<div className="text-xs text-slate-500">Memuat…</div>}>
      <ProfilManager />
    </Suspense>
  );
}
