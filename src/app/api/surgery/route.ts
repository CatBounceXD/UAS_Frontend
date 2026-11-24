import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getAllSurgeriesByUserId } from "@/features/surgery/queries";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const rows = await getAllSurgeriesByUserId(session.user.id);
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching surgeries:", error);
    return NextResponse.json(
      { error: "Gagal memuat data surgery dari database." },
      { status: 500 },
    );
  }
}
