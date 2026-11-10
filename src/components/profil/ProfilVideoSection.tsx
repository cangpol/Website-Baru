import ProfilVideo from "@/components/ProfilVideo";

export default function ProfilVideoSection() {
  return (
    <section className="w-full bg-[#c5ddf1]" aria-labelledby="video-profil-heading">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-10 sm:px-12 lg:px-[120px] lg:py-14">
        <div className="mb-6 space-y-2 text-left lg:ml-auto lg:max-w-3xl lg:text-right">
          <h2
            id="video-profil-heading"
            className="text-2xl font-extrabold uppercase tracking-tight text-[#006bbd] sm:text-3xl"
          >
            Video Profil UPITRA
          </h2>
          <p className="text-xs leading-relaxed text-slate-800 sm:text-[13px]">
            Video ini menampilkan profil Universitas Pignatelli Triputra, peresmian gedung baru, fasilitas
            pembelajaran, kegiatan akademik, serta lingkungan kampus yang mendukung pengembangan mahasiswa menjadi
            profesional berdaya saing global.
          </p>
        </div>
        <ProfilVideo />
      </div>
    </section>
  );
}
