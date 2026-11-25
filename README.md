# E-Health CHospital

Project UAS FrontEnd dengan tema E-health

## Daftar Anggota

- [Steven Pratama - 535250154](https://github.com/CatBounceXD)
- [Yael Rehuellah - 535250177](https://github.com/YaelRehuellah)
- [Sekar Aruma Putri - 535250167](https://github.com/sekarputri5795-boop)
- [Syafiqa Aida Purwati - 535250175](https://github.com/underemplloyed)
- [Summaya Kaylani - 535250159](https://github.com/keylparker)

---

## Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Arsitektur Proyek](#arsitektur-proyek)
- [Skema Database](#skema-database)
- [Instalasi & Menjalankan Secara Lokal](#instalasi--menjalankan-secara-lokal)
- [Environment Variables](#environment-variables)

---

## Fitur Utama

### Public Page
- **Landing Page:** Hero banner layanan, daftar dokter, informasi klinik
- **Dokter (`/doctors`):** Pencarian daftar spesialis lengkap dengan ringkasan prosedur medis, latar belakang pendidikan, sertifikasi, dan kontak klinik.
- **Edukasi Kesehatan & Artikel (`/resource`):** Galeri fasilitas medis serta artikel kesehatan dengan sistem komentar.
- **Informasi Klinik (`/contact`, `/privacy-policy`, `/terms-and-condition`):** Peta lokasi terintegrasi, jam operasional, dan kebijakan layanan.

### Autentikasi & Manajemen Akun
- **Registrasi & Login (`/register`, `/login`):** Autentikasi berbasis sesi menggunakan **Better Auth** dengan validasi nomor telepon Indonesia, tanggal lahir, dan pengalihan `callbackUrl`.
- **Manajemen Profil (`/profile`):** Pembaruan biodata pasien, foto profil, serta perubahan kata sandi.
- **Reset Password (`/forgot-password`):** Pergantian password.

### Protected Page
- **Dashboard Pasien (`/dashboard`):** Ringkasan akses cepat ke layanan *check-in* dan direktori dokter.
- **Pengajuan Janji Temu (`/dashboard/doctors/[id]/appointment` & `/visit-request`):** Formulir *multi-step* (Data Pasien, Informasi Asuransi, Detail Kunjungan) dari riwayat pasien, pembatalan kunjungan, dan pemberian ulasan/rating dokter.
- **Manajemen Jadwal Operasi (`/surgery`):** Persetujuan jadwal (*Accept*), maupun pembatalan dengan alasan.
- **Self Check-In (`/checkin` & `/checkin/history`):** Alur *check-in* 4 langkah yang menghasilkan nomor antrean, nomor ruangan, lantai konsultasi, riwayat kunjungan, dan survei kepuasan pasien.

---

## Tech Stack

| Kategori | Teknologi |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Bahasa** | TypeScript 5 |
| **UI & Styling** | React 19, Tailwind CSS v4, Shadcn UI (`@base-ui/react`) |
| **Ikon** | Lucide React & Hugeicons |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM & Migration** | Drizzle ORM & Drizzle Kit |
| **Autentikasi** | Better Auth |
| **Linter & Formatter** | Biome |
| **Deployment** | Vercel |

---

## Arsitektur Proyek

Proyek ini menerapkan pendekatan **Feature-Driven Architecture** untuk memisahkan *routing* Next.js dari logika domain bisnis:

```text
├── drizzle/                  # File migration SQL & snapshot skema Drizzle
├── public/                   # Aset (gambar, ilustrasi, ikon)
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── (auth)/           # Halaman login, register, forgot-password
│   │   ├── (protected)/      # Route protected (dashboard, checkin, visit-request, surgery, profile)
│   │   ├── (public)/         # Route publik (beranda, doctors, resource, contact, kebijakan)
│   │   └── api/              # REST API Route Handlers (auth, visit-request, surgery, profile)
│   ├── db/                   # Config koneksi Neon, skema tabel, relasi, dan seeder
│   │   └── seeds/            # Data awal dokter, artikel, kunjungan, dan operasi
│   ├── features/             # Modul fitur mandiri (actions, queries, types, components)
│   │   ├── auth/
│   │   ├── checkin/
│   │   ├── doctors/
│   │   ├── resources/
│   │   ├── surgery/
│   │   └── visit-request/
│   ├── lib/                  # Config Better Auth (server & client) dan utilitas API
│   ├── shared/               # Komponen UI reusable (Shadcn, NavBar, Footer) & global CSS
│   └── middleware.ts         # Proteksi route berbasis cookie sesi Better Auth
├── biome.json                # Config linter dan formatter Biome
├── drizzle.config.ts         # Config Drizzle Kit
└── package.json

```

---

## Skema Database

Database PostgreSQL di Neon terdiri dari kelompok tabel utama berikut:

* **Autentikasi:** `user`, `session`, `account`, `verification`
* **Master Data:** `doctors`, `resources`, `articles`, `article_comments`
* **Data Pasien:** `patients`, `insurances`, `visit_requests`, `surgeries`, `check_in`

---

## Instalasi & Menjalankan Secara Lokal

### Prasyarat

* **Node.js** versi 20 atau lebih baru
* Akun & database PostgreSQL aktif di Neon

### Langkah Instalasi

1. **Clone repositori**
```bash
git clone https://github.com/CatBounceXD/UAS_Frontend.git
cd UAS_Frontend

```


2. **Install dependensi**
```bash
npm install

```


3. **Config Environment Variables**
Buat file `.env.local` pada direktori utama proyek dan isi variabel yang diperlukan (lihat dibawah)

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

---

## Environment Variables

Buat file `.env.local` dengan format berikut:

```env
# Koneksi PostgreSQL Neon
DATABASE_URL="postgresql://username:password@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require"

# Config Better Auth
BETTER_AUTH_SECRET="masukkan_random_secret_minimal_32_karakter"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

```

---