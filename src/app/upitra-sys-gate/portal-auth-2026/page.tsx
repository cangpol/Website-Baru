"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OldGateRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/u-gate");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#040e1e] flex items-center justify-center text-white text-xs">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
        <span>Mengalihkan ke /u-gate...</span>
      </div>
    </div>
  );
}
