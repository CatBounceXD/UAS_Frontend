import { desc, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { insurances, patients, visitRequests } from "@/db/schema";
import { DOCTORS_DATA, type VisitRequestPayload } from "@/lib/api";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await db
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

    const data = rows.map(({ visitRequest, patient, insurance }) => ({
      ...visitRequest,
      patient,
      insurance,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/visit-requests error:", error);
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

    const matchedDoctor =
      DOCTORS_DATA.find((d) => d.id === body.doctorId) ??
      DOCTORS_DATA.find(
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
    console.error("POST /api/visit-requests error:", error);
    return NextResponse.json(
      { message: "Gagal menyimpan permintaan appointment." },
      { status: 500 },
    );
  }
}
