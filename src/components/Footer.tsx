import Link from "next/link";
import { MapPin, Phone, Mail, Globe, MessageCircle, Share2, ShieldCheck, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0b2545] text-slate-200 pt-16 pb-12 border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Kolom 1: Profil UPITRA */}
        <div className="space-y-4 lg:col-span-1">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-white/10 p-1 flex items-center justify-center backdrop-blur-xs border border-white/10 shadow-sm group-hover:scale-105 transition-transform">
              <img
                src="/images/logo.png"
                alt="Logo UPITRA"
                className="w-8 h-8 object-contain drop-shadow"
              />
            </div>
            <div>
              <div className="text-lg font-black text-white group-hover:text-sky-300 transition-colors">UPITRA</div>
              <div className="text-[9px] tracking-wider text-sky-300 font-bold uppercase">Universitas Pignatelli Triputra</div>
            </div>
          </Link>
          <p className="text-xs text-slate-300 leading-relaxed">
            Perguruan tinggi berkualitas di Surakarta yang berfokus mencetak lulusan berkarakter unggul, berintegritas, dan siap kerja bersama ekosistem Triputra Group.
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-900/60 border border-blue-700/50 text-sky-300 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            Akreditasi BAIK SEKALI
          </div>
        </div>

        {/* Kolom 2: Pendaftaran (Admission) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
            Pendaftaran
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/pmb" className="hover:text-sky-300 transition-colors">
                Penerimaan Mahasiswa Baru S1
              </Link>
            </li>
            <li>
              <Link href="/pmb#beasiswa" className="hover:text-sky-300 transition-colors">
                Informasi Beasiswa Triputra
              </Link>
            </li>
            <li>
              <Link href="/programs" className="hover:text-sky-300 transition-colors">
                Rincian Biaya Kuliah & SPP
              </Link>
            </li>
            <li>
              <Link href="/ebrochure" className="hover:text-sky-300 transition-colors">
                Download E-Brosur UPITRA
              </Link>
            </li>
            <li>
              <a 
                href="https://pmb.upitra.ac.id" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-sky-400 font-bold hover:underline flex items-center gap-1"
              >
                Daftar Online Sekarang &rarr;
              </a>
            </li>
          </ul>
        </div>

        {/* Kolom 3: Program Akademik (4 Fakultas) */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
            Program Akademik
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/programs#fst" className="hover:text-sky-300 transition-colors font-bold text-sky-200">
                Faculty Sains & Technology
              </Link>
            </li>
            <li className="pl-3 text-[11px] text-slate-400">
              • S1 Informatika<br />
              • S1 Sistem Informasi<br />
              • S1 Rekayasa Perangkat Lunak
            </li>
            <li>
              <Link href="/programs#feb" className="hover:text-sky-300 transition-colors font-bold text-sky-200">
                Faculty Ekonomic & Bussiness
              </Link>
            </li>
            <li className="pl-3 text-[11px] text-slate-400">
              • S1 Manajemen<br />
              • S1 Akuntansi
            </li>
            <li>
              <Link href="/programs#fsh" className="hover:text-sky-300 transition-colors font-bold text-sky-200">
                Faculty Social Humaniora
              </Link>
            </li>
            <li className="pl-3 text-[11px] text-slate-400">
              • S1 Pariwisata<br />
              • S1 Bahasa Inggris
            </li>
            <li>
              <Link href="/programs#fh" className="hover:text-sky-300 transition-colors font-bold text-sky-200">
                Faculty Health
              </Link>
            </li>
            <li className="pl-3 text-[11px] text-slate-400">
              • S1 K3 (Kesehatan & Keselamatan Kerja)<br />
              • S1 Fisioterapi<br />
              • D3 Keperawatan
            </li>
          </ul>
        </div>

        {/* Kolom 4: Fasilitas & Layanan */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
            Fasilitas & Layanan
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <Link href="/life-at-upitra" className="hover:text-sky-300 transition-colors">
                Smart Classroom & Auditorium
              </Link>
            </li>
            <li>
              <Link href="/life-at-upitra" className="hover:text-sky-300 transition-colors">
                Laboratorium Komputasi FST
              </Link>
            </li>
            <li>
              <Link href="/life-at-upitra" className="hover:text-sky-300 transition-colors">
                Hospitality & Language Lab FSH
              </Link>
            </li>
            <li>
              <Link href="/entrepreneurship" className="hover:text-sky-300 transition-colors">
                Pusat Karir Triputra Group
              </Link>
            </li>
            <li>
              <Link href="/life-at-upitra" className="hover:text-sky-300 transition-colors font-bold text-sky-300">
                Life at UPITRA (Visi, Misi & Kampus)
              </Link>
            </li>
            <li>
              <Link href="/berita" className="hover:text-sky-300 transition-colors">
                Kabar & Berita Kampus
              </Link>
            </li>
            <li>
              <Link href="/mitra-kerjasama" className="hover:text-sky-300 transition-colors font-medium text-sky-200">
                Mitra Kerjasama Industri
              </Link>
            </li>
          </ul>
        </div>

        {/* Kolom 5: Alamat & Kontak Resmi */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider border-b border-blue-900/60 pb-2">
            Lokasi & Kontak
          </h4>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span>Jl. Duwet Raya, Karangasem, Kec. Laweyan, Kota Surakarta, Jawa Tengah 57145</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <a href="tel:08112907500" className="hover:text-sky-300 transition-colors">0811-290-7500</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>pmb@upitra.ac.id</span>
            </div>
          </div>

          <div className="pt-3">
            <div className="text-[11px] font-semibold text-white mb-2">Saluran Resmi:</div>
            <div className="flex items-center gap-3">
              <a href="https://upitra.ac.id" target="_blank" rel="noreferrer" title="Website Resmi UPITRA" className="w-8 h-8 rounded-full bg-blue-900/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-blue-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://wa.me/628112907500" target="_blank" rel="noreferrer" title="WhatsApp PMB UPITRA" className="w-8 h-8 rounded-full bg-blue-900/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-blue-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" title="Instagram Resmi" className="w-8 h-8 rounded-full bg-blue-900/80 flex items-center justify-center text-slate-200 hover:text-white hover:bg-blue-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Sub-Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-12 pt-6 border-t border-blue-900/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
        <div>
          &copy; 2026 UPITRA (Universitas Pignatelli Triputra). All Rights Reserved.
        </div>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:text-slate-200">Kebijakan Privasi</Link>
          <Link href="/terms" className="hover:text-slate-200">Syarat & Ketentuan</Link>
          <Link href="/sitemap" className="hover:text-slate-200">Peta Situs</Link>
        </div>
      </div>
    </footer>
  );
}
