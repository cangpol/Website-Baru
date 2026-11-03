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
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 shrink-0">
        <Image
          src="/images/logo-upitra.png"
          alt="Logo Universitas Pignatelli Triputra"
          width={36}
          height={36}
          priority
          className="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(6,23,46,0.12)] group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span className="text-[9px] sm:text-[10px] font-black tracking-[0.06em] text-[#06172e] uppercase font-sans leading-[1.15]">
            UNIVERSITAS
          </span>
          <span className="text-[9px] sm:text-[10px] font-black tracking-[0.06em] text-[#06172e] uppercase font-sans leading-[1.15]">
            PIGNATELLI
          </span>
          <span className="text-[9px] sm:text-[10px] font-black tracking-[0.06em] text-[#06172e] uppercase font-sans leading-[1.15]">
            TRIPUTRA
          </span>
        </div>
      )}
    </Link>
  );
}
