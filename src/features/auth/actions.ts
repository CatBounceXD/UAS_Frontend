"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "@/db";
import { user } from "@/db/auth-schema";
import { auth } from "@/lib/auth";

export interface UpdateProfilePayload {
  name: string;
  phone?: string | null;
  dob?: string | null;
}

export async function updateProfileAction(
  payload: UpdateProfilePayload,
): Promise<{ ok: boolean; message: string }> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { ok: false, message: "Sesi tidak valid. Silakan login kembali." };
  }

  const trimmedName = payload.name.trim();
  if (!trimmedName) {
    return { ok: false, message: "Nama wajib diisi." };
  }

  await db
    .update(user)
    .set({
      name: trimmedName,
      phone: payload.phone?.trim() || null,
      dob: payload.dob?.trim() || null,
      updatedAt: new Date(),
    })
    .where(eq(user.id, session.user.id));

  revalidatePath("/", "layout");
  return { ok: true, message: "Profil berhasil disimpan." };
}