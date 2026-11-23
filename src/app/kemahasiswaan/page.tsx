"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { usePageContent } from "@/lib/usePageContent";

const SECTION_X = "px-5 sm:px-12 lg:px-[120px]";
const H2 = "text-2xl font-bold tracking-tight text-[#006bbd] sm:text-[28px]";

export default function KemahasiswaanPage() {
  const { content, banner } = usePageContent("kemahasiswaan");
  const { programs, organisasi, ukm, galeri } = content;
  // Baris terakhir UKM berisi 2 item: item terakhir dibuat lebar agar grid 3 kolom penuh.
  const lastWide = ukm.length % 3 === 2;

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="relative isolate w-full overflow-hidden bg-[#006bbd]" aria-label="Kemahasiswaan">
          <Image src={banner.imageUrl} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#1f4f94]/45 via-[#1f4f94]/15 to-transparent" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div
            className={`mx-auto flex min-h-[300px] w-full max-w-[1440px] flex-col items-center justify-center text-center sm:min-h-[380px] lg:min-h-[480px] ${SECTION_X}`}
          >
            <h1 className="max-w-4xl whitespace-pre-line text-3xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.35)] sm:text-4xl lg:text-[44px]">
              {banner.title}
            </h1>
            <p className="mt-4 max-w-2xl whitespace-pre-line text-xs font-medium leading-relaxed text-white sm:text-sm">
              {banner.description}
            </p>
          </div>
        </section>

        {/* Tentang Kemahasiswaan */}
        <section className="bg-white py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <h2 className={H2}>Tentang Kemahasiswaan</h2>
            <p className="mt-5 whitespace-pre-line text-justify text-sm leading-relaxed text-slate-800">{content.about}</p>
            <h3 className="mt-6 text-lg font-bold text-slate-900">Tugas dan Fungsi Bidang Kemahasiswaan</h3>
            <p className="mt-2 whitespace-pre-line text-justify text-sm leading-relaxed text-slate-800">{content.tugas}</p>
          </div>
        </section>

        {/* Program Pengembangan Mahasiswa */}
        <section className="bg-[#006bbd] py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">Program Pengembangan Mahasiswa</h2>
              <p className="mt-1 text-xs text-white/90">Gelombang pendaftaran yang sedang kami buka.</p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {programs.map((p, i) => (
                <article key={i} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="border-b border-sky-300/70 pb-3 text-center text-sm font-bold text-slate-900">{p.title}</h3>
                  <p className="mt-4 text-justify text-xs leading-relaxed text-slate-700">{p.desc}</p>
                  <ul className="mt-4 flex-1 space-y-1 text-xs text-slate-700">
                    {p.items
                      .split("\n")
                      .filter((it) => it.trim())
                      .map((it, n) => (
                        <li key={n} className="flex gap-2">
                          <span aria-hidden>·</span>
                          <span>{it}</span>
                        </li>
                      ))}
                  </ul>
                  <Link
                    href="/layanan"
                    className="mt-5 block rounded-lg bg-[#006bbd] py-2 text-center text-xs font-bold text-white transition hover:bg-[#005a9e]"
                  >
                    Hubungi
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Organisasi Mahasiswa */}
        <section className="bg-white py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <h2 className={H2}>Organisasi Mahasiswa</h2>
            <p className="mt-1 text-xs text-slate-600">Penelitian</p>
            <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {organisasi.map((o, i) => (
                <figure key={i}>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-200 md:aspect-auto md:h-[250px] lg:h-[285px]">
                    <Image
                      src={o.image}
                      alt={o.name}
                      fill
                      sizes={i === 0 ? "(min-width:768px) 66vw, 100vw" : "(min-width:768px) 33vw, 100vw"}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-center text-sm font-semibold text-slate-900">{o.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Unit Kegiatan Mahasiswa */}
        <section className="bg-[#e8f0f9] py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <div className="text-right">
              <h2 className={H2}>Unit Kegiatan Mahasiswa</h2>
              <p className="mt-1 text-xs text-slate-600">Penelitian</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-5">
              {ukm.map((u, i) => {
                const wide = lastWide && i === ukm.length - 1;
                return (
                  <figure key={i} className={wide ? "col-span-2 sm:col-span-2" : ""}>
                    <div
                      className={`relative overflow-hidden rounded-2xl bg-slate-300 ${
                        wide ? "aspect-[2/1] sm:aspect-auto sm:h-[150px] lg:h-[170px]" : "aspect-[16/10] sm:aspect-auto sm:h-[150px] lg:h-[170px]"
                      }`}
                    >
                      <Image
                        src={u.image}
                        alt={u.name}
                        fill
                        sizes={wide ? "(min-width:640px) 66vw, 100vw" : "(min-width:640px) 33vw, 50vw"}
                        className="object-cover"
                      />
                    </div>
                    <figcaption className="mt-2 text-center text-sm font-semibold text-slate-900">{u.name}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        </section>

        {/* Galeri Prestasi dan Capaian */}
        <section className="bg-white py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <h2 className={H2}>Galeri Prestasi dan Capaian</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {galeri.map((g, i) => (
                <figure key={i}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-200">
                    <Image src={g.image} alt={g.title} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-xs font-semibold text-slate-900">{g.title}</figcaption>
                </figure>
              ))}
            </div>
            <div className="mt-5 text-right">
              <Link href="/kemahasiswaan/prestasi-mahasiswa" className="text-xs font-semibold text-[#006bbd] hover:underline">
                Selengkapnya &gt;
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
