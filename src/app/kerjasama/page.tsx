"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePageContent } from "@/lib/usePageContent";

const pad = "mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-[120px]";

export default function KerjasamaIndexPage() {
  const { content, banner } = usePageContent("kerjasama");

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner 1440x480 */}
        <section className="relative isolate h-[320px] w-full overflow-hidden bg-[#006bbd] sm:h-[400px] lg:h-[480px]" aria-label="Kerjasama">
          <Image src={banner.imageUrl} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#006bbd]/80 via-[#006bbd]/40 to-transparent" />
          <div className={`${pad} flex h-full flex-col justify-end pb-10 lg:pb-20`}>
            <h1 className="max-w-3xl whitespace-pre-line text-4xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-[56px]">
              {banner.title}
            </h1>
            <p className="mt-3 max-w-[560px] whitespace-pre-line text-xs font-medium leading-snug text-white">{banner.description}</p>
          </div>
        </section>

        {/* Biro Kerjasama */}
        <section className={`${pad} py-10 lg:py-14`}>
          <h2 className="text-2xl font-bold text-[#006bbd]">Biro Kerjasama UPITRA</h2>
          <p className="mt-3 whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-[13px]">{content.about}</p>
        </section>

        {/* Angka Mitra Kerjasama */}
        <section className="bg-[#e6f0fb] py-10 lg:py-12">
          <div className={`${pad} text-center`}>
            <h2 className="text-2xl font-bold text-[#006bbd]">Angka Mitra Kerjasama</h2>
            <p className="mt-1 text-xs text-slate-600">Ringkasan jejaring kerjasama UPITRA dengan berbagai mitra.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
              {content.stats.map((s, i) => (
                <div key={i} className="rounded-xl bg-white px-4 py-6 shadow-sm">
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
            {content.partners.map((p, i) => (
              <div key={i} className="flex flex-col items-center rounded-lg border border-[#006bbd]/40 bg-white px-3 py-4 text-center">
                <div className="relative h-10 w-10">
                  <Image src={p.logo || "/images/logo-upitra.png"} alt="" fill sizes="40px" className="object-contain" />
                </div>
                <div className="mt-2 text-[11px] font-bold leading-tight text-slate-900">{p.name}</div>
                <div className="mt-0.5 text-[9px] text-slate-500">{p.subtitle}</div>
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
              {content.kegiatan.map((k, i) => (
                <article key={i} className="overflow-hidden rounded-xl bg-white shadow-sm">
                  <div className="relative aspect-[16/9] w-full bg-slate-200">
                    <Image src={k.image} alt={k.title} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
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
