"use client";

import { EmptyState, LoadingState, Pagination, useModalKeys, usePagination } from "@/components/admin/crud-ui";
import { swalConfirmDelete, swalToast } from "@/lib/swal";
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
import { getPartners, savePartnerAction, softDeletePartnerAction } from "@/server/partners";

export interface AdminMitraItem {
  id: string;
  name: string;
  category: string;
  partnershipType?: string;
  logo?: string;
  logoUrl?: string;
  websiteUrl?: string | null;
  description?: string | null;
  startYear?: number | null;
  mouYear?: string | number;
  status?: string;
  mouStatus?: string | null;
  order: number;
  isActive: boolean;
  version: number;
}

export default function AdminMitraPage() {
  const [mitras, setMitras] = useState<AdminMitraItem[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useModalKeys(modalOpen, () => setModalOpen(false));
  const [editingItem, setEditingItem] = useState<AdminMitraItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<AdminMitraItem["category"]>("Triputra Group");
  const [formPartnershipType, setFormPartnershipType] = useState<AdminMitraItem["partnershipType"]>("Immersion 3+1");
  const [formLogo, setFormLogo] = useState("/images/logo.png");
  const [formMouYear, setFormMouYear] = useState("2024 - 2029");
  const [formStatus, setFormStatus] = useState<AdminMitraItem["status"]>("Aktif");

  const loadData = async () => {
    try {
      const data = await getPartners();
      setMitras(
        (data as any[]).map((p) => ({
          ...p,
          partnershipType: p.partnershipType ?? p.description ?? undefined,
          logo: p.logoUrl,
          mouYear: p.startYear ?? undefined,
          status: p.mouStatus ?? undefined,
        })) as AdminMitraItem[]
      );
    } catch (err) {
      console.error("Error loading partners:", err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const [saving, setSaving] = useState(false);

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
    setFormPartnershipType(item.partnershipType || "Immersion 3+1");
    setFormLogo(item.logo || item.logoUrl || "/images/logo.png");
    setFormMouYear(String(item.mouYear || item.startYear || "2024 - 2029"));
    setFormStatus(item.status || "Aktif");
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      swalToast("Nama mitra wajib diisi.", "error");
      return;
    }
    const yearMatch = String(formMouYear).match(/d{4}/);
    setSaving(true);
    try {
      const res = await savePartnerAction(editingItem?.id ?? null, {
        name: formName.trim(),
        category: formCategory,
        logoUrl: formLogo || null,
        description: formPartnershipType || null,
        startYear: yearMatch ? Number(yearMatch[0]) : null,
        mouStatus: formStatus || "Aktif",
        order: editingItem?.order ?? 0,
        isActive: true,
        version: editingItem?.version ?? 1,
      });
      if (!res.ok) {
        swalToast(("message" in res && res.message) || "Gagal menyimpan data mitra.", "error");
        return;
      }
      setModalOpen(false);
      await loadData();
      swalToast(editingItem ? "Data mitra berhasil diperbarui." : "Mitra baru berhasil ditambahkan.", "success");
    } catch {
      swalToast("Terjadi kesalahan saat menyimpan data mitra.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await softDeletePartnerAction(id);
      if (res.ok) {
        await loadData();
        swalToast(res.message, "success");
      } else {
        swalToast(res.message, "error");
      }
    } catch {
      swalToast("Terjadi kesalahan saat menghapus mitra.", "error");
    }
  };

  // Filtered
  const filtered = mitras.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "ALL" || m.category === categoryFilter;
    const matchType = typeFilter === "ALL" || m.partnershipType === typeFilter;
    return matchSearch && matchCategory && matchType;
  });

  const pg = usePagination(filtered, 10);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-blue-100 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-600 border border-blue-200 uppercase tracking-wider">
              Ekosistem Industri
            </span>
            <span className="text-xs text-slate-500">Total: {mitras.length} Mitra Strategis</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Handshake className="w-7 h-7 text-blue-600" />
            Manajemen Mitra & Kerjasama Industri
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Kelola jaringan kemitraan Triputra Group, korporasi nasional, rumah sakit jejaring, dan institusi riset pendukung Program Immersion 3+1.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex shrink-0 items-center gap-2 whitespace-nowrap px-5 py-2.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4 text-white" />
          Tambah Mitra Kerjasama
        </button>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-blue-100 p-4 rounded-xl">
          <p className="text-xs text-slate-500">Total Mitra Industri</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{mitras.length}</p>
        </div>
        <div className="bg-white border border-blue-100 p-4 rounded-xl">
          <p className="text-xs text-blue-600">Triputra Group Companies</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {mitras.filter((m) => m.category === "Triputra Group").length}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-4 rounded-xl">
          <p className="text-xs text-blue-600">Mitra Immersion 3+1</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {mitras.filter((m) => m.partnershipType === "Immersion 3+1").length}
          </p>
        </div>
        <div className="bg-white border border-blue-100 p-4 rounded-xl">
          <p className="text-xs text-blue-600">MoU Berstatus Aktif</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {mitras.filter((m) => m.status === "Aktif").length}
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white border border-blue-100 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari nama perusahaan atau institusi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-blue-50 border border-blue-100 pl-9 pr-4 py-2 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter kategori industri mitra"
            className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-400"
          >
            <option value="ALL">Semua Kategori Mitra</option>
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
            className="bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-sky-400"
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
        {pg.items.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-blue-100 rounded-2xl p-5 hover:border-sky-400/40 transition duration-200 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                  item.category === "Triputra Group"
                    ? "bg-blue-50 text-blue-600 border-blue-200"
                    : "bg-blue-50 text-blue-600 border-blue-200"
                }`}>
                  {item.category}
                </span>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-600 border border-sky-500/20">
                  {item.status}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center p-2 relative overflow-hidden flex-shrink-0">
                  <Image
                    src={item.logo || item.logoUrl || "/images/logo.png"}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition text-base leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-sky-400/90 font-medium flex items-center gap-1 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                    {item.partnershipType}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-100 space-y-1.5 text-xs text-slate-500">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-slate-500" /> Periode MoU:</span>
                  <span className="font-mono text-slate-700">{item.mouYear}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-blue-100 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(item)}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit
              </button>
              <button
                onClick={async () => { if (await swalConfirmDelete()) handleDelete(item.id); }}
                className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold border border-blue-200 transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Create / Edit */}
      {loaded && <Pagination pg={pg} noun="mitra" />}
      {!loaded && <LoadingState />}
      {loaded && filtered.length === 0 && (
        <EmptyState
          title={mitras.length === 0 ? "Belum ada mitra" : "Tidak ada hasil yang cocok"}
          hint={mitras.length === 0 ? "Klik tombol di bawah untuk menambahkan data pertama." : "Coba ubah kata kunci pencarian atau filter yang dipakai."}
          actionLabel={mitras.length === 0 ? "Tambah Mitra" : undefined}
          onAction={handleOpenCreate}
        />
      )}

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="bg-white border border-blue-200 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-100 bg-blue-50">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Handshake className="w-5 h-5 text-blue-600" />
                {editingItem ? "Edit Mitra Industri" : "Tambah Mitra Industri Baru"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-500 hover:text-slate-900 p-1 rounded-lg hover:bg-blue-50 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Nama Perusahaan / Institusi *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: PT Dharma Polimetal Tbk"
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Kategori Industri</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AdminMitraItem["category"])}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  >
                    <option value="Triputra Group">Triputra Group</option>
                    <option value="Industri & Finansial">Industri & Finansial</option>
                    <option value="Kesehatan & RS">Kesehatan & RS</option>
                    <option value="Pemerintah & Pendidikan">Pemerintah & Pendidikan</option>
                    <option value="Mitra Global">Mitra Global</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Skema Kerjasama</label>
                  <select
                    value={formPartnershipType}
                    onChange={(e) => setFormPartnershipType(e.target.value as AdminMitraItem["partnershipType"])}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
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
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Masa MoU / Tahun</label>
                  <input
                    type="text"
                    value={formMouYear}
                    onChange={(e) => setFormMouYear(e.target.value)}
                    placeholder="2024 - 2029"
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1.5">Status Kerjasama</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminMitraItem["status"])}
                    className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Dalam Perpanjangan">Dalam Perpanjangan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">Path / URL Logo Perusahaan</label>
                <input
                  type="text"
                  value={formLogo}
                  onChange={(e) => setFormLogo(e.target.value)}
                  className="w-full bg-blue-50 border border-blue-100 px-3 py-2 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-3 border-t border-blue-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-700 hover:text-slate-900 rounded-xl transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-sky-500/20"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Mitra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
    </div>
  );
}

