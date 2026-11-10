"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProfilSubNav from "@/components/ProfilSubNav";
import type { ProfilTabKey } from "@/lib/profilTabs";
import ProfilTentangContent from "@/components/profil/ProfilTentangContent";
import ProfilVideoSection from "@/components/profil/ProfilVideoSection";
import ProfilVisiMisiContent from "@/components/profil/ProfilVisiMisiContent";
import ProfilPimpinanContent from "@/components/profil/ProfilPimpinanContent";
import ProfilBeritaContent from "@/components/profil/ProfilBeritaContent";
import ProfilPengumumanContent from "@/components/profil/ProfilPengumumanContent";
import ProfilDnaContent from "@/components/profil/ProfilDnaContent";

const panels: Record<ProfilTabKey, () => React.ReactNode> = {
  tentang: () => <ProfilTentangContent />,
  "visi-misi": () => <ProfilVisiMisiContent />,
  pimpinan: () => <ProfilPimpinanContent />,
  berita: () => <ProfilBeritaContent />,
  pengumuman: () => <ProfilPengumumanContent />,
  dna: () => <ProfilDnaContent />,
};

export default function ProfilTabs({ initialTab = "tentang" }: { initialTab?: ProfilTabKey }) {
  // Tab berpindah di dalam halaman (tanpa navigasi), sama seperti /kemahasiswaan.
  const [activeTab, setActiveTab] = useState<ProfilTabKey>(initialTab);

  return (
    <>
      <div className="w-full bg-white">
        <ProfilSubNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-4 pb-14 pt-4 sm:px-12 lg:px-[120px] lg:pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            role="tabpanel"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.25 }}
          >
            {panels[activeTab]()}
          </motion.div>
        </AnimatePresence>
      </div>

      {activeTab === "tentang" && <ProfilVideoSection />}
    </>
  );
}
