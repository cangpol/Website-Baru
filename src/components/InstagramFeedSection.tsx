"use client";

import { useState, useEffect } from "react";
import { 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  RefreshCw, 
  ArrowRight
} from "lucide-react";
import type { InstagramPost } from "@/app/api/instagram/route";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Default posts sorted chronologically (newest first)
const initialPosts: InstagramPost[] = [
  {
    id: "ig_post_01",
    caption: "🌍 Suka petualangan & dunia kreatif? Pilih jurusan sesuai passionmu di S1 Pariwisata UPITRA! Belajar berbasis praktik dengan Immersion industri langsung dan mentor praktisi berpengalaman.",
    mediaUrl: "/images/pariwisata/par-1.jpg",
    permalink: "https://www.instagram.com/upitra_campus/p/Dd7vaD2TQIM/",
    timestamp: "2026-10-26T14:30:00Z",
    timeAgo: "1 hari yang lalu",
    likeCount: 368,
    commentCount: 32,
    category: "S1 Pariwisata",
  },
  {
    id: "ig_post_02",
    caption: "🚀 Siap kerja sebelum wisuda! Mahasiswa UPITRA menjalani Immersion Program 3+1 di berbagai unit bisnis Triputra Group se-Indonesia. Teori di kelas, aksi nyata di industri!",
    mediaUrl: "/images/kegiatan.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-24T09:15:00Z",
    timeAgo: "3 hari yang lalu",
    likeCount: 289,
    commentCount: 19,
    category: "Immersion 3+1",
  },
  {
    id: "ig_post_03",
    caption: "🏆 Bangga! Mahasiswa Fakultas Sains & Teknologi UPITRA kembali memboyong medali kejuaraan inovasi komputasi dan kecerdasan buatan. Integritas dan karakter membuahkan prestasi nyata!",
    mediaUrl: "/images/ar-vr.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-21T11:00:00Z",
    timeAgo: "6 hari yang lalu",
    likeCount: 415,
    commentCount: 34,
    category: "Prestasi Mahasiswa",
  },
  {
    id: "ig_post_04",
    caption: "📚 Suasana belajar modern, interaktif, dan kolaboratif di kampus UPITRA Solo. Fasilitas laboratorium mutakhir dan perpustakaan digital siap mendampingi riset kreatifmu.",
    mediaUrl: "/images/kuliah-1.jpeg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-18T08:20:00Z",
    timeAgo: "1 minggu yang lalu",
    likeCount: 256,
    commentCount: 15,
    category: "Fasilitas Kampus",
  },
  {
    id: "ig_post_05",
    caption: "🤝 Kunjungan industri dan penandatanganan sinergi strategis antara UPITRA dengan mitra korporasi nasional. Menghubungkan kurikulum kampus dengan kebutuhan industri masa depan.",
    mediaUrl: "/images/feb-full.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-14T13:45:00Z",
    timeAgo: "2 minggu yang lalu",
    likeCount: 310,
    commentCount: 22,
    category: "Kemitraan Industri",
  },
  {
    id: "ig_post_06",
    caption: "🎉 Wisuda & Pelepasan Sarjana UPITRA! Lebih dari 90% lulusan telah terserap bekerja di industri nasional dalam waktu kurang dari 3 bulan pasca kelulusan. Selamat berkarya untuk bangsa!",
    mediaUrl: "/images/wisuda.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-10T10:00:00Z",
    timeAgo: "2 minggu yang lalu",
    likeCount: 520,
    commentCount: 47,
    category: "Wisuda & Karir",
  },
];

export default function InstagramFeedSection() {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>("Baru saja");

  // Fetch data secara real-time dari API internal
  const refreshFeed = () => {
    setIsLoading(true);
    fetch("/api/instagram", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          const sorted = [...data.posts].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setPosts(sorted);
          setLastRefreshed("Baru saja");
        }
      })
      .catch((err) => {
        console.warn("Unable to fetch real-time Instagram posts, displaying current synced feed:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;
    fetch("/api/instagram")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
          const sorted = [...data.posts].sort(
            (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
          setPosts(sorted);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 border-b border-slate-200 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* HEADER: Official Instagram Profile Card & Live Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200/80 text-pink-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                <span>Instagram Resmi Kampus</span>
              </span>

              {/* Real-time pulse indicator */}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Feed Terkini</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
              KABAR &amp; CERITA KAMPUS @UPITRA_CAMPUS
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
              Ikuti dinamika kehidupan mahasiswa, inovasi teknologi, pengumuman beasiswa, serta prestasi sivitas akademika langsung dari postingan terbaru Instagram resmi kami.
            </p>
          </div>

          {/* Follow Instagram Button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={refreshFeed}
              disabled={isLoading}
              title={`Segarkan Postingan Terbaru (${lastRefreshed})`}
              className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-blue-600 transition-all shadow-xs active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-blue-600" : ""}`} />
            </button>

            <a
              href="https://www.instagram.com/upitra_campus/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 hover:from-rose-600 hover:via-pink-700 hover:to-purple-700 text-white font-bold text-xs tracking-wide shadow-md shadow-pink-500/20 active:scale-95 transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Ikuti @upitra_campus</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

        </div>

        {/* INSTAGRAM GRID: 6 Posts Ordered Descending (Newest to Oldest) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4.5">
          {posts.slice(0, 6).map((post, idx) => (
            <a
              key={post.id || idx}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-200 border border-slate-200/90 shadow-2xs hover:shadow-xl transition-all duration-300 block"
            >
              {/* Image */}
              <img
                src={post.mediaUrl}
                alt={post.caption}
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes("/images/banners/hero-kampus.jpg")) {
                    target.src = "/images/banners/hero-kampus.jpg";
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />

              {/* Top Category Badge */}
              <div className="absolute top-2 left-2 z-10">
                <span className="px-2 py-0.5 rounded-md bg-[#06172e]/85 backdrop-blur-xs text-[9px] font-bold text-white uppercase tracking-wider border border-white/20">
                  {post.category}
                </span>
              </div>

              {/* Time Tag (Bottom Right) */}
              <div className="absolute bottom-2 right-2 z-10 group-hover:opacity-0 transition-opacity">
                <span className="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-[9px] font-medium text-slate-200">
                  {post.timeAgo}
                </span>
              </div>

              {/* Hover Dark Overlay with Stats & Caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3.5 text-white z-20">
                <div className="flex justify-end">
                  <span className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white">
                    <InstagramIcon className="w-4 h-4" />
                  </span>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] leading-snug text-slate-200 line-clamp-3 font-medium">
                    {post.caption}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-white/20 text-[10px] text-slate-300">
                    <span className="flex items-center gap-1 font-semibold text-rose-300">
                      <Heart className="w-3 h-3 fill-rose-400 text-rose-400" />
                      {post.likeCount}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <MessageCircle className="w-3 h-3" />
                      {post.commentCount}
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* BOTTOM CALL-TO-ACTION */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-3.5">
            <div className="relative w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] p-1 flex items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="UPITRA Instagram"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-[#0b2545] flex items-center gap-1.5">
                <span>@upitra_campus</span>
                <span className="inline-block w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[8px] flex items-center justify-center font-bold">✓</span>
              </div>
              <div className="text-xs text-slate-500">
                Official Instagram of Universitas Pignatelli Triputra Surakarta
              </div>
            </div>
          </div>

          <a
            href="https://www.instagram.com/upitra_campus/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors shrink-0 group"
          >
            <span>Kunjungi Profil Lengkap di Instagram</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}
