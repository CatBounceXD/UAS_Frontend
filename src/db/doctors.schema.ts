// Contoh DATABASE

import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const dokter = pgTable("dokterTEST", {
  id: serial("id").primaryKey(),
  nama: text("nama").notNull(),
  spesialis: text("spesialis").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
