import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { doctors, insurances, patients, visitRequests } from "@/db/schema";
import type { VisitRequestPayload } from "@/lib/api";

export async function getVisitRequestsByUserId(userId: string) {
  const rows = await db
    .select({
      visitRequest: visitRequests,
      patient: patients,
      insurance: insurances,
    })
    .from(visitRequests)
    .leftJoin(patients, eq(visitRequests.patientId, patients.id))
    .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
    .where(eq(visitRequests.userId, userId))
    .orderBy(desc(visitRequests.createdAt));

  return rows.map(({ visitRequest, patient, insurance }) => ({
    ...visitRequest,
    patient,
    insurance,
  }));
}

export async function createVisitRequest(
  userId: string,
  body: VisitRequestPayload & { doctorId?: number },
) {
  const [createdPatient] = await db
    .insert(patients)
    .values({
      name: body.name,
      email: body.email,
      dateOfBirth: body.dateOfBirth || "-",
      addressLine1: body.addressLine1 || "-",
      addressLine2: body.addressLine2 || "",
      city: body.city || "-",
      state: body.state || "-",
      zipcode: body.zipcode || "-",
      preferredContactMethod: body.preferredContactMethod || "Phone",
      contactInfo: body.contactInfo || "-",
      referralSource: body.referralSource || "",
      ssn: body.ssn || "",
    })
    .returning();

  let insuranceId: number | null = null;
  if (body.healthInsurancePlan?.trim() || body.healthInsuranceNumber?.trim()) {
    const [createdInsurance] = await db
      .insert(insurances)
      .values({
        patientId: createdPatient.id,
        isPolicyHolderSameAsPatient: body.isPolicyHolderSameAsPatient ?? true,
        policyHolderName: body.policyHolderName || body.name,
        healthInsurancePlan: body.healthInsurancePlan || "-",
        healthInsuranceNumber: body.healthInsuranceNumber || "-",
        groupNumber: body.groupNumber || "",
      })
      .returning();

    insuranceId = createdInsurance.id;
  }

  const allDoctors = await db.select().from(doctors);
  const matchedDoctor =
    allDoctors.find((d) => d.id === body.doctorId) ??
    allDoctors.find(
      (d) => d.name.toLowerCase() === body.doctorName?.toLowerCase(),
    );

  const [createdVisitRequest] = await db
    .insert(visitRequests)
    .values({
      userId,
      patientId: createdPatient.id,
      insuranceId,
      doctorId: matchedDoctor?.id ?? 1,
      doctorName: body.doctorName || matchedDoctor?.name || "Doctor",
      doctorSpecialty:
        body.doctorSpecialty || matchedDoctor?.specialty || "General",
      doctorAvatarUrl:
        matchedDoctor?.avatarUrl ??
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
      preferredAppointmentTime: body.preferredAppointmentTime || "Morning",
      urgency: body.urgency || "Routine",
      reasonForVisit: body.reasonForVisit,
      recommendationComment:
        "Initial visit request received. Our clinical team will review your symptoms and medical history prior to your consultation.",
      status: "Active",
    })
    .returning();

  return createdVisitRequest;
}

export async function getVisitRequestDetailById(id: number, userId: string) {
  const [row] = await db
    .select({
      visitRequest: visitRequests,
      patient: patients,
      insurance: insurances,
      doctor: doctors,
    })
    .from(visitRequests)
    .leftJoin(patients, eq(visitRequests.patientId, patients.id))
    .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
    .leftJoin(doctors, eq(visitRequests.doctorId, doctors.id))
    .where(and(eq(visitRequests.id, id), eq(visitRequests.userId, userId)));

  if (!row) {
    return null;
  }

  return {
    ...row.visitRequest,
    patient: row.patient,
    insurance: row.insurance,
    doctor: row.doctor,
  };
}

export async function updateVisitRequestById(
  id: number,
  userId: string,
  payload: {
    status?: string;
    cancelReason?: string;
    rating?: number;
    reviewComment?: string;
  },
) {
  const updatePayload: Partial<typeof visitRequests.$inferInsert> = {
    updatedAt: new Date(),
  };

  if (payload.status) {
    updatePayload.status = payload.status;
    if (payload.status === "Canceled") {
      updatePayload.cancelReason = payload.cancelReason ?? null;
    }
  }

  if (typeof payload.rating === "number") {
    updatePayload.rating = payload.rating;
  }

  if (typeof payload.reviewComment === "string") {
    updatePayload.reviewComment = payload.reviewComment;
  }

  const [updated] = await db
    .update(visitRequests)
    .set(updatePayload)
    .where(and(eq(visitRequests.id, id), eq(visitRequests.userId, userId)))
    .returning();

  return updated ?? null;
}

export type VisitRequestWithRelations = Awaited<
  ReturnType<typeof getVisitRequestsByUserId>
>[number];

export type VisitRequestDetailRecord = NonNullable<
  Awaited<ReturnType<typeof getVisitRequestDetailById>>
>;
