"use client";

import { EmptyState, LoadingState, Pagination, useModalKeys, usePagination } from "@/components/admin/crud-ui";
import { swalToast, swalConfirmDelete } from "@/lib/swal";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Handshake, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Save, 
  ExternalLink,
  FileCheck2,
  Calendar,
  Building,
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { 
  getMouList, 
  saveMouListAction, 
  KerjasamaMouItem 
} from "@/server/partners";

export type AdminKerjasamaMouItem = KerjasamaMouItem;

function KerjasamaManagerContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "mou";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [items, setItems] = useState<AdminKerjasamaMouItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useModalKeys(isModalOpen, () => setIsModalOpen(false));
  const [editingItem, setEditingItem] = useState<AdminKerjasamaMouItem | null>(null);
  // Form State
  const [formData, setFormData] = useState({
    partnerName: "",
    documentType: "MoU" as AdminKerjasamaMouItem["documentType"],
    scope: "",
    startYear: "2026",
    endYear: "2031",
    signatory: "",
    status: "Aktif" as AdminKerjasamaMouItem["status"],
    fileUrl: "",
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const loadData = async () => {
    try {
      const data = await getMouList();
      setItems(data);
    } catch (err) {
      console.error("Error loading MoU list:", err);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveToStorage = async (updated: AdminKerjasamaMouItem[]) => {
    setItems(updated);
    try {
      const res = await saveMouListAction(updated);
      if (res.ok) {
        showNotification(res.message);
      } else {
        swalToast(res.message);
      }
    } catch {
      swalToast("Gagal menyimpan data MoU.");
    }
  };

  const showNotification = (msg: string) => {
    swalToast(msg, "success");
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = 
      item.partnerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.scope.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.signatory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.documentType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const pg = usePagination(filteredItems, 10);

  const handleOpenModal = (item?: AdminKerjasamaMouItem) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        partnerName: item.partnerName,
        documentType: item.documentType,
        scope: item.scope,
        startYear: item.startYear,
        endYear: item.endYear,
        signatory: item.signatory,
        status: item.status,
        fileUrl: item.fileUrl || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        partnerName: "",
        documentType: "MoU",
        scope: "",
        startYear: "2026",
        endYear: "2031",
        signatory: "Rektor UPITRA & Pimpinan Mitra",
        status: "Aktif",
        fileUrl: "/images/logo.png",
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingItem) {
      const updated = items.map((it) =>
        it.id === editingItem.id ? { ...it, ...formData } : it
      );
      saveToStorage(updated);
      showNotification("Dokumen kerjasama berhasil diperbarui!");
    } else {
      const newItem: AdminKerjasamaMouItem = {
        id: `mou-${Date.now()}`,
        ...formData,
      };
      saveToStorage([newItem, ...items]);
      showNotification("Dokumen kerjasama baru berhasil ditambahkan!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    {
      const updated = items.filter((it) => it.id !== id);
      saveToStorage(updated);
      showNotification("Dokumen kerjasama berhasil dihapus!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Handshake className="w-4 h-4" />
            <span>Direktorat Kerjasama Industri & Global</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Daftar Kerjasama (MoU/MoA) & Kemitraan
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Kelola dokumen kesepakatan bersama, perjanjian kerja sama (PKS), dan sinergi industri dengan 49 mitra korporasi.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/mitra"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-700/60 transition"
          >
            <Building className="w-4 h-4" />
            <span>Kelola 49 Mitra</span>
          </Link>

          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Dokumen Kerjasama</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-blue-100 text-xs font-bold">
        <Link
          href="/admin/mitra"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-blue-50 transition-all"
        >
          <Building className="w-3.5 h-3.5" />
          <span>Katalog 49 Mitra Kerjasama</span>
        </Link>

        <button
          onClick={() => setActiveTab("mou")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "mou"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-500 hover:text-slate-900 hover:bg-blue-50"
          }`}
        >
          <FileCheck2 className="w-3.5 h-3.5" />
          <span>Daftar Dokumen MoU / MoA</span>
        </button>

        <button
          onClick={() => setActiveTab("kegiatan")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "kegiatan"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-500 hover:text-slate-900 hover:bg-blue-50"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Kegiatan Kerjasama & Immersion</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari instansi mitra, ruang lingkup MoU, atau penandatangan..."
            className="w-full bg-white border border-blue-200 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 transition"
          />
        </div>
        <div className="text-xs text-slate-500">
          Total: <span className="text-slate-900 font-bold">{filteredItems.length}</span> Dokumen
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-blue-100">
            <p className="text-xs text-slate-500">Tidak ada dokumen kerjasama ditemukan.</p>
          </div>
        ) : (
          pg.items.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-blue-200 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-700/60 transition-all space-y-3"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-600 text-white">
                      {item.documentType}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.status === "Aktif" 
                        ? "bg-blue-100 text-blue-600 border border-blue-200"
                        : "bg-blue-100 text-blue-600 border border-blue-200"
                    }`}>
                      {item.status}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-blue-600">
                    {item.startYear} - {item.endYear}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.partnerName}
                </h3>

                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-blue-100">
                  <span className="font-semibold text-blue-600">Ruang Lingkup: </span>
                  {item.scope}
                </p>

                <div className="text-[11px] text-slate-500">
                  Penandatangan: <span className="text-slate-700 font-medium">{item.signatory}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-blue-100 flex items-center justify-between text-xs text-slate-500">
                <span className="text-[10px] text-slate-500">ID: {item.id}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white transition cursor-pointer"
                    title="Edit Dokumen"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={async () => { if (await swalConfirmDelete()) handleDelete(item.id); }}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-900 text-blue-600 hover:text-blue-700 transition cursor-pointer"
                    title="Hapus Dokumen"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* CRUD Modal Dialog */}
      {loaded && <Pagination pg={pg} noun="dokumen" />}
      {!loaded && <LoadingState />}
      {loaded && filteredItems.length === 0 && (
        <EmptyState
          title={items.length === 0 ? "Belum ada dokumen kerjasama" : "Tidak ada hasil yang cocok"}
          hint={items.length === 0 ? "Klik tombol di bawah untuk menambahkan data pertama." : "Coba ubah kata kunci pencarian atau filter yang dipakai."}
          actionLabel={items.length === 0 ? "Tambah Dokumen" : undefined}
          onAction={() => handleOpenModal()}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-slate-900/50 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="w-full max-w-lg bg-white border border-blue-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200">
              <h3 className="text-sm font-bold text-slate-900">
                {editingItem ? "Edit Dokumen Kerjasama" : "Tambah Dokumen Kerjasama"}
              </h3>
              <button onClick={handleCloseModal} className="p-1 text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Nama Instansi / Mitra Kerjasama</label>
                <input
                  type="text"
                  required
                  value={formData.partnerName}
                  onChange={(e) => setFormData({ ...formData, partnerName: e.target.value })}
                  placeholder="Misal: PT Triputra Agro Persada Tbk atau Pemerintah Provinsi Jawa Tengah"
                  className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Jenis Dokumen</label>
                  <select
                    value={formData.documentType}
                    onChange={(e) => setFormData({ ...formData, documentType: e.target.value as any })}
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-400"
                  >
                    <option value="MoU">MoU (Nota Kesepahaman)</option>
                    <option value="MoA">MoA (Perjanjian Kerjasama)</option>
                    <option value="Perjanjian Kerjasama (PKS)">Perjanjian Kerjasama (PKS)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Status Keberlakuan</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-400"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Dalam Perpanjangan">Dalam Perpanjangan</option>
                    <option value="Selesai">Selesai</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tahun Mulai</label>
                  <input
                    type="text"
                    required
                    value={formData.startYear}
                    onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                    placeholder="2026"
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Tahun Berakhir</label>
                  <input
                    type="text"
                    required
                    value={formData.endYear}
                    onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                    placeholder="2031"
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Ruang Lingkup Kerjasama</label>
                <textarea
                  required
                  rows={3}
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  placeholder="Misal: Program Immersion 3+1, Magang Industri Berbayar, Rekrutmen Kampus..."
                  className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pihak Penandatangan</label>
                <input
                  type="text"
                  required
                  value={formData.signatory}
                  onChange={(e) => setFormData({ ...formData, signatory: e.target.value })}
                  placeholder="Misal: Rektor UPITRA & Direktur Utama PT ..."
                  className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-100">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-blue-100 text-slate-700 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Dokumen</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminKerjasamaPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-500">Memuat Manajer Kerjasama...</div>}>
      <KerjasamaManagerContent />
    </Suspense>
  );
}

