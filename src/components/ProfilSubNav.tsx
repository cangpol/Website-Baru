import Link from "next/link";

export const profilTabs = [
  { label: "Tentang UPITRA", href: "/profil" },
  { label: "Visi Misi & Tujuan", href: "/profil/visi-misi-tujuan" },
  { label: "Pimpinan Universitas", href: "/profil/pimpinan-universitas" },
  { label: "Berita Kampus", href: "/profil/berita-kampus" },
  { label: "Pengumuman", href: "/profil/pengumuman" },
  { label: "UPITRA DNA", href: "/profil/tentang-upitra#upitra-dna" },
] as const;

/** Pill-style sub navigation shared by the Profil pages. */
export default function ProfilSubNav({ active }: { active: string }) {
  return (
    <nav aria-label="Navigasi Profil" className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-[120px]">
        <ul className="flex items-center gap-2 overflow-x-auto py-5 sm:gap-3 lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {profilTabs.map((tab) => {
            const isActive = tab.href === active;
            return (
              <li key={tab.href} className="shrink-0">
                <Link
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center rounded-full border px-4 py-1.5 text-xs font-bold transition-colors sm:px-5 sm:text-[13px] ${
                    isActive
                      ? "border-[#006bbd] bg-white text-[#006bbd] shadow-[0_0_0_1px_#006bbd_inset]"
                      : "border-transparent text-[#006bbd] hover:border-[#006bbd]/40 hover:bg-blue-50"
                  }`}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
