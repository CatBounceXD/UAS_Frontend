
import { db } from "../index";
import { dokter } from "../schema";

async function seed() {
  console.log("seeding database...");

  try {
    console.log("Membersihkan data lama...");
    await db.delete(dokter);

    console.log("Memasukkan data dokter...");
    await db.insert(dokter).values([
      { nama: "Dr. Budi Santoso", spesialis: "Umum" },
      { nama: "Dr. Siti Aminah", spesialis: "Anak" },
      { nama: "Dr. Andi Wijaya", spesialis: "Penyakit Dalam" },
    ]);

    console.log("Seeding berhasil!");
  } catch (error) {
    console.error("Terjadi kesalahan saat seeding:", error);
    process.exit(1);
  }
}

seed();
