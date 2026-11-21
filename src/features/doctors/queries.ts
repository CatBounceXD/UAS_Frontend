import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { doctors } from "@/db/schema";

export type DoctorRecord = typeof doctors.$inferSelect;

export async function getAllDoctors(): Promise<DoctorRecord[]> {
  return db.select().from(doctors).orderBy(asc(doctors.id));
}

export async function getDoctorById(id: number): Promise<DoctorRecord | null> {
  const [doctor] = await db
    .select()
    .from(doctors)
    .where(eq(doctors.id, id))
    .limit(1);

  return doctor ?? null;
}
