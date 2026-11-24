import { and, desc, eq } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";
import { db } from "@/db";
import { doctors, insurances, patients, visitRequests } from "@/db/schema";
import type { VisitRequestPayload } from "./types";

const referredDoctor = alias(doctors, "referred_doctor");

type VisitRequestStatus = NonNullable<
  (typeof visitRequests.$inferInsert)["status"]
>;

export async function getVisitRequestsByUserId(userId: string) {
  const rows = await db
    .select({
      visitRequest: visitRequests,
      patient: patients,
      insurance: insurances,
      doctor: doctors,
      referredByDoctor: referredDoctor,
    })
    .from(visitRequests)
    .leftJoin(patients, eq(visitRequests.patientId, patients.id))
    .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
    .leftJoin(doctors, eq(visitRequests.doctorId, doctors.id))
    .leftJoin(
      referredDoctor,
      eq(visitRequests.referredByDoctorId, referredDoctor.id),
    )
    .where(eq(visitRequests.userId, userId))
    .orderBy(desc(visitRequests.createdAt));

  return rows.map(
    ({ visitRequest, patient, insurance, doctor, referredByDoctor }) => ({
      ...visitRequest,
      doctorName: doctor?.name ?? "Unknown Doctor",
      doctorSpecialty: doctor?.specialty ?? "General",
      doctorAvatarUrl: doctor?.avatarUrl ?? "",
      referredByName: referredByDoctor?.name ?? null,
      referredBySpecialty: referredByDoctor?.specialty ?? null,
      referredByAvatarUrl: referredByDoctor?.avatarUrl ?? null,
      patient,
      insurance,
      doctor,
      referredByDoctor,
    }),
  );
}

export async function createVisitRequest(
  userId: string,
  payload: VisitRequestPayload,
) {
  return await db.transaction(async (tx) => {
    const [selectedDoctor] = payload.doctorId
      ? await tx
          .select()
          .from(doctors)
          .where(eq(doctors.id, payload.doctorId))
          .limit(1)
      : payload.doctorName?.trim()
        ? await tx
            .select()
            .from(doctors)
            .where(eq(doctors.name, payload.doctorName.trim()))
            .limit(1)
        : [];

    if (!selectedDoctor) {
      throw new Error(
        "Dokter yang dipilih tidak ditemukan atau tidak tersedia.",
      );
    }

    const [existingPatient] = await tx
      .select({ id: patients.id })
      .from(patients)
      .where(eq(patients.userId, userId))
      .limit(1);

    const patientValues = {
      userId,
      name: payload.name.trim(),
      email: payload.email.trim(),
      dateOfBirth: payload.dateOfBirth.trim(),
      addressLine1: payload.addressLine1.trim(),
      addressLine2: payload.addressLine2?.trim() || null,
      city: payload.city.trim(),
      state: payload.state.trim(),
      zipcode: payload.zipcode.trim(),
      preferredContactMethod: payload.preferredContactMethod.trim(),
      contactInfo: payload.contactInfo.trim(),
      referralSource: payload.referralSource?.trim() || null,
      ssn: payload.ssn?.trim() || null,
    };

    let patientId: number;

    if (existingPatient) {
      const [updatedPatient] = await tx
        .update(patients)
        .set(patientValues)
        .where(eq(patients.id, existingPatient.id))
        .returning({ id: patients.id });

      patientId = updatedPatient.id;
    } else {
      const [insertedPatient] = await tx
        .insert(patients)
        .values(patientValues)
        .returning({ id: patients.id });

      patientId = insertedPatient.id;
    }

    const [existingInsurance] = await tx
      .select({ id: insurances.id })
      .from(insurances)
      .where(
        and(
          eq(insurances.patientId, patientId),
          eq(
            insurances.healthInsurancePlan,
            payload.healthInsurancePlan.trim(),
          ),
          eq(
            insurances.healthInsuranceNumber,
            payload.healthInsuranceNumber.trim(),
          ),
        ),
      )
      .limit(1);

    let insuranceId: number;

    if (existingInsurance) {
      const [updatedInsurance] = await tx
        .update(insurances)
        .set({
          isPolicyHolderSameAsPatient: payload.isPolicyHolderSameAsPatient,
          policyHolderName: payload.policyHolderName.trim(),
          groupNumber: payload.groupNumber?.trim() || "",
        })
        .where(eq(insurances.id, existingInsurance.id))
        .returning({ id: insurances.id });

      insuranceId = updatedInsurance.id;
    } else {
      const [insertedInsurance] = await tx
        .insert(insurances)
        .values({
          patientId,
          isPolicyHolderSameAsPatient: payload.isPolicyHolderSameAsPatient,
          policyHolderName: payload.policyHolderName.trim(),
          healthInsurancePlan: payload.healthInsurancePlan.trim(),
          healthInsuranceNumber: payload.healthInsuranceNumber.trim(),
          groupNumber: payload.groupNumber?.trim() || "",
        })
        .returning({ id: insurances.id });

      insuranceId = insertedInsurance.id;
    }

    const [createdRequest] = await tx
      .insert(visitRequests)
      .values({
        userId,
        patientId,
        insuranceId,
        doctorId: selectedDoctor.id,
        preferredAppointmentTime: payload.preferredAppointmentTime.trim(),
        urgency: payload.urgency.trim(),
        reasonForVisit: payload.reasonForVisit.trim(),
        status: "Pending",
      })
      .returning();

    return createdRequest;
  });
}

export async function getVisitRequestDetailById(id: number, userId: string) {
  const [row] = await db
    .select({
      visitRequest: visitRequests,
      patient: patients,
      insurance: insurances,
      doctor: doctors,
      referredByDoctor: referredDoctor,
    })
    .from(visitRequests)
    .leftJoin(patients, eq(visitRequests.patientId, patients.id))
    .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
    .leftJoin(doctors, eq(visitRequests.doctorId, doctors.id))
    .leftJoin(
      referredDoctor,
      eq(visitRequests.referredByDoctorId, referredDoctor.id),
    )
    .where(and(eq(visitRequests.id, id), eq(visitRequests.userId, userId)));

  if (!row) {
    return null;
  }

  return {
    ...row.visitRequest,
    doctorName: row.doctor?.name ?? "Unknown Doctor",
    doctorSpecialty: row.doctor?.specialty ?? "General",
    doctorAvatarUrl: row.doctor?.avatarUrl ?? "",
    referredByName: row.referredByDoctor?.name ?? null,
    referredBySpecialty: row.referredByDoctor?.specialty ?? null,
    referredByAvatarUrl: row.referredByDoctor?.avatarUrl ?? null,
    patient: row.patient,
    insurance: row.insurance,
    doctor: row.doctor,
    referredByDoctor: row.referredByDoctor,
  };
}

export async function updateVisitRequestById(
  id: number,
  userId: string,
  payload: {
    status?: VisitRequestStatus;
    rating?: number;
    reviewComment?: string;
    preferredAppointmentTime?: string;
    urgency?: string;
    reasonForVisit?: string;
  },
) {
  if (payload.rating !== undefined) {
    if (
      typeof payload.rating !== "number" ||
      !Number.isInteger(payload.rating) ||
      payload.rating < 1 ||
      payload.rating > 5
    ) {
      throw new Error("Rating harus berupa bilangan bulat antara 1 hingga 5.");
    }
  }

  const [updated] = await db
    .update(visitRequests)
    .set({
      ...(payload.status !== undefined ? { status: payload.status } : {}),
      ...(payload.rating !== undefined ? { rating: payload.rating } : {}),
      ...(payload.reviewComment !== undefined
        ? { reviewComment: payload.reviewComment.trim() }
        : {}),
      ...(payload.preferredAppointmentTime !== undefined
        ? { preferredAppointmentTime: payload.preferredAppointmentTime.trim() }
        : {}),
      ...(payload.urgency !== undefined
        ? { urgency: payload.urgency.trim() }
        : {}),
      ...(payload.reasonForVisit !== undefined
        ? { reasonForVisit: payload.reasonForVisit.trim() }
        : {}),
    })
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
