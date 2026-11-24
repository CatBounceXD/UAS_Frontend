import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { insurances, patients } from "@/db/schema";
import DoctorAppointmentClient from "@/features/doctors/components/DoctorAppointmentClient";
import { getDoctorById } from "@/features/doctors/queries";
import { auth } from "@/lib/auth";

export default async function DoctorAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, session] = await Promise.all([
    params,
    auth.api.getSession({ headers: await headers() }),
  ]);

  if (!session) {
    redirect("/login");
  }

  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const doctor = await getDoctorById(numericId);

  if (!doctor) {
    notFound();
  }

  const [latestPatient] = await db
    .select()
    .from(patients)
    .where(eq(patients.userId, session.user.id))
    .orderBy(desc(patients.createdAt))
    .limit(1);

  const [latestInsurance] = latestPatient
    ? await db
        .select()
        .from(insurances)
        .where(eq(insurances.patientId, latestPatient.id))
        .orderBy(desc(insurances.createdAt))
        .limit(1)
    : [];

  const sessionUser = session.user as {
    name: string;
    email: string;
    phone?: string | null;
    dob?: string | null;
  };

  return (
    <DoctorAppointmentClient
      doctor={doctor}
      defaultValues={{
        name: latestPatient?.name || sessionUser.name || "",
        email: latestPatient?.email || sessionUser.email || "",
        dateOfBirth: latestPatient?.dateOfBirth || sessionUser.dob || "",
        addressLine1: latestPatient?.addressLine1 || "",
        addressLine2: latestPatient?.addressLine2 || "",
        city: latestPatient?.city || "",
        state: latestPatient?.state || "",
        zipcode: latestPatient?.zipcode || "",
        preferredContactMethod: latestPatient?.preferredContactMethod || "",
        contactInfo: latestPatient?.contactInfo || sessionUser.phone || "",
        referralSource: latestPatient?.referralSource || "",
        ssn: latestPatient?.ssn || "",
        isPolicyHolderSameAsPatient:
          latestInsurance?.isPolicyHolderSameAsPatient ?? true,
        policyHolderName:
          latestInsurance?.policyHolderName || sessionUser.name || "",
        healthInsurancePlan: latestInsurance?.healthInsurancePlan || "",
        healthInsuranceNumber: latestInsurance?.healthInsuranceNumber || "",
        groupNumber: latestInsurance?.groupNumber || "",
      }}
    />
  );
}