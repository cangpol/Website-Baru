"use client";

import { useState, useEffect } from "react";
import { 
  Sliders, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Eye,
  EyeOff,
  Image as ImageIcon,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import { initialAdminBanners, AdminBannerItem } from "@/lib/adminDataStore";

export default function AdminBannerHeroPage() {
  const [banners, setBanners] = useState<AdminBannerItem[]>(initialAdminBanners);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminBannerItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formBadge, setFormBadge] = useState("PMB 2026 DIBUKA");
  const [formImage, setFormImage] = useState("/images/hero-1.jpg");
  const [formCtaText, setFormCtaText] = useState("Daftar Sekarang");
  const [formCtaLink, setFormCtaLink] = useState("/admisi-pmb");
  const [formActive, setFormActive] = useState(true);
  const [formOrder, setFormOrder] = useState(1);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("upitra_admin_banners");
    if (saved) {
      try {
        setBanners(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const saveToStorage = (updated: AdminBannerItem[]) => {
    setBanners(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("upitra_admin_banners", JSON.stringify(updated));
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormBadge("PMB 2026 DIBUKA");
    setFormImage("/images/hero-1.jpg");
    setFormCtaText("Daftar Sekarang");
    setFormCtaLink("/admisi-pmb");
    setFormActive(true);
    setFormOrder(banners.length + 1);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: AdminBannerItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSubtitle(item.subtitle);
    setFormBadge(item.badge);
    setFormImage(item.image);
    setFormCtaText(item.ctaText);
    setFormCtaLink(item.ctaLink);
    setFormActive(item.active);
    setFormOrder(item.order);
    setModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingItem) {
      const updated = banners.map((b) =>
        b.id === editingItem.id
          ? {
              ...b,
              title: formTitle,
              subtitle: formSubtitle,
              badge: formBadge,
              image: formImage,
              ctaText: formCtaText,
              ctaLink: formCtaLink,
              active: formActive,
              order: Number(formOrder),
            }
          : b
      );
      saveToStorage(updated);
    } else {
      const newItem: AdminBannerItem = {
        id: `bnr-${Date.now().toString().slice(-4)}`,
        title: formTitle,
        subtitle: formSubtitle,
        badge: formBadge,
        image: formImage,
        ctaText: formCtaText,
        ctaLink: formCtaLink,
        active: formActive,
        order: Number(formOrder),
      };
      saveToStorage([...banners, newItem]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    saveToStorage(updated);
    setDeleteConfirmId(null);
  };

  const toggleActive = (id: string) => {
    const updated = banners.map((b) =>
      b.id === id ? { ...b, active: !b.active } : b
    );
    saveToStorage(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider">
              Visual Beranda
            </span>
            <span className="text-xs text-slate-400">Total: {banners.length} Banner Promo</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Sliders className="w-7 h-7 text-purple-400" />
            Manajemen Banner Hero Beranda
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Atur slide banner promosi utama, program beasiswa, dan pengumuman visual di halaman depan website UPITRA.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:scale-[1.02]"
        >
          <Plus className="w-4 h-4" />
          Tambah Banner Promo
        </button>
      </div>

      {/* Banner Cards Preview */}
      <div className="space-y-4">
        {banners
          .sort((a, b) => a.order - b.order)
          .map((item) => (
            <div
              key={item.id}
              className={`bg-[#0a192f] border rounded-2xl overflow-hidden transition duration-200 shadow-xl ${
                item.active ? "border-blue-900/40" : "border-slate-800 opacity-60"
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6">
                {/* Visual Banner Preview */}
                <div className="md:col-span-5 relative h-48 md:h-full min-h-[180px] rounded-xl overflow-hidden border border-blue-900/40 bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950 w-fit mb-1">
                      {item.badge}
                    </span>
                    <p className="text-xs text-white font-bold line-clamp-1">{item.title}</p>
                  </div>
                </div>

                {/* Banner Details */}
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-900 px-2.5 py-0.5 rounded border border-blue-900/30">
                          Urutan #{item.order}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {item.badge}
                        </span>
                      </div>

                      <button
                        onClick={() => toggleActive(item.id)}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border transition ${
                          item.active
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {item.active ? (
                          <>
                            <Eye className="w-3.5 h-3.5" /> Aktif di Beranda
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3.5 h-3.5" /> Disembunyikan
                          </>
                        )}
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">{item.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.subtitle}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center gap-1.5 bg-[#071322] px-3 py-1.5 rounded-lg border border-blue-900/30 text-slate-300">
                        <span className="text-slate-400">Tombol CTA:</span>
                        <span className="font-semibold text-white">{item.ctaText}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#071322] px-3 py-1.5 rounded-lg border border-blue-900/30 text-sky-400 font-mono">
                        <span>{item.ctaLink}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-blue-900/30 flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 text-xs font-semibold border border-blue-500/20 transition flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Banner
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold border border-rose-500/20 transition flex items-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Modal Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-[#0a192f] border border-blue-900/60 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-5 border-b border-blue-900/40 bg-[#071322]">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-purple-400" />
                {editingItem ? "Edit Banner Hero" : "Tambah Banner Hero Baru"}
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
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Judul Utama Banner *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Contoh: Penerimaan Mahasiswa Baru Gelombang 1 TA 2026/2027"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Deskripsi / Subtitle</label>
                <textarea
                  rows={2}
                  required
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Raih beasiswa penuh dan jaminan kerja industri bersama Triputra Group..."
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Badge Label</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="PMB 2026 DIBUKA"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Urutan Slide (1, 2, ...)</label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Teks Tombol CTA</label>
                  <input
                    type="text"
                    value={formCtaText}
                    onChange={(e) => setFormCtaText(e.target.value)}
                    placeholder="Daftar Sekarang"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">Link Tujuan Tombol</label>
                  <input
                    type="text"
                    value={formCtaLink}
                    onChange={(e) => setFormCtaLink(e.target.value)}
                    placeholder="/admisi-pmb"
                    className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm font-mono text-sky-300 focus:outline-none focus:border-purple-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Path / URL Foto Banner</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="/images/hero-1.jpg"
                  className="w-full bg-[#071322] border border-blue-900/40 px-3 py-2 rounded-lg text-sm text-white focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="active-toggle"
                  checked={formActive}
                  onChange={(e) => setFormActive(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 bg-[#071322] border-blue-900"
                />
                <label htmlFor="active-toggle" className="text-xs text-slate-300 font-medium">
                  Aktifkan banner ini di halaman beranda
                </label>
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
                  className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-purple-500/20"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {editingItem ? "Simpan Perubahan" : "Tambahkan Banner"}
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
              Hapus Banner Promo?
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Banner ini akan dihapus dari sistem hero slide beranda.
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

