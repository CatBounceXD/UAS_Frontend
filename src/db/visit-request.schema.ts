import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { doctors } from "./doctors.schema";
import { insurances } from "./insurance.schema";
import { patients } from "./patient.schema";

export const visitRequests = pgTable(
  "visit_requests",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    patientId: integer("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    insuranceId: integer("insurance_id").references(() => insurances.id, {
      onDelete: "set null",
    }),
    doctorId: integer("doctor_id")
      .notNull()
      .references(() => doctors.id, { onDelete: "restrict" }),
    referredByDoctorId: integer("referred_by_doctor_id").references(
      () => doctors.id,
      { onDelete: "set null" },
    ),
    preferredAppointmentTime: text("preferred_appointment_time").notNull(),
    urgency: text("urgency").notNull(),
    reasonForVisit: text("reason_for_visit").notNull(),
    status: text("status").notNull().default("Active"), // Active | Referred | Completed | Canceled
    rating: integer("rating"),
    reviewComment: text("review_comment"),
    recommendationComment: text("recommendation_comment"),
    cancelReason: text("cancel_reason"),
    hasFamilyBadge: boolean("has_family_badge").notNull().default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("visit_requests_userId_idx").on(table.userId),
    index("visit_requests_doctorId_idx").on(table.doctorId),
    index("visit_requests_status_idx").on(table.status),
  ],
);
