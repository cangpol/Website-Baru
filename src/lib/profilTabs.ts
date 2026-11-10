export type ProfilTabKey = "tentang" | "visi-misi" | "pimpinan" | "berita" | "pengumuman" | "dna";

export const PROFIL_TABS: { key: ProfilTabKey; label: string }[] = [
  { key: "tentang", label: "Tentang UPITRA" },
  { key: "visi-misi", label: "Visi Misi & Tujuan" },
  { key: "pimpinan", label: "Pimpinan Universitas" },
  { key: "berita", label: "Berita Kampus" },
  { key: "pengumuman", label: "Pengumuman" },
  { key: "dna", label: "UPITRA DNA" },
];

export function isProfilTabKey(value: string | null | undefined): value is ProfilTabKey {
  return PROFIL_TABS.some((tab) => tab.key === value);
}
