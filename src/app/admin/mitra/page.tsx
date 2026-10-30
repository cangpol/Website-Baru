"use client";

import { useState, useEffect } from "react";
import { 
  Handshake, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  Building2, 
  Briefcase, 
  Calendar, 
  Award,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { initialAdminMitra, AdminMitraItem } from "@/lib/adminDataStore";
import { loadCrudCollection, saveCrudCollection, newCrudId } from "@/lib/adminCrudStore";

export default function AdminMitraPage() {
  const [mitras, setMitras] = useState<AdminMitraItem[]>(initialAdminMitra);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminMitraItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<AdminMitraItem["category"]>("Triputra Group");
  const [formPartnershipType, setFormPartnershipType] = useState<AdminMitraItem["partnershipType"]>("Immersion 3+1");
  const [formLogo, setFormLogo] = useState("/images/logo.png");
  const [formMouYear, setFormMouYear] = useState("2024 - 2029");
  const [formStatus, setFormStatus] = useState<AdminMitraItem["status"]>("Aktif");

  // Load from localStorage
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await loadCrudCollection<AdminMitraItem[]>("mitra", initialAdminMitra);
        if (!cancelled) setMitras(Array.isArray(res.data) ? res.data : initialAdminMitra);
      } catch {
        if (!cancelled) setMitras(initialAdminMitra);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const saveToStorage = (updated: AdminMitraItem[]) => {
    saveCrudCollection<AdminMitraItem[]>("mitra", updated, setMitras);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormName("");
    setFormCategory("Triputra Group");
    setFormPartnershipType("Immersion 3+1");
    setFormLogo("/images/logo.png");
    setFormMouYear("2024 - 2029");
    setFormStatus("Aktif");
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminMitraItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPartnershipType(item.partnershipType);
    setFormLogo(item.logo);
    setFormMouYear(item.mouYear);
    setFormStatus(item.status);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingItem) {
      const updated = mitras.map((m) =>
        m.id === editingItem.id
          ? {
              ...m,
              name: formName,
              category: formCategory,
              partnershipType: formPartnershipType,
              logo: formLogo,
              mouYear: formMouYear,
              status: formStatus,
            }
          : m
      );
      saveToStorage(updated);
    } else {
      const newItem: AdminMitraItem = {
        id: newCrudId("mitra"),
        name: formName,
        category: formCategory,
        partnershipType: formPartnershipType,
        logo: formLogo,
        mouYear: formMouYear,
        status: formStatus,
      };
      saveToStorage([newItem, ...mitras]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = mitras.filter((m) => m.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  // Filtered
  const filtered = mitras.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "ALL" || m.category === categoryFilter;
    const matchType = typeFilter === "ALL" || m.partnershipType === typeFilter;
    return matchSearch && matchCategory && matchType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider">
              Ekosistem Industri
            </span>
            <span className="text-xs text-slate-400">Total: {mitras.length} Mitra Strategis</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Handshake className="w-7 h-7 text-amber-400" />
            Manajemen Mitra & Kerjasama Industri
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola jaringan kemitraan Triputra Group, korporasi nasional, rumah sakit jejaring, dan institusi riset pendukung Program Immersion 3+1.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-slate-950" />
          Tambah Mitra Kerjasama
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-slate-400">Total Mitra Industri</p>
          <p className="text-2xl font-bold text-white mt-1">{mitras.length}</p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-amber-400">Triputra Group Companies</p>
          <p className="text-2xl font-bold text-amber-300 mt-1">
            {mitras.filter((m) => m.category === "Triputra Group").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-emerald-400">Mitra Immersion 3+1</p>
          <p className="text-2xl font-bold text-emerald-300 mt-1">
            {mitras.filter((m) => m.partnershipType === "Immersion 3+1").length}
          </p>
        </div>
        <div className="bg-[#0b1c38] border border-blue-900/30 p-4 rounded-xl">
          <p className="text-xs text-sky-400">MoU Berstatus Aktif</p>
          <p className="text-2xl font-bold text-sky-300 mt-1">
            {mitras.filter((m) => m.status === "Aktif").length}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama perusahaan atau institusi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071322] border border-blue-900/40 pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter kategori industri mitra"
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">Semua Kategori Mitra (49 Mitra)</option>
            <option value="Triputra Group">Triputra Group</option>
            <option value="Industri & Finansial">Industri & Finansial</option>
            <option value="Kesehatan & RS">Kesehatan & RS</option>
            <option value="Pemerintah & Pendidikan">Pemerintah & Pendidikan</option>
            <option value="Mitra Global">Mitra Global</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter skema kerjasama mitra"
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-amber-400"
          >
            <option value="ALL">Semua Skema Kerjasama</option>
            <option value="Immersion 3+1">Immersion 3+1</option>
            <option value="Beasiswa Industri">Beasiswa Industri</option>
            <option value="Penyerapan Karir">Penyerapan Karir</option>
            <option value="Riset & Magang">Riset & Magang</option>
          </select>
        </div>
      </div>

      {/* Grid of Partners */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 hover:border-amber-400/40 transition duration-200 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  item.category === "Triputra Group"
                    ? "bg-amber-500/10 text-amber-300 border-amber-500/30"
                    : "bg-blue-500/10 text-blue-300 border-blue-500/30"
                }`}>
                  {item.category}
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-900 border border-blue-900/50 flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-white group-hover:text-amber-300 transition text-base leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                    {item.partnershipType}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-900/30 space-y-1.5 text-xs text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-500" /> Periode MoU:</span>
                  <span className="font-mono text-slate-300">{item.mouYear}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-blue-900/30 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/20 transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={() => setDeleteConfirmId(item.id)}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Handshake className="w-5 h-5 text-amber-400" />
                {editingItem ? "Edit Mitra Industri" : "Tambah Mitra Industri Baru"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Perusahaan / Institusi *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: PT Dharma Polimetal Tbk"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Kategori Industri</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AdminMitraItem["category"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Triputra Group">Triputra Group</option>
                    <option value="Industri & Finansial">Industri & Finansial</option>
                    <option value="Kesehatan & RS">Kesehatan & RS</option>
                    <option value="Pemerintah & Pendidikan">Pemerintah & Pendidikan</option>
                    <option value="Mitra Global">Mitra Global</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Skema Kerjasama</label>
                  <select
                    value={formPartnershipType}
                    onChange={(e) => setFormPartnershipType(e.target.value as AdminMitraItem["partnershipType"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Immersion 3+1">Immersion 3+1</option>
                    <option value="Beasiswa Industri">Beasiswa Industri</option>
                    <option value="Penyerapan Karir">Penyerapan Karir</option>
                    <option value="Riset & Magang">Riset & Magang</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Masa MoU / Tahun</label>
                  <input
                    type="text"
                    value={formMouYear}
                    onChange={(e) => setFormMouYear(e.target.value)}
                    placeholder="2024 - 2029"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Status Kerjasama</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminMitraItem["status"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Dalam Perpanjangan">Dalam Perpanjangan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Path / URL Logo Perusahaan</label>
                <input
                  type="text"
                  value={formLogo}
                  onChange={(e) => setFormLogo(e.target.value)}
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="pt-3 border-t border-blue-900/40 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-semibold rounded-xl text-sm transition shadow-lg shadow-amber-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-slate-950" />
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Mitra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-rose-900/50 rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-rose-400" />
              Hapus Mitra Kerjasama?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Data kerjasama industri ini akan dihapus dari daftar mitra UPITRA.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-xl transition"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold rounded-xl transition"
              >
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

