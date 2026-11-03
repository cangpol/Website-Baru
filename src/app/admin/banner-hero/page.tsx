"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { 
  Sliders, 
  CheckCircle2, 
  ExternalLink, 
  Save,
  Loader2
} from "lucide-react";
import { 
  getPageHeaderBanner,
  savePageHeaderBannerAction
} from "@/server/hero";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

interface AkademikBannerData {
  title: string;
  description: string;
  badge: string;
  bgImage: string;
  updatedAt?: string;
}

export default function AdminBannerHeroPage() {
  const [activeTab, setActiveTab] = useState<"HERO" | "AKADEMIK">("HERO");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
            Konten hero beranda dikelola melalui CMS halaman depan. Banner header Akademik dapat dikelola di halaman ini.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "HERO" && (
            <Link
              href="/admin/halaman-depan"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              <span>Kelola Hero Beranda</span>
            </Link>
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
          Hero Beranda
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
        <div className="rounded-2xl border border-blue-900/40 bg-[#0a192f] p-6">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-lg font-bold text-white">Sumber hero halaman depan</h2>
            <p className="text-sm leading-relaxed text-slate-300">
              Halaman depan dan dashboard membaca hero dari CMS yang sama. Kelola judul, deskripsi, gambar, dan tombol pada CMS Halaman Depan; data slide lama tidak digunakan oleh render publik.
            </p>
            <Link
              href="/admin/halaman-depan"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-blue-500"
            >
              Buka CMS Halaman Depan
              <ExternalLink className="h-4 w-4" />
            </Link>
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

    </div>
  );
}
