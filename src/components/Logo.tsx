import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export default function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link 
      href="/" 
      className={`inline-flex items-center gap-2.5 sm:gap-3 group shrink-0 select-none ${className}`} 
      aria-label="UPITRA Beranda"
    >
      <div className="relative w-9 h-9 sm:w-10 sm:h-10 shrink-0">
        <Image
          src="/images/logo-upitra.png"
          alt="Logo Universitas Pignatelli Triputra"
          width={40}
          height={40}
          priority
          className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(6,23,46,0.12)] group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.06em] text-[#06172e] uppercase font-sans leading-[1.15]">
            UNIVERSITAS
          </span>
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.06em] text-[#06172e] uppercase font-sans leading-[1.15]">
            PIGNATELLI
          </span>
          <span className="text-[10px] sm:text-[11px] font-black tracking-[0.06em] text-[#06172e] uppercase font-sans leading-[1.15]">
            TRIPUTRA
          </span>
        </div>
      )}
    </Link>
  );
}

