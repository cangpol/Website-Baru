"use client";

import { useState, useEffect, useTransition } from "react";
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
  Loader2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { 
  getHeroSlides, 
  saveHeroSlideAction, 
  deleteHeroSlideAction, 
  toggleHeroSlideActiveAction,
  getPageHeaderBanner,
  savePageHeaderBannerAction
} from "@/server/hero";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface HeroSlideData {
  id: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  imageUrl: string;
  order: number;
  isActive: boolean;
  version: number;
}

interface AkademikBannerData {
  title: string;
  description: string;
  badge: string;
  bgImage: string;
  updatedAt?: string;
}

export default function AdminBannerHeroPage() {
  const [activeTab, setActiveTab] = useState<"HERO" | "AKADEMIK">("HERO");

  // Hero Banners State
  const [banners, setBanners] = useState<HeroSlideData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<HeroSlideData | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Hero Form states
  const [formTitle, setFormTitle] = useState("");
  const [formSubtitle, setFormSubtitle] = useState("");
  const [formImage, setFormImage] = useState("/images/banners/hero-campus-students-optimized.jpg");
  const [formCtaText, setFormCtaText] = useState("Daftar Sekarang");
  const [formCtaLink, setFormCtaLink] = useState("/#daftar");
  const [formActive, setFormActive] = useState(true);
  const [formOrder, setFormOrder] = useState(1);
  const [formVersion, setFormVersion] = useState(1);
  const [formError, setFormError] = useState<string | null>(null);

  // Akademik Banner State
  const [akademikBanner, setAkademikBanner] = useState<AkademikBannerData>({
    title: "Akademik",
    description: "4 Fakultas, 10 Program Studi S1 & D3 Keperawatan",
    badge: "PENDIDIKAN BERKUALITAS",
    bgImage: "/images/hero-campus.jpg",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    try {
      const slides = await getHeroSlides();
      setBanners(slides);

      const akd = await getPageHeaderBanner("akademik");
      if (akd) {
        setAkademikBanner({
          title: akd.title || "Akademik",
          description: akd.description || "",
          badge: "PENDIDIKAN BERKUALITAS",
          bgImage: akd.imageUrl || "/images/hero-campus.jpg",
          updatedAt: akd.updatedAt,
        });
      }
    } catch (err) {
      console.error("Error loading banners:", err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormTitle("");
    setFormSubtitle("");
    setFormImage("/images/banners/hero-campus-students-optimized.jpg");
    setFormCtaText("Daftar Sekarang");
    setFormCtaLink("/#daftar");
    setFormActive(true);
    setFormOrder(banners.length + 1);
    setFormVersion(1);
    setFormError(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (item: HeroSlideData) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormSubtitle(item.subtitle);
    setFormImage(item.imageUrl);
    setFormCtaText(item.ctaLabel);
    setFormCtaLink(item.ctaHref);
    setFormActive(item.isActive);
    setFormOrder(item.order);
    setFormVersion(item.version);
    setFormError(null);
    setModalOpen(true);
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    startTransition(async () => {
      const res = await saveHeroSlideAction(editingItem?.id || null, {
        title: formTitle,
        subtitle: formSubtitle,
        ctaLabel: formCtaText,
        ctaHref: formCtaLink,
        imageUrl: formImage,
        order: Number(formOrder),
        isActive: formActive,
        version: formVersion,
      });

      if (res.ok) {
        setModalOpen(false);
        showToast(res.message);
        await loadData();
      } else {
        setFormError(res.message);
      }
    });
  };

  const handleDeleteHero = (id: string) => {
    startTransition(async () => {
      const res = await deleteHeroSlideAction(id);
      if (res.ok) {
        setDeleteConfirmId(null);
        showToast(res.message);
        await loadData();
      } else {
        alert(res.message);
      }
    });
  };

  const handleToggleActiveHero = (id: string, currentState: boolean) => {
    startTransition(async () => {
      const res = await toggleHeroSlideActiveAction(id, currentState);
      if (res.ok) {
        showToast(res.message);
        await loadData();
      } else {
        alert(res.message);
      }
    });
  };

  const saveAkademikBanner = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      const res = await savePageHeaderBannerAction("akademik", {
        title: akademikBanner.title,
        description: akademikBanner.description,
        imageUrl: akademikBanner.bgImage,
      });
      if (res.ok) {
        showToast(res.message);
        await loadData();
      } else {
        alert(res.message);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-2.5">
            <Sliders className="w-6 h-6 text-sky-400" />
            Manajemen Hero &amp; Banner
          </h1>
          <p className="text-slate-400 text-xs mt-1">
            Atur slider beranda (1440x810) dan banner header setiap segmen halaman yang tersimpan langsung di database.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "HERO" && (
            <button
              onClick={handleOpenCreate}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Slide Hero</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-blue-900/40 gap-6">
        <button
          onClick={() => setActiveTab("HERO")}
          className={`pb-3 text-xs font-bold tracking-wide uppercase transition relative cursor-pointer ${
            activeTab === "HERO"
              ? "text-sky-400 border-b-2 border-sky-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Slide Beranda (1440x810 px)
        </button>
        <button
          onClick={() => setActiveTab("AKADEMIK")}
          className={`pb-3 text-xs font-bold tracking-wide uppercase transition relative cursor-pointer ${
            activeTab === "AKADEMIK"
              ? "text-sky-400 border-b-2 border-sky-400"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Header Akademik (1440x480 px)
        </button>
      </div>

      {/* TAB 1: HERO SLIDES */}
      {activeTab === "HERO" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {banners.map((item) => (
              <div
                key={item.id}
                className="bg-[#0a192f] border border-blue-900/40 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group hover:border-blue-700/60 transition"
              >
                <div>
                  {/* Image Preview */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      unoptimized={item.imageUrl.startsWith("/uploads/") || item.imageUrl.startsWith("http")}
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-950/80 text-white border border-slate-700">
                        Urutan #{item.order}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                          item.isActive
                            ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                            : "bg-slate-700/50 text-slate-400 border-slate-600"
                        }`}
                      >
                        {item.isActive ? "Aktif" : "Non-aktif"}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-white text-sm line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 text-xs line-clamp-2">
                      {item.subtitle || "Tidak ada deskripsi tambahan."}
                    </p>
                    <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                      <span>CTA: <strong className="text-sky-300">{item.ctaLabel}</strong></span>
                      <span className="truncate max-w-[120px] font-mono text-[10px] text-slate-500">{item.ctaHref}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-3 bg-blue-950/30 border-t border-blue-900/40 flex items-center justify-between">
                  <button
                    onClick={() => handleToggleActiveHero(item.id, item.isActive)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-900/40 transition cursor-pointer"
                    title={item.isActive ? "Non-aktifkan slide" : "Aktifkan slide"}
                  >
                    {item.isActive ? <Eye className="w-4 h-4 text-emerald-400" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1.5 rounded-lg text-sky-400 hover:text-white hover:bg-sky-600/30 transition cursor-pointer"
                      title="Edit slide"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="p-1.5 rounded-lg text-rose-400 hover:text-white hover:bg-rose-600/30 transition cursor-pointer"
                      title="Hapus slide"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AKADEMIK BANNER */}
      {activeTab === "AKADEMIK" && (
        <form onSubmit={saveAkademikBanner} className="bg-[#0a192f] border border-blue-900/40 rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white">Banner Header Halaman Akademik (1440x480 px)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Judul Header</label>
                <input
                  type="text"
                  value={akademikBanner.title}
                  onChange={(e) => setAkademikBanner({ ...akademikBanner, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Subjudul / Deskripsi</label>
                <input
                  type="text"
                  value={akademikBanner.description}
                  onChange={(e) => setAkademikBanner({ ...akademikBanner, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <ImageUploadField
              label="Foto Latar Belakang Header Akademik"
              value={akademikBanner.bgImage}
              onChange={(url) => setAkademikBanner({ ...akademikBanner, bgImage: url })}
              recommendedSize="1440 × 480 px"
            />
          </div>

          <div className="flex justify-end pt-4 border-t border-blue-900/40">
            <button
              type="submit"
              disabled={isPending}
              className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Simpan Banner Akademik</span>
            </button>
          </div>
        </form>
      )}

      {/* MODAL HERO FORM */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <form
            onSubmit={handleSaveHero}
            className="w-full max-w-lg bg-[#0a192f] border border-blue-900/60 rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/40">
              <h3 className="text-base font-bold text-white">
                {editingItem ? "Edit Slide Hero" : "Tambah Slide Hero Baru"}
              </h3>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-white rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="p-3 bg-red-950/60 border border-red-800/60 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Judul Slide *</label>
              <input
                type="text"
                required
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="cth: Kampus Merdeka Vokasi Masa Depan"
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Subjudul / Keterangan</label>
              <textarea
                rows={2}
                value={formSubtitle}
                onChange={(e) => setFormSubtitle(e.target.value)}
                placeholder="Penjelasan ringkas mengenai slide..."
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
              />
            </div>

            <ImageUploadField
              label="Gambar Hero Banner"
              value={formImage}
              onChange={setFormImage}
              recommendedSize="1440 × 810 px"
              required
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Label Tombol CTA</label>
                <input
                  type="text"
                  value={formCtaText}
                  onChange={(e) => setFormCtaText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Link Tujuan CTA</label>
                <input
                  type="text"
                  value={formCtaLink}
                  onChange={(e) => setFormCtaLink(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Nomor Urut Tampil</label>
                <input
                  type="number"
                  min={1}
                  value={formOrder}
                  onChange={(e) => setFormOrder(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-blue-900/60 text-white focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="flex items-center pt-5">
                <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formActive}
                    onChange={(e) => setFormActive(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-700 text-sky-500 focus:ring-0"
                  />
                  <span>Slide Aktif</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-blue-900/40">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="px-5 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-600/25"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Simpan Slide</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="w-full max-w-sm bg-[#0a192f] border border-rose-900/50 rounded-2xl p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-rose-400">Hapus Slide Hero?</h3>
            <p className="text-xs text-slate-300">
              Slide ini akan dihapus dari rotasi hero beranda website publik.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 rounded-xl"
              >
                Batal
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={() => handleDeleteHero(deleteConfirmId)}
                className="px-4 py-2 text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
