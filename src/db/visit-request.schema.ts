import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { insurances } from "./insurance.schema";
import { patients } from "./patient.schema";

export const visitRequests = pgTable("visit_requests", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id")
    .notNull()
    .references(() => patients.id, { onDelete: "cascade" }),
  insuranceId: integer("insurance_id").references(() => insurances.id, {
    onDelete: "set null",
  }),
  doctorId: integer("doctor_id").notNull(),
  doctorName: text("doctor_name").notNull(),
  doctorSpecialty: text("doctor_specialty").notNull(),
  doctorAvatarUrl: text("doctor_avatar_url").notNull(),
  preferredAppointmentTime: text("preferred_appointment_time").notNull(),
  urgency: text("urgency").notNull(),
  reasonForVisit: text("reason_for_visit").notNull(),
  status: text("status").notNull().default("Active"),
  rating: integer("rating"),
  hasFamilyBadge: boolean("has_family_badge").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
