import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgramFinder, { type ProgramItem } from "@/components/ProgramFinder";
import { prisma } from "@/lib/prisma";
import { GraduationCap } from "lucide-react";

export default async function ProgramsPage() {
  let programs: ProgramItem[] = [];

  try {
    programs = (await prisma.program.findMany({
      include: { faculty: true },
      orderBy: { name: "asc" },
    })) as unknown as ProgramItem[];
  } catch {
    console.warn("DB offline, using UPITRA default programs");
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Header Banner - Blue & White */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white py-16 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-sky-400" />
              Pendidikan Sarjana (S1) & Diploma (D3) Terakreditasi
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Fakultas & Program Studi UPITRA
            </h1>
            <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Temukan program studi impian Anda di <strong>Universitas Pignatelli Triputra (UPITRA)</strong> Surakarta. Tersedia pada <strong>Faculty Sains & Technology</strong>, <strong>Faculty Ekonomic & Bussiness</strong>, <strong>Faculty Social Humaniora</strong>, dan <strong>Faculty Health</strong>.
            </p>
          </div>
        </section>

        {/* Program Finder Component */}
        <ProgramFinder initialPrograms={programs} />
      </main>

      <Footer />
    </div>
  );
}
