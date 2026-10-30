"use client";

import { useState, useEffect } from "react";
import { 
  Building2, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Phone,
  Mail,
  User,
  AlertCircle
} from "lucide-react";
import { initialAdminServices, AdminServiceItem } from "@/lib/adminDataStore";
import { loadCrudCollection, saveCrudCollection, newCrudId } from "@/lib/adminCrudStore";

export default function AdminLayananPage() {
  const [services, setServices] = useState<AdminServiceItem[]>(initialAdminServices);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminServiceItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState<AdminServiceItem["category"]>("Akademik");
  const [formPic, setFormPic] = useState("");
  const [formContact, setFormContact] = useState("");
  const [formUrl, setFormUrl] = useState("/layanan");
  const [formStatus, setFormStatus] = useState<AdminServiceItem["status"]>("Operasional Normal");
  const [formDescription, setFormDescription] = useState("");

  // Load from localStorage & sync unit param
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await loadCrudCollection<AdminServiceItem[]>("services", initialAdminServices);
        if (!cancelled) setServices(Array.isArray(res.data) ? res.data : initialAdminServices);
      } catch {
        if (!cancelled) setServices(initialAdminServices);
      }
    })();
    return () => { cancelled = true; };

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const unit = params.get("unit");
      if (unit) {
        if (unit === "perpustakaan") setSearch("Perpustakaan");
        else if (unit === "elearning") setSearch("E-Learning");
        else if (unit === "career-center") setSearch("Karir");
        else if (unit === "tracer-study") setSearch("Tracer");
        else if (unit === "immersion") setSearch("Immersion");
      }
    }
  }, []);

  const saveToStorage = (updated: AdminServiceItem[]) => {
    saveCrudCollection<AdminServiceItem[]>("services", updated, setServices);
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormName("");
    setFormCategory("Akademik");
    setFormPic("Biro Akademik UPITRA");
    setFormContact("layanan@upitra.ac.id");
    setFormUrl("/layanan");
    setFormStatus("Operasional Normal");
    setFormDescription("");
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminServiceItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPic(item.pic);
    setFormContact(item.contact);
    setFormUrl(item.url);
    setFormStatus(item.status);
    setFormDescription(item.description);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    if (editingItem) {
      const updated = services.map((s) =>
        s.id === editingItem.id
          ? {
              ...s,
              name: formName,
              category: formCategory,
              pic: formPic,
              contact: formContact,
              url: formUrl,
              status: formStatus,
              description: formDescription,
            }
          : s
      );
      saveToStorage(updated);
    } else {
      const newItem: AdminServiceItem = {
        id: `srv-${Date.now().toString().slice(-4)}`,
        name: formName,
        category: formCategory,
        pic: formPic,
        contact: formContact,
        url: formUrl,
        status: formStatus,
        description: formDescription,
      };
      saveToStorage([newItem, ...services]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = services.filter((s) => s.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  const toggleStatus = (id: string) => {
    const updated = services.map((s) =>
      s.id === id
        ? {
            ...s,
            status: (s.status === "Operasional Normal" ? "Maintenance" : "Operasional Normal") as AdminServiceItem["status"],
          }
        : s
    );
    saveToStorage(updated);
  };

  // Filtered
  const filtered = services.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.pic.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "ALL" || s.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 uppercase tracking-wider">
              Layanan & Fasilitas Kampus
            </span>
            <span className="text-xs text-slate-400">Total: {services.length} Unit</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-400" />
            Manajemen Fasilitas & Layanan Kampus
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola operasional pusat karir & alumni, perpustakaan digital, laboratorium komputasi, dan portal e-learning UPITRA.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Tambah Layanan Baru
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-[#0a192f] border border-blue-900/40 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari unit layanan, PIC, atau fungsi..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#071322] border border-blue-900/40 pl-9 pr-4 py-2 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            aria-label="Filter kategori unit layanan"
            className="bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 focus:outline-none focus:border-blue-400"
          >
            <option value="ALL">Semua Kategori Unit</option>
            <option value="Perpustakaan">Perpustakaan</option>
            <option value="Karir & Alumni">Karir & Alumni</option>
            <option value="Fasilitas & Lab">Fasilitas & Lab</option>
            <option value="Teknologi">Teknologi & LMS</option>
            <option value="Akademik">Akademik</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-5 hover:border-blue-500/40 transition duration-200 flex flex-col justify-between group shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30">
                  {item.category}
                </span>

                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border transition ${
                    item.status === "Operasional Normal"
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                  }`}
                  title="Klik untuk toggle status operasional"
                >
                  {item.status}
                </button>
              </div>

              <h3 className="font-bold text-lg text-white group-hover:text-blue-300 transition">
                {item.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="mt-4 pt-3 border-t border-blue-900/30 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400">PIC:</span>
                  <span className="font-medium text-white truncate">{item.pic}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-400">Kontak:</span>
                  <span className="font-mono text-sky-400 truncate">{item.contact}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-blue-900/30 flex items-center justify-between">
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {item.url}
              </a>

              <div className="flex items-center gap-2">
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
          </div>
        ))}
      </div>

      {/* Modal Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                {editingItem ? "Edit Layanan Kampus" : "Tambah Layanan Kampus Baru"}
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
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Nama Layanan / Unit *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="Contoh: Pusat Karir & Hubungan Industri"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Kategori Unit</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as AdminServiceItem["category"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="Perpustakaan">Perpustakaan</option>
                    <option value="Karir & Alumni">Karir & Alumni</option>
                    <option value="Fasilitas & Lab">Fasilitas & Lab</option>
                    <option value="Teknologi">Teknologi & LMS</option>
                    <option value="Akademik">Akademik</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Status Operasional</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as AdminServiceItem["status"])}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="Operasional Normal">Operasional Normal</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Penanggung Jawab (PIC)</label>
                  <input
                    type="text"
                    value={formPic}
                    onChange={(e) => setFormPic(e.target.value)}
                    placeholder="Nama Kepala Unit / Biro"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Kontak / Hotline</label>
                  <input
                    type="text"
                    value={formContact}
                    onChange={(e) => setFormContact(e.target.value)}
                    placeholder="unit@upitra.ac.id"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">URL Halaman / Sistem</label>
                <input
                  type="text"
                  value={formUrl}
                  onChange={(e) => setFormUrl(e.target.value)}
                  placeholder="/layanan/perpustakaan atau https://..."
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm font-mono text-sky-300 focus:outline-none focus:border-blue-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Deskripsi Layanan</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Jelaskan fasilitas dan fungsi layanan ini..."
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-blue-400"
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
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-blue-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Layanan"}
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
              Hapus Layanan Kampus?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Data unit layanan ini akan dihapus dari sistem. Tindakan ini tidak dapat dibatalkan.
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

