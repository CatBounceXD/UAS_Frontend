import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { surgeries } from "@/db/surgery.schema";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const [record] = await db
      .select()
      .from(surgeries)
      .where(eq(surgeries.id, numericId));

    if (!record) {
      return NextResponse.json(
        { error: "Data surgery tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: record });
  } catch (error) {
    console.error("Error fetching surgery detail:", error);
    return NextResponse.json(
      { error: "Gagal memuat detail surgery." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await context.params;
    const numericId = Number(id);

    if (Number.isNaN(numericId)) {
      return NextResponse.json({ error: "ID tidak valid." }, { status: 400 });
    }

    const body = (await request.json()) as {
      status?: string;
      cancelReason?: string;
    };

    if (!body.status || !["Active", "Completed", "Canceled"].includes(body.status)) {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 },
      );
    }

    const [updated] = await db
      .update(surgeries)
      .set({
        status: body.status,
        cancelReason:
          body.status === "Canceled" ? (body.cancelReason ?? null) : null,
      })
      .where(eq(surgeries.id, numericId))
      .returning();

    if (!updated) {
      return NextResponse.json(
        { error: "Data surgery tidak ditemukan." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("Error updating surgery status:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui status surgery." },
      { status: 500 },
    );
  }
}