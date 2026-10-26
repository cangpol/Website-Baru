import { PrismaClient, DegreeLevel, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting UPITRA (Universitas Pignatelli Triputra) database seed...");

  // 1. Superadmin User
  const hashedPassword = await bcrypt.hash("upitra2026", 10);
  const admin = await prisma.user.upsert({
    where: { email: "admin@upitra.ac.id" },
    update: {},
    create: {
      name: "Administrator UPITRA",
      email: "admin@upitra.ac.id",
      password: hashedPassword,
      role: Role.SUPERADMIN,
    },
  });
  console.log(`👤 Admin created: ${admin.email}`);

  // 2. 3 Fakultas & Program Studi S1
  const facultiesData = [
    {
      name: "Fakultas Sains & Technology",
      code: "FST",
      slug: "sains-technology",
      description: "Fakultas Sains & Technology UPITRA fokus pada pengembangan rekayasa perangkat lunak modern, kecerdasan buatan, infrastruktur komputasi awan, dan inovasi teknologi industri terapan.",
      programs: [
        {
          name: "Informatika (Computer Science)",
          slug: "informatika",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Kom.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Mencetak Software Engineer, AI Specialist, dan Cloud Architect berkarakter unggul yang siap berkiprah di industri teknologi nasional dan global.",
          fullDesc: "Program Studi Informatika UPITRA menekankan penguasaan komprehensif pada algoritma, rekayasa web & mobile, kecerdasan buatan, dan keamanan informasi dengan dukungan kurikulum industri Triputra Group.",
          careerProspect: "Software Engineer, Full-Stack Developer, AI/Machine Learning Engineer, Cloud Architect, IT Consultant.",
          tuitionFeeEst: 6500000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=80",
        },
        {
          name: "Sistem Informasi (Information Systems)",
          slug: "sistem-informasi",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Kom.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Menjembatani strategi transformasi proses bisnis perusahaan dengan tata kelola data intelijen dan sistem enterprise modern.",
          fullDesc: "Program Studi Sistem Informasi UPITRA membekali mahasiswa dengan keahlian Business Process Automation, Enterprise Resource Planning (ERP), Data Analytics, dan IT Governance.",
          careerProspect: "Business Analyst, ERP Specialist, Data Analyst, Product Manager, IT Quality Assurance.",
          tuitionFeeEst: 6500000,
          featured: false,
          coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
        },
        {
          name: "Rekayasa Perangkat Lunak (Software Engineering)",
          slug: "rekayasa-perangkat-lunak",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Kom.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Fokus mendalam pada siklus hidup rekayasa software skala besar, clean architecture, DevOps, dan testing automation.",
          fullDesc: "Menghasilkan perekayasa perangkat lunak tangguh dengan spesialisasi pengembangan platform digital terdistribusi, microservices, dan QA automation berstandar korporasi.",
          careerProspect: "DevOps Engineer, QA Automation Engineer, Mobile Application Architect, Software Project Lead.",
          tuitionFeeEst: 6500000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      name: "Fakultas Social Humaniora",
      code: "FSH",
      slug: "social-humaniora",
      description: "Fakultas Social Humaniora UPITRA berfokus pada pengembangan sektor pariwisata bertaraf internasional serta komunikasi global bahasa Inggris untuk bisnis dan diplomasi.",
      programs: [
        {
          name: "Pariwisata (Hospitality & Tourism)",
          slug: "pariwisata",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Par.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Mencetak profesional dan manajer industri perhotelan, manajemen destinasi wisata, serta ecotourism bertaraf internasional.",
          fullDesc: "Program Studi Pariwisata UPITRA menggabungkan manajemen operasional hospitality bintang lima, perencanaan MICE (Meeting, Incentive, Convention, Exhibition), dan strategi pariwisata berkelanjutan.",
          careerProspect: "Hotel General Manager, Event & MICE Director, Tourism Destination Planner, Travel Consultant, Resort Operator.",
          tuitionFeeEst: 5800000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&auto=format&fit=crop&q=80",
        },
        {
          name: "Bahasa Inggris (English for Business & Communication)",
          slug: "bahasa-inggris",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Li.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Mengasah kemahiran komunikasi bahasa Inggris tingkat tinggi untuk negosiasi bisnis global, diplomasi, penerjemahan, dan media korporat.",
          fullDesc: "Membekali lulusan dengan keterampilan linguistik terapan, komunikasi korporat multinasional, public relations internasional, dan teknik lokalisasi konten digital.",
          careerProspect: "Corporate Communication Specialist, Professional Translator & Interpreter, International PR Officer, Content Writer.",
          tuitionFeeEst: 5500000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      name: "Fakultas Ekonomika & Bussiness",
      code: "FEB",
      slug: "ekonomika-bussiness",
      description: "Fakultas Ekonomika & Bussiness UPITRA mencetak pemimpin bisnis, akuntan profesional, dan manajer keuangan beretika tinggi dengan wawasan global.",
      programs: [
        {
          name: "Manajemen Bisnis (Business Management)",
          slug: "manajemen-bisnis",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.M.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Mencetak wirausahawan dan manajer operasional korporat dengan keunggulan strategic thinking, kepemimpinan, dan digital marketing.",
          fullDesc: "Kurikulum Manajemen Bisnis UPITRA didesain bersama praktisi industri terkemuka untuk membekali mahasiswa dengan analisa strategi pasar, manajemen rantai pasok (supply chain), dan kepemimpinan adaptif.",
          careerProspect: "Business Development Manager, Marketing Director, Operations Executive, Business Consultant, Entrepreneur.",
          tuitionFeeEst: 6000000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
        },
        {
          name: "Akuntansi (Accounting & Finance)",
          slug: "akuntansi",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Ak.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Menghasilkan akuntan publik, auditor keuangan, dan financial analyst berintegritas tinggi dengan penguasaan teknologi audit digital.",
          fullDesc: "Program Akuntansi UPITRA berfokus pada financial reporting standar IFRS, perpajakan modern, audit internal berbasis sistem komputer, serta forensic accounting.",
          careerProspect: "Auditor Kantor Akuntan Publik (KAP), Tax Consultant, Financial Controller, Corporate Accountant, Risk Analyst.",
          tuitionFeeEst: 6000000,
          featured: false,
          coverImage: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      name: "Faculty Health",
      code: "FH",
      slug: "health",
      description: "Faculty Health UPITRA berfokus pada pendidikan tenaga kesehatan profesional, keselamatan kerja korporat, fisioterapi klinis, dan keperawatan vokasi dengan dukungan jejaring rumah sakit dan layanan kesehatan Triputra Group.",
      programs: [
        {
          name: "Kesehatan & Keselamatan Kerja (K3)",
          slug: "kesehatan-dan-keselamatan-kerja",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Tr.Kes.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Mencetak ahli K3 korporat, auditor keselamatan kerja industri, dan perancang sistem manajemen HSE di sektor manufaktur, perkebunan, dan konstruksi.",
          fullDesc: "Program K3 UPITRA menyiapkan profesional yang ahli dalam identifikasi bahaya kerja, ergonomi industri, higiene industri, audit SMK3, dan manajemen risiko lingkungan kerja Triputra Group.",
          careerProspect: "HSE Officer, K3 Industrial Specialist, Safety Auditor, Ergonomics Consultant, Corporate Risk Assessor.",
          tuitionFeeEst: 5800000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80",
        },
        {
          name: "Fisioterapi (Physiotherapy)",
          slug: "fisioterapi",
          degreeLevel: DegreeLevel.BACHELOR,
          degreeTitle: "S.Ft.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Menghasilkan fisioterapis klinis profesional dan sport injury specialist berstandar internasional yang terampil dalam terapi rehabilitasi medik.",
          fullDesc: "Kurikulum Fisioterapi UPITRA mencakup rehabilitasi muskuloskeletal, neuromuskular, kardiopulmonal, terapi cedera olahraga, dan fisioterapi geriatri dengan fasilitas laboratorium modern.",
          careerProspect: "Fisioterapis Rumah Sakit & Klinik, Sports Physiotherapist, Neuro-Pediatric Physical Therapist, Wellness & Rehab Director.",
          tuitionFeeEst: 6000000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&auto=format&fit=crop&q=80",
        },
        {
          name: "Keperawatan (Nursing)",
          slug: "keperawatan",
          degreeLevel: DegreeLevel.DIPLOMA,
          degreeTitle: "A.Md.Kep.",
          accreditation: "Baik Sekali",
          campusLocation: "Surakarta",
          shortDesc: "Membekali tenaga vokasi perawat terampil, tanggap gawat darurat, dan berdedikasi tinggi dengan etika compassion serta kemitraan rumah sakit jejaring.",
          fullDesc: "Program Diploma Tiga Keperawatan UPITRA mendidik calon perawat profesional yang kompeten dalam asuhan keperawatan medikal bedah, gawat darurat, maternitas, dan keperawatan kritis.",
          careerProspect: "Perawat Klinis Rumah Sakit & Klinik, Perawat ICU/UGD, Home Care Specialist, Medical Assistant Triputra Care.",
          tuitionFeeEst: 5200000,
          featured: true,
          coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80",
        },
      ],
    },
  ];

  for (const f of facultiesData) {
    const faculty = await prisma.faculty.upsert({
      where: { code: f.code },
      update: {
        name: f.name,
        slug: f.slug,
        description: f.description,
      },
      create: {
        name: f.name,
        code: f.code,
        slug: f.slug,
        description: f.description,
      },
    });

    for (const p of f.programs) {
      await prisma.program.upsert({
        where: { slug: p.slug },
        update: {
          name: p.name,
          facultyId: faculty.id,
          degreeLevel: p.degreeLevel,
          degreeTitle: p.degreeTitle,
          accreditation: p.accreditation,
          campusLocation: p.campusLocation,
          shortDesc: p.shortDesc,
          fullDesc: p.fullDesc,
          careerProspect: p.careerProspect,
          tuitionFeeEst: p.tuitionFeeEst,
          featured: p.featured,
          coverImage: p.coverImage,
        },
        create: {
          facultyId: faculty.id,
          name: p.name,
          slug: p.slug,
          degreeLevel: p.degreeLevel,
          degreeTitle: p.degreeTitle,
          accreditation: p.accreditation,
          campusLocation: p.campusLocation,
          shortDesc: p.shortDesc,
          fullDesc: p.fullDesc,
          careerProspect: p.careerProspect,
          tuitionFeeEst: p.tuitionFeeEst,
          featured: p.featured,
          coverImage: p.coverImage,
        },
      });
    }
  }

  // 3. Articles & News UPITRA
  const articles = [
    {
      title: "UPITRA Buka Pendaftaran Mahasiswa Baru Tahun Akademik 2026/2027",
      slug: "upitra-buka-pendaftaran-pmb-2026-2027",
      summary: "Universitas Pignatelli Triputra membuka kesempatan beasiswa penuh dan jalur prestasi untuk 3 fakultas unggulan.",
      content: "Universitas Pignatelli Triputra (UPITRA) Surakarta resmi membuka pendaftaran penerimaan mahasiswa baru (PMB) untuk jenjang Sarjana (S1). UPITRA menawarkan program studi unggulan di bawah Fakultas Sains & Technology, Fakultas Social Humaniora, dan Fakultas Ekonomika & Bussiness dengan dukungan jejaring industri Triputra Group.",
      category: "News",
      published: true,
      publishedAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Kolaborasi Industri: Mahasiswa FST UPITRA Raih Magang Kerja di Triputra Group",
      slug: "kolaborasi-industri-magang-kerja-triputra-group",
      summary: "Program link and match menjamin kesiapan karir mahasiswa sejak semester akhir melalui penempatan magang terstruktur.",
      content: "Mahasiswa program studi Informatika dan Sistem Informasi Fakultas Sains & Technology UPITRA berhasil menyelesaikan tahapan seleksi program magang bersertifikat di unit bisnis Triputra Group. Program ini mempercepat kesiapan lulusan memasuki dunia kerja profesional.",
      category: "Achievement",
      published: true,
      publishedAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Fakultas Social Humaniora Gelar Simposium Pariwisata Berkelanjutan",
      slug: "simposium-pariwisata-berkelanjutan-fsh-upitra",
      summary: "Membahas pengembangan destinasi wisata budaya dan ecotourism berbasis komunitas di kawasan Solo Raya.",
      content: "Program Studi Pariwisata dan Bahasa Inggris Fakultas Social Humaniora Universitas Pignatelli Triputra sukses menyelenggarakan simposium regional yang menghadirkan pakar perhotelan, dinas pariwisata, dan praktisi komunikasi internasional.",
      category: "Campus Life",
      published: true,
      publishedAt: new Date(),
      coverImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  for (const art of articles) {
    await prisma.article.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        summary: art.summary,
        content: art.content,
        category: art.category,
        published: art.published,
        coverImage: art.coverImage,
      },
      create: {
        title: art.title,
        slug: art.slug,
        summary: art.summary,
        content: art.content,
        category: art.category,
        published: art.published,
        publishedAt: art.publishedAt,
        coverImage: art.coverImage,
        authorId: admin.id,
      },
    });
  }

  // 4. Campus Events UPITRA
  const events = [
    {
      title: "UPITRA Open House & Campus Expo 2026",
      slug: "upitra-open-house-2026",
      description: "Jelajahi kampus UPITRA Surakarta, konsultasikan program studi impian di 3 fakultas, dan dapatkan potongan biaya pendaftaran serta beasiswa prestasi.",
      location: "Auditorium Kampus UPITRA, Surakarta (Solo)",
      startDate: new Date("2026-11-20T09:00:00Z"),
      endDate: new Date("2026-11-20T15:00:00Z"),
      isOnline: false,
      bannerImage: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&auto=format&fit=crop&q=80",
    },
    {
      title: "Webinar Karir Industri: Peluang Kerja Bersama Triputra Group",
      slug: "webinar-karir-industri-triputra-group",
      description: "Sesi sharing interaktif bersama para manajer HRD dan praktisi industri mengenai kompetensi yang dicari di era digital.",
      location: "Live via Zoom & YouTube UPITRA",
      startDate: new Date("2026-12-10T13:30:00Z"),
      endDate: new Date("2026-12-10T16:00:00Z"),
      isOnline: true,
      bannerImage: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&auto=format&fit=crop&q=80",
    },
  ];

  for (const ev of events) {
    await prisma.event.upsert({
      where: { slug: ev.slug },
      update: {
        title: ev.title,
        description: ev.description,
        location: ev.location,
        startDate: ev.startDate,
        endDate: ev.endDate,
        isOnline: ev.isOnline,
        bannerImage: ev.bannerImage,
      },
      create: {
        title: ev.title,
        slug: ev.slug,
        description: ev.description,
        location: ev.location,
        startDate: ev.startDate,
        endDate: ev.endDate,
        isOnline: ev.isOnline,
        bannerImage: ev.bannerImage,
      },
    });
  }

  console.log("✅ UPITRA seed data successfully completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
