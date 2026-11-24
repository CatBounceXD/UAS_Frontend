import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  getVisitRequestDetailById,
  updateVisitRequestById,
} from "@/features/visit-request/queries";
import { auth } from "@/lib/auth";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const data = await getVisitRequestDetailById(numericId, session.user.id);

    if (!data) {
      return NextResponse.json(
        { error: "Data kunjungan tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("GET /api/visit-request/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal memuat detail kunjungan." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const body = (await request.json()) as {
      status?: string;
      cancelReason?: string;
      rating?: number;
      reviewComment?: string;
    };

    if (
      body.status &&
      !["Active", "Referred", "Completed", "Canceled"].includes(body.status)
    ) {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 },
      );
    }

    const updated = await updateVisitRequestById(
      numericId,
      session.user.id,
      body,
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Data kunjungan tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/visit-request/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui data kunjungan." },
      { status: 500 },
    );
  }
}