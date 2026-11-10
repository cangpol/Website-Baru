import Image from "next/image";

export default function ProfilTentangContent() {
  return (
    <div className="space-y-10">
      <section className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl">
            Transformasi UPITRA
          </h2>
          <p className="text-justify text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            Universitas Pignatelli Triputra (UPITRA) adalah kampus dengan konsep &quot;Link and Match&quot; dengan
            dunia industri, merujuk pada hubungan yang erat antara pendidikan tinggi dan sektor industri untuk
            memastikan lulusan siap kerja dan relevan dengan kebutuhan pasar.
          </p>
          <p className="text-justify text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            Karena UPITRA mempunyai hubungan erat dengan Triputra Group dan Persada Capital Investama. Konsep ini
            menekankan pentingnya kolaborasi antara institusi pendidikan dan dunia usaha dalam merancang kurikulum,
            magang, pelatihan, serta penelitian yang mendukung pengembangan keterampilan dan pengetahuan yang
            dibutuhkan oleh industri.
          </p>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl shadow-[0_4px_16px_rgba(0,107,189,0.25)] ring-1 ring-blue-100">
          <Image
            src="/images/gedung-upitra.jpg"
            alt="Gedung Universitas Pignatelli Triputra"
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="space-y-5" aria-labelledby="sejarah-heading">
        <h2
          id="sejarah-heading"
          className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl"
        >
          Sejarah
        </h2>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900">Awal Mula dan Penggabungan</h3>
          <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            UPITRA merupakan hasil penggabungan (merger) dari dua lembaga pendidikan tinggi pendahulunya:
          </p>
          <ul className="list-disc space-y-1 pl-6 text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            <li>Akademi Bahasa Asing (ABA) Santo Pignatelli (berdiri sejak tahun 1969).</li>
            <li>
              Sekolah Tinggi Ilmu Ekonomi (STIE) Santo Pignatelli (bermula dari Akademi Akuntansi yang beroperasi
              sejak tahun 1970).
            </li>
          </ul>
          <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            Nama &quot;Pignatelli&quot; diambil dari <strong>Santo Yosef Maria Pignatelli</strong>, simbol
            keteladanan dan tahan uji. Fondasi awal institusi ini dinaungi oleh Yayasan Santo Yosef Maria Pignatelli
            Surakarta yang sudah bergerak di bidang pendidikan sejak 27 Januari 1968.
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-bold text-slate-900">Kolaborasi dengan Industri</h3>
          <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            Dalam perkembangannya, UPITRA menggandeng PT Triputra Edukasi Nusantara (afiliasi dari Triputra Group
            dan Persada Capital Investama) untuk menerapkan konsep &quot;Link and Match&quot; antara dunia pendidikan
            dan kebutuhan industri.
          </p>
          <p className="text-[13px] leading-relaxed text-slate-800 sm:text-sm">
            Saat ini, UPITRA mengelola beberapa fakultas dan program studi di bidang ekonomi, sains, serta teknologi
            yang berlokasi di Jl. Duwet No.1, Karangasem, Laweyan, Surakarta. Informasi lebih lanjut mengenai
            program dan pendaftaran dapat dilihat langsung melalui situs resmi Universitas Pignatelli Triputra.
          </p>
        </div>
      </section>
    </div>
  );
}
