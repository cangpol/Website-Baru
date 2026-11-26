"use client";

import { EmptyState, LoadingState, Pagination, useModalKeys, usePagination } from "@/components/admin/crud-ui";
import { swalConfirmDelete } from "@/lib/swal";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { useState, useEffect } from "react";
import { 
  GraduationCap, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Building2, 
  DollarSign, 
  Sparkles,
  ExternalLink
} from "lucide-react";
import { getAllAdminPrograms, getFacultiesWithPrograms, saveProgramAction, softDeleteProgramAction } from "@/server/programs";
import { swalToast } from "@/lib/swal";

export interface AdminProdiItem {
  id: string;
  facultyId?: string;
  faculty: string;
  facultyCode?: string;
  facultyName?: string;
  name: string;
  slug: string;
  degreeLevel?: string;
  degree: "S1" | "D3";
  degreeTitle: string;
  accreditation: string;
  tuitionFeeEst?: number | null;
  tuitionPerSemester?: string;
  tuition: string;
  shortDesc: string;
  fullDesc?: string;
  campusLocation?: string;
  careerProspect?: string;
  careerProspects?: string;
  career: string;
  coverImage: string;
  featured?: boolean;
  totalStudentsEst?: number;
  version: number;
}

export default function AdminProdiCrudPage() {
  const [prodis, setProdis] = useState<AdminProdiItem[]>([]);
  const [search, setSearch] = useState("");
  const [facultyFilter, setFacultyFilter] = useState<string>("ALL");
  const [degreeFilter, setDegreeFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useModalKeys(modalOpen, () => setModalOpen(false));
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<AdminProdiItem | null>(null);
  const [saving, setSaving] = useState(false);

  // Form states
  // Daftar fakultas diambil dari database agar kodenya selalu cocok.
  const [faculties, setFaculties] = useState<{ id: string; code: string; name: string }[]>([]);
  const [formFaculty, setFormFaculty] = useState("");
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDegree, setFormDegree] = useState<"S1" | "D3">("S1");
  const [formDegreeTitle, setFormDegreeTitle] = useState("");
  const [formAccreditation, setFormAccreditation] = useState("Baik Sekali");
  const [formTuition, setFormTuition] = useState("");
  const [formShortDesc, setFormShortDesc] = useState("");
  const [formCareer, setFormCareer] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");

  // Load from database
  const loadData = async () => {
    try {
      const [data, facultyList] = await Promise.all([getAllAdminPrograms(), getFacultiesWithPrograms()]);
      setFaculties(facultyList.map(({ id, code, name }) => ({ id, code, name })));
      const mapped: AdminProdiItem[] = data.map((p) => ({
        id: p.id,
        facultyId: p.facultyId,
        faculty: p.facultyCode,
        facultyCode: p.facultyCode,
        facultyName: p.facultyName,
        name: p.name,
        slug: p.slug,
        degree: p.degreeLevel as "S1" | "D3",
        degreeLevel: p.degreeLevel,
        degreeTitle: p.degreeTitle,
        accreditation: p.accreditation,
        tuitionFeeEst: p.tuitionFeeEst,
        tuition: p.tuitionFeeEst ? `Rp ${p.tuitionFeeEst.toLocaleString("id-ID")}` : "",
        shortDesc: p.shortDesc,
        fullDesc: p.fullDesc,
        campusLocation: p.campusLocation,
        featured: p.featured,
        careerProspect: p.careerProspect,
        career: p.careerProspect,
        coverImage: p.coverImage,
        version: p.version,
      }));
      setProdis(mapped);
    } catch (err) {
      console.error("Error loading programs:", err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadData();

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const fak = params.get("fakultas");
      if (fak) {
        setFacultyFilter(fak.toUpperCase());
      }
    }
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormFaculty(faculties[0]?.code ?? "");
    setFormName("");
    setFormSlug("");
    setFormDegree("S1");
    setFormDegreeTitle("");
    setFormAccreditation("Baik Sekali");
    setFormTuition("");
    setFormShortDesc("");
    setFormCareer("");
    setFormCoverImage("");
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminProdiItem) => {
    setEditingItem(item);
    setFormFaculty(item.faculty);
    setFormName(item.name);
    setFormSlug(item.slug);
    setFormDegree((item.degreeLevel as "D3" | "S1") || item.degree || "S1");
    setFormDegreeTitle(item.degreeTitle);
    setFormAccreditation(item.accreditation);
    setFormTuition(item.tuitionPerSemester || item.tuition || "");
    setFormShortDesc(item.shortDesc);
    setFormCareer(item.careerProspects || item.careerProspect || item.career || "");
    setFormCoverImage(item.coverImage);
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) {
      swalToast("Nama dan alamat halaman program studi wajib diisi.", "error");
      return;
    }
    setSaving(true);
    try {
      const faculty = faculties.find((f) => f.code === formFaculty);
      if (!faculty) {
        swalToast("Pilih fakultas terlebih dahulu.", "error");
        return;
      }
      const digits = formTuition.replace(/[^0-9]/g, "");
      const res = await saveProgramAction(editingItem?.id ?? null, {
        facultyId: faculty.id,
        name: formName.trim(),
        slug: formSlug.trim().toLowerCase(),
        degreeLevel: formDegree === "D3" ? "DIPLOMA" : "BACHELOR",
        degreeTitle: formDegreeTitle || null,
        accreditation: formAccreditation || "Baik Sekali",
        campusLocation: editingItem?.campusLocation || "Surakarta",
        shortDesc: formShortDesc || null,
        fullDesc: editingItem?.fullDesc || null,
        careerProspect: formCareer || null,
        tuitionFeeEst: digits ? Number(digits) : null,
        coverImage: formCoverImage || null,
        featured: editingItem?.featured ?? false,
        version: editingItem?.version ?? 1,
      } as any);
      if (!res.ok) {
        swalToast(("message" in res && res.message) || "Gagal menyimpan program studi.", "error");
        return;
      }
      setModalOpen(false);
      await loadData();
      swalToast(editingItem ? "Program studi berhasil diperbarui." : "Program studi baru berhasil ditambahkan.", "success");
    } catch {
      swalToast("Terjadi kesalahan saat menyimpan program studi.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await softDeleteProgramAction(id);
      if (res.ok) {
        await loadData();
        swalToast(("message" in res && res.message) || "Program studi berhasil dihapus.", "success");
      } else {
        swalToast(("message" in res && res.message) || "Gagal menghapus program studi.", "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat menghapus program studi.", "error");
    }
  };

  // Filter logic
  const filtered = prodis.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.facultyName || "").toLowerCase().includes(search.toLowerCase()) ||
      p.degreeTitle.toLowerCase().includes(search.toLowerCase());
    const matchFaculty = facultyFilter === "ALL" || p.faculty === facultyFilter;
    const matchDegree = degreeFilter === "ALL" || p.degreeLevel === degreeFilter;
    return matchSearch && matchFaculty && matchDegree;
  });

  const pg = usePagination(filtered, 10);

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
              Manajemen Akademik
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-500">Total {prodis.length} Program Studi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span>Program Studi</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Kelola kurikulum, akreditasi, biaya pendidikan, dan profil prodi yang tampil di website utama.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs tracking-wider shadow-lg shadow-blue-600/30 transition-all cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>TAMBAH PROGRAM STUDI</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-blue-200 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari prodi, fakultas, gelar..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs text-slate-900 focus:outline-none focus:border-sky-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Fakultas ({faculties.length})</option>
            {faculties.map((f) => (
              <option key={f.id} value={f.code}>
                {f.name}
              </option>
            ))}
          </select>

          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="bg-blue-50 border border-blue-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Jenjang</option>
            <option value="S1">Sarjana (S1)</option>
            <option value="D3">Diploma (D3)</option>
          </select>
        </div>

      </div>

      {/* Data Table */}
      <div className="rounded-3xl bg-white border border-blue-200 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-200 bg-white text-slate-500 text-[10px] uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Program Studi</th>
                <th className="py-3.5 px-4">Fakultas</th>
                <th className="py-3.5 px-4">Jenjang &amp; Gelar</th>
                <th className="py-3.5 px-4">Akreditasi BAN-PT</th>
                <th className="py-3.5 px-4">Biaya / Semester</th>
                <th className="py-3.5 px-4 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40">
              {pg.items.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-800/80 overflow-hidden shrink-0">
                        <img 
                          src={item.coverImage || "/images/banners/hero-kampus.jpg"} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/banners/hero-kampus.jpg";
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.featured && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-100 text-blue-600 border border-sky-500/40 font-bold uppercase">
                              Unggulan
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-blue-600">/{item.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 border border-blue-100 text-[11px] font-bold text-blue-700">
                      {item.faculty}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-700">
                      {item.degreeLevel} • {item.degreeTitle}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" />
                      <span>{item.accreditation}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                    {item.tuition || <span className="text-slate-400">Belum diisi</span>}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Lihat halaman publik"
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-900 text-blue-600 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="Edit data prodi"
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-800 text-slate-700 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={async () => { if (await swalConfirmDelete()) handleDelete(item.id); }}
                        title="Hapus prodi"
                        className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-900/60 text-blue-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center text-slate-500 text-xs">
            Tidak ada program studi yang sesuai dengan kata kunci pencarian.
          </div>
        )}
      </div>

      {/* MODAL CREATE / EDIT PRODI */}
      {loaded && <Pagination pg={pg} noun="program studi" />}
      {!loaded && <LoadingState />}
      {loaded && filtered.length === 0 && (
        <EmptyState
          title={prodis.length === 0 ? "Belum ada program studi" : "Tidak ada hasil yang cocok"}
          hint={prodis.length === 0 ? "Klik tombol di bawah untuk menambahkan data pertama." : "Coba ubah kata kunci pencarian atau filter yang dipakai."}
          actionLabel={prodis.length === 0 ? "Tambah Program Studi" : undefined}
          onAction={handleOpenCreate}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="fixed inset-0 bg-blue-50 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-white border border-blue-200 rounded-3xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="flex items-center justify-between pb-4 border-b border-blue-200 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {editingItem ? "Edit Program Studi" : "Tambah Program Studi Baru"}
                </h3>
                <p className="text-xs text-slate-500">
                  Lengkapi data akademik resmi untuk publikasi website
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-500 hover:text-slate-900 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Fakultas</label>
                  <select
                    value={formFaculty}
                    onChange={(e) => setFormFaculty(e.target.value as any)}
                    className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                  >
                    {faculties.map((f) => (
                      <option key={f.id} value={f.code}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jenjang Pendidikan</label>
                  <select
                    value={formDegree}
                    onChange={(e) => setFormDegree(e.target.value as any)}
                    className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                  >
                    <option value="S1">Sarjana (S1)</option>
                    <option value="D3">Diploma (D3)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Program Studi</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => {
                    setFormName(e.target.value);
                    if (!editingItem) {
                      setFormSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                    }
                  }}
                  placeholder="Misal: S1 Informatika"
                  className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Alamat Halaman</label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="informatika"
                    className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Gelar Kelulusan</label>
                  <input
                    type="text"
                    value={formDegreeTitle}
                    onChange={(e) => setFormDegreeTitle(e.target.value)}
                    placeholder="S.Kom., S.M., S.Par."
                    className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Akreditasi BAN-PT</label>
                  <select
                    value={formAccreditation}
                    onChange={(e) => setFormAccreditation(e.target.value)}
                    className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                  >
                    <option value="Unggul">Unggul</option>
                    <option value="Baik Sekali">Baik Sekali</option>
                    <option value="Baik">Baik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Biaya SPP per Semester</label>
                  <input
                    type="text"
                    value={formTuition}
                    onChange={(e) => setFormTuition(e.target.value)}
                    placeholder="Rp 4.500.000"
                    className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Ringkasan kurikulum dan fokus pembelajaran..."
                  className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Prospek Karir Utama</label>
                <input
                  type="text"
                  value={formCareer}
                  onChange={(e) => setFormCareer(e.target.value)}
                  placeholder="Software Engineer, Data Scientist, Tech Lead..."
                  className="w-full bg-blue-50 border border-blue-100 rounded-xl p-2.5 text-slate-900"
                />
              </div>

              <div>
                <ImageUploadField label="Foto Utama Halaman Prodi (kosongkan untuk foto bawaan)" value={formCoverImage} onChange={setFormCoverImage} />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-blue-200">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-slate-700 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md shadow-blue-600/30"
                >
                  {editingItem ? "SIMPAN PERUBAHAN" : "TAMBAH PROGRAM STUDI"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI DELETE */}

    </div>
  );
}

