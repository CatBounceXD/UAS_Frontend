import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  createVisitRequest,
  getVisitRequestsByUserId,
} from "@/features/visit-request/queries";
import type { VisitRequestPayload } from "@/lib/api";
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

    const body = (await req.json()) as VisitRequestPayload & {
      doctorId?: number;
    };

    if (!body.name || !body.email || !body.reasonForVisit) {
      return NextResponse.json(
        { message: "Nama, email, dan alasan kunjungan wajib diisi." },
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
    return NextResponse.json(
      { message: "Gagal menyimpan permintaan appointment." },
      { status: 500 },
    );
  }
}