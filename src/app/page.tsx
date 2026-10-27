import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import ImmersionProgramSection from "@/components/ImmersionProgramSection";
import InstagramFeedSection from "@/components/InstagramFeedSection";
import CtaEnrollmentSection from "@/components/CtaEnrollmentSection";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 relative selection:bg-blue-600 selection:text-white">
      {/* 1. Header & Megamenu */}
      <Navbar />

      <main className="flex-1">
        {/* ACT 1: The Grand Gateway (Cinematic Hero + Fast-Track Dock + Prestige Metrics) */}
        <HeroSlider />

        {/* ACT 2: Immersion Program 3+1 (Keunggulan yang Membedakan Kami) */}
        <ImmersionProgramSection />

        {/* ACT 3: Galeri Aktivitas Instagram Real-Time (@upitra_campus) */}
        <InstagramFeedSection />

        {/* ACT 4: Banner PMB 2026 & Kontak Admisi (Siap Memulai Perjalanan Akademikmu?) */}
        <CtaEnrollmentSection />
      </main>

      {/* Signature Directory Footer */}
      <Footer />

      {/* Floating WhatsApp Contact Widget */}
      <FloatingWhatsApp />
    </div>
  );
}
