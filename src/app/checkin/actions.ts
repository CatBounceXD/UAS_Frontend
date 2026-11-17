
"use server";

import { db } from "@/db";
import { checkIn } from "@/db/schema";

type CheckInData = {
  fullName: string;
  birthDate: string;
  gender: string;
  phone: string;
  address: string;
  complaint: string;
};

export async function createCheckIn(data: CheckInData) {
  try {
    const [result] = await db
      .insert(checkIn)
      .values({
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
        appointmentTime: checkIn.appointmentTime,
        room: checkIn.room,
        floor: checkIn.floor,
      });

    const queueNumber = `A${String(result.id).padStart(3, "0")}`;

    return {
      success: true as const,
      id: result.id,
      queueNumber,
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
