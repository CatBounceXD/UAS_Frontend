import { NextResponse } from "next/server";
import { getAllSurgeries } from "@/features/surgery/queries";

export async function GET() {
  try {
    const rows = await getAllSurgeries();
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching surgeries:", error);
    return NextResponse.json(
      { error: "Gagal memuat data surgery dari database." },
      { status: 500 },
    );
  }
}