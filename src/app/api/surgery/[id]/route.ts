import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  getSurgeryById,
  updateSurgeryStatus,
} from "@/features/surgery/queries";
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

    const record = await getSurgeryById(numericId, session.user.id);

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
    };

    if (
      !body.status ||
      !["Active", "Completed", "Canceled"].includes(body.status)
    ) {
      return NextResponse.json(
        { error: "Status tidak valid." },
        { status: 400 },
      );
    }

    const updated = await updateSurgeryStatus(
      numericId,
      session.user.id,
      body.status,
      body.cancelReason,
    );

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
