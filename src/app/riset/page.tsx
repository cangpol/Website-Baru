"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const defaultPortals = {
  lppmUrl: "https://lppm.upitra.ac.id",
  jurnalUrl: "https://jurnal.upitra.ac.id",
};

const stats = [
  { value: "625+", label: "Publikasi" },
  { value: "2013+", label: "Pengabdian" },
  { value: "1689", label: "Penelitian" },
  { value: "70+", label: "Kolaborasi Penelitian" },
];

// shortcut: placeholder research cards (no research data source exists yet); wire to a CMS/API when available
const researchCards = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  title: "Judul Penelitian",
  meta: "Dosen Peneliti • 2025",
}));

const portalCards = [
  {
    title: "Pusat Penelitian",
    desc: "Portal resmi LPPM untuk informasi penelitian, pengabdian kepada masyarakat, dan kolaborasi riset UPITRA.",
    bullets: ["Program penelitian internal dan eksternal", "Program pengabdian kepada masyarakat", "Kolaborasi riset dengan mitra industri"],
    key: "lppmUrl" as const,
  },
  {
    title: "Publikasi Jurnal Ilmiah",
    desc: "Portal jurnal (OJS) UPITRA untuk publikasi dan akses artikel ilmiah sivitas akademika.",
    bullets: ["Publikasi artikel ilmiah dosen dan mahasiswa", "Akses terbitan jurnal UPITRA", "Panduan penulisan dan submisi naskah"],
    key: "jurnalUrl" as const,
  },
];

export default function RisetPortalPage() {
  const [bannerImage, setBannerImage] = useState("/images/kegiatan.jpg");
  const [portals, setPortals] = useState(defaultPortals);

  useEffect(() => {
    fetch("/api/banner?page=riset")
      .then((res) => res.json())
      .then((json) => json?.ok && json.data?.imageUrl && setBannerImage(json.data.imageUrl))
      .catch(() => {});

    fetch("/api/riset/portals")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && json.data) {
          setPortals({
            lppmUrl: json.data.lppmUrl || defaultPortals.lppmUrl,
            jurnalUrl: json.data.jurnalUrl || defaultPortals.jurnalUrl,
          });
        }
      })
      .catch(() => {});
  }, []);

  const pad = "mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-[120px]";

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner 1440x480 */}
        <section className="relative isolate h-[320px] w-full overflow-hidden bg-[#006bbd] sm:h-[400px] lg:h-[480px]" aria-label="Pusat Riset, Inovasi, & Pengabdian">
          <Image src={bannerImage} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#006bbd]/80 via-[#006bbd]/45 to-[#006bbd]/20" />
          <div className={`${pad} flex h-full flex-col justify-end pb-10 lg:pb-20`}>
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-[56px]">
              Pusat Riset, Inovasi,
              <br />
              &amp; Pengabdian
            </h1>
            <p className="mt-3 max-w-[560px] text-xs font-medium leading-snug text-white">
              Mendorong riset terapan, inovasi, dan pengabdian kepada masyarakat yang berdampak bagi industri dan masyarakat.
            </p>
          </div>
        </section>

        {/* Tentang LPPM */}
        <section className={`${pad} py-10 lg:py-14`}>
          <h2 className="text-2xl font-bold text-[#006bbd]">Tentang LPPM</h2>
          <p className="mt-3 text-xs leading-relaxed text-slate-700 sm:text-[13px]">
            LPPM (Lembaga Penelitian dan Pengabdian kepada Masyarakat) Universitas Pignatelli Triputra menjadi pusat penelitian, pengabdian, dan inovasi sivitas akademika. LPPM mengoordinasikan perencanaan, pelaksanaan, monitoring, dan evaluasi kegiatan penelitian serta pengabdian kepada masyarakat, mendorong publikasi ilmiah, perlindungan kekayaan intelektual, dan hilirisasi hasil riset melalui kolaborasi dengan mitra industri dan ekosistem Triputra Group.
          </p>
        </section>

        {/* Performa Akademik */}
        <section className="bg-[#e6f0fb] py-10 lg:py-12">
          <div className={`${pad} text-center`}>
            <h2 className="text-2xl font-bold text-[#006bbd]">Performa Akademik 2022-2026</h2>
            <p className="mt-1 text-xs text-slate-600">Ringkasan capaian penelitian dan pengabdian sivitas akademika UPITRA.</p>
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

        {/* Penelitian Terbaru */}
        <section className={`${pad} py-10 lg:py-14`}>
          <h2 className="text-2xl font-bold text-[#006bbd]">Penelitian Terbaru</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {researchCards.map((c) => (
              <article key={c.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
                <div className="relative aspect-[16/10] w-full bg-slate-100">
                  <Image src="/images/kegiatan.jpg" alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-[10px] text-slate-500">{c.meta}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 text-right">
            <Link href="/riset/pusat-penelitian-dan-publikasi" className="inline-flex items-center gap-1 text-xs font-semibold text-[#006bbd] hover:underline">
              Selengkapnya <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>

        {/* Portal Riset & Publikasi Ilmiah */}
        <section className="bg-[#e6f0fb] py-10 lg:py-12">
          <div className={`${pad} text-center`}>
            <h2 className="text-2xl font-bold text-[#006bbd]">Portal Riset &amp; Publikasi Ilmiah</h2>
            <p className="mt-1 text-xs text-slate-600">Akses layanan penelitian dan publikasi ilmiah di lingkungan UPITRA.</p>
            <div className="mt-8 grid gap-6 text-left md:grid-cols-2">
              {portalCards.map((p) => (
                <div key={p.title} className="flex flex-col rounded-xl bg-white p-6 shadow-sm">
                  <h3 className="text-base font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{p.desc}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-700">
                    {p.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                  <a
                    href={portals[p.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-[#006bbd] py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#005a9e]"
                  >
                    Akses Layanan
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
