"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import type { InstagramPost } from "@/app/api/instagram/route";

const initialPosts: InstagramPost[] = [
  {
    id: "ig_post_01",
    caption: "✨ Prestasi Mahasiswa UPITRA dalam ajang kompetisi nasional 2026.",
    mediaUrl: "/images/instagram/ig-1.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-28T10:30:00Z",
    timeAgo: "1 hari yang lalu",
    likeCount: 384,
    commentCount: 42,
    category: "PRESTASI MAHASISWA",
  },
  {
    id: "ig_post_02",
    caption: "🎓 Kegiatan kampus dan perkuliahan interaktif mahasiswa UPITRA.",
    mediaUrl: "/images/instagram/ig-2.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-25T14:15:00Z",
    timeAgo: "4 hari yang lalu",
    likeCount: 512,
    commentCount: 39,
    category: "KEGIATAN KAMPUS",
  },
  {
    id: "ig_post_03",
    caption: "🔥 Info Beasiswa PMB UPITRA 2026 potongan UKT & DPP hingga 100%.",
    mediaUrl: "/images/instagram/ig-3.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-22T09:00:00Z",
    timeAgo: "6 hari yang lalu",
    likeCount: 890,
    commentCount: 95,
    category: "INFO BEASISWA PMB",
  },
  {
    id: "ig_post_04",
    caption: "📚 Fasilitas kampus modern, laboratorium komputer, dan perpustakaan digital.",
    mediaUrl: "/images/instagram/ig-4.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-20T08:20:00Z",
    timeAgo: "1 minggu yang lalu",
    likeCount: 256,
    commentCount: 15,
    category: "FASILITAS KAMPUS",
  },
  {
    id: "ig_post_05",
    caption: "🤝 Kemitraan industri strategis dengan puluhan unit bisnis Triputra Group.",
    mediaUrl: "/images/instagram/ig-5.jpg",
    permalink: "https://www.instagram.com/upitra_campus/",
    timestamp: "2026-10-15T13:45:00Z",
    timeAgo: "2 minggu yang lalu",
    likeCount: 420,
    commentCount: 28,
    category: "KEMITRAAN INDUSTRI",
  },
];

export default function KabarCeritaKampus() {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts);

  // Connect dynamically to Instagram Basic Display API endpoint
  useEffect(() => {
    async function loadFeed() {
      try {
        const res = await fetch("/api/instagram");
        if (res.ok) {
          const data = await res.json();
          if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
            setPosts(data.posts.slice(0, 5));
          }
        }
      } catch {
        // Graceful fallback to initial posts
      }
    }
    loadFeed();
  }, []);

  return (
    <section 
      className="w-full bg-[#cce1f2] py-14 sm:py-16 lg:py-20 select-none overflow-hidden" 
      aria-label="Kabar & Cerita Kampus Instagram Feed"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px]">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-2 mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-black text-[#006bbd] tracking-tight font-sans uppercase">
            KABAR & CERITA KAMPUS
          </h2>
          <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Ikuti dinamika kehidupan mahasiswa, pengumuman beasiswa, serta sivitas akademika langsung dari postingan terbaru Instagram @upitra_campus.
          </p>
        </motion.div>

        {/* 5 Instagram Post Cards (1440x662 Specification) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-4.5">
          {posts.map((post, idx) => (
            <motion.div
              key={post.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <Link
                href={post.permalink || "https://www.instagram.com/upitra_campus/"}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[125/171] w-full rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 border border-white/60 bg-slate-900"
              >
                {/* Background Post Photo */}
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || "Instagram post UPITRA"}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 pointer-events-none"
                />

                {/* Top-Left Category Badge */}
                <span className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] sm:text-[9.5px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider z-10 shadow-xs">
                  {post.category || "UPITRA"}
                </span>

                {/* Bottom-Right Time Ago Badge */}
                <span className="absolute bottom-2.5 right-2.5 bg-slate-900/80 backdrop-blur-xs text-white text-[8.5px] sm:text-[9px] font-medium px-2 py-0.5 rounded-md z-10 shadow-xs">
                  {post.timeAgo || "Terbaru"}
                </span>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center text-[#006bbd] shadow-md transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Card: Official Instagram Account Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-white/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 lg:mt-10"
        >
          {/* Left: Account Identity */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-10 h-10 shrink-0">
              <Image
                src="/images/logo-upitra.png"
                alt="Logo UPITRA"
                fill
                sizes="40px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base text-slate-900 font-sans">
                  @upitra_campus
                </span>
                <CheckCircle2 className="w-4 h-4 text-blue-500 fill-blue-500 text-white shrink-0" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Official Instagram of Universitas Pignatelli Triputra Surakarta
              </span>
            </div>
          </div>

          {/* Right: Direct Profile Link */}
          <Link
            href="https://www.instagram.com/upitra_campus/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#006bbd] hover:underline hover:text-blue-700 transition-colors shrink-0"
          >
            <span>Kunjungi Profil Lengkap di Instagram</span>
            <span className="text-base leading-none">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}

