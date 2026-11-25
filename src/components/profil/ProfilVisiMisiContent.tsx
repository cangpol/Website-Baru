"use client";

import { usePageContent } from "@/lib/usePageContent";
import Link from "next/link";
import { 
  Target, 
  Compass, 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  GraduationCap, 
  Building2, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle2,
  BookOpen
} from "lucide-react";





export default function ProfilVisiMisiContent() {
  const { content: __c } = usePageContent("visi-misi") as { content: Record<string, any> };
  const misiList = ((__c.misiList as { no: string; title: string; desc: string }[]) ?? []).filter((m) => m?.title?.trim());
  const tujuanList = ((__c.tujuanList as string[]) ?? []).filter((t) => typeof t === "string" && t.trim() !== "");
  return (
    <div className="space-y-16">

        
        {/* VISI BESAR UPITRA */}
        <section className="bg-gradient-to-br from-[#06172e] via-[#092244] to-[#0b2b54] rounded-3xl p-8 sm:p-14 text-white shadow-xl border border-blue-900/60 relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 border border-blue-700/60 text-sky-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-sky-400" />
              <span>Visi Transformatif UPITRA 2040</span>
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              &ldquo;Menjadi Perguruan Tinggi yang Unggul, Transformatif, Berkarakter, dan Berdaya Saing Global Berlandaskan Nilai-Nilai Kasih dan Integritas.&rdquo;
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
              Visi ini menjadi penuntun seluruh insan akademika UPITRA dalam menciptakan ekosistem keilmuan yang adaptif terhadap disrupsi teknologi, berakar pada keluhuran budi, serta siap menjawab tantangan peradaban masa depan.
            </p>
          </div>
        </section>

        {/* 6 MISI INSTITUSI */}
        <section className="space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Mandat Kelembagaan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              6 Misi Strategis UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Langkah konkrit yang dilaksanakan secara terpadu oleh seluruh sivitas akademika:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {misiList.map((misi, mi) => (
              <div 
                key={`${misi.no}-${mi}`}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 flex items-center justify-center font-black text-sm">
                    {misi.no}
                  </div>
                  <h3 className="text-base font-bold text-[#0b2545] leading-snug">
                    {misi.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {misi.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7 TUJUAN STRATEGIS */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Capaian Berkelanjutan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              7 Tujuan Strategis UPITRA
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Target pencapaian kelembagaan yang menjadi tolak ukur keberhasilan operasional universitas:
            </p>
          </div>

          <div className="space-y-3.5">
            {tujuanList.map((tujuan, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3.5 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-blue-50/50 hover:border-blue-100 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {tujuan}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Fast Link to Profil Pimpinan */}
        <div className="flex items-center justify-between p-6 rounded-2xl bg-blue-50 border border-blue-200 flex-col sm:flex-row gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0b2545]">Ingin Mengenal Jajaran Pimpinan Rektorat & Dekanat?</h4>
            <p className="text-xs text-slate-600">Pelajari rekam jejak akademisi dan pimpinan yang memajukan UPITRA.</p>
          </div>
          <Link
            href="/profil?tab=pimpinan"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-xs"
          >
            <span>Lihat Pimpinan Universitas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      
    </div>
  );
}
