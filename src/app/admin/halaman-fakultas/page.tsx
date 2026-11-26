"use client";

import { useEffect, useState } from "react";
import { Building2, Loader2, Save } from "lucide-react";
import ContentArea from "@/components/admin/ContentArea";
import { AccordionRow } from "@/components/admin/AccordionRow";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { getFacultiesWithPrograms, saveFacultyAction } from "@/server/programs";
import { swalToast } from "@/lib/swal";

type Faculty = { id: string; code: string; name: string; description: string; icon: string };

const inputCls = "w-full rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-slate-900 focus:border-sky-500 focus:outline-none";

/** Nama, deskripsi, dan foto kartu fakultas yang tampil di halaman Akademik. */
function FacultyData() {
  const [faculties, setFaculties] = useState<Faculty[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    getFacultiesWithPrograms()
      .then((list) => setFaculties(list.map((f) => ({ id: f.id, code: f.code, name: f.name, description: f.description ?? "", icon: f.icon ?? "" }))))
      .catch(() => setFaculties([]));
  }, []);

  const change = (id: string, patch: Partial<Faculty>) => setFaculties((list) => list?.map((f) => (f.id === id ? { ...f, ...patch } : f)) ?? null);

  const save = async (e: React.FormEvent, faculty: Faculty) => {
    e.preventDefault();
    setSaving(faculty.id);
    try {
      const res = await saveFacultyAction(faculty.id, { name: faculty.name, description: faculty.description, icon: faculty.icon });
      swalToast(res.message, res.ok ? "success" : "error");
    } catch {
      swalToast("Gagal menyimpan. Pastikan Anda masih login dan bagian ini masih diizinkan.", "error");
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-slate-900">Data Fakultas (kartu di halaman Akademik)</h2>
      {!faculties && (
        <p className="flex items-center gap-2 text-xs text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" /> Memuat…
        </p>
      )}
      {faculties?.length === 0 && <p className="text-xs text-slate-500">Data fakultas belum dapat dimuat.</p>}
      {faculties?.map((faculty) => (
        <AccordionRow
          key={faculty.id}
          title={faculty.name}
          summary={faculty.description || "Belum ada deskripsi"}
          icon={Building2}
          open={open === faculty.id}
          onToggle={() => setOpen(open === faculty.id ? null : faculty.id)}
        >
          <form onSubmit={(e) => save(e, faculty)} className="space-y-4">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Nama Fakultas</label>
              <input required value={faculty.name} onChange={(e) => change(faculty.id, { name: e.target.value })} className={inputCls} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">Deskripsi (kosongkan untuk teks bawaan)</label>
              <textarea rows={4} value={faculty.description} onChange={(e) => change(faculty.id, { description: e.target.value })} className={inputCls} />
            </div>
            <ImageUploadField label="Foto Kartu (kosongkan untuk foto bawaan)" value={faculty.icon} onChange={(url) => change(faculty.id, { icon: url })} />
            <button
              type="submit"
              disabled={saving !== null}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 disabled:opacity-60"
            >
              {saving === faculty.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Simpan Data Fakultas
            </button>
          </form>
        </AccordionRow>
      ))}
    </div>
  );
}

export default function AdminHalamanFakultasPage() {
  return (
    <ContentArea
      title="Fakultas"
      intro="Kelola data fakultas dan isi halaman tiap fakultas."
      sections={[
        { key: "fakultas-feb", title: "Halaman Fakultas Ekonomi & Bisnis", desc: "Isi halaman /feb" },
        { key: "fakultas-fsh", title: "Halaman Fakultas Sosial Humaniora", desc: "Isi halaman /fsh" },
        { key: "fakultas-fst", title: "Halaman Fakultas Sains & Teknologi", desc: "Isi halaman /fst" },
        { key: "fakultas-fkes", title: "Halaman Fakultas Kesehatan", desc: "Isi halaman /fkes" },
      ]}
    >
      <FacultyData />
    </ContentArea>
  );
}
