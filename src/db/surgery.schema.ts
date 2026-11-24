import {
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
import { visitRequests } from "./visit-request.schema";

export const surgeries = pgTable(
  "surgeries",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    visitRequestId: integer("visit_request_id").references(
      () => visitRequests.id,
      { onDelete: "set null" },
    ),
    patientId: integer("patient_id")
      .notNull()
      .references(() => patients.id, { onDelete: "cascade" }),
    insuranceId: integer("insurance_id").references(() => insurances.id, {
      onDelete: "set null",
    }),
    doctorId: integer("doctor_id")
      .notNull()
      .references(() => doctors.id, { onDelete: "restrict" }),
    procedureSpecialty: text("procedure_specialty").notNull(),
    status: text("status").notNull().default("Active"), // Active | Completed | Canceled
    recommendationComment: text("recommendation_comment"),
    suggestionNote: text("suggestion_note").notNull(),
    preferredAppointmentTime: text("preferred_appointment_time").notNull(),
    urgency: text("urgency").notNull(),
    reasonForVisit: text("reason_for_visit").notNull(),
    cancelReason: text("cancel_reason"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("surgeries_userId_idx").on(table.userId),
    index("surgeries_doctorId_idx").on(table.doctorId),
    index("surgeries_status_idx").on(table.status),
  ],
);
