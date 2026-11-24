import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  createVisitRequest,
  getVisitRequestsByUserId,
} from "@/features/visit-request/queries";
import type { VisitRequestPayload } from "@/features/visit-request/types";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await getVisitRequestsByUserId(session.user.id);
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

    const body = (await req.json()) as VisitRequestPayload;

    if (
      !body.name?.trim() ||
      !body.email?.trim() ||
      !body.dateOfBirth?.trim() ||
      !body.addressLine1?.trim() ||
      !body.city?.trim() ||
      !body.state?.trim() ||
      !body.zipcode?.trim() ||
      !body.contactInfo?.trim() ||
      !body.healthInsurancePlan?.trim() ||
      !body.healthInsuranceNumber?.trim() ||
      !body.reasonForVisit?.trim()
    ) {
      return NextResponse.json(
        {
          message:
            "Harap lengkapi seluruh data pasien, asuransi, dan alasan kunjungan.",
        },
        { status: 400 },
      );
    }

    const createdVisitRequest = await createVisitRequest(session.user.id, body);

    return NextResponse.json(
      {
        message: "Visit request berhasil dibuat.",
        data: createdVisitRequest,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/visit-request error:", error);

    if (
      error instanceof Error &&
      error.message ===
        "Dokter yang dipilih tidak ditemukan atau tidak tersedia."
    ) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Gagal menyimpan permintaan appointment." },
      { status: 500 },
    );
  }
}