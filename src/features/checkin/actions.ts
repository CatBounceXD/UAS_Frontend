"use server";

import { and, count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { db } from "@/db";
import { checkIn } from "@/db/schema";
import { auth } from "@/lib/auth";

type CheckInData = {
  fullName: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  complaint: string;
  visitRequestId?: number;
};

export async function createCheckIn(data: CheckInData) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false as const,
        message: "Sesi berakhir. Login kembali untuk check-in.",
      };
    }

    const [{ total }] = await db.select({ total: count() }).from(checkIn);
    const queueNumber = `A${String(total + 1).padStart(3, "0")}`;

    const [result] = await db
      .insert(checkIn)
      .values({
        userId: session.user.id,
        visitRequestId: data.visitRequestId ?? null,
        queueNumber,
        fullName: data.fullName,
        birthDate: data.birthDate,
        gender: data.gender,
        phone: data.phone,
        address: data.address,
        complaint: data.complaint,
        appointmentTime: "09:00 AM",
        room: "201",
        floor: 2,
      })
      .returning({
        id: checkIn.id,
        queueNumber: checkIn.queueNumber,
        appointmentTime: checkIn.appointmentTime,
        room: checkIn.room,
        floor: checkIn.floor,
      });

    return {
      success: true as const,
      id: result.id,
      queueNumber: result.queueNumber,
      appointmentTime: result.appointmentTime,
      room: result.room,
      floor: result.floor,
    };
  } catch (error) {
    console.error("Gagal menyimpan check-in:", error);

    return {
      success: false as const,
      message: "Data check-in gagal disimpan.",
    };
  }
}

export async function submitCheckInReview(
  checkInId: number,
  rating: number,
  reviewComment: string,
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return {
        success: false as const,
        message: "Sesi tidak valid. Silakan login kembali.",
      };
    }

    if (rating < 1 || rating > 5) {
      return {
        success: false as const,
        message: "Rating harus antara 1 sampai 5.",
      };
    }

    const [updated] = await db
      .update(checkIn)
      .set({
        rating,
        reviewComment: reviewComment.trim(),
        status: "completed",
        reviewedAt: new Date(),
      })
      .where(
        and(eq(checkIn.id, checkInId), eq(checkIn.userId, session.user.id)),
      )
      .returning({ id: checkIn.id });

    if (!updated) {
      return {
        success: false as const,
        message: "Data check-in tidak ditemukan.",
      };
    }

    return { success: true as const };
  } catch (error) {
    console.error("Gagal menyimpan ulasan check-in:", error);
    return {
      success: false as const,
      message: "Ulasan gagal disimpan.",
    };
  }
}