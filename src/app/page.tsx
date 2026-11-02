import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import WelcomeAdmissionWaves from "@/components/WelcomeAdmissionWaves";
import UpitraDalamAngka from "@/components/UpitraDalamAngka";
import HomepageNewsEvents from "@/components/HomepageNewsEvents";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative selection:bg-[#006bbd] selection:text-white font-sans">
      {/* 1. Header & Navigation Bar (Pure White, Sticky ~64px, Logo + Menu + CTA) */}
      <Navbar />

      <main className="flex-1">
        {/* 2. Hero Banner: "Campus to Career" (1440x810 Frame, 120px Padding, 50px Gap, #006bbd Gradient) */}
        <HeroSlider />

        {/* 3. Selamat Datang di UPITRA - Gelombang Pendaftaran (Ready Early, Achievement, Admission) */}
        <WelcomeAdmissionWaves />

        {/* 4. UPITRA Dalam Angka (6 Metrik Prestasi & Capaian 1440x642) */}
        <UpitraDalamAngka />

        {/* 5. Berita & Riset Terbaru serta Event Mendatang */}
        <HomepageNewsEvents />
      </main>

      {/* 6. Signature Directory Footer */}
      <Footer />

      {/* 7. Floating WhatsApp Direct Hotline */}
      <FloatingWhatsApp />
    </div>
  );
}
