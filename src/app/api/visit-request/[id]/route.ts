import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { doctors, insurances, patients, visitRequests } from "@/db/schema";
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
      .where(
        and(
          eq(visitRequests.id, numericId),
          eq(visitRequests.userId, session.user.id),
        ),
      );

    if (!row) {
      return NextResponse.json(
        { error: "Data kunjungan tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: {
        ...row.visitRequest,
        patient: row.patient,
        insurance: row.insurance,
        doctor: row.doctor,
      },
    });
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

    const updatePayload: Partial<typeof visitRequests.$inferInsert> = {
      updatedAt: new Date(),
    };

    if (body.status) {
      if (!["Active", "Referred", "Completed", "Canceled"].includes(body.status)) {
        return NextResponse.json(
          { error: "Status tidak valid." },
          { status: 400 },
        );
      }
      updatePayload.status = body.status;
      if (body.status === "Canceled") {
        updatePayload.cancelReason = body.cancelReason ?? null;
      }
    }

    if (typeof body.rating === "number") {
      updatePayload.rating = body.rating;
    }

    if (typeof body.reviewComment === "string") {
      updatePayload.reviewComment = body.reviewComment;
    }

    const [updated] = await db
      .update(visitRequests)
      .set(updatePayload)
      .where(
        and(
          eq(visitRequests.id, numericId),
          eq(visitRequests.userId, session.user.id),
        ),
      )
      .returning();

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