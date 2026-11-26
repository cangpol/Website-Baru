"use client";

import ProfilVideo from "@/components/ProfilVideo";
import { usePageContent } from "@/lib/usePageContent";
import { youtubeId } from "@/lib/youtube";

export default function ProfilVideoSection() {
  // Judul dan deskripsi diatur di Admin → Profil & Pimpinan → Tentang UPITRA.
  const { content: c } = usePageContent("profil-tentang") as { content: Record<string, any> };
  const videoId = youtubeId(String(c.videoUrl ?? ""));
  if (!videoId) return null; // tautan dikosongkan dari admin

  return (
    <section className="w-full bg-[#c5ddf1]" aria-labelledby="video-profil-heading">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-12 lg:px-[120px] lg:py-14">
        <div className="mb-6 space-y-2 text-left lg:ml-auto lg:max-w-3xl lg:text-right">
          <h2
            id="video-profil-heading"
            className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl"
          >
            {c.videoJudul}
          </h2>
          <p className="text-xs leading-relaxed text-slate-800 sm:text-[13px]">{c.videoDeskripsi}</p>
        </div>
        <ProfilVideo videoId={videoId} />
      </div>
    </section>
  );
}
