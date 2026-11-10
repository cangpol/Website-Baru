"use client";

import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Save, 
  Eye, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Layers, 
  Plus, 
  Trash2, 
  Camera,
  BarChart3,
  Flame,
  GraduationCap,
  ArrowRight
} from "lucide-react";
import { 
  getHomepageContent, 
  saveHomepageHeroAction, 
  saveHomepageWavesAction, 
  saveHomepageImmersionAction,
  saveHomepageStatsAction, 
  saveHomepageInstagramAction, 
  saveHomepageCtaAction, 
  saveHomepageVisibilityAction,
} from "@/server/homepage";
import {
  HomepageHero,
  HomepageWaves,
  HomepageImmersion,
  HomepageStats,
  HomepageInstagram,
  HomepageCta,
  HomepageVisibility,
  defaultHomepageHero,
  defaultHomepageWaves,
  defaultHomepageImmersion,
  defaultHomepageStats,
  defaultHomepageInstagram,
  defaultHomepageCta,
  defaultHomepageVisibility
} from "@/lib/homepageData";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminHalamanDepanPage() {
  const [activeTab, setActiveTab] = useState<"hero" | "waves" | "immersion" | "stats" | "instagram" | "cta" | "visibility">("hero");

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── FORM STATES ──
  const [hero, setHero] = useState<HomepageHero>(defaultHomepageHero);
  const [isSavingHero, setIsSavingHero] = useState(false);

  const [waves, setWaves] = useState<HomepageWaves>(defaultHomepageWaves);
  const [isSavingWaves, setIsSavingWaves] = useState(false);

  const [immersion, setImmersion] = useState<HomepageImmersion>(defaultHomepageImmersion);
  const [isSavingImmersion, setIsSavingImmersion] = useState(false);

  const [stats, setStats] = useState<HomepageStats>(defaultHomepageStats);
  const [isSavingStats, setIsSavingStats] = useState(false);

  const [instagram, setInstagram] = useState<HomepageInstagram>(defaultHomepageInstagram);
  const [isSavingInstagram, setIsSavingInstagram] = useState(false);

  const [cta, setCta] = useState<HomepageCta>(defaultHomepageCta);
  const [isSavingCta, setIsSavingCta] = useState(false);

  const [visibility, setVisibility] = useState<HomepageVisibility>(defaultHomepageVisibility);
  const [isSavingVisibility, setIsSavingVisibility] = useState(false);

  // Load initial content
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getHomepageContent();
        setHero(data.hero);
        setWaves(data.waves);
        setImmersion(data.immersion);
        setStats(data.stats);
        setInstagram(data.instagram);
        setCta(data.cta);
        setVisibility(data.visibility);
      } catch (err) {
        console.error("Error loading homepage content:", err);
      }
    }
    loadData();
  }, []);

  // ── SAVE HANDLERS ──
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingHero(true);
    try {
      const res = await saveHomepageHeroAction(hero);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan hero banner.", "error");
    } finally {
      setIsSavingHero(false);
    }
  };

  const handleSaveWaves = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingWaves(true);
    try {
      const res = await saveHomepageWavesAction(waves);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan gelombang PMB.", "error");
    } finally {
      setIsSavingWaves(false);
    }
  };

  const handleSaveImmersion = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingImmersion(true);
    try {
      const res = await saveHomepageImmersionAction(immersion);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan Program Immersion.", "error");
    } finally {
      setIsSavingImmersion(false);
    }
  };

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingStats(true);
    try {
      const res = await saveHomepageStatsAction(stats);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan statistik beranda.", "error");
    } finally {
      setIsSavingStats(false);
    }
  };

  const handleSaveInstagram = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingInstagram(true);
    try {
      const res = await saveHomepageInstagramAction(instagram);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan feed Instagram.", "error");
    } finally {
      setIsSavingInstagram(false);
    }
  };

  const handleSaveCta = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingCta(true);
    try {
      const res = await saveHomepageCtaAction(cta);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan CTA beranda.", "error");
    } finally {
      setIsSavingCta(false);
    }
  };

  const handleSaveVisibility = async () => {
    setIsSavingVisibility(true);
    try {
      const res = await saveHomepageVisibilityAction(visibility);
      if (res.ok) showToast(res.message);
      else showToast(res.message, "error");
    } catch {
      showToast("Gagal menyimpan pengaturan visibilitas.", "error");
    } finally {
      setIsSavingVisibility(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-xl shadow-lg border flex items-center gap-2.5 text-sm font-semibold transition-all ${
            toast.type === "success"
              ? "bg-blue-50 text-blue-800 border-blue-200"
              : "bg-blue-950 text-white border-blue-900"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-blue-700" />
          ) : (
            <AlertCircle className="w-4 h-4 text-white" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2.5">
            <LayoutDashboard className="w-7 h-7 text-blue-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Manajemen Halaman Depan (Homepage)</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Kelola seluruh konten, gambar, teks, dan status tampil setiap bagian pada halaman utama website UPITRA.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-slate-500" />
            <span>Lihat Halaman Depan</span>
          </a>
        </div>
      </div>

      {/* Navigasi Tab Per Section */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("hero")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "hero"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>1. Hero Banner</span>
        </button>

        <button
          onClick={() => setActiveTab("waves")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "waves"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>2. Gelombang PMB</span>
        </button>

        <button
          onClick={() => setActiveTab("immersion")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "immersion"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>3. Program Immersion</span>
        </button>

        <button
          onClick={() => setActiveTab("stats")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "stats"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>4. UPITRA Dalam Angka</span>
        </button>

        <button
          onClick={() => setActiveTab("instagram")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "instagram"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>5. Kabar &amp; Cerita Kampus</span>
        </button>

        <button
          onClick={() => setActiveTab("cta")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "cta"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <ArrowRight className="w-4 h-4" />
          <span>6. Ajakan Bergabung (CTA)</span>
        </button>

        <button
          onClick={() => setActiveTab("visibility")}
          className={`flex items-center gap-2 px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
            activeTab === "visibility"
              ? "border-blue-600 text-blue-600"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>7. Visibilitas Section</span>
        </button>
      </div>

      {/* ── TAB 1: HERO BANNER ── */}
      {activeTab === "hero" && (
        <form onSubmit={handleSaveHero} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Hero Banner &quot;Campus to Career&quot;</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Banner sinematik utama berukuran frame 1440x810 pada bagian teratas beranda website.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Judul Utama (Gunakan baris baru untuk pemenggalan judul)
              </label>
              <textarea
                rows={3}
                value={hero.title}
                onChange={(e) => setHero({ ...hero, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-black text-slate-900 text-lg leading-tight"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Subjudul / Deskripsi Pendukung
              </label>
              <textarea
                rows={3}
                value={hero.subtitle}
                onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl text-slate-700 leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol CTA</label>
                <input
                  type="text"
                  value={hero.ctaLabel}
                  onChange={(e) => setHero({ ...hero, ctaLabel: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tautan URL Tombol CTA</label>
                <input
                  type="text"
                  value={hero.ctaHref}
                  onChange={(e) => setHero({ ...hero, ctaHref: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div>
              <ImageUploadField
                label="Foto Latar Belakang Hero (Mahasiswa Kampus 1440x810)"
                value={hero.imageUrl}
                onChange={(url: string) => setHero({ ...hero, imageUrl: url })}
                helperText="Format JPEG/PNG/WebP resolusi tinggi. Maksimal 5 MB."
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSavingHero}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingHero ? "Menyimpan..." : "Simpan Hero Banner"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── TAB 2: GELOMBANG PMB (WELCOME WAVES) ── */}
      {activeTab === "waves" && (
        <form onSubmit={handleSaveWaves} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Gelombang Pendaftaran (Welcome Waves)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kelola judul section dan kartu jalur penerimaan yang tampil di beranda (maksimal 12 kartu).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Bagian</label>
              <input
                type="text"
                value={waves.title}
                onChange={(e) => setWaves({ ...waves, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul Bagian</label>
              <input
                type="text"
                value={waves.subtitle}
                onChange={(e) => setWaves({ ...waves, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* List Kartu Gelombang */}
          <div className="space-y-6">
            {waves.waves.map((wave, index) => (
              <div key={wave.id || index} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-blue-700 uppercase tracking-wider">
                    Kartu Gelombang #{index + 1}
                  </span>
                  <button
                    type="button"
                    disabled={waves.waves.length <= 1}
                    onClick={() => setWaves({
                      ...waves,
                      waves: waves.waves.filter((_, waveIndex) => waveIndex !== index),
                    })}
                    aria-label={`Hapus kartu ${wave.title}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Hapus
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nama Gelombang</label>
                    <input
                      type="text"
                      value={wave.title}
                      onChange={(e) => {
                        const updated = [...waves.waves];
                        updated[index].title = e.target.value;
                        setWaves({ ...waves, waves: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Benefit Beasiswa</label>
                    <input
                      type="text"
                      value={wave.benefit}
                      onChange={(e) => {
                        const updated = [...waves.waves];
                        updated[index].benefit = e.target.value;
                        setWaves({ ...waves, waves: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl font-semibold text-blue-700 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Label Kartu (opsional)</label>
                    <input
                      type="text"
                      value={wave.badge ?? ""}
                      onChange={(e) => {
                        const updated = [...waves.waves];
                        updated[index].badge = e.target.value;
                        setWaves({ ...waves, waves: updated });
                      }}
                      placeholder="Contoh: Limited"
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Pendaftaran</label>
                    <input
                      type="text"
                      value={wave.link}
                      onChange={(e) => {
                        const updated = [...waves.waves];
                        updated[index].link = e.target.value;
                        setWaves({ ...waves, waves: updated });
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <ImageUploadField
                      label={`Foto Sampul ${wave.title}`}
                      value={wave.image}
                      onChange={(url: string) => {
                        const updated = [...waves.waves];
                        updated[index].image = url;
                        setWaves({ ...waves, waves: updated });
                      }}
                      helperText="Foto kegiatan/poster beresolusi tajam."
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              disabled={waves.waves.length >= 12}
              onClick={() => setWaves({
                ...waves,
                waves: [...waves.waves, {
                  id: crypto.randomUUID(),
                  title: "Gelombang baru",
                  benefit: "Informasi benefit pendaftaran",
                  image: "/images/pmb/wave-ready-early-hq.jpg",
                  link: "https://pmb.upitra.ac.id",
                }],
              })}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Tambah Gelombang
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSavingWaves}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingWaves ? "Menyimpan..." : "Simpan Gelombang PMB"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 3: UPITRA DALAM ANGKA ── */}
      {/* ── TAB: PROGRAM IMMERSION ── */}
      {activeTab === "immersion" && (
        <form onSubmit={handleSaveImmersion} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Program Immersion (3+1)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Section biru &quot;Program Immersion&quot; di antara Gelombang PMB dan Kabar &amp; Cerita Kampus.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Baris 1</label>
              <input
                type="text"
                value={immersion.titleLine1}
                onChange={(e) => setImmersion({ ...immersion, titleLine1: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Baris 2 (cetak tebal)</label>
              <input
                type="text"
                value={immersion.titleLine2}
                onChange={(e) => setImmersion({ ...immersion, titleLine2: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Label Badge Kuning</label>
            <input
              type="text"
              value={immersion.badge}
              onChange={(e) => setImmersion({ ...immersion, badge: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi</label>
            <textarea
              rows={4}
              value={immersion.description}
              onChange={(e) => setImmersion({ ...immersion, description: e.target.value })}
              className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
            />
          </div>

          <ImageUploadField
            label="Foto Mahasiswi Cutout"
            value={immersion.studentImage}
            onChange={(url: string) => setImmersion({ ...immersion, studentImage: url })}
            helperText="PNG transparan, rasio potret (contoh 1080x1350)."
          />

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Konsep</label>
              <input
                type="text"
                value={immersion.conceptTitle}
                onChange={(e) => setImmersion({ ...immersion, conceptTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Kartu Konsep ({immersion.concepts.length}/4):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {immersion.concepts.map((concept, index) => (
                <div key={concept.id || index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={immersion.concepts.length <= 1}
                      onClick={() => setImmersion({
                        ...immersion,
                        concepts: immersion.concepts.filter((_, i) => i !== index),
                      })}
                      aria-label={`Hapus konsep ${concept.title}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" />
                      Hapus
                    </button>
                  </div>
                  <input
                    type="text"
                    value={concept.title}
                    onChange={(e) => setImmersion({
                      ...immersion,
                      concepts: immersion.concepts.map((c, i) => (i === index ? { ...c, title: e.target.value } : c)),
                    })}
                    placeholder="Judul konsep"
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-semibold"
                  />
                  <input
                    type="text"
                    value={concept.note}
                    onChange={(e) => setImmersion({
                      ...immersion,
                      concepts: immersion.concepts.map((c, i) => (i === index ? { ...c, note: e.target.value } : c)),
                    })}
                    placeholder="Keterangan, mis. (Semester 1–5)"
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg"
                  />
                </div>
              ))}
            </div>
            {immersion.concepts.length < 4 && (
              <button
                type="button"
                onClick={() => setImmersion({
                  ...immersion,
                  concepts: [...immersion.concepts, { id: `concept-${Date.now()}`, title: "", note: "" }],
                })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Konsep
              </button>
            )}
          </div>

          <div className="space-y-3 pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Kartu Pilar Foto ({immersion.pillars.length}/6):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {immersion.pillars.map((pillar, index) => (
                <div key={pillar.id || index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={pillar.label}
                      onChange={(e) => setImmersion({
                        ...immersion,
                        pillars: immersion.pillars.map((p, i) => (i === index ? { ...p, label: e.target.value } : p)),
                      })}
                      placeholder="Label pilar"
                      className="flex-1 px-3 py-1.5 text-xs border border-slate-200 rounded-lg font-semibold"
                    />
                    <button
                      type="button"
                      disabled={immersion.pillars.length <= 1}
                      onClick={() => setImmersion({
                        ...immersion,
                        pillars: immersion.pillars.filter((_, i) => i !== index),
                      })}
                      aria-label={`Hapus pilar ${pillar.label}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                  <ImageUploadField
                    label="Foto"
                    value={pillar.image}
                    onChange={(url: string) => setImmersion({
                      ...immersion,
                      pillars: immersion.pillars.map((p, i) => (i === index ? { ...p, image: url } : p)),
                    })}
                  />
                </div>
              ))}
            </div>
            {immersion.pillars.length < 6 && (
              <button
                type="button"
                onClick={() => setImmersion({
                  ...immersion,
                  pillars: [...immersion.pillars, { id: `pillar-${Date.now()}`, label: "", image: "/images/kegiatan.jpg" }],
                })}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold hover:bg-blue-100"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Pilar
              </button>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSavingImmersion}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingImmersion ? "Menyimpan..." : "Simpan Program Immersion"}</span>
            </button>
          </div>
        </form>
      )}

      {activeTab === "stats" && (
        <form onSubmit={handleSaveStats} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan UPITRA Dalam Angka</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesuaikan metrik capaian prestasi universitas dan upload/ganti foto mahasiswi cutout transparan (maksimal 12 metrik).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Bagian</label>
              <input
                type="text"
                value={stats.title}
                onChange={(e) => setStats({ ...stats, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subjudul Bagian</label>
              <input
                type="text"
                value={stats.subtitle}
                onChange={(e) => setStats({ ...stats, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Upload Cutout Foto Mahasiswi */}
          <div>
            <ImageUploadField
              label="Foto Mahasiswi Cutout Transparan (Looking Up)"
              value={stats.studentCutoutImage}
              onChange={(url: string) => setStats({ ...stats, studentCutoutImage: url })}
              helperText="Format PNG transparan resolusi tinggi (misal: mahasiswi membawa laptop menatap ke atas)."
            />
          </div>

          {/* Grid Metrik Capaian */}
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Metrik Capaian Prestasi ({stats.metrics.length}/12):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {stats.metrics.map((metric, index) => (
                <div key={metric.id || index} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={stats.metrics.length <= 1}
                      onClick={() => setStats({
                        ...stats,
                        metrics: stats.metrics.filter((_, metricIndex) => metricIndex !== index),
                      })}
                      aria-label={`Hapus metrik ${metric.label}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-3 w-3" />
                      Hapus
                    </button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Nilai / Angka</label>
                    <input
                      type="text"
                      value={metric.value}
                      onChange={(e) => {
                        const updated = [...stats.metrics];
                        updated[index].value = e.target.value;
                        setStats({ ...stats, metrics: updated });
                      }}
                      className="w-full px-3 py-1.5 text-base font-black text-slate-900 border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-0.5">Label Keterangan</label>
                    <input
                      type="text"
                      value={metric.label}
                      onChange={(e) => {
                        const updated = [...stats.metrics];
                        updated[index].label = e.target.value;
                        setStats({ ...stats, metrics: updated });
                      }}
                      className="w-full px-3 py-1.5 text-xs font-bold text-blue-700 border border-slate-200 rounded-lg bg-white"
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={stats.metrics.length >= 12}
              onClick={() => setStats({
                ...stats,
                metrics: [...stats.metrics, {
                  id: crypto.randomUUID(),
                  value: "0",
                  label: "Metrik baru",
                }],
              })}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Tambah Metrik
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSavingStats}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingStats ? "Menyimpan..." : "Simpan UPITRA Dalam Angka"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 4: KABAR & CERITA KAMPUS (INSTAGRAM FEED) ── */}
      {activeTab === "instagram" && (
        <form onSubmit={handleSaveInstagram} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Kabar &amp; Cerita Kampus (Instagram Feed)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sesuaikan judul, akun Instagram, tautan profil, serta kartu postingan yang tampil di beranda (maksimal 12).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-100">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Bagian</label>
              <input
                type="text"
                value={instagram.title}
                onChange={(e) => setInstagram({ ...instagram, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Username Instagram</label>
              <input
                type="text"
                value={instagram.handle}
                onChange={(e) => setInstagram({ ...instagram, handle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-semibold"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Tautan Profil Instagram</label>
              <input
                type="text"
                value={instagram.profileUrl}
                onChange={(e) => setInstagram({ ...instagram, profileUrl: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">Deskripsi Bagian</label>
              <textarea
                rows={2}
                value={instagram.subtitle}
                onChange={(e) => setInstagram({ ...instagram, subtitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
              />
            </div>
          </div>

          {/* Postingan Instagram */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Postingan Instagram ({instagram.posts.length}/12):
            </span>
            <div className="space-y-4">
              {instagram.posts.map((post, index) => (
                <div key={post.id || index} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-700 uppercase">
                      Post #{index + 1}
                    </span>
                    <button
                      type="button"
                      disabled={instagram.posts.length <= 1}
                      onClick={() => setInstagram({
                        ...instagram,
                        posts: instagram.posts.filter((_, postIndex) => postIndex !== index),
                      })}
                      aria-label={`Hapus postingan ${index + 1}`}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Hapus
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Kategori Badge</label>
                      <input
                        type="text"
                        value={post.category}
                        onChange={(e) => {
                          const updated = [...instagram.posts];
                          updated[index].category = e.target.value;
                          setInstagram({ ...instagram, posts: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Waktu (Time Ago)</label>
                      <input
                        type="text"
                        value={post.timeAgo}
                        onChange={(e) => {
                          const updated = [...instagram.posts];
                          updated[index].timeAgo = e.target.value;
                          setInstagram({ ...instagram, posts: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Tautan Postingan</label>
                      <input
                        type="text"
                        value={post.permalink}
                        onChange={(e) => {
                          const updated = [...instagram.posts];
                          updated[index].permalink = e.target.value;
                          setInstagram({ ...instagram, posts: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[11px] font-bold text-slate-600 mb-1">Teks Alternatif Foto</label>
                      <textarea
                        rows={2}
                        value={post.caption}
                        onChange={(e) => {
                          const updated = [...instagram.posts];
                          updated[index].caption = e.target.value;
                          setInstagram({ ...instagram, posts: updated });
                        }}
                        className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-lg bg-white"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <ImageUploadField
                        label={`Foto Post #${index + 1}`}
                        value={post.mediaUrl}
                        onChange={(url: string) => {
                          const updated = [...instagram.posts];
                          updated[index].mediaUrl = url;
                          setInstagram({ ...instagram, posts: updated });
                        }}
                        helperText="Foto konten Instagram."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              disabled={instagram.posts.length >= 12}
              onClick={() => setInstagram({
                ...instagram,
                posts: [...instagram.posts, {
                  id: crypto.randomUUID(),
                  caption: "",
                  mediaUrl: "/images/instagram/ig-1.jpg",
                  permalink: instagram.profileUrl,
                  timeAgo: "Baru saja",
                  category: "POSTINGAN BARU",
                }],
              })}
              className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-4 py-2 text-xs font-bold text-blue-700 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              Tambah Postingan
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSavingInstagram}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingInstagram ? "Menyimpan..." : "Simpan Feed Instagram"}</span>
            </button>
          </div>
        </form>
      )}

      {/* ── TAB 5: AJAKAN BERGABUNG (CTA READY FAMILY) ── */}
      {activeTab === "cta" && (
        <form onSubmit={handleSaveCta} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Ajakan Bergabung (CTA Ready Family)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Banner ajakan pendaftaran di bagian bawah beranda sebelum footer.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Eyebrow / Overline</label>
              <input
                type="text"
                value={cta.eyebrow}
                onChange={(e) => setCta({ ...cta, eyebrow: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold text-blue-700 uppercase tracking-widest"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Headline Utama</label>
              <textarea
                rows={2}
                value={cta.title}
                onChange={(e) => setCta({ ...cta, title: e.target.value })}
                className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-black text-slate-900 text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teks Tombol</label>
                <input
                  type="text"
                  value={cta.ctaLabel}
                  onChange={(e) => setCta({ ...cta, ctaLabel: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tautan URL Tombol</label>
                <input
                  type="text"
                  value={cta.ctaHref}
                  onChange={(e) => setCta({ ...cta, ctaHref: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs border border-slate-200 rounded-xl"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSavingCta}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingCta ? "Menyimpan..." : "Simpan CTA Bergabung"}</span>
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ── TAB 6: PENGATURAN VISIBILITAS SECTION ── */}
      {activeTab === "visibility" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 max-w-4xl shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pengaturan Tampilan &amp; Visibilitas Section Beranda</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Aktifkan atau sembunyikan section tertentu di halaman depan website secara instan tanpa menghapus data.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">1. Hero Banner Slider</h3>
                <p className="text-xs text-slate-500">Banner besar &quot;Campus to Career&quot; di posisi paling atas.</p>
              </div>
              <input
                type="checkbox"
                checked={visibility.hero}
                onChange={(e) => setVisibility({ ...visibility, hero: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md cursor-pointer"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">2. Gelombang PMB (Welcome Waves)</h3>
                <p className="text-xs text-slate-500">3 kartu jalur pendaftaran beasiswa mahasiswa baru.</p>
              </div>
              <input
                type="checkbox"
                checked={visibility.waves}
                onChange={(e) => setVisibility({ ...visibility, waves: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md cursor-pointer"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">3. Program Immersion (3+1)</h3>
                <p className="text-xs text-slate-500">Section biru Program Immersion beserta empat pilar kegiatan.</p>
              </div>
              <input
                type="checkbox"
                checked={visibility.immersion}
                onChange={(e) => setVisibility({ ...visibility, immersion: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md cursor-pointer"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">4. UPITRA Dalam Angka</h3>
                <p className="text-xs text-slate-500">6 kartu metrik capaian prestasi dan foto mahasiswi cutout.</p>
              </div>
              <input
                type="checkbox"
                checked={visibility.stats}
                onChange={(e) => setVisibility({ ...visibility, stats: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md cursor-pointer"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">5. Kabar &amp; Cerita Kampus</h3>
                <p className="text-xs text-slate-500">Feed Instagram @upitra_campus dengan 5 kartu postingan.</p>
              </div>
              <input
                type="checkbox"
                checked={visibility.instagram}
                onChange={(e) => setVisibility({ ...visibility, instagram: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md cursor-pointer"
              />
            </div>

            <div className="py-4 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">6. Ajakan Bergabung (CTA Ready Family)</h3>
                <p className="text-xs text-slate-500">Bagian tombol ajakan pendaftaran di atas footer.</p>
              </div>
              <input
                type="checkbox"
                checked={visibility.cta}
                onChange={(e) => setVisibility({ ...visibility, cta: e.target.checked })}
                className="w-5 h-5 text-blue-600 rounded-md cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSaveVisibility}
              disabled={isSavingVisibility}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold text-xs shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{isSavingVisibility ? "Menyimpan..." : "Simpan Visibilitas"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
