import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { GraduationCap, ArrowRight, Award, MapPin } from "lucide-react";

interface ProgramItem {
  id: string;
  name: string;
  slug: string;
  degreeTitle?: string | null;
  degreeLevel?: string | null;
  accreditation?: string | null;
  shortDesc?: string | null;
  coverImage?: string | null;
  featured?: boolean;
}

interface FacultyWithPrograms {
  id: string;
  name: string;
  code: string;
  slug: string;
  description?: string | null;
  programs: ProgramItem[];
}

const fallbackFaculties: FacultyWithPrograms[] = [
  {
    id: "fst",
    name: "Fakultas Sains & Teknologi",
    code: "FST",
    slug: "sains-teknologi",
    description: "Mencetak praktisi teknologi informasi, insinyur software, dan arsitek sistem cerdas yang adaptif terhadap revolusi industri 4.0.",
    programs: [
      {
        id: "p-inf",
        name: "Informatika",
        slug: "informatika",
        degreeTitle: "S.Kom.",
        accreditation: "Baik Sekali",
        shortDesc: "Keahlian rekayasa kecerdasan buatan (AI), machine learning, cloud architecture, dan keamanan siber.",
        coverImage: "/images/rpl/rpl-1.jpg",
        featured: true,
      },
      {
        id: "p-si",
        name: "Sistem Informasi",
        slug: "sistem-informasi",
        degreeTitle: "S.Kom.",
        accreditation: "Baik Sekali",
        shortDesc: "Integrasi proses bisnis modern, enterprise resource planning (ERP), data analytics, dan tata kelola IT korporasi.",
        coverImage: "/images/sisfo/sisfo-1.jpg",
        featured: true,
      },
      {
        id: "p-rpl",
        name: "Rekayasa Perangkat Lunak",
        slug: "rekayasa-perangkat-lunak",
        degreeTitle: "S.Kom.",
        accreditation: "Baik Sekali",
        shortDesc: "Pengembangan web modern full-stack, mobile cross-platform, clean architecture, dan CI/CD automation.",
        coverImage: "/images/ar-vr.jpg",
        featured: true,
      },
    ],
  },
  {
    id: "feb",
    name: "Fakultas Ekonomi & Bisnis",
    code: "FEB",
    slug: "ekonomi-bisnis",
    description: "Membentuk pemimpin bisnis visioner, analis finansial korporat, dan akuntan berintegritas tinggi dengan jejaring Triputra Group.",
    programs: [
      {
        id: "p-man",
        name: "Manajemen",
        slug: "manajemen",
        degreeTitle: "S.M.",
        accreditation: "Baik Sekali",
        shortDesc: "Strategi rantai pasok industri, supply chain management, kepemimpinan korporasi, dan digital marketing.",
        coverImage: "/images/feb-full.jpg",
        featured: true,
      },
      {
        id: "p-akt",
        name: "Akuntansi",
        slug: "akuntansi",
        degreeTitle: "S.Ak.",
        accreditation: "Baik Sekali",
        shortDesc: "Auditing forensik, perpajakan korporasi multinasional, sustainability reporting, dan sistem informasi akuntansi.",
        coverImage: "/images/akuntansi/akt-1.jpg",
        featured: false,
      },
    ],
  },
  {
    id: "fsh",
    name: "Fakultas Sosial & Humaniora",
    code: "FSH",
    slug: "sosial-humaniora",
    description: "Mengembangkan keahlian hospitalitas kelas dunia, destinasi pariwisata berkelanjutan, dan komunikasi korporat global.",
    programs: [
      {
        id: "p-par",
        name: "Pariwisata",
        slug: "pariwisata",
        degreeTitle: "S.Par.",
        accreditation: "Baik Sekali",
        shortDesc: "Manajemen perhotelan bintang lima, MICE internasional, eco-tourism, dan strategi pemasaran destinasi global.",
        coverImage: "/images/pariwisata/par-1.jpg",
        featured: false,
      },
      {
        id: "p-sbi",
        name: "Bahasa Inggris",
        slug: "bahasa-inggris",
        degreeTitle: "S.S.",
        accreditation: "Baik Sekali",
        shortDesc: "Komunikasi korporasi internasional, penerjemahan profesional terapan, dan negosiasi bisnis lintas budaya.",
        coverImage: "/images/fsh-full.jpg",
        featured: false,
      },
    ],
  },
  {
    id: "fkes",
    name: "Fakultas Kesehatan",
    code: "FKes",
    slug: "kesehatan",
    description: "Menyiapkan tenaga kesehatan berdedikasi tinggi, praktisi keselamatan kerja industri (K3), dan rehabilitasi fisik holistik.",
    programs: [
      {
        id: "p-k3",
        name: "Kesehatan & Keselamatan Kerja",
        slug: "kesehatan-dan-keselamatan-kerja",
        degreeTitle: "S.K3",
        accreditation: "Baik Sekali",
        shortDesc: "Manajemen risiko K3 industri manufaktur, agroindustri, ergonomi kerja, dan audit sertifikasi HSE nasional.",
        coverImage: "/images/kampus-4.jpg",
        featured: false,
      },
      {
        id: "p-fis",
        name: "Fisioterapi",
        slug: "fisioterapi",
        degreeTitle: "S.Ft",
        accreditation: "Baik Sekali",
        shortDesc: "Fisioterapi olahraga, pemulihan neuromuskular, ortopedi kerja, dan layanan rehabilitasi geriatrik modern.",
        coverImage: "/images/kuliah-1.jpeg",
        featured: false,
      },
    ],
  },
];

export default async function HomepagePrograms() {
  let faculties: FacultyWithPrograms[] = fallbackFaculties;

  try {
    const dbFaculties = await prisma.faculty.findMany({
      include: {
        programs: {
          orderBy: [{ featured: "desc" }, { name: "asc" }],
        },
      },
      orderBy: { name: "asc" },
    });

    if (dbFaculties && dbFaculties.length > 0) {
      faculties = dbFaculties.map((f) => ({
        id: f.id,
        name: f.name,
        code: f.code,
        slug: f.slug,
        description: f.description,
        programs: f.programs.map((p) => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          degreeTitle: p.degreeTitle,
          degreeLevel: p.degreeLevel,
          accreditation: p.accreditation,
          shortDesc: p.shortDesc,
          coverImage: p.coverImage || "/images/ar-vr.jpg",
          featured: p.featured,
        })),
      }));
    }
  } catch (err) {
    // Prisma fallback is already set to fallbackFaculties
  }

  return (
    <section id="akademik" className="py-20 bg-slate-50 border-b border-slate-200 select-none">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 lg:px-[120px] space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-slate-200">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 text-[#006bbd] text-xs font-bold uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#006bbd]" />
              <span>Program Akademik Unggul</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#06172e] tracking-tight">
              Fakultas &amp; Program Studi
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Kurikulum terintegrasi dengan kebutuhan industri nyata Triputra Group. Mahasiswa dibekali teori mendalam, magang langsung di unit bisnis, dan sertifikasi profesi sebelum lulus.
            </p>
          </div>

          <Link
            href="/akademik"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-[#006bbd] text-slate-700 hover:text-[#006bbd] font-semibold text-sm transition-colors duration-200 shrink-0 self-start md:self-end"
          >
            <span>Seluruh Kurikulum</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Faculty Grid & Programs */}
        <div className="space-y-16">
          {faculties.map((faculty) => (
            <div key={faculty.id} className="space-y-6">
              
              {/* Faculty Banner Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#006bbd] text-white text-xs font-black tracking-wide">
                      {faculty.code}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#06172e]">
                      {faculty.name}
                    </h3>
                  </div>
                  {faculty.description && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-3xl">
                      {faculty.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Program Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {faculty.programs.map((program) => (
                  <div
                    key={program.id}
                    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-[#006bbd]/60 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
                        <Image
                          src={program.coverImage || "/images/ar-vr.jpg"}
                          alt={program.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                        
                        {/* Degree Badge */}
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <span className="px-2.5 py-1 rounded-md bg-[#FFD400] text-slate-900 text-xs font-black shadow-xs">
                            {program.degreeTitle || "Sarjana (S1)"}
                          </span>
                          {program.featured && (
                            <span className="px-2 py-0.5 rounded-md bg-blue-600/90 text-white text-[10px] font-bold tracking-wide">
                              Unggulan
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 space-y-3">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="inline-flex items-center gap-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                            <Award className="w-3.5 h-3.5" />
                            {program.accreditation || "Baik Sekali"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            Surakarta
                          </span>
                        </div>

                        <h4 className="text-xl font-bold text-[#06172e] group-hover:text-[#006bbd] transition-colors duration-200">
                          {program.name}
                        </h4>

                        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
                          {program.shortDesc || "Mempersiapkan lulusan berkarakter dengan kurikulum berbasis proyek industri dan jalur rekrutmen kerja."}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action */}
                    <div className="px-6 pb-6 pt-2">
                      <Link
                        href={`/${program.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-[#006bbd] text-slate-800 hover:text-white font-bold text-xs sm:text-sm transition-all duration-200"
                      >
                        <span>Lihat Detail Program</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
