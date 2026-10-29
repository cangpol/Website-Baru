"use client";

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
import { initialAdminProdiList, AdminProdiItem } from "@/lib/adminDataStore";

export default function AdminProdiCrudPage() {
  const [prodis, setProdis] = useState<AdminProdiItem[]>(initialAdminProdiList);
  const [search, setSearch] = useState("");
  const [facultyFilter, setFacultyFilter] = useState<string>("ALL");
  const [degreeFilter, setDegreeFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<AdminProdiItem | null>(null);

  // Form states
  const [formFaculty, setFormFaculty] = useState<"FST" | "FEB" | "FSH" | "FKES">("FST");
  const [formName, setFormName] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formDegree, setFormDegree] = useState<"S1" | "D3">("S1");
  const [formDegreeTitle, setFormDegreeTitle] = useState("S.Kom.");
  const [formAccreditation, setFormAccreditation] = useState("Baik Sekali");
  const [formTuition, setFormTuition] = useState("Rp 4.500.000");
  const [formShortDesc, setFormShortDesc] = useState("");
  const [formCareer, setFormCareer] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("/images/banners/hero-pmb.jpg");

  // Load from localStorage if present
  useEffect(() => {
    const saved = localStorage.getItem("upitra_admin_prodis");
    if (saved) {
      try {
        setProdis(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const saveToStorage = (updated: AdminProdiItem[]) => {
    setProdis(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("upitra_admin_prodis", JSON.stringify(updated));
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormFaculty("FST");
    setFormName("");
    setFormSlug("");
    setFormDegree("S1");
    setFormDegreeTitle("S.Kom.");
    setFormAccreditation("Baik Sekali");
    setFormTuition("Rp 4.500.000");
    setFormShortDesc("");
    setFormCareer("");
    setFormCoverImage("/images/banners/hero-pmb.jpg");
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminProdiItem) => {
    setEditingItem(item);
    setFormFaculty(item.faculty);
    setFormName(item.name);
    setFormSlug(item.slug);
    setFormDegree(item.degreeLevel);
    setFormDegreeTitle(item.degreeTitle);
    setFormAccreditation(item.accreditation);
    setFormTuition(item.tuitionPerSemester);
    setFormShortDesc(item.shortDesc);
    setFormCareer(item.careerProspects);
    setFormCoverImage(item.coverImage);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formSlug.trim()) return;

    const facultyMap: Record<string, string> = {
      FST: "Fakultas Sains & Teknologi",
      FEB: "Fakultas Ekonomi & Bisnis",
      FSH: "Fakultas Sosial Humaniora",
      FKES: "Fakultas Kesehatan",
    };

    if (editingItem) {
      // Update
      const updated = prodis.map((p) =>
        p.id === editingItem.id
          ? {
              ...p,
              faculty: formFaculty,
              facultyName: facultyMap[formFaculty],
              name: formName.trim(),
              slug: formSlug.trim().toLowerCase(),
              degreeLevel: formDegree,
              degreeTitle: formDegreeTitle,
              accreditation: formAccreditation,
              tuitionPerSemester: formTuition,
              shortDesc: formShortDesc,
              careerProspects: formCareer,
              coverImage: formCoverImage,
            }
          : p
      );
      saveToStorage(updated);
    } else {
      // Create
      const newItem: AdminProdiItem = {
        id: "prodi_" + Date.now(),
        faculty: formFaculty,
        facultyName: facultyMap[formFaculty],
        name: formName.trim(),
        slug: formSlug.trim().toLowerCase(),
        degreeLevel: formDegree,
        degreeTitle: formDegreeTitle,
        accreditation: formAccreditation,
        tuitionPerSemester: formTuition,
        shortDesc: formShortDesc,
        careerProspects: formCareer,
        totalStudentsEst: 150,
        coverImage: formCoverImage,
        featured: false,
      };
      saveToStorage([newItem, ...prodis]);
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = prodis.filter((p) => p.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  // Filter logic
  const filtered = prodis.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.facultyName.toLowerCase().includes(search.toLowerCase()) ||
      p.degreeTitle.toLowerCase().includes(search.toLowerCase());
    const matchFaculty = facultyFilter === "ALL" || p.faculty === facultyFilter;
    const matchDegree = degreeFilter === "ALL" || p.degreeLevel === degreeFilter;
    return matchSearch && matchFaculty && matchDegree;
  });

  return (
    <div className="space-y-6 select-none font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">
              Manajemen Akademik
            </span>
            <span className="text-xs text-slate-500">•</span>
            <span className="text-xs text-slate-400">Total {prodis.length} Program Studi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Program Studi &amp; 4 Fakultas</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
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
      <div className="p-4 rounded-2xl bg-[#071a33] border border-blue-900/60 shadow-lg flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari prodi, fakultas, gelar..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#030d1c] border border-blue-900/80 text-xs text-white focus:outline-none focus:border-sky-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select
            value={facultyFilter}
            onChange={(e) => setFacultyFilter(e.target.value)}
            className="bg-[#030d1c] border border-blue-900/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Fakultas (4)</option>
            <option value="FST">Fakultas Sains &amp; Teknologi (FST)</option>
            <option value="FEB">Fakultas Ekonomi &amp; Bisnis (FEB)</option>
            <option value="FSH">Fakultas Sosial Humaniora (FSH)</option>
            <option value="FKES">Fakultas Kesehatan (FKES)</option>
          </select>

          <select
            value={degreeFilter}
            onChange={(e) => setDegreeFilter(e.target.value)}
            className="bg-[#030d1c] border border-blue-900/80 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Jenjang</option>
            <option value="S1">Sarjana (S1)</option>
            <option value="D3">Diploma (D3)</option>
          </select>
        </div>

      </div>

      {/* Data Table */}
      <div className="rounded-3xl bg-[#071a33] border border-blue-900/60 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 bg-[#051427] text-slate-400 text-[10px] uppercase tracking-wider">
                <th className="py-3.5 px-4">Nama Program Studi</th>
                <th className="py-3.5 px-4">Fakultas</th>
                <th className="py-3.5 px-4">Jenjang &amp; Gelar</th>
                <th className="py-3.5 px-4">Akreditasi BAN-PT</th>
                <th className="py-3.5 px-4">Biaya / Semester</th>
                <th className="py-3.5 px-4 text-right">Aksi Manajemen</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/40">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-950 border border-blue-800/80 overflow-hidden shrink-0">
                        <img 
                          src={item.coverImage} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLImageElement).src = "/images/banners/hero-kampus.jpg";
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.featured && (
                            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
                              Unggulan
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-sky-400">/{item.slug}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-950 border border-blue-800 text-[11px] font-bold text-sky-200">
                      {item.faculty}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">
                      {item.degreeLevel} • {item.degreeTitle}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold text-[10px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{item.accreditation}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-slate-300">
                    {item.tuitionPerSemester}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <a
                        href={`/${item.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Lihat halaman publik"
                        className="p-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-sky-300 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="Edit data prodi"
                        className="p-1.5 rounded-lg bg-blue-950 hover:bg-blue-800 text-slate-200 hover:text-white transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(item.id)}
                        title="Hapus prodi"
                        className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition-colors cursor-pointer"
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
          <div className="p-8 text-center text-slate-400 text-xs">
            Tidak ada program studi yang sesuai dengan kata kunci pencarian.
          </div>
        )}
      </div>

      {/* MODAL CREATE / EDIT PRODI */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-xl bg-[#071a33] border border-blue-900/80 rounded-3xl p-6 shadow-2xl z-10 max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <div className="flex items-center justify-between pb-4 border-b border-blue-900/60 mb-5">
              <div>
                <h3 className="text-base font-bold text-white">
                  {editingItem ? "Edit Program Studi" : "Tambah Program Studi Baru"}
                </h3>
                <p className="text-xs text-slate-400">
                  Lengkapi data akademik resmi untuk publikasi website
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fakultas</label>
                  <select
                    value={formFaculty}
                    onChange={(e) => setFormFaculty(e.target.value as any)}
                    className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                  >
                    <option value="FST">Fakultas Sains &amp; Teknologi (FST)</option>
                    <option value="FEB">Fakultas Ekonomi &amp; Bisnis (FEB)</option>
                    <option value="FSH">Fakultas Sosial Humaniora (FSH)</option>
                    <option value="FKES">Fakultas Kesehatan (FKES)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Jenjang Pendidikan</label>
                  <select
                    value={formDegree}
                    onChange={(e) => setFormDegree(e.target.value as any)}
                    className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                  >
                    <option value="S1">Sarjana (S1)</option>
                    <option value="D3">Diploma (D3)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Program Studi</label>
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
                  className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Slug URL</label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="informatika"
                    className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Gelar Kelulusan</label>
                  <input
                    type="text"
                    required
                    value={formDegreeTitle}
                    onChange={(e) => setFormDegreeTitle(e.target.value)}
                    placeholder="S.Kom., S.M., S.Par."
                    className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Akreditasi BAN-PT</label>
                  <select
                    value={formAccreditation}
                    onChange={(e) => setFormAccreditation(e.target.value)}
                    className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                  >
                    <option value="Unggul">Unggul</option>
                    <option value="Baik Sekali">Baik Sekali</option>
                    <option value="Baik">Baik</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Biaya SPP per Semester</label>
                  <input
                    type="text"
                    value={formTuition}
                    onChange={(e) => setFormTuition(e.target.value)}
                    placeholder="Rp 4.500.000"
                    className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Ringkasan kurikulum dan fokus pembelajaran..."
                  className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Prospek Karir Utama</label>
                <input
                  type="text"
                  value={formCareer}
                  onChange={(e) => setFormCareer(e.target.value)}
                  placeholder="Software Engineer, Data Scientist, Tech Lead..."
                  className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Path Gambar Cover</label>
                <input
                  type="text"
                  value={formCoverImage}
                  onChange={(e) => setFormCoverImage(e.target.value)}
                  placeholder="/images/ar-vr.jpg"
                  className="w-full bg-[#030d1c] border border-blue-900 rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2.5 border-t border-blue-900/60">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-950 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
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
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setDeleteConfirmId(null)} />
          <div className="relative w-full max-w-sm bg-[#071a33] border border-rose-500/40 rounded-3xl p-6 shadow-2xl z-10 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/40">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Hapus Program Studi?</h4>
              <p className="text-xs text-slate-400 mt-1">
                Data yang dihapus tidak dapat dipulihkan kembali dari sistem.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl bg-blue-950 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30"
              >
                Ya, Hapus Data
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

