
import {
  pgTable,
  serial,
  text,
  timestamp,
  date,
  integer,
} from "drizzle-orm/pg-core";

export const checkIn = pgTable("check_in", {
  id: serial("id").primaryKey(),

  fullName: text("full_name").notNull(),
  birthDate: date("birth_date").notNull(),
  gender: text("gender").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  complaint: text("complaint").notNull(),

  appointmentTime: text("appointment_time")
    .notNull()
    .default("09:00 AM"),

  room: text("room").notNull().default("201"),
  floor: integer("floor").notNull().default(2),

  status: text("status").notNull().default("approved"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
