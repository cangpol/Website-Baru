import { notFound } from "next/navigation";
import { getProdiBySlug, getAllProdi, getRelatedProdi } from "@/lib/prodiData";
import ProdiNavbar from "@/components/ProdiNavbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ProdiDetailView from "@/components/ProdiDetailView";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const prodis = getAllProdi();
  const slugs: { prodiSlug: string }[] = [];
  
  prodis.forEach((p) => {
    slugs.push({ prodiSlug: p.slug });
    p.aliases.forEach((alias) => {
      slugs.push({ prodiSlug: alias });
    });
  });
  
  return slugs;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prodiSlug: string }>;
}): Promise<Metadata> {
  const { prodiSlug } = await params;
  const prodi = getProdiBySlug(prodiSlug);

  if (!prodi) {
    return {
      title: "Program Studi Tidak Ditemukan - UPITRA",
      description: "Halaman program studi yang Anda cari tidak dapat ditemukan di Universitas Pignatelli Triputra.",
    };
  }

  return {
    title: `${prodi.name} (${prodi.degreeTitle}) - Universitas Pignatelli Triputra`,
    description: `${prodi.tagline}. Pelajari kurikulum, prospek karir, laboratorium, dan beasiswa penuh 100% di ${prodi.name} UPITRA Surakarta.`,
    openGraph: {
      title: `${prodi.name} (${prodi.degreeTitle}) | UPITRA Surakarta`,
      description: prodi.tagline,
      images: [
        {
          url: prodi.heroImage,
          width: 1200,
          height: 630,
          alt: prodi.name,
        },
      ],
    },
  };
}

export default async function ProdiPage({
  params,
}: {
  params: Promise<{ prodiSlug: string }>;
}) {
  const { prodiSlug } = await params;
  const prodi = getProdiBySlug(prodiSlug);

  if (!prodi) {
    notFound();
  }

  const related = getRelatedProdi(prodi.slug, 3);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <ProdiNavbar prodi={prodi} />
      <main className="flex-1">
        <ProdiDetailView prodi={prodi} relatedProdi={related} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

