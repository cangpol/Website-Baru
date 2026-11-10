"use client";

import { motion } from "framer-motion";
import { PROFIL_TABS, type ProfilTabKey } from "@/lib/profilTabs";

interface ProfilSubNavProps {
  activeTab: ProfilTabKey;
  onTabChange: (tab: ProfilTabKey) => void;
}

/** In-page pill tabs (same behaviour as the Kemahasiswaan sub navigation): no route change. */
export default function ProfilSubNav({ activeTab, onTabChange }: ProfilSubNavProps) {
  return (
    <nav aria-label="Tab Profil" className="mx-auto w-full max-w-[1440px] px-4 sm:px-12 lg:px-[120px]">
      <div role="tablist" className="no-scrollbar flex items-center justify-start gap-1 overflow-x-auto py-5 sm:gap-2 lg:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {PROFIL_TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabChange(tab.key)}
              className={`relative shrink-0 cursor-pointer whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-colors sm:px-5 sm:py-2 sm:text-[13px] ${
                isActive ? "text-[#006bbd]" : "text-[#006bbd]/80 hover:bg-blue-50 hover:text-[#006bbd]"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="profilActiveTabPill"
                  className="absolute inset-0 rounded-full border border-[#006bbd] bg-white shadow-[0_0_0_1px_#006bbd_inset]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
