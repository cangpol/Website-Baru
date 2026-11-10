import { CheckCircle2 } from "lucide-react";

export default function ProfilDnaContent() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div className="space-y-4 lg:col-span-7">
          <span className="text-xs font-bold uppercase tracking-wider text-[#006bbd]">Pilar Sinergi Strategis</span>
          <h2 className="text-2xl font-extrabold tracking-tight text-[#0b2545] sm:text-3xl">
            Kolaborasi Yayasan Santo Ignatius Pignatelli &amp; Triputra Group
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">
            UPITRA memadukan pendidikan karakter berakar nilai-nilai Ignasian (hati yang berbelarasa) dengan
            kompetensi profesional berbasis kebutuhan industri (Triputra DNA), sehingga lulusannya memiliki
            integritas moral tinggi dan kesiapan berkarir global.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-[#0b2545]">
              <CheckCircle2 className="h-4 w-4 text-[#006bbd]" />
              <span>Akreditasi Institusi BAIK SEKALI BAN-PT</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2 text-xs font-bold text-[#0b2545]">
              <CheckCircle2 className="h-4 w-4 text-[#006bbd]" />
              <span>Kampus Siap Kerja Ekosistem Triputra</span>
            </div>
          </div>
        </div>
        <div className="lg:col-span-5">
            <div className="relative rounded-2xl bg-[#06172e] p-6 sm:p-8 text-white border border-blue-900 shadow-xl overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center mb-6 shadow-md">
                <img src="/images/logo.png" alt="Logo UPITRA" className="w-full h-full object-contain" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Makna Lambang UPITRA</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Lambang UPITRA merepresentasikan perpaduan kompas kebijaksanaan, kobaran api semangat melayani, dan lingkaran kebersamaan Triputra. Simbol ini menegaskan tekad institusi menjadi mercusuar pendidikan tinggi berkarakter unggul di Indonesia.
              </p>
              <div className="space-y-2 border-t border-blue-900/60 pt-4 text-xs text-slate-300">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Badan Penyelenggara:</span>
                  <span className="text-sky-300 font-bold">Yayasan St. Ignatius Pignatelli</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Mitra Pendukung Industri:</span>
                  <span className="text-sky-300 font-bold">Triputra Group</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Wilayah Pembinaan:</span>
                  <span className="text-slate-200">LLDIKTI Wilayah VI Jateng</span>
                </div>
              </div>
            </div>
          </div>
      </section>

      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 tracking-wider uppercase">Falsafah Pendidikan</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b2545] mt-1">
              4 Nilai Pokok Triputra DNA & Semangat Ignasian
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Setiap mahasiswa UPITRA dibina untuk memiliki fondasi karakter kokoh yang diakui dan dicari oleh dunia industri modern:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                01
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Integrity & Ethics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Menjunjung kejujuran, komitmen moral, ketulusan, serta integritas etika profesional dalam setiap tindakan dan pengambilan keputusan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                02
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senantiasa mengejar standar kualitas tertinggi, berorientasi pada hasil prima, dan pantang menyerah dalam menghadapi tantangan zaman.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                03
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Compassion (Belarasa)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Memiliki kepedulian tulus terhadap sesama dan lingkungan sosial, menghidupi semangat solider bagi yang rentan dan membutuhkan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
                04
              </div>
              <h3 className="text-base font-bold text-[#0b2545]">Humility & Service</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kerendahan hati untuk terus belajar, menghargai keberagaman, dan mendedikasikan keahlian keilmuan untuk melayani kemajuan bangsa.
              </p>
            </div>
          </div>
        </section>
    </div>
  );
}
