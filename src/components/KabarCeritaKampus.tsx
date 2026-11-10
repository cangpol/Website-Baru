"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { HomepageInstagram, HomepageInstagramPost, defaultHomepageInstagram } from "@/lib/homepageData";

export default function KabarCeritaKampus({ initialData }: { initialData?: HomepageInstagram }) {
  const [igData, setIgData] = useState<HomepageInstagram>(initialData || defaultHomepageInstagram);
  const [posts, setPosts] = useState<HomepageInstagramPost[]>(() => (initialData?.posts ? initialData.posts : defaultHomepageInstagram.posts));

  // Connect dynamically to Instagram data via homepage API
  useEffect(() => {
    if (!initialData) {
      fetch("/api/homepage")
        .then((res) => res.json())
        .then((json) => {
          if (json?.ok && json.data?.instagram) {
            setIgData(json.data.instagram);
            if (Array.isArray(json.data.instagram.posts) && json.data.instagram.posts.length > 0) {
              setPosts(json.data.instagram.posts);
            }
          }
        })
        .catch(() => {});
    }
  }, [initialData]);

  return (
    <section 
      className="w-full bg-white py-14 sm:py-16 lg:py-20 select-none overflow-hidden"
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
            {igData.title}
          </h2>
          <p className="text-xs sm:text-sm lg:text-[14.5px] text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            {igData.subtitle}
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
                href={post.permalink || igData.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative aspect-[5/4] rounded-lg overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-blue-950 border border-slate-100"
              >
                {/* Background Image */}
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || post.category}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-108 transition-transform duration-500 pointer-events-none"
                />

                {/* Dark Gradient Overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-950/20 to-transparent pointer-events-none" />

                {/* Top Category Tag (Figma 1440x662 Spec: Rounded pill, black translucent background) */}
                <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex justify-start">
                  <span className="px-2.5 py-1 rounded-md bg-blue-950/80 backdrop-blur-xs text-[9px] sm:text-[10px] font-bold text-white uppercase tracking-wider font-sans border border-white/10">
                    {post.category}
                  </span>
                </div>

                {/* Bottom Timestamp & External Arrow Icon on hover */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-center justify-between text-white/90">
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-200">
                    {post.timeAgo}
                  </span>
                  <span className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-xs">
                    ↗
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom Banner Card: Direct Profile Link to @upitra_campus */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 lg:mt-10"
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
                  {igData.handle}
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
            href={igData.profileUrl}
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
