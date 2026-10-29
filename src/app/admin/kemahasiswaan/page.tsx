"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Award, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Save, 
  Calendar,
  Users,
  Image as ImageIcon,
  CheckCircle2,
  FolderKanban,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import { initialAdminKemahasiswaanList, AdminKemahasiswaanSection } from "@/lib/adminDataStore";

function KemahasiswaanManagerContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "ormawa";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [items, setItems] = useState<AdminKemahasiswaanSection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminKemahasiswaanSection | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    dateOrSemester: "",
    image: "",
    link: "",
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem("upitra_admin_kemahasiswaan");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(initialAdminKemahasiswaanList);
      }
    } else {
      setItems(initialAdminKemahasiswaanList);
      localStorage.setItem("upitra_admin_kemahasiswaan", JSON.stringify(initialAdminKemahasiswaanList));
    }
  }, []);

  const saveToStorage = (updated: AdminKemahasiswaanSection[]) => {
    setItems(updated);
    localStorage.setItem("upitra_admin_kemahasiswaan", JSON.stringify(updated));
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Filter based on active tab and search
  const filteredItems = items.filter((item) => {
    let matchesTab = false;
    if (activeTab === "tugas-fungsi") matchesTab = item.type === "tugas_fungsi";
    else if (activeTab === "pengembangan") matchesTab = item.type === "pengembangan";
    else if (activeTab === "ormawa") matchesTab = item.type === "ormawa";
    else if (activeTab === "prestasi") matchesTab = item.type === "prestasi";
    else if (activeTab === "galeri") matchesTab = item.type === "galeri";
    else if (activeTab === "kalender") matchesTab = item.type === "kalender";

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleOpenModal = (item?: AdminKemahasiswaanSection) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        category: item.category,
        description: item.description,
        dateOrSemester: item.dateOrSemester || "",
        image: item.image || "",
        link: item.link || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        category: activeTab.toUpperCase(),
        description: "",
        dateOrSemester: "TA 2026/2027",
        image: "/images/kegiatan.jpg",
        link: "",
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

    let targetType: AdminKemahasiswaanSection["type"] = "ormawa";
    if (activeTab === "tugas-fungsi") targetType = "tugas_fungsi";
    else if (activeTab === "pengembangan") targetType = "pengembangan";
    else if (activeTab === "prestasi") targetType = "prestasi";
    else if (activeTab === "galeri") targetType = "galeri";
    else if (activeTab === "kalender") targetType = "kalender";

    if (editingItem) {
      const updated = items.map((it) =>
        it.id === editingItem.id
          ? {
              ...it,
              ...formData,
              updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
            }
          : it
      );
      saveToStorage(updated);
      showNotification("Data kemahasiswaan berhasil diperbarui!");
    } else {
      const newItem: AdminKemahasiswaanSection = {
        id: `kmh-${Date.now()}`,
        type: targetType,
        ...formData,
        updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      };
      saveToStorage([newItem, ...items]);
      showNotification("Data kemahasiswaan baru berhasil ditambahkan!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Hapus data kemahasiswaan ini?")) {
      const updated = items.filter((it) => it.id !== id);
      saveToStorage(updated);
      showNotification("Data berhasil dihapus!");
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
            <Award className="w-4 h-4" />
            <span>Manajemen Biro Kemahasiswaan</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Kegiatan, Ormawa & Prestasi Mahasiswa
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola Organisasi Mahasiswa, Kalender Akademik, Dokumentasi Galeri Kegiatan, dan Program Pengembangan.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Data {activeTab.toUpperCase()}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-blue-900/30 text-xs font-bold">
        {[
          { key: "tugas-fungsi", label: "Tugas & Fungsi", icon: FolderKanban },
          { key: "pengembangan", label: "Pengembangan", icon: Sparkles },
          { key: "ormawa", label: "Ormawa (BEM/DPM)", icon: Users },
          { key: "prestasi", label: "Prestasi Mahasiswa", icon: Award },
          { key: "galeri", label: "Galeri Kegiatan", icon: ImageIcon },
          { key: "kalender", label: "Kalender Akademik", icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-400 hover:text-white hover:bg-blue-950"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari kegiatan, ormawa, atau jadwal..."
            className="w-full bg-[#071a33] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total: <span className="text-white font-bold">{filteredItems.length}</span> item
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-[#071a33]/60 rounded-2xl border border-blue-900/40">
            <p className="text-xs text-slate-400">Belum ada konten untuk kategori kemahasiswaan ini.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#071a33] border border-blue-900/50 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-700/60 transition-all space-y-3"
            >
              <div className="space-y-2.5">
                {item.image && (
                  <div className="relative w-full h-32 rounded-xl overflow-hidden bg-blue-950/80 border border-blue-900/40">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-900/80 text-sky-300 border border-blue-700/60">
                    {item.category}
                  </span>
                  {item.dateOrSemester && (
                    <span className="text-[10px] text-amber-300 font-medium">
                      {item.dateOrSemester}
                    </span>
                  )}
                </div>

                <h3 className="text-xs font-bold text-white leading-snug line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-blue-900/40 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px]">Update: {item.updatedAt}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 rounded-lg bg-blue-900/50 hover:bg-blue-800 text-sky-300 hover:text-white transition cursor-pointer"
                    title="Edit Item"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300 hover:text-rose-100 transition cursor-pointer"
                    title="Hapus Item"
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
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#071a33] border border-blue-900/80 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? "Edit Data Kemahasiswaan" : "Tambah Data Kemahasiswaan"}
              </h3>
              <button onClick={handleCloseModal} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Nama Organisasi / Judul Kegiatan</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Misal: BEM UPITRA atau Inaugurasi Mahasiswa Baru"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Kategori / Divisi</label>
                <input
                  type="text"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Misal: Eksekutif Mahasiswa, UKM Olahraga, Kalender Akademik"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Periode / Tanggal Pelaksanaan</label>
                <input
                  type="text"
                  value={formData.dateOrSemester}
                  onChange={(e) => setFormData({ ...formData, dateOrSemester: e.target.value })}
                  placeholder="Misal: Periode 2026/2027 atau Semester Ganjil 2026"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Deskripsi & Rincian Program</label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Tuliskan program kerja, visi ormawa, atau jadwal kalender akademik..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">URL Gambar Dokumentasi</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/kegiatan.jpg"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tautan Halaman Terkait</label>
                <input
                  type="text"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  placeholder="/kemahasiswaan/organisasi-mahasiswa"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
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
                  <span>Simpan Perubahan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminKemahasiswaanPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Memuat Manajer Kemahasiswaan...</div>}>
      <KemahasiswaanManagerContent />
    </Suspense>
  );
}
