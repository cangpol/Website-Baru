"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export interface KemahasiswaanSubnavProps {
  activeSlug?: "about" | "pengembangan" | "organisasi" | "prestasi" | "kegiatan" | "overview";
}

export const KEMAHASISWAAN_SUBNAV_ITEMS = [
  { slug: "about", label: "About Kemahasiswaan", href: "/kemahasiswaan/tugas-dan-fungsi" },
  { slug: "pengembangan", label: "Program Pengembangan", href: "/kemahasiswaan/program-pengembangan" },
  { slug: "organisasi", label: "Organisasi", href: "/kemahasiswaan/organisasi-mahasiswa" },
  { slug: "prestasi", label: "Prestasi Mahasiswa", href: "/kemahasiswaan/prestasi-mahasiswa" },
  { slug: "kegiatan", label: "Kegiatan Mahasiswa", href: "/kemahasiswaan/galeri-kegiatan" },
];

export default function KemahasiswaanSubnav({ activeSlug }: KemahasiswaanSubnavProps) {
  const pathname = usePathname();

  return (
    <div className="w-full bg-white border-b border-slate-200/80 shadow-xs sticky top-[80px] z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav aria-label="Subnav Kemahasiswaan" className="flex items-center justify-start md:justify-center gap-1.5 sm:gap-3 overflow-x-auto py-3 sm:py-3.5 no-scrollbar">
          {KEMAHASISWAAN_SUBNAV_ITEMS.map((item) => {
            const isActive = activeSlug ? activeSlug === item.slug : pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                  isActive
                    ? "bg-[#e6f4f1] text-[#006655] shadow-xs"
                    : "text-[#006655]/85 hover:text-[#006655] hover:bg-[#e6f4f1]/50"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
