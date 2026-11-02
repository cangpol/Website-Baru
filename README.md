# Portal Web & CMS Resmi Universitas Pignatelli Triputra (UPITRA)

Portal web institusional resmi dan Content Management System (CMS) terpadu Universitas Pignatelli Triputra (UPITRA) Surakarta berbasis Next.js 16 (App Router), React 19, Prisma ORM, PostgreSQL, Tailwind CSS, dan Vitest.

---

## 🚀 Fitur Utama & Hardening Keamanan

1. **Keamanan Sesi & RBAC:**
   - Autentikasi sesi berbasis cookie `httpOnly`, `sameSite: lax`, dan ditandatangani secara kriptografis menggunakan HMAC-SHA256 dengan perlindungan anti-tampering (`timingSafeEqual`).
   - Rate limiting 5 percobaan per 15 menit untuk mencegah serangan brute force pada gerbang login `/u-gate`.
   - Role-Based Access Control (RBAC):
     - `SUPERADMIN`: Hak akses penuh ke seluruh modul, manajemen staf, pengaturan situs, dan audit log.
     - `STAFF_PMB`: Akses khusus data calon mahasiswa baru (leads PMB), reservasi campus tour, kalender akademik, dan gelombang PMB.
     - `CONTENT_WRITER`: Akses ke modul Berita & Riset, Media Library, Pengumuman, dan Prestasi.

2. **Upload & Media Storage Aman (Fase 3):**
   - Abstraksi driver penyimpanan (`src/server/storage/`):
     - `local`: Disimpan di direktori `uploads/` di luar web root `public`, dilindungi Route Handler `GET /uploads/[...path]` dengan header `X-Content-Type-Options: nosniff` dan proteksi path traversal.
     - `vercel-blob`: Dukungan otomatis `@vercel/blob` untuk deployment serverless.
   - Validasi binary Magic Bytes murni:
     - Gambar: JPEG (`FF D8 FF`), PNG (`89 50 4E 47`), WebP, GIF $\le 5$ MB.
     - Dokumen: PDF (`%PDF`) $\le 20$ MB.
     - Penolakan mutlak terhadap SVG, HTML, PHP, dan seluruh skrip executable.
     - EXIF metadata stripping otomatis via Sharp.
     - Penamaan UUID acak (`crypto.randomUUID()`).

3. **Modul CMS Lengkap (Fase 4):**
   - Beranda (Hero Slider, UPITRA Dalam Angka, Kabar & Cerita Kampus, CTA Beasiswa).
   - Berita & Publikasi Riset (Rich Editor Tiptap tersanitasi server).
   - Kalender & Agenda Akademik.
   - Program Studi & Fakultas (Kurikulum, Capaian, Peluang Karier).
   - Leads PMB & Reservasi Campus Tour (Ekspor CSV aman dengan proteksi formula injection `='+-@`).
   - Direktori Mitra Korporasi & MoU Kerjasama.
   - Layanan & Download Center Dokumen Resmi.
   - AI Assistant Knowledge Dataset (Terintegrasi ke chatbot cerdas).
   - Media Library (`/admin/media`) & Audit Logging aktivitas.

4. **Error Handling & UX Resilien (Fase 5):**
   - Custom `not-found.tsx` (404), `error.tsx` publik, `global-error.tsx`, dan `admin/error.tsx` error boundaries.
   - Skeletons loading halus (`admin/loading.tsx`).

---

## 🛠️ Persyaratan Lingkungan (Prerequisites)

- **Node.js:** v20.x atau v22.x LTS
- **Package Manager:** npm v10+
- **Database:** PostgreSQL v14+ (Lokal, Supabase, Neon, atau Docker)

---

## 📦 Panduan Instalasi Lokal

1. **Clone repository:**
   ```bash
   git clone https://github.com/upitrasurakarta-dev/Website-Baru.git
   cd "Website Baru"
   ```

2. **Instal dependensi:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Konfigurasi Environment Variables:**
   Salin `.env.example` menjadi `.env` lalu sesuaikan isinya:
   ```env
   # Database PostgreSQL
   DATABASE_URL="postgresql://postgres:password@localhost:5432/upitra_db?schema=public"

   # Keamanan Sesi Admin (Minimal 32 karakter acak)
   ADMIN_SESSION_SECRET="kunci-rahasia-hmac-sha256-upitra-2026-sangat-aman-sekali"

   # Driver Media Storage: "local" atau "vercel-blob"
   STORAGE_DRIVER="local"

   # Opsional bila memakai Vercel Blob
   # BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."
   ```

4. **Migrasi & Seed Database:**
   ```bash
   npx prisma migrate reset --force
   ```
   *Perintah ini akan menjalankan migrasi database dan mengeksekusi seed lengkap (38 kategori konten + superadmin awal).*

---

## 🔐 Kredensial Administrator Awal

Setelah migrasi & seeding selesai, kredensial administrator awal dapat digunakan melalui gerbang resmi `/u-gate`:

- **URL Gerbang:** `http://localhost:3000/u-gate`
- **Email:** `superadmin@upitra.ac.id`
- **Password:** `AdminUpitra2026!`
- **Role:** `SUPERADMIN`

---

## 🧪 Pengujian Otomatis & Verifikasi

Proyek ini dilengkapi rangkaian pengujian otomatis unit & integrasi:

```bash
# 1. Jalankan unit test (Vitest)
npm run test

# 2. Jalankan type checking TypeScript tanpa kompilasi
npm run typecheck

# 3. Jalankan linter ESLint
npm run lint

# 4. Bangun build produksi (Prisma generate + Next.js build)
npm run build

# 5. Jalankan server produksi lokal
npm run start
```

---

## 🌐 Panduan Deployment

### A. Vercel Deployment
1. Hubungkan repository GitHub ke proyek Vercel baru.
2. Atur environment variables pada dashboard Vercel:
   - `DATABASE_URL` (Gunakan Vercel Postgres, Supabase, atau Neon).
   - `ADMIN_SESSION_SECRET` (Generate string acak 64 karakter).
   - `STORAGE_DRIVER` diatur ke `vercel-blob`.
   - `BLOB_READ_WRITE_TOKEN` dari Vercel Blob Store.
3. Build command: `npm run build`.

### B. Docker / Server Mandiri (Synology / Ubuntu VPS)
1. Atur `STORAGE_DRIVER="local"`.
2. Mount direktori `uploads/` sebagai volume persisten di `docker-compose.yml`:
   ```yaml
   volumes:
     - /volume1/docker/upitra/uploads:/app/uploads
   ```
3. Port mapping: `3000:3000`.

---

## 📄 Lisensi
Hak Cipta © 2026 Universitas Pignatelli Triputra (UPITRA). Seluruh hak cipta dilindungi undang-undang.
