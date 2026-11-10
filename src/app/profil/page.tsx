import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProfilSubNav from "@/components/ProfilSubNav";
import ProfilVideo from "@/components/ProfilVideo";

export const metadata: Metadata = {
  title: "Profil Kampus UPITRA - Universitas Pignatelli Triputra",
  description:
    "Mengenal lebih dekat Universitas Pignatelli Triputra: transformasi kelembagaan, sejarah, kolaborasi dengan Triputra Group, serta video profil kampus.",
};

export default function ProfilPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="relative isolate w-full overflow-hidden bg-[#006bbd]" aria-label="Profil Kampus UPITRA">
          <Image
            src="/images/gedung-upitra.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#006bbd]/90 via-[#006bbd]/55 to-[#006bbd]/20" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#006bbd]/40 to-transparent" />

          <div className="mx-auto flex min-h-[300px] w-full max-w-[1440px] flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[380px] sm:px-12 lg:min-h-[475px] lg:px-[120px] lg:pb-16">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-[56px]">
              Profil Kampus
              <br />
              UPITRA
            </h1>
            <p className="mt-3 max-w-md text-xs font-medium leading-snug text-white sm:text-sm">
              Mengenal lebih dekat Universitas Pignatelli Triputra, profil, visi misi, dan kepemimpinan kami.
            </p>
          </div>
        </section>

        <ProfilSubNav active="/profil" />

        {/* Transformasi + Sejarah */}
        <div className="mx-auto w-full max-w-[1440px] space-y-10 px-4 pb-14 pt-4 sm:px-12 lg:px-[120px] lg:pb-20">
          <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl">
                Transformasi UPITRA
              </h2>
              <p className="text-justify text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                Universitas Pignatelli Triputra (UPITRA) adalah kampus dengan konsep &quot;Link and Match&quot; dengan
                dunia industri, merujuk pada hubungan yang erat antara pendidikan tinggi dan sektor industri untuk
                memastikan lulusan siap kerja dan relevan dengan kebutuhan pasar.
              </p>
              <p className="text-justify text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                Karena UPITRA mempunyai hubungan erat dengan Triputra Group dan Persada Capital Investama. Konsep ini
                menekankan pentingnya kolaborasi antara institusi pendidikan dan dunia usaha dalam merancang
                kurikulum, magang, pelatihan, serta penelitian yang mendukung pengembangan keterampilan dan
                pengetahuan yang dibutuhkan oleh industri.
              </p>
            </div>

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-[0_4px_16px_rgba(0,107,189,0.25)] ring-1 ring-blue-100">
              <Image
                src="/images/gedung-upitra.jpg"
                alt="Gedung Universitas Pignatelli Triputra"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>
          </section>

          <section className="space-y-5" aria-labelledby="sejarah-heading">
            <h2
              id="sejarah-heading"
              className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl"
            >
              Sejarah
            </h2>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Awal Mula dan Penggabungan</h3>
              <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                UPITRA merupakan hasil penggabungan (merger) dari dua lembaga pendidikan tinggi pendahulunya:
              </p>
              <ul className="list-disc space-y-1 pl-6 text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                <li>Akademi Bahasa Asing (ABA) Santo Pignatelli (berdiri sejak tahun 1969).</li>
                <li>
                  Sekolah Tinggi Ilmu Ekonomi (STIE) Santo Pignatelli (bermula dari Akademi Akuntansi yang beroperasi
                  sejak tahun 1970).
                </li>
              </ul>
              <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                Nama &quot;Pignatelli&quot; diambil dari <strong>Santo Yosef Maria Pignatelli</strong>, simbol
                keteladanan dan tahan uji. Fondasi awal institusi ini dinaungi oleh Yayasan Santo Yosef Maria
                Pignatelli Surakarta yang sudah bergerak di bidang pendidikan sejak 27 Januari 1968.
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">Kolaborasi dengan Industri</h3>
              <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                Dalam perkembangannya, UPITRA menggandeng PT Triputra Edukasi Nusantara (afiliasi dari Triputra Group
                dan Persada Capital Investama) untuk menerapkan konsep &quot;Link and Match&quot; antara dunia
                pendidikan dan kebutuhan industri.
              </p>
              <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
                Saat ini, UPITRA mengelola beberapa fakultas dan program studi di bidang ekonomi, sains, serta
                teknologi yang berlokasi di Jl. Duwet No.1, Karangasem, Laweyan, Surakarta. Informasi lebih lanjut
                mengenai program dan pendaftaran dapat dilihat langsung melalui situs resmi Universitas Pignatelli
                Triputra.
              </p>
            </div>
          </section>
        </div>

        {/* Video Profil */}
        <section className="w-full bg-[#c5ddf1]" aria-labelledby="video-profil-heading">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-12 lg:px-[120px] lg:py-14">
            <div className="mb-6 space-y-2 text-left lg:ml-auto lg:max-w-3xl lg:text-right">
              <h2
                id="video-profil-heading"
                className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl"
              >
                Video Profil UPITRA
              </h2>
              <p className="text-xs leading-relaxed text-slate-800 sm:text-[13px]">
                Video ini menampilkan profil Universitas Pignatelli Triputra, peresmian gedung baru, fasilitas
                pembelajaran, kegiatan akademik, serta lingkungan kampus yang mendukung pengembangan mahasiswa
                menjadi profesional berdaya saing global.
              </p>
            </div>
            <ProfilVideo />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
