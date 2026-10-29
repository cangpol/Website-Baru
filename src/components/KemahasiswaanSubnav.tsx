"use client";

import { motion } from "framer-motion";

export type KemahasiswaanTabKey = "about" | "pengembangan" | "organisasi" | "prestasi" | "kegiatan";

export interface KemahasiswaanSubnavProps {
  activeTab: KemahasiswaanTabKey;
  onTabChange: (tab: KemahasiswaanTabKey) => void;
}

export const KEMAHASISWAAN_TABS: { key: KemahasiswaanTabKey; label: string }[] = [
  { key: "about", label: "About Kemahasiswaan" },
  { key: "pengembangan", label: "Program Pengembangan" },
  { key: "organisasi", label: "Organisasi" },
  { key: "prestasi", label: "Prestasi Mahasiswa" },
  { key: "kegiatan", label: "Kegiatan Mahasiswa" },
];

export default function KemahasiswaanSubnav({ activeTab, onTabChange }: KemahasiswaanSubnavProps) {
  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl sm:rounded-full shadow-sm shadow-blue-900/5 p-1.5 sm:p-2">
      <nav aria-label="Tab Kemahasiswaan" className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar">
        {KEMAHASISWAAN_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <motion.button
              key={tab.key}
              type="button"
              onClick={() => onTabChange(tab.key)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative cursor-pointer rounded-full px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? "text-blue-700"
                  : "text-slate-600 hover:text-blue-600 hover:bg-blue-50/40"
              }`}
            >
              {/* Framer Motion Sliding Pill Background with Clean Shadow */}
              {isActive && (
                <motion.div
                  layoutId="kemahasiswaanActiveTabPill"
                  className="absolute inset-0 bg-blue-50/90 border border-blue-200/80 rounded-full shadow-md shadow-blue-500/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              
              <span className="relative z-10">{tab.label}</span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
