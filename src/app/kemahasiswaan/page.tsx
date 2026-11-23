"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

interface KemahasiswaanBanner {
  title: string;
  description: string;
  imageUrl?: string;
}

const defaultBanner: KemahasiswaanBanner = {
  title: "Pengembangan\n& Kehidupan Mahasiswa",
  description:
    "Wadah pembinaan karakter, minat, bakat, dan prestasi mahasiswa\nUniversitas Pignatelli Triputra.",
  imageUrl: "/images/kemahasiswaan/banner.jpg",
};

const programs = [
  {
    title: "Leadership Development",
    desc: "Program untuk mengasah jiwa kepemimpinan, karakter, dan manajerial mahasiswa, ditempa untuk berpikir kritis, berintegritas.",
    items: ["Pelatihan seperti LKMM", "Workshop Komunikasi", "forum problem solving"],
  },
  {
    title: "Entrepreneurship Program",
    desc: "Wadah pembinaan untuk menumbuhkan jiwa wirausaha, kreativitas, dan kemandirian ekonomi mahasiswa.",
    items: ["Penyusunan business plan", "Pelatihan digital marketing", "Pelatihan keuangan."],
  },
  {
    title: "Career Preparation",
    desc: "Program pembinaan intensif untuk menjembatani mahasiswa tingkat akhir dan alumni muda menuju dunia kerja profesional.",
    items: ["Penyusunan CV ATS-friendly", "Simulasi Wawancara", "Optimasi LinkedIn."],
  },
];

const organisasi = [
  { name: "Badan Eksekutif Mahasiswa", image: "/images/kemahasiswaan/bem.jpg", wide: true },
  { name: "Himpunan Mahasiswa", image: "/images/kemahasiswaan/hima.jpg", wide: false },
];

const unitKegiatan = [
  { name: "Basket", image: "/images/kemahasiswaan/basket.jpg", wide: false },
  { name: "Badminton", image: "/images/kemahasiswaan/badminton.jpg", wide: false },
  { name: "Futsal", image: "/images/kemahasiswaan/futsal.jpg", wide: false },
  { name: "Voli", image: "/images/kemahasiswaan/voli.jpg", wide: false },
  { name: "E-Sports", image: "/images/kemahasiswaan/esports.jpg", wide: false },
  { name: "UPITRA Tech Club", image: "/images/kemahasiswaan/techclub.jpg", wide: false },
  { name: "Menari", image: "/images/kemahasiswaan/menari.jpg", wide: false },
  { name: "Paduan Suara", image: "/images/kemahasiswaan/paduan.jpg", wide: true },
];

const SECTION_X = "px-5 sm:px-12 lg:px-[120px]";

export default function KemahasiswaanPage() {
  const [banner, setBanner] = useState<KemahasiswaanBanner>(defaultBanner);

  useEffect(() => {
    fetch("/api/banner?page=kemahasiswaan")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && json.data) {
          setBanner({
            ...defaultBanner,
            imageUrl: json.data.imageUrl || defaultBanner.imageUrl,
          });
        }
      })
      .catch(() => undefined);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="relative isolate w-full overflow-hidden bg-[#006bbd]" aria-label="Kemahasiswaan">
          <Image
            src={banner.imageUrl || defaultBanner.imageUrl!}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
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
            <h2 className="text-2xl font-bold tracking-tight text-[#006bbd] sm:text-[28px]">
              Tentang Kemahasiswaan
            </h2>
            <p className="mt-5 text-justify text-sm leading-relaxed text-slate-800">
              Kemahasiswaan Universitas Pignatelli Triputra (UPITRA) adalah unit kerja/biro yang bertanggung jawab
              dalam memberikan pelayanan, pembinaan, dan pengembangan kesejahteraan mahasiswa di luar jalur akademik
              formal. Kemahasiswaan UPITRA berfungsi mengelola beasiswa, memfasilitasi legalitas dan kegiatan
              organisasi (BEM, HIMA, UKM), mendampingi kompetisi/prestasi mahasiswa, serta memberikan layanan
              bimbingan karir dan konseling.
            </p>
            <h3 className="mt-6 text-lg font-bold text-slate-900">Tugas dan Fungsi Bidang Kemahasiswaan</h3>
            <p className="mt-2 text-justify text-sm leading-relaxed text-slate-800">
              Bidang Kemahasiswaan UPITRA mengemban tugas pokok untuk{" "}
              <strong>
                merencanakan, melaksanakan, dan mengevaluasi program pembinaan karakter serta kesejahteraan
                mahasiswa di luar jalur akademik formal.
              </strong>{" "}
              Bidang ini menjalankan fungsi strategis dalam melegalisasi dan mengawasi Organisasi Mahasiswa (BEM,
              HIMA, UKM), memfasilitasi pengembangan minat, bakat, dan penalaran kompetisi, mengelola layanan
              beasiswa serta konseling, hingga mempersiapkan kesiapan karir alumni (tracer study).
            </p>
          </div>
        </section>

        {/* Program Pengembangan Mahasiswa */}
        <section className="bg-[#006bbd] py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">
                Program Pengembangan Mahasiswa
              </h2>
              <p className="mt-1 text-xs text-white/90">Gelombang pendaftaran yang sedang kami buka.</p>
            </div>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {programs.map((p) => (
                <article key={p.title} className="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
                  <h3 className="border-b border-sky-300/70 pb-3 text-center text-sm font-bold text-slate-900">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-justify text-xs leading-relaxed text-slate-700">{p.desc}</p>
                  <ul className="mt-4 flex-1 space-y-1 text-xs text-slate-700">
                    {p.items.map((it) => (
                      <li key={it} className="flex gap-2">
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
            <h2 className="text-2xl font-bold tracking-tight text-[#006bbd] sm:text-[28px]">
              Organisasi Mahasiswa
            </h2>
            <p className="mt-1 text-xs text-slate-600">Penelitian</p>
            <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
              {organisasi.map((o) => (
                <figure key={o.name}>
                  <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-slate-200 md:aspect-auto md:h-[250px] lg:h-[285px]">
                    <Image
                      src={o.image}
                      alt={o.name}
                      fill
                      sizes={o.wide ? "(min-width:768px) 66vw, 100vw" : "(min-width:768px) 33vw, 100vw"}
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
              <h2 className="text-2xl font-bold tracking-tight text-[#006bbd] sm:text-[28px]">
                Unit Kegiatan Mahasiswa
              </h2>
              <p className="mt-1 text-xs text-slate-600">Penelitian</p>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-x-5">
              {unitKegiatan.map((u) => (
                <figure key={u.name} className={u.wide ? "col-span-2 sm:col-span-2" : ""}>
                  <div
                    className={`relative overflow-hidden rounded-2xl bg-slate-300 ${
                      u.wide ? "aspect-[2/1] sm:aspect-auto sm:h-[150px] lg:h-[170px]" : "aspect-[16/10] sm:aspect-auto sm:h-[150px] lg:h-[170px]"
                    }`}
                  >
                    <Image
                      src={u.image}
                      alt={u.name}
                      fill
                      sizes={u.wide ? "(min-width:640px) 66vw, 100vw" : "(min-width:640px) 33vw, 50vw"}
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-center text-sm font-semibold text-slate-900">{u.name}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* Galeri Prestasi dan Capaian */}
        <section className="bg-white py-10 sm:py-14">
          <div className={`mx-auto max-w-[1440px] ${SECTION_X}`}>
            <h2 className="text-2xl font-bold tracking-tight text-[#006bbd] sm:text-[28px]">Galeri Prestasi dan Capaian</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {Array.from({ length: 10 }, (_, i) => (
                <figure key={i}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-200">
                    {/* shortcut: placeholder gallery, no achievement data wired; connect to prestasi-mahasiswa data */}
                    <Image src="/images/upitra-student-achiever.jpg" alt="" fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
                  </div>
                  <figcaption className="mt-2 text-xs font-semibold text-slate-900">Judul Prestasi</figcaption>
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
