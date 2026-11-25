import { hashPassword } from "better-auth/crypto";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { account, user } from "@/db/schema";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const name = String(body.name || "").trim();
    const password = String(body.password || "");
    const confirmPassword = String(body.confirmPassword || "");

    if (!email || !name || !password || !confirmPassword) {
      return NextResponse.json(
        { error: "Semua kolom wajib diisi." },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password harus memiliki minimal 8 karakter." },
        { status: 400 },
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Konfirmasi password tidak cocok." },
        { status: 400 },
      );
    }

    const [existingUser] = await db
      .select({ id: user.id, name: user.name })
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (
      !existingUser ||
      existingUser.name.trim().toLowerCase() !== name.toLowerCase()
    ) {
      return NextResponse.json(
        {
          error: "Email atau Full Name tidak cocok dengan akun yang terdaftar.",
        },
        { status: 404 },
      );
    }
    const hashedPassword = await hashPassword(password);
    const [updatedAccount] = await db
      .update(account)
      .set({
        password: hashedPassword,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(account.userId, existingUser.id),
          eq(account.providerId, "credential"),
        ),
      )
      .returning({ id: account.id });

    if (!updatedAccount) {
      return NextResponse.json(
        { error: "Akun kredensial tidak ditemukan untuk email ini." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      message: "Password berhasil diperbarui.",
    });
  } catch (error) {
    console.error("POST /api/reset-password error:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server. Silakan coba lagi." },
      { status: 500 },
    );
  }
}
