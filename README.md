```markdown
# E-Health Center — Orthopaedic & Specialist Care Portal

Platform web layanan kesehatan berbasis **Next.js App Router** untuk memfasilitasi pendaftaran pasien, eksplorasi profil dokter spesialis, pengajuan janji temu (*visit request*), pengelolaan jadwal operasi (*surgery*), antrean *check-in* mandiri, serta edukasi kesehatan interaktif.

> **Project UAS Front-End Web Development — Semester 3 (2026)** | Kelompok 3

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Arsitektur Proyek](#arsitektur-proyek)
- [Skema Database](#skema-database)
- [Instalasi & Menjalankan Secara Lokal](#instalasi--menjalankan-secara-lokal)
- [Environment Variables](#environment-variables)
- [Deployment ke Vercel](#deployment-ke-vercel)

---

## Fitur Utama

### Halaman Publik
- **Landing Page:** Hero banner layanan, daftar dokter spesialis unggulan, informasi klinik, dan afiliasi tim medis.
- **Direktori & Detail Dokter (`/doctors`):** Pencarian daftar spesialis lengkap dengan ringkasan prosedur medis, latar belakang pendidikan, sertifikasi, dan kontak klinik.
- **Edukasi Kesehatan & Artikel (`/resource`):** Galeri fasilitas medis serta artikel kesehatan dengan sistem komentar terintegrasi.
- **Informasi Klinik (`/contact`, `/privacy-policy`, `/terms-and-condition`):** Peta lokasi terintegrasi, jam operasional, dan kebijakan layanan.

### Autentikasi & Manajemen Akun
- **Registrasi & Login (`/register`, `/login`):** Autentikasi berbasis sesi menggunakan **Better Auth** dengan validasi nomor telepon Indonesia, tanggal lahir, dan pengalihan berbasis `callbackUrl`.
- **Manajemen Profil (`/profile`):** Pembaruan biodata pasien, foto profil, serta perubahan kata sandi.
- **Reset Password (`/forgot-password`):** Pemulihan akses akun pengguna.

### Portal Pasien Terproteksi
- **Dashboard Pasien (`/dashboard`):** Ringkasan akses cepat ke layanan *check-in* dan direktori dokter.
- **Pengajuan Janji Temu (`/dashboard/doctors/[id]/appointment` & `/visit-request`):** Formulir *multi-step* (Data Pasien, Informasi Asuransi, Detail Kunjungan) dengan *auto-fill* dari riwayat pasien, pelacakan status (*Active*, *Referred*, *Completed*, *Canceled*), pembatalan kunjungan, dan pemberian ulasan/rating dokter.
- **Manajemen Jadwal Operasi (`/surgery`):** Tinjauan catatan rekomendasi tindakan bedah, persetujuan jadwal (*Accept*), maupun pembatalan dengan alasan.
- **Self Check-In & Antrean (`/checkin` & `/checkin/history`):** Alur *check-in* 4 langkah yang menghasilkan nomor antrean otomatis (`A001`, dst.), nomor ruangan, lantai konsultasi, riwayat kunjungan, dan survei kepuasan pasien.

---

## Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript 5 |
| **UI & Styling** | React 19, Tailwind CSS v4, Shadcn UI (`@base-ui/react`) |
| **Ikon** | Lucide React & Hugeicons |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM & Migrasi** | Drizzle ORM & Drizzle Kit |
| **Autentikasi** | Better Auth |
| **Linter & Formatter** | Biome |
| **Deployment** | Vercel |

---

## Arsitektur Proyek

Proyek ini menerapkan pendekatan **Feature-Driven Architecture** untuk memisahkan *routing* Next.js dari logika domain bisnis:

```text
├── drizzle/                  # File migrasi SQL & snapshot skema Drizzle
├── public/                   # Aset statis (gambar, ilustrasi, ikon)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Halaman login, register, forgot-password
│   │   ├── (protected)/      # Route terproteksi (dashboard, checkin, visit-request, surgery, profile)
│   │   ├── (public)/         # Route publik (beranda, doctors, resource, contact, kebijakan)
│   │   └── api/              # REST API Route Handlers (auth, visit-request, surgery, profile)
│   ├── db/                   # Konfigurasi koneksi Neon, skema tabel, relasi, dan seeder
│   │   └── seeds/            # Data awal dokter, artikel, kunjungan, dan operasi
│   ├── features/             # Modul fitur mandiri (actions, queries, types, components)
│   │   ├── auth/
│   │   ├── checkin/
│   │   ├── doctors/
│   │   ├── resources/
│   │   ├── surgery/
│   │   └── visit-request/
│   ├── lib/                  # Konfigurasi Better Auth (server & client) dan utilitas API
│   ├── shared/               # Komponen UI reusable (Shadcn, NavBar, Footer) & global CSS
│   └── middleware.ts         # Proteksi route berbasis cookie sesi Better Auth
├── biome.json                # Konfigurasi linter dan formatter Biome
├── drizzle.config.ts         # Konfigurasi Drizzle Kit
└── package.json

```

---

## Skema Database

Database PostgreSQL di Neon terdiri dari kelompok tabel utama berikut:

* **Autentikasi:** `user`, `session`, `account`, `verification`
* **Master Data:** `doctors`, `resources`, `articles`, `article_comments`
* **Data Pasien & Transaksi:** `patients`, `insurances`, `visit_requests`, `surgeries`, `check_in`

---

## Instalasi & Menjalankan Secara Lokal

### Prasyarat

* **Node.js** versi 20 atau lebih baru
* Akun & database PostgreSQL aktif di **[Neon](https://neon.tech)**

### Langkah Instalasi

1. **Clone repositori**
```bash
git clone [https://github.com/CatBounceXD/UAS_Frontend.git](https://github.com/CatBounceXD/UAS_Frontend.git)
cd UAS_Frontend

```


2. **Install dependensi**
```bash
npm install

```


3. **Konfigurasi Environment Variables**
Buat file `.env.local` pada direktori utama proyek dan isi variabel yang diperlukan (lihat bagian [Environment Variables](https://www.google.com/search?q=%23environment-variables)).
4. **Sinkronisasi Skema Database & Seeding Data Awal**
```bash
npx drizzle-kit push
npm run db:seed

```


> **Catatan:** Untuk mengisi data sampel `visit_requests` dan `surgeries` saat seeding, pastikan minimal sudah ada 1 akun pengguna yang terdaftar terlebih dahulu melalui halaman `/register`.


5. **Jalankan Server Development**
```bash
npm run dev

```


Buka [http://localhost:3000](http://localhost:3000) di browser.

### Perintah NPM Lainnya

| Perintah | Deskripsi |
| --- | --- |
| `npm run dev` | Menjalankan server pengembangan Next.js |
| `npm run build` | Membangun aplikasi untuk produksi |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Memeriksa kualitas kode dan aturan lint dengan Biome |
| `npm run format` | Memformat seluruh kode secara otomatis menggunakan Biome |
| `npm run db:seed` | Mengisi database dengan data awal dokter, artikel, dan transaksi |

---

## Environment Variables

Buat file `.env.local` dengan format berikut:

```env
# Koneksi PostgreSQL Neon
DATABASE_URL="postgresql://username:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"

# Konfigurasi Better Auth
BETTER_AUTH_SECRET="masukkan_random_secret_minimal_32_karakter"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

```

---

## Deployment ke Vercel

1. Push repositori ini ke GitHub.
2. Import proyek di dashboard **[Vercel](https://vercel.com)**.
3. Tambahkan seluruh *environment variables* (`DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, dan `NEXT_PUBLIC_APP_URL` yang mengarah ke domain `.vercel.app` Anda) pada pengaturan proyek Vercel.
4. Klik **Deploy**.