"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const stats = [
  { value: "109+", label: "Mitra Industri" },
  { value: "107+", label: "Kerjasama Nasional" },
  { value: "2", label: "Kerjasama Internasional" },
  { value: "109+", label: "Program Kolaborasi" },
];

// shortcut: partner grid uses names from the mitra-kerjasama page and the UPITRA logo as placeholder; wire to the mitra CMS data when exposed via API
const partners = [
  "PT Adi Sarana Armada Tbk",
  "PT Triputra Agro Persada Tbk",
  "PT Dharma Polimetal Tbk",
  "PT Kirana Megatara Tbk",
  "PT Puninar Logistics",
  "PT Daya Adicipta Mustika",
  "Bursa Efek Indonesia",
  "PT Bank Central Asia Tbk",
  "PT Bank Mandiri Tbk",
  "RS Kasih Ibu Surakarta",
];

// shortcut: placeholder gallery entries (same text as the design); replace with data from /api/articles or the kegiatan CMS
const kegiatan = [
  { tag: "Education", image: "/images/kegiatan.jpg" },
  { tag: "Education", image: "/images/wisuda.jpg" },
  { tag: "Education", image: "/images/kampus-1.jpg" },
  { tag: "Awarding", image: "/images/anugerah.jpg" },
].map((k) => ({
  ...k,
  title: "MoU UPITRA dan SMA Marsudirini Muntilan",
  desc: "Universitas Pignatelli Triputra menandatangani nota kesepahaman dengan SMA Marsudirini Muntilan untuk memperluas kolaborasi pendidikan dan program pengembangan siswa.",
}));

const pad = "mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-[120px]";

export default function KerjasamaIndexPage() {
  const [bannerImage, setBannerImage] = useState("/images/gedung-upitra.jpg");

  useEffect(() => {
    fetch("/api/banner?page=kerjasama")
      .then((res) => res.json())
      .then((json) => json?.ok && json.data?.imageUrl && setBannerImage(json.data.imageUrl))
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner 1440x480 */}
        <section className="relative isolate h-[320px] w-full overflow-hidden bg-[#006bbd] sm:h-[400px] lg:h-[480px]" aria-label="Kerjasama">
          <Image src={bannerImage} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#006bbd]/80 via-[#006bbd]/40 to-transparent" />
          <div className={`${pad} flex h-full flex-col justify-end pb-10 lg:pb-20`}>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-[56px]">
              Jejaring, Kemitraan,
              <br />
              &amp; Sinergi Industri
            </h1>
            <p className="mt-3 max-w-[560px] text-xs font-medium leading-snug text-white">
              Membangun kolaborasi strategis bersama industri, pemerintah, dan institusi pendidikan.
            </p>
          </div>
        </section>

        {/* Biro Kerjasama */}
        <section className={`${pad} py-10 lg:py-14`}>
          <h2 className="text-2xl font-bold text-[#006bbd]">Biro Kerjasama UPITRA</h2>
          <p className="mt-3 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
            Biro Kerjasama Universitas Pignatelli Triputra bertugas mengembangkan, mengelola, dan memelihara jejaring kemitraan dengan dunia usaha dan dunia industri, pemerintah, serta institusi pendidikan. Biro memfasilitasi penyusunan kesepakatan, pelaksanaan program kolaborasi, serta pengembangan peluang magang, rekrutmen, dan riset bersama untuk meningkatkan kompetensi mahasiswa dan relevansi pendidikan dengan kebutuhan industri.
          </p>
        </section>

        {/* Angka Mitra Kerjasama */}
        <section className="bg-[#e6f0fb] py-10 lg:py-12">
          <div className={`${pad} text-center`}>
            <h2 className="text-2xl font-bold text-[#006bbd]">Angka Mitra Kerjasama</h2>
            <p className="mt-1 text-xs text-slate-600">Ringkasan jejaring kerjasama UPITRA dengan berbagai mitra.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white px-4 py-6 shadow-sm">
                  <div className="text-3xl font-extrabold text-[#006bbd] lg:text-4xl">{s.value}</div>
                  <div className="mt-1 text-xs font-semibold text-slate-700">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mitra Kerjasama */}
        <section className={`${pad} py-10 lg:py-14`}>
          <h2 className="text-2xl font-bold text-[#006bbd]">Mitra Kerjasama</h2>
          <p className="mt-1 text-xs text-slate-600">Mitra industri dan institusi yang bekerja sama dengan UPITRA.</p>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((name) => (
              <div key={name} className="flex flex-col items-center rounded-lg border border-[#006bbd]/40 bg-white px-3 py-4 text-center">
                <div className="relative h-10 w-10">
                  <Image src="/images/logo-upitra.png" alt="" fill sizes="40px" className="object-contain" />
                </div>
                <div className="mt-2 text-[11px] font-bold leading-tight text-slate-900">{name}</div>
                <div className="mt-0.5 text-[9px] text-slate-500">Mitra UPITRA</div>
              </div>
            ))}
          </div>
          <div className="mt-5 text-right">
            <Link href="/kerjasama/mitra-kerjasama" className="inline-flex items-center gap-1 text-xs font-semibold text-[#006bbd] hover:underline">
              Selengkapnya <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Galeri Kegiatan Kerjasama */}
        <section className="bg-[#e6f0fb] py-10 lg:py-12">
          <div className={pad}>
            <h2 className="text-2xl font-bold text-[#006bbd]">Galeri Kegiatan Kerjasama</h2>
            <p className="mt-1 text-xs text-slate-600">Dokumentasi kegiatan kerjasama UPITRA dengan mitra.</p>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {kegiatan.map((k, i) => (
                <article key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className="relative aspect-[16/9] w-full bg-slate-200">
                    <Image src={k.image} alt="" fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-semibold text-[#006bbd]">{k.tag}</span>
                    <h3 className="mt-1 text-sm font-bold text-slate-900">{k.title}</h3>
                    <p className="mt-1 line-clamp-3 text-[11px] leading-relaxed text-slate-600">{k.desc}</p>
                    <div className="mt-3 text-right">
                      <Link href="/kerjasama/kegiatan-kerjasama" className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#006bbd] hover:underline">
                        Selengkapnya <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-6 text-right">
              <Link href="/kerjasama/kegiatan-kerjasama" className="inline-flex items-center gap-1 text-xs font-semibold text-[#006bbd] hover:underline">
                Kegiatan Selengkapnya <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
