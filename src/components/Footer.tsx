import Link from "next/link";
import { Music2, MessageCircle } from "lucide-react";

type Col = { title: string; links: [string, string][] };

const columns: Col[][] = [
  [{
    title: "Profil",
    links: [
      ["Tentang UPITRA", "/profil/tentang-upitra"],
      ["Visi, Misi, dan Tujuan", "/profil/visi-misi-tujuan"],
      ["Pimpinan Universitas", "/profil/pimpinan-universitas"],
      ["Berita Kampus", "/profil/berita-kampus"],
      ["Pengumuman", "/profil/pengumuman"],
      ["UPITRA DNA", "/profil"],
    ],
  }],
  [
    { title: "Akademik", links: [["Fakultas", "/akademik"], ["Program Studi", "/programs"]] },
    { title: "Riset", links: [["Pusat Penelitian", "/riset/pusat-penelitian-dan-publikasi"], ["Publikasi Jurnal Ilmiah", "/riset/pusat-penelitian-dan-publikasi"]] },
  ],
  [
    { title: "Kemahasiswaan", links: [["Organisasi", "/kemahasiswaan/organisasi-mahasiswa"], ["Unit Kegiatan Mahasiswa", "/kemahasiswaan"]] },
    { title: "Kerjasama", links: [["Mitra Kerjasama", "/kerjasama/mitra-kerjasama"], ["Galeri Kegiatan Kerjasama", "/kerjasama/kegiatan-kerjasama"]] },
  ],
  [{ title: "Portal Kampus", links: [["Ekosistem Kampus", "/layanan"], ["Media Sosial", "https://instagram.com"]] }],
];

const iconCls = "w-4 h-4";
const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: (
    <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2.2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
  ) },
  { label: "TikTok", href: "https://tiktok.com", icon: <Music2 className={iconCls} /> },
  { label: "YouTube", href: "https://youtube.com", icon: (
    <svg viewBox="0 0 24 24" className={iconCls} fill="currentColor"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" /></svg>
  ) },
  { label: "WhatsApp", href: "https://wa.me/628112907500", icon: <MessageCircle className={iconCls} /> },
  { label: "Facebook", href: "https://facebook.com", icon: (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3h-3V8.7c0-.9.3-1.5 1.6-1.5h1.5V4.5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.3H8v3h2.5V21h3Z" /></svg>
  ) },
];

const linkCls = "text-[11px] text-white hover:underline underline-offset-2";

export default function Footer() {
  return (
    <footer className="bg-[#006bbd] text-white font-sans">
      <div className="max-w-[1440px] mx-auto px-[clamp(20px,8.8vw,120px)] pt-12 pb-8">
        {/* Logo + social */}
        <div className="flex items-center justify-between gap-4 pb-8 border-b border-white/60">
          <Link href="/" className="inline-flex items-center gap-3" aria-label="UPITRA Beranda">
            {/* shortcut: logo is the colour version on a white tile; swap in a white-line logo asset if one exists */}
            <span className="w-10 h-10 rounded-lg bg-white p-1 flex shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-upitra.png" alt="Logo UPITRA" className="w-full h-full object-contain" />
            </span>
            <span className="flex flex-col text-[10px] font-extrabold uppercase tracking-[0.18em] leading-[1.15]">
              <span>Universitas</span><span>Pignatelli</span><span>Triputra</span>
            </span>
          </Link>
          <div className="flex items-center gap-2.5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="w-[26px] h-[26px] sm:w-7 sm:h-7 rounded-full bg-white text-[#006bbd] flex items-center justify-center hover:scale-110 transition-transform"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-x-6 gap-y-8 pt-8">
          {columns.map((group, i) => (
            <div key={i} className="space-y-6">
              {group.map((col) => (
                <div key={col.title}>
                  <h4 className="text-[13px] font-bold mb-4">{col.title}</h4>
                  <ul className="space-y-3.5">
                    {col.links.map(([label, href]) => (
                      <li key={label}>
                        <Link href={href} className={linkCls}>{label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div>
            <h4 className="text-[13px] font-bold mb-4">Alamat</h4>
            <p className="text-[11px] leading-[1.4]">Jl. Duwet No. 1, Karangasem, Laweyan, Surakarta 57145</p>
            <p className="text-[11px] leading-[1.4] mt-4">
              Fax: (0274) 550657<br />
              Hotline: 0811 290 7500<br />
              Email: <a href="mailto:pmb@upitra.ac.id" className="hover:underline">pmb@upitra.ac.id</a>
            </p>
          </div>
        </div>

        <p className="mt-12 text-center text-[9px] italic">
          Copyright © {new Date().getFullYear()} UPITRA. All rights reserved. Powered by Marketing &amp; IT UPITRA. #raisokerjo
        </p>
      </div>
    </footer>
  );
}
