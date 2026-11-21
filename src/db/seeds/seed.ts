// src/db/seeds/seed.ts
import { DOCTORS_DATA } from "../../lib/api";
import { db } from "../index";
import { doctors } from "../schema";

async function seed() {
  console.log("Seeding database...");

  try {
    console.log("Membersihkan data doctors lama...");
    await db.delete(doctors);

    console.log("Memasukkan data dokter dari DOCTORS_DATA...");
    const mappedDoctors = DOCTORS_DATA.map((doc) => ({
      name: doc.name,
      specialty: doc.specialty,
      bio: doc.bio,
      avatarUrl: doc.avatarUrl,
      rating: doc.rating,
      specialtySummary: doc.specialtySummary,
      procedures: doc.procedures,
      education: doc.education,
      training: doc.training,
      affiliations: doc.affiliations,
      aboutParagraphs: doc.aboutParagraphs,
      certificates: doc.certificates,
      media: doc.media,
      contactEmail: doc.contact.email,
      contactPhone: doc.contact.phone,
    }));

    await db.insert(doctors).values(mappedDoctors);

    console.log("Seeding doctors berhasil!");
    process.exit(0);
  } catch (error) {
    console.error("Terjadi kesalahan saat seeding:", error);
    process.exit(1);
  }
}

seed();