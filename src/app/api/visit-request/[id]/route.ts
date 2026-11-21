import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { insurances, patients, visitRequests } from "@/db/schema";
import { auth } from "@/lib/auth";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const [row] = await db
      .select({
        visitRequest: visitRequests,
        patient: patients,
        insurance: insurances,
      })
      .from(visitRequests)
      .leftJoin(patients, eq(visitRequests.patientId, patients.id))
      .leftJoin(insurances, eq(visitRequests.insuranceId, insurances.id))
      .where(
        and(
          eq(visitRequests.id, numericId),
          eq(visitRequests.userId, session.user.id),
        ),
      );

    if (!row) {
      return NextResponse.json(
        { error: "Data appointment tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: {
        ...row.visitRequest,
        patient: row.patient,
        insurance: row.insurance,
      },
    });
  } catch (error) {
    console.error("GET /api/visit-requests/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal memuat detail visit request." },
      { status: 500 },
    );
  }
}

export async function PATCH(req: Request, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const numericId = Number(id);
    const body = (await req.json()) as { status?: string };

    const [updated] = await db
      .update(visitRequests)
      .set({
        status: body.status || "Canceled",
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(visitRequests.id, numericId),
          eq(visitRequests.userId, session.user.id),
        ),
      )
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Data appointment tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/visit-requests/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status appointment." },
      { status: 500 },
    );
  }
}

export async function DELETE(_req: Request, { params }: RouteContext) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const numericId = Number(id);

    const [deleted] = await db
      .delete(visitRequests)
      .where(
        and(
          eq(visitRequests.id, numericId),
          eq(visitRequests.userId, session.user.id),
        ),
      )
      .returning();

    if (!deleted) {
      return NextResponse.json(
        { error: "Data appointment tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: { status: "Canceled" } });
  } catch (error) {
    console.error("DELETE /api/visit-requests/[id] error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus appointment." },
      { status: 500 },
    );
  }
}