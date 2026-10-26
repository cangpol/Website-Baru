import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import NumbersCounter from "@/components/NumbersCounter";
import ProgramFinder from "@/components/ProgramFinder";
import LifeAtUpitraSection from "@/components/LifeAtUpitraSection";
import PartnersSection from "@/components/PartnersSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { getAllArticles, staticEvents } from "@/lib/newsData";
import { Newspaper, Calendar, Clock, MapPin, ArrowRight, Award, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  let programs: any[] = [];
  let articles: any[] = [];
  let events: any[] = [];

  try {
    programs = await prisma.program.findMany({
      include: {
        faculty: true,
      },
      orderBy: {
        featured: "desc",
      },
      take: 9,
    });

    articles = await prisma.article.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 3,
    });

    events = await prisma.event.findMany({
      orderBy: { startDate: "asc" },
      take: 3,
    });
  } catch (error) {
    console.warn("Database offline, using UPITRA static defaults");
  }

  const displayArticles = articles && articles.length > 0 ? articles : getAllArticles().slice(0, 4);
  const displayEvents = events && events.length > 0 ? events : staticEvents.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative">
      {/* 1. Header & Megamenu (Persis ciputra.ac.id) */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Slider ("YOUR FUTURE STARTS HERE") */}
        <HeroSlider />

        {/* 3. Section Counter ("UPITRA IN NUMBERS") */}
        <NumbersCounter />

        {/* 4. Academic Programs Tabs ("YOUR FUTURE STARTS HERE" - 3 Fakultas S1) */}
        <ProgramFinder initialPrograms={programs} />

        {/* 5. Life at Universitas Pignatelli Triputra Section */}
        <LifeAtUpitraSection />

        {/* 6. Mitra Universitas & Rekognisi (Persis ciputra.ac.id) */}
        <PartnersSection />

        {/* 7. Jalur Pendaftaran PMB (Modern & Professional Strip) */}
        <section id="jalur-pendaftaran" className="py-12 sm:py-14 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
            
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4 text-blue-600" />
                  Penerimaan Mahasiswa Baru TA 2026 / 2027
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] tracking-tight">
                  PILIHAN JALUR PENDAFTARAN RESMI UPITRA
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                  Pilih skema seleksi masuk yang paling sesuai dengan kualifikasi dan prestasi akademik Anda. Tersedia beasiswa prestasi s/d 100% dan keringanan biaya bersama Triputra Group.
                </p>
              </div>

              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all hover:scale-105 shrink-0 w-fit"
              >
                <span>Daftar PMB Online</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* 4 Modern Pathway Cards (1 Baris di Desktop) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Jalur Rapor */}
              <div className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-[10px] font-extrabold uppercase tracking-wide">
                      Bebas Tes Masuk
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-xs">
                      01
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0b2545] group-hover:text-blue-600 transition-colors">
                      Jalur Seleksi Nilai Rapor
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Seleksi cepat nilai rapor SMA/SMK/MA semester 1–4 tanpa ujian tulis masuk.
                    </p>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Rapor min. rata-rata 75.0</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Verifikasi berkas 1x24 jam</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Kuota Reguler</span>
                  <a 
                    href="https://pmb.upitra.ac.id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-blue-600 group-hover:underline flex items-center gap-1"
                  >
                    <span>Daftar</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card 2: Beasiswa Triputra Peduli */}
              <div className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-500 to-yellow-400" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-extrabold uppercase tracking-wide">
                      Beasiswa s/d 100%
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                      02
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0b2545] group-hover:text-amber-700 transition-colors">
                      Beasiswa Triputra Peduli
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Pembebasan uang gedung s/d 100% dan subsidi biaya SPP sampai wisuda kelulusan.
                    </p>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Bebas uang gedung 100%</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Subsidi SPP tiap semester</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-600">Prioritas Prestasi</span>
                  <a 
                    href="https://pmb.upitra.ac.id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-amber-700 group-hover:underline flex items-center gap-1"
                  >
                    <span>Daftar</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card 3: Jalur Prestasi & Bakat */}
              <div className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-indigo-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-400" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold uppercase tracking-wide">
                      Prestasi &amp; Bakat
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                      03
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0b2545] group-hover:text-indigo-600 transition-colors">
                      Prestasi Akademik &amp; Bakat
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Apresiasi juara bidang sains, seni budaya, olahraga, kepemimpinan OSIS dan organisasi.
                    </p>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Sertifikat kota/prov/nasional</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Potongan biaya pendidikan</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Non-Akademik</span>
                  <a 
                    href="https://pmb.upitra.ac.id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-indigo-600 group-hover:underline flex items-center gap-1"
                  >
                    <span>Daftar</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Card 4: Kemitraan Sekolah */}
              <div className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-xl hover:border-emerald-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-extrabold uppercase tracking-wide">
                      Mitra Sekolah
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      04
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-[#0b2545] group-hover:text-emerald-700 transition-colors">
                      Jalur Kemitraan Sekolah
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Keringanan biaya khusus bagi siswa dan siswi dari jejaring SMA/SMK mitra resmi UPITRA.
                    </p>
                  </div>
                  <ul className="space-y-1.5 pt-1 text-[11px] text-slate-600">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Rekomendasi guru BK / sekolah</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Diskon formulir pendaftaran</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">MoU Sekolah</span>
                  <a 
                    href="https://pmb.upitra.ac.id" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-xs font-bold text-emerald-700 group-hover:underline flex items-center gap-1"
                  >
                    <span>Daftar</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 8. Kegiatan Dan Artikel / Latest News (Persis ciputra.ac.id) */}
        <section className="py-16 sm:py-20 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider">
                  <Newspaper className="w-3.5 h-3.5 text-blue-600" />
                  Seputar Informasi &amp; Berita
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0b2545] tracking-tight">
                  KEGIATAN DAN ARTIKEL TERBARU
                </h2>
              </div>
              <Link
                href="/berita"
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors shrink-0"
              >
                <span>Lihat Seluruh Informasi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Articles (8 cols) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {displayArticles.map((art) => (
                  <article
                    key={art.id}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-300 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                      <img
                        src={art.coverImage}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-blue-600/90 text-white text-[10px] font-bold backdrop-blur-sm">
                        {art.categoryLabel || art.category}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-blue-600" />
                            {art.publishedAt ? (typeof art.publishedAt === 'string' ? art.publishedAt : 'Terbaru') : 'Terbaru'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-sky-600" />
                            {art.readTime || "3 min baca"}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>
                      </div>
                      <Link
                        href={`/berita/${art.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors pt-2"
                      >
                        <span>Baca Selengkapnya</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Events Sidebar (4 cols) */}
              <div className="lg:col-span-4 bg-slate-50/80 rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#0b2545]">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>Agenda Kampus Mendatang</span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {displayEvents.map((ev: any) => (
                    <div
                      key={ev.id}
                      className="p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:border-blue-400 transition-colors flex items-start gap-3"
                    >
                      {/* Calendar Date Block */}
                      <div className="w-13 shrink-0 rounded-xl overflow-hidden border border-blue-200 shadow-2xs text-center">
                        <div className="bg-blue-600 text-white text-[9px] font-black py-0.5 tracking-wider uppercase">
                          {ev.month || "NOV"}
                        </div>
                        <div className="bg-white text-[#0b2545] text-base font-black py-0.5">
                          {ev.day || "20"}
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-[9px] font-extrabold uppercase">
                          {ev.category || "AGENDA RESMI"}
                        </span>
                        <h4 className="text-xs font-bold text-[#0b2545] leading-snug hover:text-blue-600">
                          {ev.title}
                        </h4>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sky-600 shrink-0" />
                          <span>{ev.time || "09.00 - 15.00 WIB"}</span>
                        </div>
                        <div className="text-[10px] text-slate-500 flex items-center gap-1 truncate">
                          <MapPin className="w-3 h-3 text-sky-600 shrink-0" />
                          <span className="truncate">{ev.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://pmb.upitra.ac.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 px-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
                >
                  Daftar PMB Online &rarr;
                </a>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* 10. Signature 5-Column Directory Footer */}
      <Footer />

      {/* 11. Floating WhatsApp Chat Widget (Persis ciputra.ac.id) */}
      <FloatingWhatsApp />
    </div>
  );
}
