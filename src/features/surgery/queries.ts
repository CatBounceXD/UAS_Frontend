import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { surgeries } from "@/db/schema";

export type SurgeryRecord = typeof surgeries.$inferSelect;

export async function getAllSurgeries(): Promise<SurgeryRecord[]> {
  return db.select().from(surgeries).orderBy(asc(surgeries.id));
}

export async function getSurgeryById(
  id: number,
): Promise<SurgeryRecord | null> {
  const [record] = await db
    .select()
    .from(surgeries)
    .where(eq(surgeries.id, id))
    .limit(1);

  return record ?? null;
}

export async function updateSurgeryStatus(
  id: number,
  status: string,
  cancelReason?: string | null,
): Promise<SurgeryRecord | null> {
  const [updated] = await db
    .update(surgeries)
    .set({
      status,
      cancelReason: status === "Canceled" ? (cancelReason ?? null) : null,
    })
    .where(eq(surgeries.id, id))
    .returning();

  return updated ?? null;
}