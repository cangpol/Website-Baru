import Link from "next/link";
import { Building, MapPin, Compass, ArrowRight } from "lucide-react";

export default function CampusLifeSection() {
  const facilities = [
    {
      title: "Gedung Kampus Utama & Smart Classroom",
      location: "Surakarta (Solo)",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
      desc: "Ruang perkuliahan interaktif modern yang nyaman, ber-AC, dan dilengkapi teknologi presentasi digital serta akses internet berkecepatan tinggi.",
    },
    {
      title: "High-Tech Computer & Software Lab (FST)",
      location: "Surakarta (Solo)",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
      desc: "Laboratorium rekayasa perangkat lunak dan komputasi awan berkinerja tinggi untuk mahasiswa Informatika, Sistem Informasi, dan RPL.",
    },
    {
      title: "Hospitality & Language Laboratory (FSH)",
      location: "Surakarta (Solo)",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      desc: "Laboratorium simulasi perhotelan dan multimedia bahasa untuk mengasah kompetensi praktis mahasiswa Pariwisata dan Bahasa Inggris.",
    },
    {
      title: "Business Center & Accounting Lab (FEB)",
      location: "Surakarta (Solo)",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80",
      desc: "Laboratorium akuntansi digital, simulasi transaksi bursa, dan pusat inkubasi bisnis bagi mahasiswa Manajemen dan Akuntansi.",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              Fasilitas Kampus UPITRA
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0b2545] tracking-tight">
              Lingkungan Belajar Kondusif & Berstandar Industri
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Berlokasi strategis di Surakarta (Solo), Jawa Tengah, kampus UPITRA menghadirkan atmosfer akademis yang ramah, asri, dan sarat teknologi penunjang masa depan.
            </p>
          </div>

          <Link
            href="/life-at-upitra"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-[#0b2545] font-bold text-xs hover:bg-blue-50 hover:text-blue-600 shadow-sm transition-colors whitespace-nowrap self-start md:self-auto"
          >
            <span>Eksplorasi Kehidupan Kampus</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </Link>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((fac, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={fac.image}
                  alt={fac.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-sky-400" />
                  {fac.location}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h4 className="text-sm font-bold text-[#0b2545] group-hover:text-blue-600 transition-colors">
                    {fac.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {fac.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
