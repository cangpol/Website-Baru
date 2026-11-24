"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Image from "next/image";
import { MessageCircle, ExternalLink } from "lucide-react";
import { usePageContent } from "@/lib/usePageContent";

// ── SVG brand icons ──
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.376.55 9.376.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function ThreadsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.001 2c-5.522 0-9.999 4.477-9.999 10 0 5.011 3.69 9.159 8.52 9.878v-2.025c-3.73-.693-6.52-3.945-6.52-7.853 0-4.411 3.589-8 7.999-8 4.412 0 8.001 3.589 8.001 8 0 2.378-1.043 4.512-2.705 5.972-.943.83-2.091 1.378-3.376 1.554-1.29.177-2.618-.04-3.76-.628l-.946 1.782c1.472.782 3.167 1.059 4.846.829 1.67-.229 3.197-.954 4.444-2.05 2.062-1.812 3.497-4.42 3.497-7.459 0-5.523-4.477-10-10.001-10zm.04 6.5c-2.485 0-4.5 2.015-4.5 4.5 0 2.485 2.015 4.5 4.5 4.5 1.724 0 3.226-.97 3.992-2.396l-1.748-.988c-.46.826-1.328 1.384-2.244 1.384-1.381 0-2.5-1.119-2.5-2.5s1.119-2.5 2.5-2.5c.928 0 1.784.542 2.227 1.353l1.734-.995c-.751-1.428-2.24-2.358-3.961-2.358z"/>
    </svg>
  );
}

function TiktokIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  );
}

interface ServiceCard {
  id?: string;
  name: string;
  url: string;
  description: string;
}

const li = (items: string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;

const defaultServices: ServiceCard[] = [
  {
    name: "Perpustakaan",
    url: "https://siper.upitra.ac.id",
    description: `<p>Layanan perpustakaan digital dan fisik untuk mendukung kegiatan belajar dan penelitian.</p>${li(["Katalog online (OPAC)", "Repositori karya ilmiah", "Koleksi e-book dan e-journal"])}`,
  },
  {
    name: "E-Learning",
    url: "https://unity.upitra.ac.id",
    description: `<p>Platform perkuliahan daring Unity LMS untuk seluruh sivitas akademika.</p>${li(["Materi kuliah 24/7", "Pengumpulan tugas dan kuis", "Video conference"])}`,
  },
  {
    name: "Career Center",
    url: "https://ucc.upitra.ac.id",
    description: `<p>Pusat bimbingan karir dan penyaluran lulusan bersama mitra industri.</p>${li(["Bimbingan karir", "Campus hiring", "Informasi lowongan kerja"])}`,
  },
  {
    name: "Tracer Studi",
    url: "/layanan/tracer-study",
    description: `<p>Penelusuran lulusan untuk meningkatkan mutu pendidikan dan relevansi dengan dunia kerja.</p>${li(["Survei alumni", "Data penyerapan lulusan"])}`,
  },
  {
    name: "Immersion Program",
    url: "https://immersion.upitra.ac.id",
    description: `<p>Program praktik kerja langsung di unit bisnis Triputra Group dengan bimbingan mentor.</p>${li(["Praktik kerja 1 tahun", "Mentor industri", "Sertifikasi profesional"])}`,
  },
];

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  youtube: YoutubeIcon,
  facebook: FacebookIcon,
  threads: ThreadsIcon,
  whatsapp: MessageCircle,
};

const pad = "mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-[120px]";

export default function LayananIndexPage() {
  const { content, banner } = usePageContent("layanan");
  const [services, setServices] = useState<ServiceCard[]>(defaultServices);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((json) => {
        if (json?.ok && Array.isArray(json.data) && json.data.length > 0) {
          setServices(json.data.map((s: any) => ({ id: s.id, name: s.name, url: s.url, description: s.description || "" })));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans text-slate-800">
      <Navbar />

      <main className="flex-1">
        {/* Banner 1440x480 */}
        <section className="relative isolate h-[320px] w-full overflow-hidden bg-[#006bbd] sm:h-[400px] lg:h-[480px]" aria-label="Portal & Ekosistem Kampus">
          <Image src={banner.imageUrl} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#006bbd]/85 via-[#006bbd]/45 to-transparent" />
          <div className={`${pad} flex h-full flex-col justify-end pb-10 lg:pb-20`}>
            <h1 className="max-w-3xl whitespace-pre-line text-4xl font-extrabold leading-[1.05] tracking-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.3)] sm:text-5xl lg:text-[56px]">
              {banner.title}
            </h1>
            <p className="mt-3 max-w-[560px] whitespace-pre-line text-xs font-medium leading-snug text-white">{banner.description}</p>
          </div>
        </section>

        {/* Ekosistem Kampus */}
        <section className={`${pad} py-10 lg:py-14`}>
          <h2 className="text-2xl font-bold text-[#006bbd]">Ekosistem Kampus</h2>
          <p className="mt-1 text-xs text-slate-600">Beragam layanan yang mendukung kegiatan sivitas akademika UPITRA.</p>
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <article key={s.id ?? i} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-900">{s.name}</h3>
                <div
                  className="mt-2 flex-1 text-xs leading-relaxed text-slate-600 [&_li]:ml-4 [&_li]:list-disc [&_p]:mb-2"
                  dangerouslySetInnerHTML={{ __html: s.description }}
                />
                <a
                  href={s.url}
                  target={s.url.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-md bg-[#006bbd] py-2 text-xs font-bold text-white transition-colors hover:bg-[#005a9e]"
                >
                  Akses Layanan
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Media Sosial */}
        <section className="bg-[#cce0f2]">
          <div className={`${pad} grid items-end gap-6 pt-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.9fr)] md:pt-0`}>
            <div className="relative order-2 mx-auto h-[300px] w-[220px] self-end md:order-1 md:h-[370px] md:w-[300px]">
              <Image src={content.sideImage} alt="" fill sizes="300px" className="object-contain object-bottom" />
            </div>
            <div className="order-1 py-8 md:order-2 md:py-10">
              <h2 className="text-right text-3xl font-extrabold text-[#006bbd]">Media Sosial</h2>
              <p className="mt-1 text-right text-xs text-slate-700">Dapatkan kabar terbaru seputar UPITRA melalui media sosial resmi kami.</p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {content.socials.map((s, i) => {
                  const Icon = socialIcons[s.name.toLowerCase()] ?? MessageCircle;
                  return (
                    <a
                      key={i}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-[0_4px_12px_rgba(0,107,189,0.15)] transition-transform hover:-translate-y-0.5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#006bbd] text-white">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold text-[#006bbd]">{s.name}</span>
                        <span className="mt-0.5 block truncate text-[10px] text-slate-500">{s.handle}</span>
                      </span>
                      <ExternalLink className="h-5 w-5 shrink-0 text-slate-300" strokeWidth={1.5} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
