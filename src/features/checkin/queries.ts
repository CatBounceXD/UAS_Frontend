import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { checkIn } from "@/db/schema";

export type CheckInRecord = typeof checkIn.$inferSelect;

export async function getCheckInsByUserId(
  userId: string,
): Promise<CheckInRecord[]> {
  return db
    .select()
    .from(checkIn)
    .where(eq(checkIn.userId, userId))
    .orderBy(desc(checkIn.createdAt));
}