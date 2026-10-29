"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { 
  Info, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  Save, 
  ExternalLink,
  Target,
  Award,
  Users2,
  Calendar,
  CheckCircle2
} from "lucide-react";
import Image from "next/image";
import { initialAdminProfilList, AdminProfilSection } from "@/lib/adminDataStore";

function ProfilManagerContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "tentang";

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [items, setItems] = useState<AdminProfilSection[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminProfilSection | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    content: "",
    extraMeta: "",
    image: "",
  });

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  useEffect(() => {
    const saved = localStorage.getItem("upitra_admin_profil");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        setItems(initialAdminProfilList);
      }
    } else {
      setItems(initialAdminProfilList);
      localStorage.setItem("upitra_admin_profil", JSON.stringify(initialAdminProfilList));
    }
  }, []);

  const saveToStorage = (updated: AdminProfilSection[]) => {
    setItems(updated);
    localStorage.setItem("upitra_admin_profil", JSON.stringify(updated));
  };

  const showNotification = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Filter based on active tab and search
  const filteredItems = items.filter((item) => {
    const matchesTab = 
      (activeTab === "tentang" && item.type === "tentang") ||
      (activeTab === "visi-misi" && item.type === "visi_misi") ||
      (activeTab === "pimpinan" && item.type === "pimpinan") ||
      (activeTab === "prestasi" && item.type === "prestasi");

    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const handleOpenModal = (item?: AdminProfilSection) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        title: item.title,
        subtitle: item.subtitle || "",
        content: item.content,
        extraMeta: item.extraMeta || "",
        image: item.image || "",
      });
    } else {
      setEditingItem(null);
      setFormData({
        title: "",
        subtitle: "",
        content: "",
        extraMeta: "",
        image: "/images/gedung-upitra.jpg",
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

    let targetType: "tentang" | "visi_misi" | "pimpinan" | "prestasi" = "tentang";
    if (activeTab === "visi-misi") targetType = "visi_misi";
    else if (activeTab === "pimpinan") targetType = "pimpinan";
    else if (activeTab === "prestasi") targetType = "prestasi";

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
      showNotification("Data berhasil diperbarui!");
    } else {
      const newItem: AdminProfilSection = {
        id: `prof-${Date.now()}`,
        type: targetType,
        ...formData,
        updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
      };
      saveToStorage([newItem, ...items]);
      showNotification("Data baru berhasil ditambahkan!");
    }

    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
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
            <Info className="w-4 h-4" />
            <span>Manajemen Konten Profil</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Profil Kampus & Organisasi
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola data Tentang UPITRA, Visi Misi, Pimpinan Universitas, dan Capaian Prestasi yang tampil di navbar depan.
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Konten {activeTab.toUpperCase()}</span>
        </button>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-blue-900/30 text-xs font-bold">
        <button
          onClick={() => setActiveTab("tentang")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "tentang"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-blue-950"
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Tentang UPITRA</span>
        </button>

        <button
          onClick={() => setActiveTab("visi-misi")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "visi-misi"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-blue-950"
          }`}
        >
          <Target className="w-3.5 h-3.5" />
          <span>Visi Misi Tujuan</span>
        </button>

        <button
          onClick={() => setActiveTab("pimpinan")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "pimpinan"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-blue-950"
          }`}
        >
          <Users2 className="w-3.5 h-3.5" />
          <span>Pimpinan Universitas</span>
        </button>

        <button
          onClick={() => setActiveTab("prestasi")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
            activeTab === "prestasi"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
              : "text-slate-400 hover:text-white hover:bg-blue-950"
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Prestasi & Capaian</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari judul, konten, atau info..."
            className="w-full bg-[#071a33] border border-blue-900/50 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 transition"
          />
        </div>
        <div className="text-xs text-slate-400">
          Total: <span className="text-white font-bold">{filteredItems.length}</span> item
        </div>
      </div>

      {/* Cards List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredItems.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-[#071a33]/60 rounded-2xl border border-blue-900/40">
            <p className="text-xs text-slate-400">Tidak ada konten ditemukan untuk kategori ini.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#071a33] border border-blue-900/50 rounded-2xl p-5 flex flex-col justify-between hover:border-blue-700/60 transition-all space-y-4"
            >
              <div className="space-y-3">
                {item.image && (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden bg-blue-950/80 border border-blue-900/40">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div>
                  <div className="text-[10px] font-bold uppercase text-sky-400 tracking-wider">
                    {item.type.replace("_", " ")}
                  </div>
                  <h3 className="text-sm font-bold text-white mt-0.5 leading-snug">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <div className="text-xs font-semibold text-amber-300/90 mt-0.5">
                      {item.subtitle}
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>

                {item.extraMeta && (
                  <div className="text-[11px] text-slate-400 bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-900/60">
                    {item.extraMeta}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-blue-900/40 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[10px]">Diperbarui: {item.updatedAt}</span>

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
                {editingItem ? "Edit Konten Profil" : "Tambah Konten Profil Baru"}
              </h3>
              <button onClick={handleCloseModal} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Judul / Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Misal: Tentang UPITRA atau Nama Pejabat Rektor"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Sub Judul / Jabatan / Posisi</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Misal: Rektor Universitas Pignatelli Triputra"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Konten / Narasi Lengkap</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Tuliskan deskripsi lengkap, rincian visi misi, atau biografi singkat..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Metadata Tambahan / Keterangan</label>
                <input
                  type="text"
                  value={formData.extraMeta}
                  onChange={(e) => setFormData({ ...formData, extraMeta: e.target.value })}
                  placeholder="Misal: Akreditasi BAIK SEKALI, Kategori Internasional, dsb"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">URL Gambar / Foto</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/images/gedung-upitra.jpg atau URL lainnya"
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

export default function AdminProfilPage() {
  return (
    <Suspense fallback={<div className="p-8 text-xs text-slate-400">Memuat Manajer Profil UPITRA...</div>}>
      <ProfilManagerContent />
    </Suspense>
  );
}
