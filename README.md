# EHealth — Project UAS

Website layanan E-Health kelompok 3.

> Project UAS FrontEnd - SMT3 — 2026

---

## Feature

- [ ] Landing page
- [ ] Login & Register
- [ ] Dashboard List Dokter
- 

> Centang `[x]` setelah fitur selesai dikerjakan.

---

## Tech Stack

| Kategori     | Teknologi                     |
|--------------|-------------------------------|
| Framework    | Next.js (App Router)          |
| Bahasa       | TypeScript                    |
| UI Library   | React                         |
| Styling      | Tailwind CSS + ShadcnUI       |
| Ikon         | Lucide React                  |
| Design       | Figma                         |
| Database     | Neon.tech Drizzle ORM         |
| Auth         | Better-Auth                   |
| Deploy       | ------                        |

---

## Devs Installation

Pastikan sudah terinstall:
 
- **Node.js** → [download](https://nodejs.org)

Step:

1. Git Clone `https://github.com/CatBounceXD/UAS_Frontend.git`
2. Buat dan Masukkan Environment Variable Database dan Better-Auth ke `.env.local`
   example:
   ```bash
    DATABASE_URL='your_database_url'

    BETTER_AUTH_SECRET="create_your_own_better_auth_passcode"
    BETTER_AUTH_URL="http://localhost:3000"
   ```
3. Run: 
    ```bash
    npm install
    npx drizzle-kit push
    npm run db:seed
    ```
4. Enjoy