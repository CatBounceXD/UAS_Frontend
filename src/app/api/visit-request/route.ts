import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { doctors, insurances, patients, visitRequests } from "@/db/schema";
import type { VisitRequestPayload } from "@/lib/api";
import { auth } from "@/lib/auth";

async function seedDefaultVisitRequests(userId: string, userName: string, userEmail: string) {
  const [samplePatient] = await db
    .insert(patients)
    .values({
      name: userName || "John Smith",
      email: userEmail || "john.smith@domain.com",
      dateOfBirth: "12-02-2001",
      addressLine1: "6033 Collins Inlet",
      addressLine2: "6033 Collins Inlet",
      city: "West Gina",
      state: "New York",
      zipcode: "70945",
      preferredContactMethod: "Home Phone",
      contactInfo: "278.268.6823 x36440",
      referralSource: "Internet",
      ssn: "0 123 456 7890",
    })
    .returning();

  const [sampleInsurance] = await db
    .insert(insurances)
    .values({
      patientId: samplePatient.id,
      isPolicyHolderSameAsPatient: true,
      policyHolderName: userName || "John Smith",
      healthInsurancePlan: "BlueCross Comprehensive Care",
      healthInsuranceNumber: "0 123 456 789",
      groupNumber: "0 123 456 789",
    })
    .returning();

  const defaultComment =
    "Patient responded well to initial clinical assessment. Continue prescribed medication and follow up with routine diagnostic monitoring as scheduled.";

  await db.insert(visitRequests).values([
    {
      userId,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: 1,
      doctorName: "Dr. Darlene Robertson",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Routine cardiovascular consultation and evaluation of recent blood pressure and ECG readings.",
      recommendationComment: defaultComment,
      status: "Active",
      hasFamilyBadge: false,
    },
    {
      userId,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: 7,
      doctorName: "PETER C. NEFF",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Specialist referral consultation for comprehensive diagnostic imaging and treatment planning.",
      recommendationComment: defaultComment,
      referredByName: "Dr. Darlene Robertson",
      referredBySpecialty: "Heart Surgeon",
      referredByAvatarUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
      status: "Referred",
      hasFamilyBadge: true,
    },
    {
      userId,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: 5,
      doctorName: "DR. HALLQUIST",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1594824813571-2153349aed06?w=150&auto=format&fit=crop&q=80",
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Outpatient clinical consultation and follow-up wellness screening.",
      recommendationComment: defaultComment,
      reviewComment:
        "Very thorough explanation of the diagnosis and clear step-by-step recovery guidance.",
      rating: 4,
      status: "Completed",
      hasFamilyBadge: false,
    },
    {
      userId,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: 8,
      doctorName: "MATTHEW D. HNATOW",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Post-treatment follow-up and review of laboratory test results.",
      recommendationComment: defaultComment,
      reviewComment:
        "Friendly clinical staff and punctual appointment schedule.",
      rating: 4,
      status: "Completed",
      hasFamilyBadge: false,
    },
  ]);
}

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let rows = await db
      .select({
        visitRequest: visitRequests,
        patient: patients,
        insurance: insurances,
      })
      .from(visitRequests)
      .leftJoin(patients, eq(visitRequests.patientId, patients.id))
      .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
      .where(eq(visitRequests.userId, session.user.id))
      .orderBy(desc(visitRequests.createdAt));

    if (rows.length === 0) {
      await seedDefaultVisitRequests(
        session.user.id,
        session.user.name,
        session.user.email,
      );
      rows = await db
        .select({
          visitRequest: visitRequests,
          patient: patients,
          insurance: insurances,
        })
        .from(visitRequests)
        .leftJoin(patients, eq(visitRequests.patientId, patients.id))
        .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
        .where(eq(visitRequests.userId, session.user.id))
        .orderBy(desc(visitRequests.createdAt));
    }

    const data = rows.map(({ visitRequest, patient, insurance }) => ({
      ...visitRequest,
      patient,
      insurance,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/visit-request error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil daftar visit request." },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await req.json()) as VisitRequestPayload & {
      doctorId?: number;
    };

    if (!body.name || !body.email || !body.reasonForVisit) {
      return NextResponse.json(
        { message: "Nama, email, dan alasan kunjungan wajib diisi." },
        { status: 400 },
      );
    }

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
    if (
      body.healthInsurancePlan?.trim() ||
      body.healthInsuranceNumber?.trim()
    ) {
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
        userId: session.user.id,
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

    return NextResponse.json(
      {
        message: "Visit request berhasil dibuat.",
        data: createdVisitRequest,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/visit-request error:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan permintaan appointment." },
      { status: 500 },
    );
  }
}