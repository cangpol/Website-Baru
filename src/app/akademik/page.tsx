"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import AkademikCalendar from "@/components/AkademikCalendar";
import { prodiList } from "@/lib/prodiData";

interface AkademikBanner {
  title: string;
  description: string;
  imageUrl?: string;
}

const defaultBanner: AkademikBanner = {
  title: "Beragam Jalur Akademik, Satu Tujuan",
  description:
    "Kenali berbagai fakultas dan program studi di UPITRA dan pilih kesempatan yang paling sesuai dengan passion, kompetensi, dan potensimu.",
  imageUrl: "/images/pmb/wave-ready-achievement-hq.jpg",
};

interface FakultasItem {
  id: string;
  code: string;
  name: string;
  slug: string;
  cover: string;
  prodiTags: string[];
  desc: string;
}

// Urutan mengikuti desain: FEB, FSH (baris 1) lalu FST, FKes (baris 2).
const fakultasData: FakultasItem[] = [
  {
    id: "feb",
    code: "FEB",
    name: "Fakultas Ekonomi dan Bisnis",
    slug: "/feb",
    cover: "/images/feb-full.jpg",
    prodiTags: ["S1 Manajemen", "S1 Akuntansi"],
    desc: "Mencetak profesional bisnis, akuntan korporasi, dan entrepreneur tangguh berkarakter Triputra DNA yang adaptif di era transformasi ekonomi digital.",
  },
  {
    id: "fsh",
    code: "FSH",
    name: "Fakultas Sosial dan Humaniora",
    slug: "/fsh",
    cover: "/images/fsh-full.jpg",
    prodiTags: ["S1 Pariwisata", "S1 Bahasa Inggris"],
    desc: "Mengembangkan kepemimpinan humanis, kompetensi komunikasi internasional, dan keahlian manajemen hospitaliti & pariwisata berkelanjutan.",
  },
  {
    id: "fst",
    code: "FST",
    name: "Fakultas Sains dan Teknologi",
    slug: "/fst",
    cover: "/images/ar-vr.jpg",
    prodiTags: ["S1 Informatika", "S1 Sistem Informasi", "S1 Rekayasa Perangkat Lunak"],
    desc: "Membekali mahasiswa dengan keahlian kecerdasan buatan, rekayasa perangkat lunak skala industri, analitika data, dan komputasi modern.",
  },
  {
    id: "fkes",
    code: "FKes",
    name: "Fakultas Kesehatan",
    slug: "/fkes",
    cover: "/images/kuliah-1.jpeg",
    prodiTags: [
      "S1 Fisioterapi",
      "S1 Kesehatan dan Keselamatan Kerja (K3)",
      "D3 Keperawatan (Managed by TEN)",
    ],
    desc: "Menghasilkan tenaga kesehatan profesional, ahli keselamatan kerja industri (K3), dan fisioterapis kompeten dengan dedikasi kemanusiaan tinggi.",
  },
];

// Urutan program studi mengikuti desain.
const prodiOrder = [
  "manajemen",
  "akuntansi",
  "informatika",
  "sistem-informasi",
  "rekayasa-perangkat-lunak",
  "pariwisata",
  "bahasa-inggris",
  "fisioterapi",
  "kesehatan-dan-keselamatan-kerja",
  "keperawatan",
];

const shortRole = (role: string) => role.split(" / ")[0].replace(/\s*\(.*?\)\s*/g, " ").trim();

export default function AkademikOverviewPage() {
  const [banner, setBanner] = useState<AkademikBanner>(defaultBanner);
  const [faculties, setFaculties] = useState<FakultasItem[]>(fakultasData);

  useEffect(() => {
    fetch("/api/banner?page=akademik")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && json.data) {
          setBanner({
            title: json.data.title || defaultBanner.title,
            description: json.data.description || defaultBanner.description,
            imageUrl: json.data.imageUrl || defaultBanner.imageUrl,
          });
        }
      })
      .catch(() => {});

    // Deskripsi & foto fakultas dapat diubah dari admin; daftar prodi mengikuti desain.
    fetch("/api/faculties")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && Array.isArray(json.data) && json.data.length > 0) {
          setFaculties((prev) =>
            prev.map((f) => {
              const match = json.data.find((d: { code?: string }) => d.code?.toLowerCase() === f.code.toLowerCase());
              if (!match) return f;
              return {
                ...f,
                cover: match.icon || f.cover,
                desc: match.description || f.desc,
              };
            })
          );
        }
      })
      .catch(() => {});
  }, []);

  const programs = useMemo(
    () => prodiOrder.map((slug) => prodiList.find((p) => p.slug === slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)),
    []
  );

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner */}
        <section className="relative isolate w-full overflow-hidden bg-[#006bbd]" aria-label="Akademik">
          <Image
            src={banner.imageUrl || defaultBanner.imageUrl!}
            alt=""
            fill
            priority
            sizes="100vw"
            className="-z-20 object-cover object-center"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#006bbd]/85 via-[#006bbd]/45 to-[#006bbd]/10" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#006bbd]/45 to-transparent" />

          <div className="mx-auto flex min-h-[300px] w-full max-w-[1440px] flex-col justify-end px-4 pb-10 pt-24 sm:min-h-[380px] sm:px-12 lg:min-h-[475px] lg:px-[120px] lg:pb-16">
            <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-[56px]">
              {banner.title}
            </h1>
            <p className="mt-3 max-w-xl whitespace-pre-line text-xs font-medium leading-snug text-white sm:text-sm">
              {banner.description}
            </p>
          </div>
        </section>

        {/* Fakultas */}
        <section className="w-full bg-white" aria-labelledby="fakultas-heading">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-12 lg:px-[120px] lg:py-16">
            <h2 id="fakultas-heading" className="text-2xl font-extrabold uppercase tracking-tight text-[#2b6cc4] sm:text-3xl">
              Fakultas
            </h2>
            <p className="mt-1 text-xs text-slate-600 sm:text-sm">Gelombang pendaftaran yang sedang kami buka.</p>

            <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
              {faculties.map((f) => (
                <article
                  key={f.id}
                  className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_3px_10px_rgba(0,107,189,0.18)] ring-1 ring-blue-50"
                >
                  <div className="relative aspect-[16/7] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={f.cover}
                      alt={f.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <h3 className="text-xl font-extrabold leading-tight text-slate-900">{f.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {f.prodiTags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#006bbd] ring-1 ring-blue-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-[11px] leading-relaxed text-slate-600 sm:text-xs">{f.desc}</p>
                    <div className="mt-auto flex justify-end pt-1">
                      <Link href={f.slug} className="text-[11px] font-bold text-[#006bbd] hover:underline">
                        Selengkapnya ›
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Program Studi */}
        <section className="w-full bg-[#d4e3f5]" aria-labelledby="prodi-heading">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-12 lg:px-[120px] lg:py-16">
            <div className="text-right">
              <h2 id="prodi-heading" className="text-2xl font-extrabold uppercase tracking-tight text-[#2b6cc4] sm:text-3xl">
                Program Studi
              </h2>
              <p className="mt-1 text-xs text-slate-600 sm:text-sm">Gelombang pendaftaran yang sedang kami buka.</p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {programs.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_3px_10px_rgba(0,107,189,0.18)] ring-1 ring-blue-50 transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={p.heroImage}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-4">
                    <h3 className="text-lg font-extrabold leading-tight text-slate-900">
                      {p.name}
                      {p.slug === "keperawatan" && (
                        <span className="block text-sm font-bold italic text-slate-700">(Managed by TEN)</span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {p.careerPaths.slice(0, 4).map((c) => (
                        <span
                          key={c.role}
                          className="max-w-full truncate rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#006bbd] ring-1 ring-blue-100"
                        >
                          {shortRole(c.role)}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Kalender Akademik */}
        <section className="w-full bg-white" aria-labelledby="kalender-heading">
          <div className="mx-auto w-full max-w-[1440px] px-4 py-12 sm:px-12 lg:px-[120px] lg:py-16">
            <h2 id="kalender-heading" className="text-2xl font-extrabold uppercase tracking-tight text-[#2b6cc4] sm:text-3xl">
              Kalender Akademik
            </h2>
            <p className="mb-6 mt-1 text-xs text-slate-600 sm:text-sm">Gelombang pendaftaran yang sedang kami buka.</p>
            <AkademikCalendar />
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
