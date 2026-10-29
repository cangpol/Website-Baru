"use client";

import { useState, useEffect } from "react";
import { 
  Microscope, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Save, 
  BookOpen, 
  ExternalLink,
  Award,
  CheckCircle2,
  FileText
} from "lucide-react";
import { initialAdminRisetList, AdminRisetSection } from "@/lib/adminDataStore";

export default function AdminRisetPage() {
  const [items, setItems] = useState<AdminRisetSection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminRisetSection | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    researcher: "",
    faculty: "Fakultas Sains & Teknologi",
    journalName: "",
    indexedIn: "Scopus" as AdminRisetSection["indexedIn"],
    year: 2026,
    doiOrUrl: "",
    abstractText: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("upitra_admin_riset");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(initialAdminRisetList);
      }
    } else {
      setItems(initialAdminRisetList);
      localStorage.setItem("upitra_admin_riset", JSON.stringify(initialAdminRisetList));
    }
  }, []);

  const saveToStorage = (updated: AdminRisetSection[]) => {
    setItems(updated);
    localStorage.setItem("upitra_admin_riset", JSON.stringify(updated));
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const filteredItems = items.filter((item) => {
    const matchesFaculty = selectedFaculty === "ALL" || item.faculty.includes(selectedFaculty);
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.researcher.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.journalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.abstractText.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFaculty && matchesSearch;
  });

  const handleOpenModal = (item?: AdminRisetSection) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        researcher: item.researcher,
        faculty: item.faculty,
        journalName: item.journalName,
        indexedIn: item.indexedIn,
        year: item.year,
        doiOrUrl: item.doiOrUrl,
        abstractText: item.abstractText,
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        researcher: "",
        faculty: "Fakultas Sains & Teknologi",
        journalName: "",
        indexedIn: "Scopus",
        year: 2026,
        doiOrUrl: "",
        abstractText: "",
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
      showNotification("Publikasi riset berhasil diperbarui!");
    } else {
      const newItem: AdminRisetSection = {
        id: `rst-${Date.now()}`,
        ...formData,
      };
      saveToStorage([newItem, ...items]);
      showNotification("Publikasi riset baru berhasil ditambahkan!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus publikasi riset ini?")) {
      const updated = items.filter((it) => it.id !== id);
      saveToStorage(updated);
      showNotification("Publikasi berhasil dihapus!");
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
            <Microscope className="w-4 h-4" />
            <span>Pusat Penelitian & Pengabdian Masyarakat (LPPM)</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Agenda Riset & Publikasi Jurnal
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola publikasi karya ilmiah dosen dan mahasiswa terindeks Scopus, SINTA, IEEE, dan hibah penelitian terapan.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Riset / Jurnal</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul riset, peneliti, atau jurnal..."
            className="w-full bg-[#071a33] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
          />
        </div>

        {/* Faculty Filter */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {["ALL", "Sains & Teknologi", "Ekonomi & Bisnis", "Sosial Humaniora", "Kesehatan"].map((fac) => (
            <button
              key={fac}
              onClick={() => setSelectedFaculty(fac)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedFaculty === fac
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-blue-950/60 text-slate-400 hover:text-white"
              }`}
            >
              {fac === "ALL" ? "Semua Fakultas" : fac}
            </button>
          ))}
        </div>
      </div>

      {/* Research Cards List */}
      <div className="space-y-3">
        {filteredItems.length === 0 ? (
          <div className="py-12 text-center bg-[#071a33]/60 rounded-2xl border border-blue-900/40">
            <p className="text-xs text-slate-400">Tidak ada data riset atau publikasi ditemukan.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#071a33] border border-blue-900/50 rounded-2xl p-5 hover:border-blue-700/60 transition-all space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {item.indexedIn}
                    </span>
                    <span className="text-[11px] text-sky-400 font-semibold">
                      {item.faculty}
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400">Tahun {item.year}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-amber-300/90">
                    Peneliti: {item.researcher}
                  </div>

                  <div className="text-xs text-slate-400 italic">
                    Jurnal: <span className="text-slate-300 font-medium">{item.journalName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start">
                  {item.doiOrUrl && (
                    <a
                      href={item.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-sky-300 hover:text-white transition"
                      title="Buka Tautan DOI / Jurnal"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-sky-300 hover:text-white transition cursor-pointer"
                    title="Edit Data"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300 hover:text-rose-100 transition cursor-pointer"
                    title="Hapus Data"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-[#051326]/60 p-3 rounded-xl border border-blue-900/40 leading-relaxed">
                <span className="font-bold text-white">Abstrak Singkat: </span>
                {item.abstractText}
              </p>
            </div>
          ))
        )}
      </div>

      {/* CRUD Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#071a33] border border-blue-900/80 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? "Edit Publikasi Riset" : "Tambah Publikasi Riset Baru"}
              </h3>
              <button onClick={handleCloseModal} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Judul Penelitian / Karya Ilmiah</label>
                <textarea
                  required
                  rows={2}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Misal: Penerapan Deep Learning untuk Klasifikasi Mutu Karet Alam Industri..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nama Peneliti Utama & Tim</label>
                  <input
                    type="text"
                    required
                    value={formData.researcher}
                    onChange={(e) => setFormData({ ...formData, researcher: e.target.value })}
                    placeholder="Misal: Dr. Fr. Ninik Yudianti & Tim"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Fakultas</label>
                  <select
                    value={formData.faculty}
                    onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Fakultas Sains & Teknologi">Fakultas Sains & Teknologi</option>
                    <option value="Fakultas Ekonomi & Bisnis">Fakultas Ekonomi & Bisnis</option>
                    <option value="Fakultas Sosial Humaniora">Fakultas Sosial Humaniora</option>
                    <option value="Fakultas Kesehatan">Fakultas Kesehatan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-slate-300 font-semibold mb-1">Nama Jurnal / Media Publikasi</label>
                  <input
                    type="text"
                    required
                    value={formData.journalName}
                    onChange={(e) => setFormData({ ...formData, journalName: e.target.value })}
                    placeholder="Misal: IEEE Transactions on Industrial Informatics"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Indeksasi</label>
                  <select
                    value={formData.indexedIn}
                    onChange={(e) => setFormData({ ...formData, indexedIn: e.target.value as any })}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  >
                    <option value="Scopus">Scopus</option>
                    <option value="SINTA 1">SINTA 1</option>
                    <option value="SINTA 2">SINTA 2</option>
                    <option value="IEEE">IEEE</option>
                    <option value="Prosiding">Prosiding</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Tahun Terbit</label>
                  <input
                    type="number"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2026 })}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">URL DOI / Repositori</label>
                  <input
                    type="text"
                    value={formData.doiOrUrl}
                    onChange={(e) => setFormData({ ...formData, doiOrUrl: e.target.value })}
                    placeholder="https://doi.org/..."
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Abstrak Penelitian</label>
                <textarea
                  required
                  rows={4}
                  value={formData.abstractText}
                  onChange={(e) => setFormData({ ...formData, abstractText: e.target.value })}
                  placeholder="Ringkasan latar belakang, metodologi, dan temuan utama riset..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-900/40">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Simpan Publikasi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

