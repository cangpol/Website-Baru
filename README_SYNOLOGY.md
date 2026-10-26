# Panduan Cepat Deploy UPITRA ke Synology NAS (Container Manager)

Website resmi **UPITRA (Universitas Pignatelli Triputra)** telah dikonfigurasi secara lengkap untuk berjalan di **Synology NAS** menggunakan **Container Manager** (Docker Compose) dengan **Next.js 15, Prisma ORM, dan PostgreSQL 16 Alpine**.

---

## 📁 1. Struktur Folder di Synology File Station

Buat folder berikut di Synology File Station:
```text
/volume1/docker/
└── upitra-website/
    ├── docker-compose.yml     <-- (Salin dari repository proyek ini)
    ├── .env                   <-- (Salin & sesuaikan dari .env.example)
    ├── postgres_data/         <-- (Folder kosong untuk persistensi PostgreSQL)
    └── uploads/               <-- (Folder kosong untuk file media/gambar)
```

> **PENTING: Izin Folder (Permissions)**
> Klik kanan pada folder `postgres_data` dan `uploads` -> **Properties** -> Tab **Permission** -> Tambahkan user **Everyone** dengan hak **Read & Write**.

---

## 🚀 2. Menjalankan di Container Manager

1. Buka aplikasi **Container Manager** di Synology DSM.
2. Masuk ke tab **Project** -> Klik **Create** (Buat).
3. Isi informasi project:
   - **Project Name**: `upitra-website`
   - **Path**: Pilih `/docker/upitra-website`
   - **Source**: Pilih *Create docker-compose.yml* dan tempelkan isi `docker-compose.yml`
4. Centang **Start the project immediately** -> Klik **Done**.
5. Container Manager akan otomatis mengunduh PostgreSQL, membuat image Next.js UPITRA, dan menjalankan container `upitra-postgres` serta `upitra-web`.

---

## 🗄️ 3. Menjalankan Migrasi & Data Awal (Seed UPITRA)

Setelah container berstatus **Running**:
1. Di Container Manager, masuk ke menu **Container** -> Pilih container `upitra-web`.
2. Klik tombol **Action** / **Details** -> Buka tab **Terminal** -> Klik **Create**.
3. Di dalam terminal container, jalankan:
   ```sh
   npx prisma db push
   npx prisma db seed
   ```
4. Database PostgreSQL otomatis terisi 3 Fakultas UPITRA (Sains & Technology, Social Humaniora, Ekonomika & Bussiness), artikel, agenda, serta akun Superadmin:
   - **Email Admin**: `admin@upitra.ac.id`
   - **Password**: `upitra2026`

---

## 🔒 4. Menghubungkan Domain & SSL Gratis (Synology Reverse Proxy)

1. Buka **Control Panel DSM** -> **Login Portal** -> Tab **Advanced** -> **Reverse Proxy**.
2. Klik **Create**:
   - **Source**: Protocol `HTTPS`, Hostname `upitra.domain-anda.com`, Port `443`.
   - **Destination**: Protocol `HTTP`, Hostname `localhost`, Port `3000`.
3. Buka **Control Panel** -> **Security** -> **Certificate**:
   - Tambahkan sertifikat gratis **Let's Encrypt** untuk domain Anda.
   - Di menu *Settings*, hubungkan sertifikat tersebut ke reverse proxy `upitra-website`.
4. Selesai! Website UPITRA Anda kini dapat diakses secara publik dengan protokol aman HTTPS resmi.
