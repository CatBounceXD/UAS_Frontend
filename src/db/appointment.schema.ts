import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { dokter } from "./doctors.schema";

export const appointment = pgTable("appointment", {
  id: text("id").primaryKey(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  doctorId: integer("doctor_id")
    .notNull()
    .references(() => dokter.id),

  appointmentDate: timestamp("appointment_date").notNull(),
  appointmentTime: text("appointment_time").notNull(),

  queueNumber: text("queue_number").notNull(),
  room: text("room").notNull(),
  floor: integer("floor").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
