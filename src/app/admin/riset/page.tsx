"use client";

import { useState, useEffect, useMemo } from "react";
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
  User,
  Share2,
  AlertCircle,
  FileText,
  Award,
  BookOpen,
  ImagePlus,
  UploadCloud,
  ImageIcon,
  Upload,
  Globe
} from "lucide-react";
import Image from "next/image";
import RichEditor from "@/components/admin/RichEditor";
import { 
  initialAdminArticles, 
  AdminArticleItem, 
  initialAdminRisetList, 
  AdminRisetSection 
} from "@/lib/adminDataStore";

const newsCategories = [
  "Semua",
  "Berita Kampus",
  "Prestasi",
  "Inovasi & Riset",
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
  category: "Berita Kampus",
  summary: "",
  content: "",
  coverImage: "/images/ar-vr.jpg",
  author: "Humas UPITRA",
  published: true,
  publishedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
  viewCount: 1,
};

export default function AdminRisetPage() {
  const [activeTab, setActiveTab] = useState<"berita" | "publikasi">("berita");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // ── 1. BERITA STATE & LOGIC ────────────────────────────────────────────────
  const [articles, setArticles] = useState<AdminArticleItem[]>([]);
  const [newsSearch, setNewsSearch] = useState("");
  const [newsCategoryFilter, setNewsCategoryFilter] = useState("Semua");
  const [newsStatusFilter, setNewsStatusFilter] = useState("ALL");
  const [newsModalOpen, setNewsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<AdminArticleItem | null>(null);
  const [newsForm, setNewsForm] = useState<AdminArticleItem>(emptyNewsForm);
  const [deleteNewsId, setDeleteNewsId] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [showManualCoverUrl, setShowManualCoverUrl] = useState(false);

  const handleCoverFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Berkas yang dipilih harus berupa foto/gambar (JPG, PNG, WebP).");
      return;
    }
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setNewsForm((prev) => ({ ...prev, coverImage: result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveCover = () => {
    setCoverFile(null);
    setNewsForm((prev) => ({ ...prev, coverImage: "" }));
  };

  // ── 2. PUBLIKASI RISET STATE & LOGIC ──────────────────────────────────────
  const [risetItems, setRisetItems] = useState<AdminRisetSection[]>([]);
  const [risetSearch, setRisetSearch] = useState("");
  const [risetFacultyFilter, setRisetFacultyFilter] = useState("ALL");
  const [risetModalOpen, setRisetModalOpen] = useState(false);
  const [editingRiset, setEditingRiset] = useState<AdminRisetSection | null>(null);
  const [risetFormData, setRisetFormData] = useState({
    title: "",
    researcher: "",
    faculty: "Fakultas Sains & Teknologi",
    journalName: "",
    indexedIn: "Scopus" as AdminRisetSection["indexedIn"],
    year: 2026,
    doiOrUrl: "",
    abstractText: "",
  });
  const [deleteRisetId, setDeleteRisetId] = useState<string | null>(null);

  // ── Load from LocalStorage ────────────────────────────────────────────────
  useEffect(() => {
    // Check URL query tab parameter if exists
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "publikasi" || tab === "jurnal") {
        setActiveTab("publikasi");
      }
    }

    // Load Berita
    const savedNews = localStorage.getItem("upitra_admin_articles");
    if (savedNews) {
      try {
        const parsed = JSON.parse(savedNews);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setArticles(parsed);
        } else {
          setArticles(initialAdminArticles);
        }
      } catch {
        setArticles(initialAdminArticles);
      }
    } else {
      setArticles(initialAdminArticles);
      localStorage.setItem("upitra_admin_articles", JSON.stringify(initialAdminArticles));
    }

    // Load Riset
    const savedRiset = localStorage.getItem("upitra_admin_riset");
    if (savedRiset) {
      try {
        const parsed = JSON.parse(savedRiset);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRisetItems(parsed);
        } else {
          setRisetItems(initialAdminRisetList);
        }
      } catch {
        setRisetItems(initialAdminRisetList);
      }
    } else {
      setRisetItems(initialAdminRisetList);
      localStorage.setItem("upitra_admin_riset", JSON.stringify(initialAdminRisetList));
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveNewsToStorage = (updated: AdminArticleItem[]) => {
    setArticles(updated);
    localStorage.setItem("upitra_admin_articles", JSON.stringify(updated));
  };

  const saveRisetToStorage = (updated: AdminRisetSection[]) => {
    setRisetItems(updated);
    localStorage.setItem("upitra_admin_riset", JSON.stringify(updated));
  };

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  // ── BERITA HANDLERS ────────────────────────────────────────────────────────
  const handleOpenCreateNews = () => {
    setEditingArticle(null);
    setCoverFile(null);
    setShowManualCoverUrl(false);
    setNewsForm({
      ...emptyNewsForm,
      publishedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    });
    setNewsModalOpen(true);
  };

  const handleOpenEditNews = (art: AdminArticleItem) => {
    setEditingArticle(art);
    setCoverFile(null);
    setShowManualCoverUrl(false);
    setNewsForm({ ...art });
    setNewsModalOpen(true);
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title.trim()) {
      alert("Judul berita wajib diisi.");
      return;
    }

    const slug = newsForm.slug.trim() || generateSlug(newsForm.title);

    if (editingArticle) {
      const updated = articles.map((a) =>
        a.id === editingArticle.id ? { ...newsForm, slug } : a
      );
      saveNewsToStorage(updated);
      showToast("Berita kampus berhasil diperbarui!");
    } else {
      const newArticle: AdminArticleItem = {
        ...newsForm,
        id: `art-${Date.now().toString().slice(-5)}`,
        slug,
      };
      saveNewsToStorage([newArticle, ...articles]);
      showToast("Berita kampus baru berhasil diterbitkan!");
    }
    setNewsModalOpen(false);
  };

  const handleDeleteNews = (id: string) => {
    const updated = articles.filter((a) => a.id !== id);
    saveNewsToStorage(updated);
    setDeleteNewsId(null);
    showToast("Berita berhasil dihapus.");
  };

  const togglePublishNews = (id: string) => {
    const updated = articles.map((a) =>
      a.id === id ? { ...a, published: !a.published } : a
    );
    saveNewsToStorage(updated);
    showToast("Status publikasi diperbarui.");
  };

  // ── PUBLIKASI RISET HANDLERS ──────────────────────────────────────────────
  const handleOpenCreateRiset = () => {
    setEditingRiset(null);
    setRisetFormData({
      title: "",
      researcher: "",
      faculty: "Fakultas Sains & Teknologi",
      journalName: "",
      indexedIn: "Scopus",
      year: 2026,
      doiOrUrl: "",
      abstractText: "",
    });
    setRisetModalOpen(true);
  };

  const handleOpenEditRiset = (item: AdminRisetSection) => {
    setEditingRiset(item);
    setRisetFormData({
      title: item.title,
      researcher: item.researcher,
      faculty: item.faculty,
      journalName: item.journalName,
      indexedIn: item.indexedIn,
      year: item.year,
      doiOrUrl: item.doiOrUrl,
      abstractText: item.abstractText,
    });
    setRisetModalOpen(true);
  };

  const handleSaveRiset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!risetFormData.title.trim()) {
      alert("Judul publikasi riset wajib diisi.");
      return;
    }

    if (editingRiset) {
      const updated = risetItems.map((r) =>
        r.id === editingRiset.id ? { ...r, ...risetFormData } : r
      );
      saveRisetToStorage(updated);
      showToast("Publikasi riset berhasil diperbarui!");
    } else {
      const newItem: AdminRisetSection = {
        id: `rst-${Date.now()}`,
        ...risetFormData,
      };
      saveRisetToStorage([newItem, ...risetItems]);
      showToast("Publikasi riset baru berhasil ditambahkan!");
    }
    setRisetModalOpen(false);
  };

  const handleDeleteRiset = (id: string) => {
    const updated = risetItems.filter((r) => r.id !== id);
    saveRisetToStorage(updated);
    setDeleteRisetId(null);
    showToast("Publikasi riset berhasil dihapus.");
  };

  // ── Filtered Articles ─────────────────────────────────────────────────────
  const filteredArticles = useMemo(() => {
    return articles.filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(newsSearch.toLowerCase()) ||
        a.summary.toLowerCase().includes(newsSearch.toLowerCase());
      const matchCat = newsCategoryFilter === "Semua" || a.category === newsCategoryFilter;
      const matchStatus =
        newsStatusFilter === "ALL" ||
        (newsStatusFilter === "Published" && a.published) ||
        (newsStatusFilter === "Draft" && !a.published);
      return matchSearch && matchCat && matchStatus;
    });
  }, [articles, newsSearch, newsCategoryFilter, newsStatusFilter]);

  const totalViews = useMemo(() => {
    return articles.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);
  }, [articles]);

  // ── Filtered Riset Items ──────────────────────────────────────────────────
  const filteredRisetItems = useMemo(() => {
    return risetItems.filter((item) => {
      const matchFaculty = risetFacultyFilter === "ALL" || item.faculty.includes(risetFacultyFilter);
      const matchSearch =
        item.title.toLowerCase().includes(risetSearch.toLowerCase()) ||
        item.researcher.toLowerCase().includes(risetSearch.toLowerCase()) ||
        item.journalName.toLowerCase().includes(risetSearch.toLowerCase());
      return matchFaculty && matchSearch;
    });
  }, [risetItems, risetSearch, risetFacultyFilter]);

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/30 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner: Executive Blue & White UPITRA */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/80 uppercase tracking-wider">
              Pusat Publikasi &amp; Riset
            </span>
            <span className="text-xs text-slate-500 font-medium">
              {activeTab === "berita" ? `${articles.length} Berita Kampus` : `${risetItems.length} Publikasi Riset`}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#06172e] tracking-tight flex items-center gap-2.5">
            {activeTab === "berita" ? (
              <>
                <Newspaper className="w-7 h-7 text-blue-600" />
                Manajemen Berita Kampus
              </>
            ) : (
              <>
                <Microscope className="w-7 h-7 text-blue-600" />
                Publikasi &amp; Jurnal Ilmiah
              </>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
            {activeTab === "berita"
              ? "Kelola publikasi siaran pers, prestasi mahasiswa, rilis kemitraan, kegiatan fakultas, dan artikel edukasi resmi UPITRA."
              : "Arsip dan indeksasi jurnal ilmiah bereputasi Scopus, SINTA, IEEE, dan prosiding hasil penelitian sivitas akademika UPITRA."}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {activeTab === "berita" ? (
            <button
              onClick={handleOpenCreateNews}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Berita Baru</span>
            </button>
          ) : (
            <button
              onClick={handleOpenCreateRiset}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Jurnal Riset</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Submenu Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab("berita")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "berita"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:text-[#06172e] hover:bg-slate-100"
          }`}
        >
          <Newspaper className="w-4 h-4" />
          <span>Berita</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "berita" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
            {articles.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("publikasi")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === "publikasi"
              ? "bg-blue-600 text-white shadow-xs"
              : "text-slate-600 hover:text-[#06172e] hover:bg-slate-100"
          }`}
        >
          <Microscope className="w-4 h-4" />
          <span>Publikasi Riset &amp; Jurnal</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${activeTab === "publikasi" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
            {risetItems.length}
          </span>
        </button>
      </div>

      {/* ──────────────── TAB 1: BERITA KAMPUS CRUD ──────────────── */}
      {activeTab === "berita" && (
        <div className="space-y-5">
          {/* KPI Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Berita</div>
              <div className="text-2xl font-black text-[#06172e] mt-1">{articles.length}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Seluruh artikel tercatat</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Terbit (Live)</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">
                {articles.filter((a) => a.published).length}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Dapat dibaca publik</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Draf / Simpan</div>
              <div className="text-2xl font-black text-amber-600 mt-1">
                {articles.filter((a) => !a.published).length}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Belum dipublikasikan</div>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
              <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">Total Pembaca</div>
              <div className="text-2xl font-black text-blue-600 mt-1">{totalViews.toLocaleString("id-ID")}</div>
              <div className="text-[10px] text-slate-400 mt-0.5">Akumulasi views artikel</div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari judul berita atau ringkasan topik..."
                value={newsSearch}
                onChange={(e) => setNewsSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <select
                value={newsCategoryFilter}
                onChange={(e) => setNewsCategoryFilter(e.target.value)}
                className="w-full sm:w-44 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
              >
                {newsCategories.map((c) => (
                  <option key={c} value={c}>{c === "Semua" ? "Semua Kategori" : c}</option>
                ))}
              </select>

              <select
                value={newsStatusFilter}
                onChange={(e) => setNewsStatusFilter(e.target.value)}
                className="w-full sm:w-36 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
              >
                <option value="ALL">Semua Status</option>
                <option value="Published">Published (Live)</option>
                <option value="Draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Table List of Articles */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">No</th>
                    <th className="py-3.5 px-4">Artikel &amp; Ringkasan</th>
                    <th className="py-3.5 px-4">Kategori</th>
                    <th className="py-3.5 px-4">Penulis &amp; Tanggal</th>
                    <th className="py-3.5 px-4 text-center">Views</th>
                    <th className="py-3.5 px-4 text-center">Status</th>
                    <th className="py-3.5 px-4 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredArticles.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-slate-400">
                        Tidak ada artikel berita yang cocok dengan kriteria pencarian.
                      </td>
                    </tr>
                  ) : (
                    filteredArticles.map((art, idx) => (
                      <tr key={art.id} className="hover:bg-blue-50/40 transition-colors">
                        <td className="py-3.5 px-4 text-center font-bold text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4 max-w-sm">
                          <div className="font-bold text-[#06172e] flex items-center gap-1.5 line-clamp-1">
                            <span>{art.title}</span>
                          </div>
                          <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                            {art.summary}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400 font-mono">
                              /{art.slug}
                            </span>
                            <a
                              href={`/riset/${art.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-blue-600 hover:underline inline-flex items-center gap-0.5 font-semibold"
                            >
                              <span>Lihat</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
                            {art.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                            <User className="w-3 h-3 text-blue-600" />
                            <span>{art.author || "Humas UPITRA"}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3 h-3" />
                            <span>{art.publishedAt}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="text-xs font-bold text-slate-700">
                            {art.viewCount ?? 0}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => togglePublishNews(art.id)}
                            title="Klik untuk ubah status"
                            className={`px-2.5 py-1 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                              art.published
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
                            }`}
                          >
                            {art.published ? "Published" : "Draft"}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditNews(art)}
                              title="Edit Berita"
                              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setDeleteNewsId(art.id)}
                              title="Hapus Berita"
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
          </div>
        </div>
      )}

      {/* ──────────────── TAB 2: PUBLIKASI RISET & JURNAL ──────────────── */}
      {activeTab === "publikasi" && (
        <div className="space-y-5">
          {/* Search & Faculty Filter */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari judul riset, nama peneliti, atau nama jurnal..."
                value={risetSearch}
                onChange={(e) => setRisetSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              />
            </div>

            <select
              value={risetFacultyFilter}
              onChange={(e) => setRisetFacultyFilter(e.target.value)}
              className="w-full sm:w-56 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500 focus:bg-white"
            >
              <option value="ALL">Semua Fakultas</option>
              <option value="Sains & Teknologi">Fakultas Sains &amp; Teknologi</option>
              <option value="Ekonomi & Bisnis">Fakultas Ekonomi &amp; Bisnis</option>
              <option value="Sosial Humaniora">Fakultas Sosial Humaniora</option>
              <option value="Kesehatan">Fakultas Kesehatan</option>
            </select>
          </div>

          {/* Cards List for Research Publications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredRisetItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {item.faculty}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {item.indexedIn} • {item.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#06172e] text-sm leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.abstractText}
                  </p>

                  <div className="pt-2 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <User className="w-3.5 h-3.5 text-blue-600" />
                      <span>{item.researcher}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px]">
                      <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                      <span className="italic">{item.journalName}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                  {item.doiOrUrl ? (
                    <a
                      href={item.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 font-bold hover:underline inline-flex items-center gap-1"
                    >
                      <span>Buka DOI / URL</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : <span />}

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditRiset(item)}
                      className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                      title="Edit Jurnal"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteRisetId(item.id)}
                      className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                      title="Hapus Jurnal"
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

      {/* ──────────────── MODAL FORM TAMBAH / EDIT BERITA ──────────────── */}
      {newsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-7">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#06172e] flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-blue-600" />
                  <span>{editingArticle ? "Edit Berita Kampus" : "Tulis Berita Baru"}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Publikasikan informasi, kabar gembira, atau rilis pers resmi Universitas Pignatelli Triputra.
                </p>
              </div>
              <button
                onClick={() => setNewsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNews} className="space-y-4 pt-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  placeholder="Misal: Lulusan UPITRA Sukses Raih Karir Global di Triputra Group"
                  value={newsForm.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setNewsForm({
                      ...newsForm,
                      title,
                      slug: editingArticle ? newsForm.slug : generateSlug(title),
                    });
                  }}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Slug URL (SEO)</label>
                  <input
                    type="text"
                    required
                    placeholder="lulusan-upitra-sukses-raih-karir"
                    value={newsForm.slug}
                    onChange={(e) => setNewsForm({ ...newsForm, slug: generateSlug(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 font-mono text-xs focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Kategori Berita *</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    {newsCategories.filter((c) => c !== "Semua").map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tanggal Rilis</label>
                  <input
                    type="text"
                    placeholder="28 Okt 2026"
                    value={newsForm.publishedAt}
                    onChange={(e) => setNewsForm({ ...newsForm, publishedAt: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Penulis / Sumber</label>
                  <input
                    type="text"
                    placeholder="Humas UPITRA"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status Publikasi</label>
                  <select
                    value={newsForm.published ? "1" : "0"}
                    onChange={(e) => setNewsForm({ ...newsForm, published: e.target.value === "1" })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="1">Published (Terbit Live)</option>
                    <option value="0">Draft (Tersimpan Saja)</option>
                  </select>
                </div>
              </div>

              {/* ── COVER IMAGE DIRECT PHOTO UPLOAD WITH INSTANT PREVIEW ── */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block font-bold text-slate-700">
                    Foto Cover / Gambar Thumbnail *
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowManualCoverUrl(!showManualCoverUrl)}
                    className="text-xs text-blue-600 hover:underline font-semibold cursor-pointer"
                  >
                    {showManualCoverUrl ? "← Upload Berkas Foto" : "Atau masukkan URL gambar"}
                  </button>
                </div>

                {showManualCoverUrl ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="https://... atau /images/ar-vr.jpg"
                      value={newsForm.coverImage}
                      onChange={(e) => setNewsForm({ ...newsForm, coverImage: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white text-xs sm:text-sm"
                    />
                    {newsForm.coverImage && (
                      <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={newsForm.coverImage}
                          alt="Pratinjau Cover"
                          className="h-16 w-24 rounded-xl object-cover border border-blue-300 shadow-2xs"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/images/ar-vr.jpg"; }}
                        />
                        <div className="text-xs">
                          <span className="font-bold text-[#06172e] block">Pratinjau Foto URL:</span>
                          <span className="text-slate-500 text-[11px] truncate block max-w-md">{newsForm.coverImage}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {newsForm.coverImage ? (
                      <div className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-blue-50/50 border border-blue-200/80 shadow-2xs">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={newsForm.coverImage}
                            alt="Pratinjau Cover"
                            className="h-16 w-24 rounded-xl object-cover border border-blue-300 shrink-0 shadow-2xs"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/images/ar-vr.jpg"; }}
                          />
                          <div className="text-xs min-w-0">
                            <span className="font-bold text-[#06172e] block truncate">
                              {coverFile ? coverFile.name : "Foto Cover Aktif"}
                            </span>
                            <span className="text-slate-500 text-[11px]">
                              {coverFile
                                ? `${(coverFile.size / 1024 / 1024).toFixed(2)} MB • Siap disimpan`
                                : "Gambar sampul yang akan ditampilkan di artikel dan beranda"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <label className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-blue-600 border border-slate-200 hover:bg-blue-50 transition-colors cursor-pointer shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Ganti</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/jpg,image/webp"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleCoverFileUpload(file);
                                e.target.value = "";
                              }}
                            />
                          </label>
                          <button
                            type="button"
                            onClick={handleRemoveCover}
                            className="p-1.5 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
                            title="Hapus Foto"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-200 hover:border-blue-400 bg-blue-50/30 hover:bg-blue-50/60 rounded-2xl cursor-pointer transition-all group">
                        <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                          <UploadCloud className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-bold text-[#06172e] mt-2">
                          Klik untuk upload foto cover berita
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          Format PNG, JPG, JPEG, atau WebP (Maksimal 10MB)
                        </span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/jpg,image/webp"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleCoverFileUpload(file);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Ringkasan Singkat (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Ringkasan 1-2 kalimat pengantar berita untuk ditampilkan di kartu cuplikan..."
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* ── KONTEN LENGKAP BERITA DENGAN RICH TEXT EDITOR (FOTO UTUH) ── */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block font-bold text-slate-700">
                    Konten Lengkap Berita
                  </label>
                  <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Dapat menyisipkan foto utuh via tombol &quot;Upload Foto&quot;</span>
                  </span>
                </div>
                <RichEditor
                  value={newsForm.content}
                  onChange={(content) => setNewsForm({ ...newsForm, content })}
                  height={380}
                  placeholder="Tuliskan isi berita selengkapnya di sini. Gunakan tombol 'Upload Foto' di toolbar atas untuk menambahkan foto utuh ke dalam artikel..."
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
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Berita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────── MODAL FORM TAMBAH / EDIT RISET ──────────────── */}
      {risetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl p-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <h3 className="text-lg font-bold text-[#06172e] flex items-center gap-2">
                <Microscope className="w-5 h-5 text-blue-600" />
                <span>{editingRiset ? "Edit Jurnal Riset" : "Tambah Jurnal Riset Baru"}</span>
              </h3>
              <button
                onClick={() => setRisetModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveRiset} className="space-y-4 pt-4 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Judul Riset Ilmiah *</label>
                <input
                  type="text"
                  required
                  placeholder="Judul paper penelitian..."
                  value={risetFormData.title}
                  onChange={(e) => setRisetFormData({ ...risetFormData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Peneliti</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama dosen & tim peneliti..."
                    value={risetFormData.researcher}
                    onChange={(e) => setRisetFormData({ ...risetFormData, researcher: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Fakultas</label>
                  <select
                    value={risetFormData.faculty}
                    onChange={(e) => setRisetFormData({ ...risetFormData, faculty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="Fakultas Sains & Teknologi">Fakultas Sains &amp; Teknologi</option>
                    <option value="Fakultas Ekonomi & Bisnis">Fakultas Ekonomi &amp; Bisnis</option>
                    <option value="Fakultas Sosial Humaniora">Fakultas Sosial Humaniora</option>
                    <option value="Fakultas Kesehatan">Fakultas Kesehatan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Nama Jurnal</label>
                  <input
                    type="text"
                    placeholder="IEEE, JRMBT, dll"
                    value={risetFormData.journalName}
                    onChange={(e) => setRisetFormData({ ...risetFormData, journalName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Indeksasi</label>
                  <select
                    value={risetFormData.indexedIn}
                    onChange={(e) => setRisetFormData({ ...risetFormData, indexedIn: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  >
                    <option value="Scopus">Scopus</option>
                    <option value="SINTA 1">SINTA 1</option>
                    <option value="SINTA 2">SINTA 2</option>
                    <option value="IEEE">IEEE</option>
                    <option value="Prosiding">Prosiding</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tahun Terbit</label>
                  <input
                    type="number"
                    value={risetFormData.year}
                    onChange={(e) => setRisetFormData({ ...risetFormData, year: parseInt(e.target.value) || 2026 })}
                    className="w-full bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">DOI / Link Tautan Paper</label>
                <input
                  type="text"
                  placeholder="https://doi.org/..."
                  value={risetFormData.doiOrUrl}
                  onChange={(e) => setRisetFormData({ ...risetFormData, doiOrUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Abstrak Singkat</label>
                <textarea
                  rows={3}
                  placeholder="Ringkasan abstrak riset..."
                  value={risetFormData.abstractText}
                  onChange={(e) => setRisetFormData({ ...risetFormData, abstractText: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setRisetModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-xs transition-colors cursor-pointer"
                >
                  Simpan Jurnal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ──────────────── MODAL KONFIRMASI HAPUS ──────────────── */}
      {(deleteNewsId || deleteRisetId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md shadow-2xl p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#06172e]">
                {deleteNewsId ? "Hapus Berita Kampus?" : "Hapus Publikasi Riset?"}
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Tindakan ini tidak dapat dibatalkan. Data yang dihapus akan hilang dari sistem dan website.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2.5 pt-2">
              <button
                onClick={() => {
                  setDeleteNewsId(null);
                  setDeleteRisetId(null);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (deleteNewsId) handleDeleteNews(deleteNewsId);
                  if (deleteRisetId) handleDeleteRiset(deleteRisetId);
                }}
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
