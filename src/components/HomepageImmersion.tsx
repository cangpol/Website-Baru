"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const pillars = [
  { label: ["Internship"], image: "/images/immersion/internship.jpg" },
  { label: ["Community", "Development"], image: "/images/immersion/community.jpg" },
  { label: ["Entrepreneurship"], image: "/images/immersion/entrepreneurship.jpg" },
  { label: ["Independent", "Study"], image: "/images/immersion/independent.jpg" },
];

const concepts = [
  { title: "3 Tahun Belajar di Kampus", note: "(Semester 1–5)" },
  { title: "1 Tahun Praktik Lapangan", note: "(Semester 6–7)" },
];

const description =
  "3 tahun pembelajaran teori di kampus dan 1 tahun pengalaman nyata di dunia kerja maupun masyarakat. Program ini dirancang untuk menjembatani akademik dengan kebutuhan industri serta pemberdayaan wilayah.";

const textShadow = "0px 2.169px 2.169px rgba(0,0,0,0.25)";

/** Design px → rendered px. 1 design px = 1px at >=1440 wide, scales down fluidly below. */
const u = (n: number) => `calc(var(--u) * ${n})`;

function PillarCard({ label, image, fixedWidth }: { label: string[]; image: string; fixedWidth?: boolean }) {
  return (
    <div
      className="flex flex-col bg-white/[0.18] backdrop-blur-[2px]"
      style={{ padding: u(10), borderRadius: u(20), width: fixedWidth ? u(185) : undefined }}
    >
      <div className="relative w-full overflow-hidden" style={{ height: u(109), borderRadius: u(10) }}>
        <Image src={image} alt={label.join(" ")} fill sizes="185px" className="object-cover" />
      </div>
      <p
        className="text-center font-bold text-[#006bbd]"
        style={{ paddingTop: u(10), fontSize: u(16), lineHeight: u(15) }}
      >
        {label.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function HomepageImmersion() {
  return (
    <section className="relative w-full overflow-hidden bg-white" aria-label="Program Immersion 3+1">
      {/* ───────── Desktop (≥1024px): faithful Figma composition, scaled fluidly ───────── */}
      <div
        className="relative mx-auto hidden w-full max-w-[1440px] lg:block"
        style={{ "--u": "min(1px, 0.069444vw)", aspectRatio: "1440 / 934" } as CSSProperties}
      >
        {/* Blue panel */}
        <div className="absolute inset-x-0 bottom-0 overflow-hidden bg-[#006bbd]" style={{ top: u(53) }}>
          <Image
            src="/images/immersion/bg-texture.png"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-5 pointer-events-none"
          />
        </div>

        {/* Soft cyan glow behind the student */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/immersion/glow.svg"
          alt=""
          aria-hidden
          className="pointer-events-none absolute max-w-none -scale-x-100"
          style={{ left: u(-122), top: u(-94), width: u(1118), height: u(1176) }}
        />

        {/* Student cutout (mirrored as in the design) */}
        <div
          className="pointer-events-none absolute top-0 -scale-x-100 overflow-hidden"
          style={{ left: u(193), width: u(640), height: u(934) }}
        >
          <Image
            src="/images/immersion/student.png"
            alt="Mahasiswi Program Immersion UPITRA"
            width={1080}
            height={1350}
            sizes="50vw"
            priority={false}
            className="absolute max-w-none"
            style={{ height: "154.48%", left: "-49.01%", top: "-3.44%", width: "180.27%" }}
          />
        </div>

        {/* Fade into blue at the bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-b from-[#006bbd]/0 from-[63%] to-[#006bbd]"
          style={{ top: u(53) }}
        />

        {/* Content */}
        <div
          className="absolute flex items-center justify-between"
          style={{ left: u(120), top: u(143.85), width: u(1200) }}
        >
          <div className="flex flex-col" style={{ gap: u(15) }}>
            {pillars.map((p) => (
              <PillarCard key={p.image} label={p.label} image={p.image} fixedWidth />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-end justify-center text-right text-white"
            style={{ width: u(582), gap: u(20) }}
          >
            <h2 className="font-bold" style={{ fontSize: u(90), lineHeight: u(90), textShadow }}>
              <span className="block font-semibold">Program</span>
              <span className="block font-extrabold">Immersion</span>
            </h2>
            <span
              className="bg-[#ffcc00] font-bold text-[#222] whitespace-nowrap"
              style={{ padding: `${u(10)} ${u(30)}`, borderRadius: u(5), fontSize: u(24) }}
            >
              3 Tahun Kuliah + 1 Tahun Internship
            </span>
            <p className="font-medium" style={{ fontSize: u(16) }}>
              {description}
            </p>
            <div className="flex w-full flex-col items-end" style={{ gap: u(10) }}>
              <p className="w-full font-extrabold" style={{ fontSize: u(24), textShadow }}>
                Konsep Utama
              </p>
              <div className="flex w-full" style={{ gap: u(6.373) }}>
                {concepts.map((c) => (
                  <div
                    key={c.title}
                    className="flex flex-1 flex-col items-center border border-white/30 bg-white/10 text-center backdrop-blur-[2px]"
                    style={{ padding: `${u(10)} ${u(25)}`, borderRadius: u(19.119), gap: u(5) }}
                  >
                    <p className="w-full font-semibold" style={{ fontSize: u(16) }}>
                      {c.title}
                    </p>
                    <p className="w-full font-medium italic" style={{ fontSize: u(12) }}>
                      {c.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ───────── Mobile & tablet (<1024px) ───────── */}
      <div
        className="relative overflow-hidden bg-[#006bbd] px-5 pb-10 pt-6 text-white sm:px-10 lg:hidden"
        style={{ "--u": "1px" } as CSSProperties}
      >
        <Image
          src="/images/immersion/bg-texture.png"
          alt=""
          fill
          sizes="100vw"
          className="pointer-events-none object-cover opacity-5"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
          <div className="relative h-[320px] w-[256px] sm:h-[400px] sm:w-[320px] -scale-x-100">
            <Image
              src="/images/immersion/student.png"
              alt="Mahasiswi Program Immersion UPITRA"
              fill
              sizes="320px"
              className="object-contain object-top"
            />
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <h2 className="text-5xl font-bold leading-[1.0] sm:text-6xl" style={{ textShadow }}>
              <span className="block font-semibold">Program</span>
              <span className="block font-extrabold">Immersion</span>
            </h2>
            <span className="rounded-[5px] bg-[#ffcc00] px-5 py-2 text-sm font-bold text-[#222] sm:text-base">
              3 Tahun Kuliah + 1 Tahun Internship
            </span>
            <p className="max-w-lg text-sm font-medium leading-relaxed sm:text-base">{description}</p>
            <p className="text-xl font-extrabold" style={{ textShadow }}>
              Konsep Utama
            </p>
            <div className="flex w-full flex-col gap-2 sm:flex-row">
              {concepts.map((c) => (
                <div
                  key={c.title}
                  className="flex flex-1 flex-col items-center gap-1 rounded-[19px] border border-white/30 bg-white/10 px-5 py-2.5"
                >
                  <p className="text-sm font-semibold sm:text-base">{c.title}</p>
                  <p className="text-xs font-medium italic">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-4">
            {pillars.map((p) => (
              <PillarCard key={p.image} label={p.label} image={p.image} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
