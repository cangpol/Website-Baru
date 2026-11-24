"use client";

import { useState, useEffect } from "react";
import { 
  Camera, 
  CheckCircle2, 
  ExternalLink, 
  AlertCircle, 
  Plus,
  Send,
  Layers,
  Check
} from "lucide-react";
import Image from "next/image";
export interface InstagramFeedCard {
  id: string;
  caption: string;
  mediaUrl: string;
  permalink: string;
  timestamp: string;
  timeAgo?: string;
  likeCount: number;
  commentCount: number;
  category?: string;
}

export interface ConnectedInstagramAccount {
  isConnected: boolean;
  username: string;
  displayName: string;
  profilePicUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  connectedAt: string;
  tokenExpiresAt: string;
  source: "official_login" | "graph_api" | "cms";
  recentPosts: InstagramFeedCard[];
}

const initialConnectedInstagramAccount: ConnectedInstagramAccount = {
  isConnected: false,
  username: "upitra_campus",
  displayName: "Universitas Pignatelli Triputra",
  profilePicUrl: "/images/logo.png",
  bio: "Official Account of Universitas Pignatelli Triputra (UPITRA) Surakarta. Membangun Generasi Unggul Berkarakter Triputra.",
  followersCount: 0,
  followingCount: 0,
  postsCount: 0,
  connectedAt: "",
  tokenExpiresAt: "Koneksi Instagram Graph API belum dikonfigurasi",
  source: "cms",
  recentPosts: [],
};

export default function AdminInstagramSyncPage() {
  const [account, setAccount] = useState<ConnectedInstagramAccount>(initialConnectedInstagramAccount);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // New Post Modal State
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    caption: "",
    mediaUrl: "/images/pariwisata/par-1.jpg",
    category: "Prestasi & Kolaborasi",
  });

  const fetchApiFeed = async () => {
    try {
      const res = await fetch("/api/instagram", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Gagal memuat konten feed CMS.");
      }
      setAccount((prev) => ({
        ...prev,
        isConnected: false,
        username: data.account ? data.account.replace("@", "") : prev.username,
        displayName: data.displayName || prev.displayName,
        bio: data.bio || prev.bio,
        postsCount: data.postsCount ?? data.posts?.length ?? 0,
        followersCount: 0,
        followingCount: 0,
        connectedAt: "",
        tokenExpiresAt: data.tokenExpiresAt,
        recentPosts: data.posts || [],
      }));
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Gagal memuat konten feed CMS.");
    }
  };

  // Load feed from API on mount
  useEffect(() => {
    fetchApiFeed();
  }, []);

  const handleAddPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const newPost: InstagramFeedCard = {
      id: `ig_post_${Date.now()}`,
      caption: postForm.caption,
      mediaUrl: postForm.mediaUrl,
      permalink: `https://www.instagram.com/${account.username}/`,
      timestamp: new Date().toISOString(),
      timeAgo: "Baru saja",
      likeCount: 0,
      commentCount: 0,
      category: postForm.category,
    };

    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "ADD_POST",
          post: newPost,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        throw new Error(data?.error || "Gagal menyimpan postingan ke CMS beranda.");
      }

      await fetchApiFeed();
      setIsNewPostModalOpen(false);
      setNotification("Postingan berhasil disimpan ke CMS feed beranda.");
      setPostForm({
        caption: "",
        mediaUrl: "/images/pariwisata/par-1.jpg",
        category: "Prestasi & Kolaborasi",
      });
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Gagal menyimpan postingan ke CMS beranda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-sky-600 text-white shadow-xl shadow-sky-950/40 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-blue-700" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex items-start gap-2.5 text-xs text-blue-600">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-blue-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-widest">
            <Camera className="w-4 h-4 text-blue-600" />
            <span>Manajemen Feed Sosial Kampus</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
            Konten Instagram Beranda
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Feed yang tampil berasal dari CMS beranda dan dapat dikelola di sini. OAuth Instagram Graph API belum dikonfigurasi, jadi akun, jumlah pengikut, dan statistik interaksi tidak disinkronkan.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsNewPostModalOpen(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Postingan CMS</span>
          </button>
        </div>
      </div>

      {/* Account Connection Status Card */}
      <div className="bg-white border border-blue-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Glow Orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-sky-400 via-blue-500 to-blue-600 shadow-lg shrink-0">
                <div className="w-full h-full rounded-full bg-white p-1 overflow-hidden">
                  <Image
                    src={account.profilePicUrl}
                    alt={account.displayName}
                    width={72}
                    height={72}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-[#071a33] bg-sky-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-black text-slate-900">
                  {account.displayName}
                </h2>
                <a
                  href={`https://www.instagram.com/${account.username}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-600 font-mono flex items-center gap-1"
                >
                  @{account.username}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-700 max-w-xl line-clamp-2">
                {account.bio}
              </p>

              <div className="flex items-center gap-4 pt-1 text-xs">
                <div>
                  <span className="font-bold text-slate-900">{account.postsCount}</span>{" "}
                  <span className="text-slate-500">Postingan di CMS beranda</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end justify-center gap-2 bg-white p-4 rounded-2xl border border-blue-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
              <span className="text-xs font-bold text-slate-900">
                FEED CMS AKTIF
              </span>
            </div>
            <div className="text-[11px] text-slate-500">
              {account.tokenExpiresAt}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Sequential Feed Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>5 Postingan Feed Terbaru dari CMS</span>
            </h3>
            <p className="text-xs text-slate-500">
              Postingan berikut ini sama dengan konten feed pada halaman depan.
            </p>
          </div>

          <span className="text-xs text-slate-500">
            Urutan: <span className="text-blue-600 font-bold">Terbaru (#1) &rarr; Terdahulu (#5)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {account.recentPosts.slice(0, 5).map((post, idx) => (
            <div
              key={post.id || idx}
              className="bg-white border border-blue-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-blue-500/50 transition-all group"
            >
              <div className="relative w-full aspect-square bg-blue-50 overflow-hidden">
                <Image
                  src={post.mediaUrl}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-blue-50 backdrop-blur-xs text-[10px] font-bold text-slate-900 flex items-center gap-1 border border-white/10">
                  <span>#{idx + 1}</span>
                  {idx === 0 && <span className="text-blue-600 text-[9px]">BARU</span>}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-blue-600/80 backdrop-blur-xs text-[9px] font-bold text-white">
                  {post.category || "Feed"}
                </div>
              </div>

              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-700 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>

                <div className="pt-2 border-t border-blue-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>{post.timeAgo || "Tersimpan di CMS"}</span>
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-900 transition"
                    title="Buka di Instagram"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center overflow-y-auto p-4 bg-blue-50 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border border-blue-200 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-200">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                <span>Tambah Postingan ke CMS Beranda</span>
              </h3>
              <button onClick={() => setIsNewPostModalOpen(false)} className="p-1 text-slate-500 hover:text-slate-900">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPostSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Caption / Teks Postingan</label>
                <textarea
                  required
                  rows={4}
                  value={postForm.caption}
                  onChange={(e) => setPostForm({ ...postForm, caption: e.target.value })}
                  placeholder="Tuliskan keterangan postingan terbaru dari @upitra_campus..."
                  className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pilih URL Foto / Media</label>
                <select
                  value={postForm.mediaUrl}
                  onChange={(e) => setPostForm({ ...postForm, mediaUrl: e.target.value })}
                  className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                >
                  <option value="/images/pariwisata/par-1.jpg">Foto Pariwisata & Immersion (/images/pariwisata/par-1.jpg)</option>
                  <option value="/images/upitra-1.jpeg">Gedung Kampus UPITRA (/images/upitra-1.jpeg)</option>
                  <option value="/images/kegiatan.jpg">Kegiatan Mahasiswa (/images/kegiatan.jpg)</option>
                  <option value="/images/ar-vr.jpg">Inovasi Laboratorium FST (/images/ar-vr.jpg)</option>
                  <option value="/images/prestasi.jpeg">Prestasi Akademik (/images/prestasi.jpeg)</option>
                  <option value="/images/kuliah-1.jpeg">Suasana Kuliah Interaktif (/images/kuliah-1.jpeg)</option>
                </select>
              </div>

              <div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Kategori Badge</label>
                  <input
                    type="text"
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full bg-white border border-blue-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-100">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-blue-100 text-slate-700 hover:text-slate-900"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90 text-white font-bold cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{loading ? "Mempublikasikan..." : "Publikasikan ke Feed Beranda"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
