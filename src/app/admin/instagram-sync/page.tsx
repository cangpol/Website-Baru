"use client";

import { useState, useEffect } from "react";
import { 
  Camera, 
  RefreshCw, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Clock, 
  AlertCircle, 
  Sparkles,
  Heart,
  MessageCircle,
  Wifi,
  LogOut,
  LogIn,
  Key,
  User,
  Image as ImageIcon,
  Plus,
  Send,
  Layers,
  Check
} from "lucide-react";
import Image from "next/image";
import { initialConnectedInstagramAccount, ConnectedInstagramAccount, InstagramFeedCard } from "@/lib/adminDataStore";

export default function AdminInstagramSyncPage() {
  const [account, setAccount] = useState<ConnectedInstagramAccount>(initialConnectedInstagramAccount);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "upitra_campus",
    password: "",
    accessToken: "",
    rememberSession: true,
  });

  // New Post Modal State
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    caption: "",
    mediaUrl: "/images/pariwisata/par-1.jpg",
    category: "Prestasi & Kolaborasi",
    likeCount: 450,
    commentCount: 38,
  });

  // Load persisted session on mount
  useEffect(() => {
    const saved = localStorage.getItem("upitra_ig_connected_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAccount(parsed);
      } catch {
        // use default
      }
    }
    // Also sync from API
    fetchApiFeed();
  }, []);

  const saveSession = (acc: ConnectedInstagramAccount) => {
    setAccount(acc);
    localStorage.setItem("upitra_ig_connected_session", JSON.stringify(acc));
  };

  const fetchApiFeed = async () => {
    try {
      const res = await fetch("/api/instagram", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (data && data.posts) {
          setAccount((prev) => ({
            ...prev,
            isConnected: data.isConnected !== undefined ? data.isConnected : prev.isConnected,
            username: data.account ? data.account.replace("@", "") : prev.username,
            recentPosts: data.posts,
          }));
        }
      }
    } catch {
      // ignore
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const cleanUser = loginForm.username.replace("@", "").trim() || "upitra_campus";

    try {
      const res = await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "LOGIN",
          username: cleanUser,
          displayName: cleanUser === "upitra_campus" ? "Universitas Pignatelli Triputra" : `@${cleanUser}`,
        }),
      });

      if (res.ok) {
        const updatedAccount: ConnectedInstagramAccount = {
          ...account,
          isConnected: true,
          username: cleanUser,
          displayName: cleanUser === "upitra_campus" ? "Universitas Pignatelli Triputra" : `@${cleanUser}`,
          connectedAt: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) + " • " + new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB",
          tokenExpiresAt: "Permanen (Sampai Logout Manual)",
        };
        saveSession(updatedAccount);
        setIsLoginModalOpen(false);
        setNotification(`Akun Instagram @${cleanUser} berhasil terhubung! Akun ini akan tetap aktif sampai Anda menekan tombol Logout.`);
      } else {
        setErrorMsg("Gagal melakukan otentikasi login Instagram. Silakan cek kembali.");
      }
    } catch {
      setErrorMsg("Gagal terhubung ke gateway Instagram.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    if (!confirm("Apakah Anda yakin ingin memutuskan sambungan akun Instagram ini?")) return;

    setLoading(true);
    try {
      await fetch("/api/instagram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "LOGOUT" }),
      });

      const disconnected: ConnectedInstagramAccount = {
        ...account,
        isConnected: false,
        tokenExpiresAt: "Terputus",
      };
      saveSession(disconnected);
      setNotification("Akun Instagram resmi berhasil diputuskan sambungannya.");
    } catch {
      setErrorMsg("Gagal memutuskan sambungan akun.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newPost: InstagramFeedCard = {
      id: `ig_post_${Date.now()}`,
      caption: postForm.caption,
      mediaUrl: postForm.mediaUrl,
      permalink: `https://www.instagram.com/${account.username}/`,
      timestamp: new Date().toISOString(),
      timeAgo: "Baru saja",
      likeCount: Number(postForm.likeCount) || 350,
      commentCount: Number(postForm.commentCount) || 24,
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

      const updatedPosts = [newPost, ...account.recentPosts].slice(0, 5);
      const updatedAccount: ConnectedInstagramAccount = {
        ...account,
        postsCount: account.postsCount + 1,
        recentPosts: updatedPosts,
      };

      saveSession(updatedAccount);
      setIsNewPostModalOpen(false);
      setNotification("Postingan terbaru berhasil disinkronisasi ke urutan #1 beranda website secara Real-Time!");
      setPostForm({
        caption: "",
        mediaUrl: "/images/pariwisata/par-1.jpg",
        category: "Prestasi & Kolaborasi",
        likeCount: 450,
        commentCount: 38,
      });
    } catch {
      setErrorMsg("Gagal mempublikasikan postingan ke feed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 text-xs font-bold animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{notification}</span>
        </div>
      )}

      {/* Error Alert */}
      {errorMsg && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-blue-900/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest">
            <Camera className="w-4 h-4 text-pink-400" />
            <span>Pusat Integrasi Media Sosial Kampus</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Sinkronisasi Akun Instagram Real-Time
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Kelola otentikasi login Instagram resmi. Feed website beranda akan menampilkan postingan akun yang login ini secara berurutan (#1 sampai #5). Akun tetap terhubung sampai Anda menekan tombol Logout.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {account.isConnected ? (
            <>
              <button
                onClick={() => setIsNewPostModalOpen(true)}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:opacity-90 text-white text-xs font-bold shadow-md shadow-pink-600/30 transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Trigger Update Feed (#1)</span>
              </button>

              <button
                onClick={handleLogout}
                disabled={loading}
                className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Instagram</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-pink-600/30 transition cursor-pointer"
            >
              <LogIn className="w-4 h-4" />
              <span>Hubungkan Akun Instagram</span>
            </button>
          )}
        </div>
      </div>

      {/* Account Connection Status Card */}
      <div className="bg-[#071a33] border border-blue-900/50 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        {/* Glow Orb */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full p-1 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 shadow-lg shrink-0">
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
              <span className={`absolute bottom-0 right-0 w-5 h-5 rounded-full border-2 border-[#071a33] flex items-center justify-center ${
                account.isConnected ? "bg-emerald-500" : "bg-rose-500"
              }`}>
                {account.isConnected ? (
                  <Check className="w-3 h-3 text-white" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-white" />
                )}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg font-black text-white">
                  {account.displayName}
                </h2>
                <a
                  href={`https://www.instagram.com/${account.username}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1"
                >
                  @{account.username}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <p className="text-xs text-slate-300 max-w-xl line-clamp-2">
                {account.bio}
              </p>

              <div className="flex items-center gap-4 pt-1 text-xs">
                <div>
                  <span className="font-bold text-white">{account.postsCount}</span>{" "}
                  <span className="text-slate-400">Postingan</span>
                </div>
                <div>
                  <span className="font-bold text-white">{account.followersCount.toLocaleString("id-ID")}</span>{" "}
                  <span className="text-slate-400">Pengikut</span>
                </div>
                <div>
                  <span className="font-bold text-white">{account.followingCount}</span>{" "}
                  <span className="text-slate-400">Mengikuti</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end justify-center gap-2 bg-[#051326]/80 p-4 rounded-2xl border border-blue-900/50">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${account.isConnected ? "bg-emerald-400 animate-pulse" : "bg-rose-400"}`} />
              <span className="text-xs font-bold text-white">
                {account.isConnected ? "TERHUBUNG LIVE REAL-TIME" : "TIDAK TERHUBUNG"}
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Sesi: <span className="text-amber-300 font-medium">{account.tokenExpiresAt}</span>
            </div>
            <div className="text-[10px] text-slate-500">
              Terhubung sejak: {account.connectedAt}
            </div>
          </div>
        </div>
      </div>

      {/* 5 Sequential Feed Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-sky-400" />
              <span>5 Postingan Feed Berurutan (#1 Terbaru s/d #5)</span>
            </h3>
            <p className="text-xs text-slate-400">
              Postingan berikut ini tampil langsung di baris Instagram Feed beranda utama.
            </p>
          </div>

          <span className="text-xs text-slate-400">
            Urutan: <span className="text-amber-300 font-bold">Terbaru (#1) &rarr; Terdahulu (#5)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {account.recentPosts.slice(0, 5).map((post, idx) => (
            <div
              key={post.id || idx}
              className="bg-[#071a33] border border-blue-900/50 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-pink-500/50 transition-all group"
            >
              <div className="relative w-full aspect-square bg-blue-950/80 overflow-hidden">
                <Image
                  src={post.mediaUrl}
                  alt={post.caption}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white flex items-center gap-1 border border-white/10">
                  <span>#{idx + 1}</span>
                  {idx === 0 && <span className="text-pink-400 text-[9px]">BARU</span>}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-pink-600/80 backdrop-blur-xs text-[9px] font-bold text-white">
                  {post.category || "Feed"}
                </div>
              </div>

              <div className="p-3 space-y-2 flex-1 flex flex-col justify-between">
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.caption}
                </p>

                <div className="pt-2 border-t border-blue-900/40 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-rose-400">
                      <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                      {post.likeCount}
                    </span>
                    <span className="flex items-center gap-1 text-sky-400">
                      <MessageCircle className="w-3 h-3" />
                      {post.commentCount}
                    </span>
                  </div>

                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-white transition"
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

      {/* Instagram Login Modal */}
      {isLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#071a33] border border-blue-900/80 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="text-center space-y-2 pb-2 border-b border-blue-900/60">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center text-white mx-auto shadow-lg shadow-pink-600/30">
                <Camera className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-black text-white">
                Hubungkan Akun Instagram
              </h3>
              <p className="text-xs text-slate-400">
                Masuk dengan kredensial akun Instagram resmi UPITRA untuk sinkronisasi feed beranda secara permanen.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Nama Pengguna (Username)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    placeholder="upitra_campus"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Kata Sandi / Kunci Akses Akun
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl pl-10 pr-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberSession"
                  checked={loginForm.rememberSession}
                  onChange={(e) => setLoginForm({ ...loginForm, rememberSession: e.target.checked })}
                  className="rounded border-blue-900 text-pink-500 focus:ring-pink-400"
                />
                <label htmlFor="rememberSession" className="text-slate-300 text-[11px]">
                  Tetap sambungkan akun ini sampai saya menekan tombol Logout
                </label>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-900/40">
                <button
                  type="button"
                  onClick={() => setIsLoginModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:opacity-90 text-white font-bold shadow-lg shadow-pink-600/30 cursor-pointer disabled:opacity-50"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{loading ? "Menghubungkan..." : "Masuk & Hubungkan"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Trigger New Post Modal */}
      {isNewPostModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#071a33] border border-blue-900/80 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-blue-900/60">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-pink-400" />
                <span>Terbitkan Postingan Baru Real-Time (#1)</span>
              </h3>
              <button onClick={() => setIsNewPostModalOpen(false)} className="p-1 text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPostSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Caption / Teks Postingan</label>
                <textarea
                  required
                  rows={4}
                  value={postForm.caption}
                  onChange={(e) => setPostForm({ ...postForm, caption: e.target.value })}
                  placeholder="Tuliskan keterangan postingan terbaru dari @upitra_campus..."
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Pilih URL Foto / Media</label>
                <select
                  value={postForm.mediaUrl}
                  onChange={(e) => setPostForm({ ...postForm, mediaUrl: e.target.value })}
                  className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="/images/pariwisata/par-1.jpg">Foto Pariwisata & Immersion (/images/pariwisata/par-1.jpg)</option>
                  <option value="/images/upitra-1.jpeg">Gedung Kampus UPITRA (/images/upitra-1.jpeg)</option>
                  <option value="/images/kegiatan.jpg">Kegiatan Mahasiswa (/images/kegiatan.jpg)</option>
                  <option value="/images/ar-vr.jpg">Inovasi Laboratorium FST (/images/ar-vr.jpg)</option>
                  <option value="/images/prestasi.jpeg">Prestasi Akademik (/images/prestasi.jpeg)</option>
                  <option value="/images/kuliah-1.jpeg">Suasana Kuliah Interaktif (/images/kuliah-1.jpeg)</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Kategori Badge</label>
                  <input
                    type="text"
                    value={postForm.category}
                    onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Estimasi Suka (Likes)</label>
                  <input
                    type="number"
                    value={postForm.likeCount}
                    onChange={(e) => setPostForm({ ...postForm, likeCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Komentar</label>
                  <input
                    type="number"
                    value={postForm.commentCount}
                    onChange={(e) => setPostForm({ ...postForm, commentCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-[#051326] border border-blue-900/60 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-blue-900/40">
                <button
                  type="button"
                  onClick={() => setIsNewPostModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:opacity-90 text-white font-bold cursor-pointer disabled:opacity-50"
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
