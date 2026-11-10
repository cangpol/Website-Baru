"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Newspaper, 
  Microscope, 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  CheckCircle2, 
  X, 
  ExternalLink,
  Calendar,
  AlertCircle,
  FileText,
  BookOpen,
  Globe,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import RichEditor from "@/components/admin/RichEditor";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { FileUploadField } from "@/components/admin/FileUploadField";
import { 
  getAllAdminArticles,
  saveArticleAction,
  softDeleteArticleAction,
  getRisetPublications,
  saveRisetPublicationsAction,
  getRisetPortals,
  saveRisetPortalsAction,
  RisetPublicationItem,
  RisetPortalsConfig,
  ArticleInput
} from "@/server/articles";
import { getPageHeaderBanner, savePageHeaderBannerAction } from "@/server/hero";

export interface AdminArticleItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  authorName: string;
  publishedAt: string | null;
  createdAt: string;
  summary: string;
  content: string;
  coverImage: string;
  attachmentUrl?: string | null;
  attachmentName?: string | null;
  attachmentSize?: string | null;
  published: boolean;
  version: number;
}

const newsCategories = [
  "Semua",
  "Riset",
  "Berita Kampus",
  "Prestasi",
  "Inovasi",
  "Pengumuman",
  "Kegiatan",
  "Akademik",
  "Kemahasiswaan",
  "Kerjasama"
];

const emptyNewsForm: AdminArticleItem = {
  id: "",
  title: "",
  slug: "",
  category: "Riset",
  summary: "",
  content: "",
  coverImage: "/images/kegiatan.jpg",
  attachmentUrl: null,
  attachmentName: null,
  attachmentSize: null,
  authorName: "Humas & LPPM UPITRA",
  published: true,
  publishedAt: new Date().toISOString().split("T")[0],
  createdAt: new Date().toISOString(),
  version: 1,
};

export default function AdminRisetPage() {
  const [activeTab, setActiveTab] = useState<"berita" | "banner_profil" | "publikasi">("berita");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error" | "info">("info");

  const showToast = (msg: string, type: "success" | "error" | "info" = "info") => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // ── 1. BERITA & ARTIKEL STATE ──────────────────────────────────────────────
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
  const [newsSearch, setNewsSearch] = useState("");
  const [newsCategoryFilter, setNewsCategoryFilter] = useState("Semua");
  const [newsStatusFilter, setNewsStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [newsForm, setNewsForm] = useState<AdminArticleItem>(emptyNewsForm);
  const [deleteNewsId, setDeleteNewsId] = useState<string | null>(null);
  const [isSubmittingArticle, setIsSubmittingArticle] = useState(false);
  const [manualSlugMode, setManualSlugMode] = useState(false);

  // ── 2. HEADER BANNER & PROFIL LPPM STATE ───────────────────────────────────
  const [bannerForm, setBannerForm] = useState({
    title: "Riset & Publikasi",
    description: "LPPM Lembaga Penelitian & Pengabdian Universitas Pignatelli Triputra sebagai tempat keilmuan dan riset terapan untuk menjawab kebutuhan nyata industri modern.",
    imageUrl: "/images/kegiatan.jpg",
  });
  const [portalsForm, setPortalsForm] = useState<RisetPortalsConfig>({
    lppmUrl: "https://lppm.upitra.ac.id",
    jurnalUrl: "https://jurnal.upitra.ac.id",
    description: "LPPM UPITRA memfasilitasi penelitian berorientasi hilirisasi industri bersama ekosistem Triputra Group serta pengabdian masyarakat berbasis teknologi tepat guna di wilayah Surakarta dan sekitarnya.",
  });
  const [isSavingBanner, setIsSavingBanner] = useState(false);
  const [isSavingPortals, setIsSavingPortals] = useState(false);

  // ── 3. PUBLIKASI JURNAL STATE ──────────────────────────────────────────────
  const [publications, setPublications] = useState<RisetPublicationItem[]>([]);
  const [pubModalOpen, setPubModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState<RisetPublicationItem | null>(null);
  const [pubForm, setPubForm] = useState<RisetPublicationItem>({
    id: "",
    title: "",
    researcher: "",
    faculty: "Fakultas Sains & Teknologi",
    journalName: "",
    indexedIn: "Scopus",
    year: 2026,
    doiOrUrl: "",
    abstractText: "",
  });

  // Load Data
  const loadData = async () => {
    try {
      const [articlesData, bannerData, portalsData, pubsData] = await Promise.all([
        getAllAdminArticles(),
        getPageHeaderBanner("riset"),
        getRisetPortals(),
        getRisetPublications(),
      ]);

      setArticles(articlesData as AdminArticleItem[]);

      if (bannerData) {
        setBannerForm({
          title: bannerData.title || "Riset & Publikasi",
          description: bannerData.description || "",
          imageUrl: bannerData.imageUrl || "/images/kegiatan.jpg",
        });
      }

      if (portalsData) {
        setPortalsForm(portalsData);
      }

      if (pubsData) {
        setPublications(pubsData);
      }
    } catch (err) {
      console.error("Error loading riset admin data:", err);
      showToast("Gagal memuat data riset.", "error");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered & Paginated Articles
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        a.slug.toLowerCase().includes(newsSearch.toLowerCase()) ||
        (a.summary && a.summary.toLowerCase().includes(newsSearch.toLowerCase()));

      const matchCategory =
        newsCategoryFilter === "Semua" || a.category.toLowerCase() === newsCategoryFilter.toLowerCase();

      const matchStatus =
        newsStatusFilter === "ALL"
          ? true
          : newsStatusFilter === "PUBLISHED"
          ? a.published === true
          : a.published === false;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [articles, newsSearch, newsCategoryFilter, newsStatusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredArticles.length / pageSize));
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredArticles.slice(start, start + pageSize);
  }, [filteredArticles, currentPage, pageSize]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [newsSearch, newsCategoryFilter, newsStatusFilter]);

  // Handle Open Create Article
  const handleOpenCreateArticle = () => {
    setNewsForm(emptyNewsForm);
    setManualSlugMode(false);
    setNewsModalOpen(true);
  };

  // Handle Open Edit Article
  const handleOpenEditArticle = (art: AdminArticleItem) => {
    setNewsForm({
      ...art,
      publishedAt: art.publishedAt ? art.publishedAt.split("T")[0] : new Date().toISOString().split("T")[0],
    });
    setManualSlugMode(true);
    setNewsModalOpen(true);
  };

  // Handle Title Change with Auto-Slug
  const handleTitleChange = (newTitle: string) => {
    if (!manualSlugMode && !newsForm.id) {
      const generatedSlug = newTitle
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setNewsForm((prev) => ({ ...prev, title: newTitle, slug: generatedSlug }));
    } else {
      setNewsForm((prev) => ({ ...prev, title: newTitle }));
    }
  };

  // Handle Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) {
      showToast("Judul artikel wajib diisi.", "error");
      return;
    }
    if (!newsForm.content.trim()) {
      showToast("Konten isi artikel tidak boleh kosong.", "error");
      return;
    }

    setIsSubmittingArticle(true);
    try {
      const payload: ArticleInput = {
        title: newsForm.title,
        slug: newsForm.slug ? newsForm.slug.trim() : null,
        category: newsForm.category,
        summary: newsForm.summary || null,
        content: newsForm.content,
        coverImage: newsForm.coverImage || "/images/kegiatan.jpg",
        attachmentUrl: newsForm.attachmentUrl || null,
        attachmentName: newsForm.attachmentName || null,
        attachmentSize: newsForm.attachmentSize || null,
        published: newsForm.published,
        publishedAt: newsForm.publishedAt ? new Date(newsForm.publishedAt).toISOString() : null,
        version: newsForm.version || 1,
      };

      const result = await saveArticleAction(newsForm.id ? newsForm.id : null, payload);
      if (result.ok) {
        showToast(result.message || "Artikel berhasil disimpan.", "success");
        setNewsModalOpen(false);
        await loadData();
      } else {
        showToast(result.message || "Gagal menyimpan artikel.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menyimpan artikel.", "error");
    } finally {
      setIsSubmittingArticle(false);
    }
  };

  // Handle Delete Article
  const handleDeleteArticle = async (id: string) => {
    try {
      const result = await softDeleteArticleAction(id);
      if (result.ok) {
        showToast(result.message || "Artikel berhasil dihapus.", "success");
        setDeleteNewsId(null);
        await loadData();
      } else {
        showToast(result.message || "Gagal menghapus artikel.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Terjadi kesalahan saat menghapus artikel.", "error");
    }
  };

  // Save Banner
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingBanner(true);
    try {
      const res = await savePageHeaderBannerAction("riset", {
        title: bannerForm.title,
        description: bannerForm.description,
        imageUrl: bannerForm.imageUrl,
      });
      if (res.ok) {
        showToast(res.message || "Banner header riset berhasil diperbarui.", "success");
      } else {
        showToast(res.message || "Gagal menyimpan banner header.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Gagal menyimpan banner header.", "error");
    } finally {
      setIsSavingBanner(false);
    }
  };

  // Save Portals
  const handleSavePortals = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingPortals(true);
    try {
      const res = await saveRisetPortalsAction(portalsForm);
      if (res.ok) {
        showToast(res.message || "Pengaturan portal riset berhasil disimpan.", "success");
      } else {
        showToast(res.message || "Gagal menyimpan portal riset.", "error");
      }
    } catch (err: any) {
      showToast(err?.message || "Gagal menyimpan portal riset.", "error");
    } finally {
      setIsSavingPortals(false);
    }
  };

  // Publications Handlers
  const handleOpenCreatePub = () => {
    setEditingPub(null);
    setPubForm({
      id: `rst-${Date.now().toString().slice(-4)}`,
      title: "",
      researcher: "",
      faculty: "Fakultas Sains & Teknologi",
      journalName: "",
      indexedIn: "Scopus",
      year: new Date().getFullYear(),
      doiOrUrl: "",
      abstractText: "",
    });
    setPubModalOpen(true);
  };

  const handleOpenEditPub = (item: RisetPublicationItem) => {
    setEditingPub(item);
    setPubForm(item);
    setPubModalOpen(true);
  };

  const handleSavePub = async (e: React.FormEvent) => {
    e.preventDefault();
    let updated: RisetPublicationItem[];
    if (editingPub) {
      updated = publications.map((p) => (p.id === editingPub.id ? pubForm : p));
    } else {
      updated = [pubForm, ...publications];
    }
    const res = await saveRisetPublicationsAction(updated);
    if (res.ok) {
      setPublications(updated);
      setPubModalOpen(false);
      showToast(res.message || "Publikasi berhasil disimpan.", "success");
    } else {
      showToast(res.message || "Gagal menyimpan publikasi.", "error");
    }
  };

  const handleDeletePub = async (id: string) => {
    const updated = publications.filter((p) => p.id !== id);
    const res = await saveRisetPublicationsAction(updated);
    if (res.ok) {
      setPublications(updated);
      showToast("Publikasi berhasil dihapus.", "success");
    } else {
      showToast("Gagal menghapus publikasi.", "error");
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-xl text-xs font-bold transition-all animate-in slide-in-from-top-4 ${
            toastType === "success"
              ? "bg-emerald-600 text-white"
              : toastType === "error"
              ? "bg-rose-600 text-white"
              : "bg-[#0b2545] text-white"
          }`}
        >
          {toastType === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-200" />
          )}
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Halaman */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              CMS Riset &amp; Inovasi
            </span>
            <span className="text-xs text-slate-400 font-medium">|</span>
            <span className="text-xs text-slate-500 font-semibold">LPPM UPITRA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight">
            Manajemen Riset, Artikel &amp; Publikasi
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
            Kelola publikasi ilmiah, artikel riset sivitas akademika, berkas lampiran resmi, pengaturan banner LPPM, serta tautan portal jurnal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/riset"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Lihat Halaman Publik</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          {activeTab === "berita" && (
            <button
              onClick={handleOpenCreateArticle}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Artikel / Riset Baru</span>
            </button>
          )}

          {activeTab === "publikasi" && (
            <button
              onClick={handleOpenCreatePub}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Publikasi Jurnal</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigasi Tab */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveTab("berita")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "berita"
              ? "bg-[#0b2545] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Berita &amp; Artikel Riset</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-white/20 text-white">
            {articles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("banner_profil")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "banner_profil"
              ? "bg-[#0b2545] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Header Banner &amp; Portal LPPM</span>
        </button>

        <button
          onClick={() => setActiveTab("publikasi")}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === "publikasi"
              ? "bg-[#0b2545] text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Publikasi Jurnal &amp; Riset Terapan</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-200 text-slate-700">
            {publications.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: BERITA & ARTIKEL RISET */}
      {/* ========================================================================= */}
      {activeTab === "berita" && (
        <div className="space-y-6">
          {/* Filter & Pencarian Bar */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative flex-1 w-full sm:w-auto">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari berdasarkan judul, slug, atau ringkasan riset..."
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto shrink-0">
              {/* Filter Kategori */}
              <select
                value={newsCategoryFilter}
                onChange={(e) => setNewsCategoryFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
              >
                {newsCategories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              {/* Filter Status */}
              <select
                value={newsStatusFilter}
                onChange={(e) => setNewsStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs text-slate-700 font-semibold focus:outline-none focus:border-blue-500"
              >
                <option value="ALL">Semua Status</option>
                <option value="PUBLISHED">Diterbitkan (Published)</option>
                <option value="DRAFT">Draf (Draft)</option>
              </select>
            </div>
          </div>

          {/* Tabel Artikel */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase tracking-wider text-[11px] font-bold">
                  <tr>
                    <th className="py-4 px-5">Artikel &amp; Cover</th>
                    <th className="py-4 px-4">Kategori</th>
                    <th className="py-4 px-4">Lampiran Berkas</th>
                    <th className="py-4 px-4">Tanggal Terbit</th>
                    <th className="py-4 px-4 text-center">Status</th>
                    <th className="py-4 px-5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedArticles.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-12 text-center text-slate-400">
                        Tidak ada artikel riset yang sesuai dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    paginatedArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-5">
                          <div className="flex items-start gap-3.5">
                            <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                              <Image
                                src={art.coverImage || "/images/kegiatan.jpg"}
                                alt={art.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="space-y-0.5">
                              <div className="font-bold text-slate-900 text-sm line-clamp-1 hover:text-blue-600">
                                {art.title}
                              </div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                /riset/{art.slug}
                              </div>
                              {art.summary && (
                                <p className="text-xs text-slate-500 line-clamp-1">
                                  {art.summary}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {art.attachmentUrl ? (
                            <a
                              href={art.attachmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold hover:bg-emerald-100 transition-colors"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span className="truncate max-w-[120px]">
                                {art.attachmentName || "Berkas"}
                              </span>
                            </a>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">Tidak ada lampiran</span>
                          )}
                        </td>
                        <td className="py-4 px-4 font-medium text-slate-700">
                          {art.publishedAt ? art.publishedAt.split("T")[0] : art.createdAt.split("T")[0]}
                        </td>
                        <td className="py-4 px-4 text-center">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                              art.published
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {art.published ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/riset/${art.slug}`}
                              target="_blank"
                              title="Lihat Halaman Publik"
                              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleOpenEditArticle(art)}
                              title="Edit Artikel"
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteNewsId(art.id)}
                              title="Hapus Artikel"
                              className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 bg-slate-50/50">
                <div>
                  Menampilkan {Math.min(filteredArticles.length, (currentPage - 1) * pageSize + 1)} -{" "}
                  {Math.min(filteredArticles.length, currentPage * pageSize)} dari total{" "}
                  <strong>{filteredArticles.length}</strong> artikel
                </div>

                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage <= 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentPage(idx + 1)}
                      className={`w-7 h-7 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        currentPage === idx + 1
                          ? "bg-blue-600 text-white shadow-xs"
                          : "hover:bg-slate-100 text-slate-700"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HEADER BANNER & PORTAL LPPM */}
      {/* ========================================================================= */}
      {activeTab === "banner_profil" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Banner Header */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-[#06172e]">
                Header Banner Halaman /riset
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Atur judul, deskripsi pengantar, dan foto cover latar belakang header riset.
              </p>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Judul Utama Banner
                </label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 text-sm font-bold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Deskripsi / Subjudul Banner
                </label>
                <textarea
                  rows={3}
                  required
                  value={bannerForm.description}
                  onChange={(e) => setBannerForm({ ...bannerForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <ImageUploadField
                label="Foto Cover Latar Belakang (1440 x 480 px)"
                value={bannerForm.imageUrl}
                onChange={(url) => setBannerForm({ ...bannerForm, imageUrl: url })}
                recommendedSize="1440 x 480 piksel"
              />

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingBanner}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingBanner ? "Menyimpan..." : "Simpan Banner Header"}
                </button>
              </div>
            </form>
          </div>

          {/* Form Portal Eksternal LPPM & Jurnal */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-black text-[#06172e]">
                Pengaturan Portal LPPM &amp; Jurnal Ilmiah
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Atur tautan menuju situs resmi LPPM dan OJS Jurnal Ilmiah UPITRA.
              </p>
            </div>

            <form onSubmit={handleSavePortals} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL Website Portal LPPM
                </label>
                <input
                  type="url"
                  required
                  value={portalsForm.lppmUrl}
                  onChange={(e) => setPortalsForm({ ...portalsForm, lppmUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 text-xs font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL Portal Jurnal Ilmiah (OJS)
                </label>
                <input
                  type="url"
                  required
                  value={portalsForm.jurnalUrl}
                  onChange={(e) => setPortalsForm({ ...portalsForm, jurnalUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 text-xs font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Deskripsi Profil Riset LPPM
                </label>
                <textarea
                  rows={4}
                  required
                  value={portalsForm.description}
                  onChange={(e) => setPortalsForm({ ...portalsForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 text-xs focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSavingPortals}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSavingPortals ? "Menyimpan..." : "Simpan Tautan Portal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PUBLIKASI JURNAL & RISET TERAPAN */}
      {/* ========================================================================= */}
      {activeTab === "publikasi" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {publications.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {item.indexedIn}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">Tahun {item.year}</span>
                  </div>

                  <h3 className="text-base font-bold text-[#0b2545] leading-snug">
                    {item.title}
                  </h3>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Peneliti:</strong> {item.researcher}</p>
                    <p><strong>Fakultas:</strong> {item.faculty}</p>
                    <p><strong>Jurnal:</strong> {item.journalName}</p>
                  </div>

                  {item.abstractText && (
                    <p className="text-xs text-slate-500 leading-relaxed italic line-clamp-3">
                      &ldquo;{item.abstractText}&rdquo;
                    </p>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={item.doiOrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-blue-600 hover:text-blue-700 font-bold inline-flex items-center gap-1"
                  >
                    <span>Buka DOI / Jurnal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditPub(item)}
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePub(item.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
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

      {/* ========================================================================= */}
      {/* MODAL TAMBAH / EDIT ARTIKEL */}
      {/* ========================================================================= */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200 shrink-0">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-[#06172e]">
                    {newsForm.id ? "Edit Artikel / Riset" : "Tulis Artikel / Riset Baru"}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Lengkapi judul, slug, cover, lampiran dokumen, dan isi artikel dengan rich text editor.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setNewsModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Judul Artikel / Riset *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Inovasi Pemanfaatan Artificial Intelligence pada Industri Manufaktur"
                  value={newsForm.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2.5 rounded-xl text-slate-800 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* Slug Field dengan Toggle Otomatis / Manual */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-700">
                    Slug URL Halaman *
                  </label>
                  <button
                    type="button"
                    onClick={() => setManualSlugMode(!manualSlugMode)}
                    className="text-[11px] text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    {manualSlugMode ? "Beralih ke Auto-Slug" : "Ubah Manual Slug"}
                  </button>
                </div>
                <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 focus-within:border-blue-500 focus-within:bg-white">
                  <span className="text-slate-400 font-mono text-[11px] shrink-0">/riset/</span>
                  <input
                    type="text"
                    required
                    readOnly={!manualSlugMode}
                    placeholder="slug-artikel-otomatis"
                    value={newsForm.slug}
                    onChange={(e) => setNewsForm({ ...newsForm, slug: e.target.value })}
                    className="w-full bg-transparent border-0 px-1 py-2 rounded-xl text-slate-800 font-mono text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {newsCategories.filter((c) => c !== "Semua").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Publikasi *</label>
                  <select
                    value={newsForm.published ? "true" : "false"}
                    onChange={(e) => setNewsForm({ ...newsForm, published: e.target.value === "true" })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white font-bold"
                  >
                    <option value="true">Diterbitkan (Published)</option>
                    <option value="false">Simpan sebagai Draf (Draft)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Terbit</label>
                  <input
                    type="date"
                    value={newsForm.publishedAt || ""}
                    onChange={(e) => setNewsForm({ ...newsForm, publishedAt: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              {/* Cover Image Upload */}
              <ImageUploadField
                label="Foto Sampul Artikel (Cover Image)"
                value={newsForm.coverImage}
                onChange={(url) => setNewsForm({ ...newsForm, coverImage: url })}
                recommendedSize="1200 x 675 piksel (16:9)"
                helperText="Format gambar JPEG, PNG, atau WebP. Maksimal 5 MB."
              />

              {/* File Upload Lampiran */}
              <FileUploadField
                label="Lampiran Berkas Resmi / Dokumen Riset (Opsional)"
                value={newsForm.attachmentUrl}
                onChange={(url) => setNewsForm({ ...newsForm, attachmentUrl: url })}
                fileName={newsForm.attachmentName || ""}
                onFileNameChange={(name) => setNewsForm({ ...newsForm, attachmentName: name })}
                fileSize={newsForm.attachmentSize || ""}
                onFileSizeChange={(size) => setNewsForm({ ...newsForm, attachmentSize: size })}
                helperText="Format PDF atau dokumen resmi. Maksimal 20 MB."
              />

              {/* Ringkasan Singkat */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Ringkasan Eksekutif (Excerpt / Summary)
                </label>
                <textarea
                  rows={2}
                  placeholder="Ringkasan 1-2 kalimat pengantar artikel yang tampil pada kartu pratinjau..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed"
                />
              </div>

              {/* Rich Text Editor Konten */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Isi Konten Lengkap Artikel (Rich Text Editor) *
                </label>
                <RichEditor
                  value={newsForm.content}
                  onChange={(content) => setNewsForm({ ...newsForm, content })}
                  height={240}
                  placeholder="Tuliskan naskah lengkap artikel, metodologi riset, temuan inovasi, atau liputan kegiatan kampus..."
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setNewsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingArticle}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingArticle ? "Menyimpan Artikel..." : "Simpan Artikel"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL TAMBAH / EDIT PUBLIKASI JURNAL */}
      {pubModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-black text-[#06172e]">
                {editingPub ? "Edit Publikasi Jurnal" : "Tambah Publikasi Jurnal"}
              </h3>
              <button
                onClick={() => setPubModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePub} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Karya / Publikasi *</label>
                <input
                  type="text"
                  required
                  value={pubForm.title}
                  onChange={(e) => setPubForm({ ...pubForm, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Peneliti *</label>
                  <input
                    type="text"
                    required
                    value={pubForm.researcher}
                    onChange={(e) => setPubForm({ ...pubForm, researcher: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fakultas *</label>
                  <select
                    value={pubForm.faculty}
                    onChange={(e) => setPubForm({ ...pubForm, faculty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="Fakultas Sains & Teknologi">Fakultas Sains &amp; Teknologi</option>
                    <option value="Fakultas Ekonomi & Bisnis">Fakultas Ekonomi &amp; Bisnis</option>
                    <option value="Fakultas Sosial Humaniora">Fakultas Sosial Humaniora</option>
                    <option value="Fakultas Kesehatan">Fakultas Kesehatan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Nama Jurnal Ilmiah *</label>
                  <input
                    type="text"
                    required
                    value={pubForm.journalName}
                    onChange={(e) => setPubForm({ ...pubForm, journalName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Indeksasi *</label>
                  <select
                    value={pubForm.indexedIn}
                    onChange={(e) => setPubForm({ ...pubForm, indexedIn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="Scopus">Scopus</option>
                    <option value="SINTA 1">SINTA 1</option>
                    <option value="SINTA 2">SINTA 2</option>
                    <option value="SINTA 3">SINTA 3</option>
                    <option value="Internasional">Internasional</option>
                    <option value="Nasional Terakreditasi">Nasional Terakreditasi</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Publikasi *</label>
                  <input
                    type="number"
                    required
                    value={pubForm.year}
                    onChange={(e) => setPubForm({ ...pubForm, year: Number(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">DOI / Tautan Artikel *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://doi.org/..."
                    value={pubForm.doiOrUrl}
                    onChange={(e) => setPubForm({ ...pubForm, doiOrUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 font-mono text-[11px] focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Abstrak / Rincian Riset</label>
                <textarea
                  rows={3}
                  value={pubForm.abstractText}
                  onChange={(e) => setPubForm({ ...pubForm, abstractText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPubModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Publikasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI HAPUS ARTIKEL */}
      {deleteNewsId && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#06172e]">Hapus Artikel Riset?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Artikel ini akan dipindahkan ke kotak sampah dan tidak lagi tampil di halaman publik /riset.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => setDeleteNewsId(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDeleteArticle(deleteNewsId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
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
