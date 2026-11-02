"use client";

export default function HeroSlider() {
  return (
    <section 
      className="relative w-full bg-[#006bbd] flex justify-center overflow-hidden select-none" 
      aria-label="Grand Gateway UPITRA"
    >
      {/* ── BANNER 1440px x 810px (EXACT FIGMA DIMENSIONS) ────────────────────── */}
      <div 
        className="relative w-full max-w-[1440px] h-[810px] mx-auto overflow-hidden flex items-center justify-center shrink-0"
        style={{
          width: "1440px",
          height: "810px",
          maxWidth: "100%",
          aspectRatio: "1440 / 810",
        }}
      >
        {/* Exact 1440x810 Composite Banner Image */}
        <img
          src="/images/banners/banner-campus-to-career.jpg"
          alt="Universitas Pignatelli Triputra Campus to Career"
          loading="eager"
          decoding="async"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />

        {/* Interactive Clickable Overlay Area for Yellow Button 'Daftar Sekarang' */}
        {/* Exact button bounds: Left: 120px (8.333%), Top: 528px (65.185%), Width: 196px (13.611%), Height: 50px (6.173%) */}
        <a
          href="https://pmb.upitra.ac.id"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Daftar Sekarang PMB UPITRA"
          className="absolute rounded-xl transition-all duration-200 hover:ring-4 hover:ring-amber-300/70 hover:shadow-lg active:scale-95 cursor-pointer z-20"
          style={{
            left: "8.333%",
            top: "65.185%",
            width: "13.611%",
            height: "6.173%",
          }}
          title="Daftar Sekarang ke PMB UPITRA"
        />

        {/* Semantic Content for SEO & Screen Readers */}
        <div className="sr-only">
          <h1>Universitas Pignatelli Triputra Campus to Career</h1>
          <p>
            Temukan program studi, kembangkan potensimu, dan dapatkan pekerjaan sebelum lulus kuliah di Universitas Pignatelli Triputra.
          </p>
          <a href="https://pmb.upitra.ac.id">Daftar Sekarang</a>
        </div>
      </div>
    </section>
  );
}
