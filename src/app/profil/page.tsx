import Image from "next/image";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProfilTabs from "@/components/profil/ProfilTabs";
import { isProfilTabKey } from "@/lib/profilTabs";

export const metadata: Metadata = {
  title: "Profil Kampus UPITRA - Universitas Pignatelli Triputra",
  description:
    "Mengenal lebih dekat Universitas Pignatelli Triputra: transformasi kelembagaan, sejarah, kolaborasi dengan Triputra Group, serta video profil kampus.",
};

export default async function ProfilPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Tautan lama / footer: /profil?tab=pimpinan. Tab selanjutnya berpindah di klien.
  const raw = (await searchParams).tab;
  const requested = Array.isArray(raw) ? raw[0] : raw;
  const initialTab = isProfilTabKey(requested) ? requested : "tentang";

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

        <ProfilTabs initialTab={initialTab} />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
