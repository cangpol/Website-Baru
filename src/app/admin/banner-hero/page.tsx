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
  ArrowRight,
  GraduationCap,
  Save,
  Layers,
  ChevronRight,
  Home
} from "lucide-react";
import Image from "next/image";
import { 
  initialAdminBanners, 
  AdminBannerItem, 
  initialAdminAkademikBanner, 
  AdminAkademikBanner 
} from "@/lib/adminDataStore";

export default function AdminBannerHeroPage() {
  const [activeTab, setActiveTab] = useState<"HERO" | "AKADEMIK">("HERO");

  // Hero Banners State
  const [banners, setBanners] = useState<AdminBannerItem[]>(initialAdminBanners);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminBannerItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Hero Form states
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formBadge, setFormBadge] = useState("PMB 2026 DIBUKA");
  const [formImage, setFormImage] = useState("/images/hero-1.jpg");
  const [formCtaText, setFormCtaText] = useState("Daftar Sekarang");
  const [formCtaLink, setFormCtaLink] = useState("/admisi-pmb");
  const [formActive, setFormActive] = useState(true);
  const [formOrder, setFormOrder] = useState(1);

  // Akademik Banner State (Fixed 1440x480)
  const [akademikBanner, setAkademikBanner] = useState<AdminAkademikBanner>(initialAdminAkademikBanner);
  const [akademikToast, setAkademikToast] = useState<string | null>(null);

  // Load from localStorage
  useEffect(() => {
    // Hero Banners
    const savedHero = localStorage.getItem("upitra_admin_banners");
    if (savedHero) {
      try {
        setBanners(JSON.parse(savedHero));
      } catch {}
    }

    // Akademik Banner
    const savedAkademik = localStorage.getItem("upitra_banner_akademik");
    if (savedAkademik) {
      try {
        setAkademikBanner(JSON.parse(savedAkademik));
      } catch {}
    }
  }, []);

  const saveHeroToStorage = (updated: AdminBannerItem[]) => {
    setBanners(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("upitra_admin_banners", JSON.stringify(updated));
    }
  };

  const saveAkademikBanner = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AdminAkademikBanner = {
      ...akademikBanner,
      updatedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    };
    setAkademikBanner(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("upitra_banner_akademik", JSON.stringify(updated));
    }
    setAkademikToast("Banner Header Akademik (1440x480 px) berhasil diperbarui secara langsung!");
    setTimeout(() => setAkademikToast(null), 3500);
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

  const handleSaveHero = (e: React.FormEvent) => {
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
      saveHeroToStorage(updated);
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
      saveHeroToStorage([...banners, newItem]);
    }
    setModalOpen(false);
  };

  const handleDeleteHero = (id: string) => {
    const updated = banners.filter((b) => b.id !== id);
    saveHeroToStorage(updated);
    setDeleteConfirmId(null);
  };

  const handleToggleActiveHero = (id: string) => {
    const updated = banners.map((b) =>
      b.id === id ? { ...b, active: !b.active } : b
    );
    saveHeroToStorage(updated);
  };

  const presetImages = [
    { label: "Kuliah Interaktif", path: "/images/kuliah-1.jpeg" },
    { label: "Lab Komputasi AI", path: "/images/ar-vr.jpg" },
    { label: "Gedung Kampus UPITRA", path: "/images/gedung-upitra.jpg" },
    { label: "Kegiatan Mahasiswa", path: "/images/kegiatan.jpg" },
    { label: "Ekonomi & Bisnis FEB", path: "/images/feb-full.jpg" },
    { label: "Pariwisata & Hospitaliti", path: "/images/pariwisata/par-1.jpg" },
    { label: "Kampus Modern", path: "/images/kampus-1.jpg" },
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {akademikToast && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{akademikToast}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0a192f] border border-blue-900/40 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-sky-300 border border-blue-500/30 uppercase tracking-wider">
              Visual Marketing &amp; Header Portal
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2.5">
            <Sliders className="w-7 h-7 text-sky-400" />
            Manajemen Banner Website &amp; Header Akademik
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Kelola hero slider beranda utama dan gambar header halaman Akademik (ukuran fixed 1440x480 px) secara terpusat.
          </p>
        </div>

        {activeTab === "HERO" && (
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Tambah Banner Hero
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-blue-900/40 pb-1 text-xs font-bold">
        <button
          onClick={() => setActiveTab("HERO")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "HERO"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-blue-950/60"
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Banner Hero Beranda Utama ({banners.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("AKADEMIK")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all ${
            activeTab === "AKADEMIK"
              ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
              : "text-slate-400 hover:text-white hover:bg-blue-950/60"
          }`}
        >
          <GraduationCap className="w-4 h-4 text-sky-300" />
          <span>Banner Header Halaman Akademik (Fixed 1440x480 px)</span>
          <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            Live
          </span>
        </button>
      </div>

      {/* TAB 1: HERO BANNERS */}
      {activeTab === "HERO" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((item) => (
            <div
              key={item.id}
              className={`bg-[#0a192f] border rounded-2xl overflow-hidden transition-all flex flex-col justify-between ${
                item.active ? "border-blue-900/40 hover:border-blue-700/60" : "border-slate-800 opacity-60"
              }`}
            >
              <div>
                <div className="relative h-44 w-full bg-slate-900">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                      {item.badge}
                    </span>
                    <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-blue-900/80 text-sky-200">
                      Urutan #{item.order}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleToggleActiveHero(item.id)}
                      className={`p-1.5 rounded-lg text-xs font-semibold backdrop-blur-md transition-colors ${
                        item.active 
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40" 
                          : "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                      }`}
                      title={item.active ? "Nonaktifkan Banner" : "Aktifkan Banner"}
                    >
                      {item.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white line-clamp-1">{item.title}</h3>
                    <p className="text-xs text-slate-300 line-clamp-2 mt-1">{item.subtitle}</p>
                  </div>

                  <div className="pt-2 border-t border-blue-900/30 flex items-center justify-between text-xs">
                    <span className="text-slate-400">Tombol Aksi:</span>
                    <span className="font-semibold text-amber-300">{item.ctaText} &rarr; {item.ctaLink}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#081528] border-t border-blue-900/40 flex items-center justify-between">
                <span className={`text-[11px] font-bold ${item.active ? "text-emerald-400" : "text-slate-500"}`}>
                  {item.active ? "● Aktif Ditampilkan" : "○ Disembunyikan"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 rounded-lg bg-blue-950 hover:bg-blue-900 text-sky-300 hover:text-white transition"
                    title="Edit Banner"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(item.id)}
                    className="p-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900 text-rose-300 hover:text-white transition"
                    title="Hapus Banner"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {deleteConfirmId === item.id && (
                <div className="p-3 bg-rose-950/80 border-t border-rose-800 text-center space-y-2">
                  <p className="text-xs text-rose-200">Hapus banner ini dari rotasi?</p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleDeleteHero(item.id)}
                      className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg"
                    >
                      Ya, Hapus
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg"
                    >
                      Batal
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: AKADEMIK BANNER HEADER (1440x480 px) */}
      {activeTab === "AKADEMIK" && (
        <div className="space-y-6">
          {/* Information & Live Preview */}
          <div className="bg-[#071a33] border border-blue-900/50 rounded-3xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-blue-900/60">
              <div>
                <h2 className="text-base font-black text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-sky-400" />
                  <span>Live Preview: Banner Header Halaman /akademik</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Ukuran visual banner disetel presisi pada fixed <span className="text-amber-300 font-bold font-mono">1440px × 480px</span> untuk pengalaman desktop optimal.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 rounded-xl bg-blue-900/80 text-sky-200 border border-blue-700/60">
                  Fixed 1440 × 480 px
                </span>
                <a
                  href="/akademik"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition"
                >
                  <span>Buka Halaman Live</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="w-full bg-[#040e1e] p-2 sm:p-4 rounded-xl border border-blue-950 flex justify-center overflow-x-auto">
              <div className="relative w-full max-w-[1440px] h-[340px] sm:h-[400px] lg:h-[480px] rounded-none overflow-hidden border-0 group shrink-0">
                <Image
                  src={akademikBanner.imageUrl}
                  alt={akademikBanner.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay Preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06172e]/95 via-[#06172e]/50 to-[#06172e]/30 flex flex-col justify-between p-6 sm:p-10 text-white">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1 text-sky-400">
                      <Home className="w-3.5 h-3.5" />
                      <span>Beranda</span>
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-sky-300 font-semibold">Akademik</span>
                  </div>

                  <div className="space-y-3 max-w-2xl">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                      {akademikBanner.title}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-200 line-clamp-3 leading-relaxed drop-shadow-xs">
                      {akademikBanner.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* EDIT FORM */}
          <div className="bg-[#071a33] border border-blue-900/50 rounded-3xl p-6 shadow-xl">
            <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-sky-400" />
              <span>Formulir Edit Banner Header Akademik</span>
            </h3>

            <form onSubmit={saveAkademikBanner} className="space-y-4 text-xs">
              {/* Image URL with Preset Selector */}
              <div className="space-y-2">
                <label className="block text-slate-300 font-semibold">
                  URL / Path Gambar Banner (Fixed 1440x480 px)
                </label>
                <div className="relative">
                  <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={akademikBanner.imageUrl}
                    onChange={(e) => setAkademikBanner({ ...akademikBanner, imageUrl: e.target.value })}
                    placeholder="/images/kuliah-1.jpeg"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
                  />
                </div>

                {/* Preset Chips */}
                <div className="pt-1">
                  <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                    Pilihan Foto Cepat Rekomendasi UPITRA:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {presetImages.map((p, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setAkademikBanner({ ...akademikBanner, imageUrl: p.path })}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold border transition cursor-pointer ${
                          akademikBanner.imageUrl === p.path
                            ? "bg-blue-600 text-white border-blue-500 shadow-xs"
                            : "bg-blue-950/60 text-slate-300 border-blue-900/60 hover:bg-blue-900/60 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Badge Text */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Teks Badge Header
                </label>
                <input
                  type="text"
                  required
                  value={akademikBanner.badge}
                  onChange={(e) => setAkademikBanner({ ...akademikBanner, badge: e.target.value })}
                  placeholder="EKOSISTEM AKADEMIK UPITRA"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 uppercase tracking-wider font-semibold"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Judul Halaman
                </label>
                <input
                  type="text"
                  required
                  value={akademikBanner.title}
                  onChange={(e) => setAkademikBanner({ ...akademikBanner, title: e.target.value })}
                  placeholder="Akademik & Fakultas"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-bold"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Deskripsi / Narasi Header
                </label>
                <textarea
                  required
                  rows={3}
                  value={akademikBanner.description}
                  onChange={(e) => setAkademikBanner({ ...akademikBanner, description: e.target.value })}
                  placeholder="Penyelenggaraan pendidikan tinggi berkarakter Triputra DNA..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-900/40">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-bold shadow-lg shadow-blue-600/30 transition cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Banner Akademik</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE/EDIT MODAL FOR HERO BANNER */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#071a33] border border-blue-900/80 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
              <h3 className="text-sm font-bold text-white">
                {editingItem ? "Edit Banner Hero Beranda" : "Tambah Banner Hero Baru"}
              </h3>
              <button onClick={() => setModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveHero} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Judul Utama Banner</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Misal: Penerimaan Mahasiswa Baru 2026/2027"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Subjudul / Deskripsi Pendek</label>
                <textarea
                  rows={2}
                  value={formSubtitle}
                  onChange={(e) => setFormSubtitle(e.target.value)}
                  placeholder="Keterangan singkat promo atau program..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Teks Badge Label</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="PMB 2026 DIBUKA"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Nomor Urutan Tampil</label>
                  <input
                    type="number"
                    value={formOrder}
                    onChange={(e) => setFormOrder(parseInt(e.target.value) || 1)}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">URL / Path Foto Banner</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="/images/hero-1.jpg"
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Teks Tombol Aksi (CTA)</label>
                  <input
                    type="text"
                    value={formCtaText}
                    onChange={(e) => setFormCtaText(e.target.value)}
                    placeholder="Daftar Sekarang"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Link URL Tombol (CTA)</label>
                  <input
                    type="text"
                    value={formCtaLink}
                    onChange={(e) => setFormCtaLink(e.target.value)}
                    placeholder="/pmb"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-900/40">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Simpan Banner</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
