import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { doctors, insurances, patients, surgeries } from "@/db/schema";

type SurgeryRow = typeof surgeries.$inferSelect;
type DoctorRow = typeof doctors.$inferSelect | null;
type PatientRow = typeof patients.$inferSelect | null;
type InsuranceRow = typeof insurances.$inferSelect | null;

function mapSurgeryRecord(
  surgery: SurgeryRow,
  doctor: DoctorRow,
  patient: PatientRow,
  insurance: InsuranceRow,
) {
  return {
    ...surgery,
    doctorName: doctor?.name ?? "Unknown Surgeon",
    doctorSpecialty: surgery.procedureSpecialty,
    doctorAvatarUrl: doctor?.avatarUrl ?? "",
    specialtySummary: doctor?.specialtySummary ?? "",
    procedures: doctor?.procedures ?? [],
    patientName: patient?.name ?? "-",
    patientEmail: patient?.email ?? "-",
    patientDob: patient?.dateOfBirth ?? "-",
    addressLine1: patient?.addressLine1 ?? "-",
    addressLine2: patient?.addressLine2 ?? null,
    city: patient?.city ?? "-",
    state: patient?.state ?? "-",
    zipcode: patient?.zipcode ?? "-",
    contactInfo: patient?.contactInfo ?? "-",
    referralSource: patient?.referralSource ?? null,
    preferredContactMethod: patient?.preferredContactMethod ?? "-",
    ssn: patient?.ssn ?? null,
    isPolicyHolderSameAsPatient: insurance?.isPolicyHolderSameAsPatient ?? true,
    policyHolderName: insurance?.policyHolderName ?? patient?.name ?? "-",
    healthInsurancePlan: insurance?.healthInsurancePlan ?? "-",
    healthInsuranceNumber: insurance?.healthInsuranceNumber ?? "-",
    groupNumber: insurance?.groupNumber ?? null,
    doctor,
    patient,
    insurance,
  };
}

export type SurgeryRecord = ReturnType<typeof mapSurgeryRecord>;

export async function getAllSurgeriesByUserId(
  userId: string,
): Promise<SurgeryRecord[]> {
  const rows = await db
    .select({
      surgery: surgeries,
      doctor: doctors,
      patient: patients,
      insurance: insurances,
    })
    .from(surgeries)
    .leftJoin(doctors, eq(surgeries.doctorId, doctors.id))
    .leftJoin(patients, eq(surgeries.patientId, patients.id))
    .leftJoin(insurances, eq(surgeries.insuranceId, insurances.id))
    .where(eq(surgeries.userId, userId))
    .orderBy(asc(surgeries.id));

  return rows.map(({ surgery, doctor, patient, insurance }) =>
    mapSurgeryRecord(surgery, doctor, patient, insurance),
  );
}

export async function getSurgeryById(
  id: number,
  userId: string,
): Promise<SurgeryRecord | null> {
  const [row] = await db
    .select({
      surgery: surgeries,
      doctor: doctors,
      patient: patients,
      insurance: insurances,
    })
    .from(surgeries)
    .leftJoin(doctors, eq(surgeries.doctorId, doctors.id))
    .leftJoin(patients, eq(surgeries.patientId, patients.id))
    .leftJoin(insurances, eq(surgeries.insuranceId, insurances.id))
    .where(and(eq(surgeries.id, id), eq(surgeries.userId, userId)))
    .limit(1);

  if (!row) return null;

  return mapSurgeryRecord(row.surgery, row.doctor, row.patient, row.insurance);
}

export async function updateSurgeryStatus(
  id: number,
  userId: string,
  status: string,
  cancelReason?: string | null,
): Promise<SurgeryRow | null> {
  const [updated] = await db
    .update(surgeries)
    .set({
      status,
      cancelReason: status === "Canceled" ? (cancelReason ?? null) : null,
      updatedAt: new Date(),
    })
    .where(and(eq(surgeries.id, id), eq(surgeries.userId, userId)))
    .returning();

  return updated ?? null;
}
