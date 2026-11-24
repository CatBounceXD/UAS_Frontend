import { headers } from "next/headers";
import { NextResponse } from "next/server";
import {
  getVisitRequestDetailById,
  updateVisitRequestById,
} from "@/features/visit-request/queries";
import { auth } from "@/lib/auth";

const ALLOWED_STATUSES = [
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
  "Referred",
] as const;

type AllowedStatus = (typeof ALLOWED_STATUSES)[number];

function parseNumericId(rawId: string): number | null {
  const parsed = Number(rawId);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null;
  }
  return parsed;
}

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const visitRequestId = parseNumericId(id);
  if (!visitRequestId) {
    return NextResponse.json(
      { error: "ID visit request tidak valid." },
      { status: 400 },
    );
  }

  const detail = await getVisitRequestDetailById(
    visitRequestId,
    session.user.id,
  );

  if (!detail) {
    return NextResponse.json(
      { error: "Visit request tidak ditemukan." },
      { status: 404 },
    );
  }

  return NextResponse.json({ data: detail });
}

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const visitRequestId = parseNumericId(id);
  if (!visitRequestId) {
    return NextResponse.json(
      { error: "ID visit request tidak valid." },
      { status: 400 },
    );
  }

  let body: Record<string, unknown>;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Format JSON tidak valid." },
      { status: 400 },
    );
  }

  if (body.rating !== undefined) {
    if (
      typeof body.rating !== "number" ||
      !Number.isInteger(body.rating) ||
      body.rating < 1 ||
      body.rating > 5
    ) {
      return NextResponse.json(
        { error: "Rating harus berupa bilangan bulat antara 1 hingga 5." },
        { status: 400 },
      );
    }
  }

  if (
    body.status !== undefined &&
    (typeof body.status !== "string" ||
      !ALLOWED_STATUSES.includes(body.status as AllowedStatus))
  ) {
    return NextResponse.json(
      { error: "Status kunjungan tidak valid." },
      { status: 400 },
    );
  }

  if (
    body.reviewComment !== undefined &&
    typeof body.reviewComment !== "string"
  ) {
    return NextResponse.json(
      { error: "Komentar ulasan harus berupa teks." },
      { status: 400 },
    );
  }

  try {
    const updated = await updateVisitRequestById(
      visitRequestId,
      session.user.id,
      {
        status: body.status as AllowedStatus | undefined,
        rating: body.rating as number | undefined,
        reviewComment: body.reviewComment as string | undefined,
        preferredAppointmentTime:
          typeof body.preferredAppointmentTime === "string"
            ? body.preferredAppointmentTime
            : undefined,
        urgency: typeof body.urgency === "string" ? body.urgency : undefined,
        reasonForVisit:
          typeof body.reasonForVisit === "string"
            ? body.reasonForVisit
            : undefined,
      },
    );

    if (!updated) {
      return NextResponse.json(
        { error: "Visit request tidak ditemukan atau akses ditolak." },
        { status: 404 },
      );
    }

    return NextResponse.json({ data: updated });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Gagal memperbarui visit request.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}