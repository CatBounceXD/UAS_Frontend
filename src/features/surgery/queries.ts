import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { doctors, surgeries } from "@/db/schema";

export type SurgeryRecord = typeof surgeries.$inferSelect;

function mergeSurgeryWithDoctor(
  surgery: SurgeryRecord,
  doctor: typeof doctors.$inferSelect | null,
): SurgeryRecord {
  if (!doctor) return surgery;

  return {
    ...surgery,
    doctorName: doctor.name,
    doctorAvatarUrl: doctor.avatarUrl,
    specialtySummary: doctor.specialtySummary,
    procedures: doctor.procedures,
  };
}

export async function getAllSurgeries(): Promise<SurgeryRecord[]> {
  const rows = await db
    .select({
      surgery: surgeries,
      doctor: doctors,
    })
    .from(surgeries)
    .leftJoin(doctors, eq(surgeries.doctorId, doctors.id))
    .orderBy(asc(surgeries.id));

  return rows.map(({ surgery, doctor }) =>
    mergeSurgeryWithDoctor(surgery, doctor),
  );
}

export async function getSurgeryById(
  id: number,
): Promise<SurgeryRecord | null> {
  const [row] = await db
    .select({
      surgery: surgeries,
      doctor: doctors,
    })
    .from(surgeries)
    .leftJoin(doctors, eq(surgeries.doctorId, doctors.id))
    .where(eq(surgeries.id, id))
    .limit(1);

  if (!row) return null;

  return mergeSurgeryWithDoctor(row.surgery, row.doctor);
}

export async function updateSurgeryStatus(
  id: number,
  status: string,
  cancelReason?: string | null,
): Promise<SurgeryRecord | null> {
  const [updated] = await db
    .update(surgeries)
    .set({
      status,
      cancelReason: status === "Canceled" ? (cancelReason ?? null) : null,
    })
    .where(eq(surgeries.id, id))
    .returning();

  return updated ?? null;
}
