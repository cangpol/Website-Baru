import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdmissionFunnel from "@/components/AdmissionFunnel";
import { prisma } from "@/lib/prisma";
import { 
  Sparkles, 
  HelpCircle, 
  PhoneCall, 
  ShieldCheck, 
  FileText, 
  CreditCard,
  Gift,
  ArrowRight
} from "lucide-react";

export default async function PmbPage() {
  let programs: any[] = [];
  try {
    programs = await prisma.program.findMany({
      select: { id: true, name: true, degreeLevel: true },
      orderBy: { name: "asc" },
    });
  } catch (e) {
    console.warn("DB offline, using fallback");
  }

  const faqs = [
    {
      q: "Apa saja fakultas dan program studi yang tersedia di UPITRA?",
      a: "UPITRA menyelenggarakan 4 Fakultas Unggulan jenjang Sarjana (S1) dan Diploma (D3): 1) Faculty Sains & Technology (S1 Informatika, S1 Sistem Informasi, S1 Rekayasa Perangkat Lunak), 2) Faculty Ekonomic & Bussiness (S1 Manajemen, S1 Akuntansi), 3) Faculty Social Humaniora (S1 Pariwisata, S1 Bahasa Inggris), dan 4) Faculty Health (S1 Kesehatan & Keselamatan Kerja, S1 Fisioterapi, D3 Keperawatan).",
    },
    {
      q: "Bagaimana cara mendaftar jalur beasiswa Triputra Peduli?",
      a: "Pendaftar dapat mengunggah fotokopi nilai rapor semester 1–4, sertifikat prestasi kejuaraan, atau surat rekomendasi sekolah. Beasiswa mencakup subsidi SPP dan pembebasan uang gedung hingga kelulusan.",
    },
    {
      q: "Apakah pendaftaran PMB UPITRA bisa dilakukan secara online?",
      a: "Ya, seluruh proses pendaftaran, konsultasi pemilihan jurusan, hingga pengiriman berkas dapat dilakukan 100% online melalui formulir di halaman ini.",
    },
    {
      q: "Di mana lokasi kampus Universitas Pignatelli Triputra (UPITRA)?",
      a: "Kampus utama UPITRA beralamat di Jl. Duwet Raya, Karangasem, Kec. Laweyan, Kota Surakarta (Solo), Jawa Tengah 57145.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Banner Section - Blue & White */}
        <section className="bg-gradient-to-r from-[#071f3d] via-[#0b2545] to-[#0f3b73] text-white py-16 px-4 sm:px-8 border-b border-blue-950">
          <div className="max-w-7xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-blue-500/20 text-sky-200 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-sky-400" />
              Penerimaan Mahasiswa Baru UPITRA 2026 / 2027
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Portal Pendaftaran Resmi PMB UPITRA
            </h1>
            <p className="text-sm text-slate-200 max-w-2xl mx-auto leading-relaxed">
              Daftar sekarang secara online di <strong>Universitas Pignatelli Triputra (UPITRA)</strong> Surakarta. Raih beasiswa prestasi dan masa depan karir cemerlang.
            </p>
            <div className="pt-2">
              <a
                href="https://pmb.upitra.ac.id"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-blue-500/30 transition-all hover:scale-105"
              >
                <span>Buka Portal Resmi: pmb.upitra.ac.id</span>
                <ArrowRight className="w-4 h-4 text-sky-200" />
              </a>
            </div>
          </div>
        </section>

        {/* Form and Guide Grid */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Steps Guide */}
            <div className="lg:col-span-6 space-y-8">
              <div>
                <h3 className="text-2xl font-extrabold text-[#0b2545] mb-2">
                  4 Langkah Mudah Menjadi Mahasiswa UPITRA
                </h3>
                <p className="text-xs text-slate-500">
                  Proses pendaftaran cepat, transparan, dan dapat diakses dari mana saja.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0b2545]">Isi Formulir Online</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Lengkapi data identitas dan tentukan program studi S1 minat Anda di formulir pendaftaran.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-800 flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0b2545]">Konsultasi & Verifikasi Nilai</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Tim Admisi UPITRA akan menghubungi via WhatsApp untuk verifikasi berkas rapor dan kalkulasi beasiswa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0b2545]">Penerbitan Surat Penerimaan (LoA)</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Calon mahasiswa yang memenuhi persyaratan menerima Surat Tanda Diterima resmi beserta rincian beasiswa.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    4
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-[#0b2545]">Daftar Ulang & Orientasi Mahasiswa</h5>
                    <p className="text-xs text-slate-500 mt-1">
                      Konfirmasi registrasi dan siap mengikuti pekan orientasi kampus dan pembinaan karakter Triputra.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout - Blue & White */}
              <div className="p-6 rounded-2xl bg-[#0b2545] text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-sky-300 uppercase">Butuh Konsultasi PMB?</div>
                  <div className="text-sm font-bold">Hotline Admisi UPITRA Surakarta</div>
                  <div className="text-xs text-slate-300">Senin - Sabtu: 08.00 - 16.30 WIB</div>
                </div>
                <a
                  href="https://wa.me/6281225008080"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md whitespace-nowrap transition-colors"
                >
                  Chat WhatsApp Sekarang
                </a>
              </div>

            </div>

            {/* Right: Admission Form */}
            <div className="lg:col-span-6">
              <AdmissionFunnel programs={programs} />
            </div>

          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                Pertanyaan yang Sering Diajukan
              </div>
              <h3 className="text-2xl font-extrabold text-[#0b2545]">FAQ Pendaftaran UPITRA</h3>
            </div>

            <div className="space-y-4">
              {faqs.map((f, i) => (
                <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-sm font-bold text-[#0b2545]">{f.q}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
