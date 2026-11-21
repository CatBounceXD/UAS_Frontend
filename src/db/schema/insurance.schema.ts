import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { patients } from "./patient.schema";

export const insurances = pgTable("insurances", {
  id: serial("id").primaryKey(),
  patientId: integer("patient_id").references(() => patients.id, {
    onDelete: "cascade",
  }),
  isPolicyHolderSameAsPatient: boolean("is_policy_holder_same_as_patient")
    .notNull()
    .default(true),
  policyHolderName: text("policy_holder_name").notNull(),
  healthInsurancePlan: text("health_insurance_plan").notNull(),
  healthInsuranceNumber: text("health_insurance_number").notNull(),
  groupNumber: text("group_number").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});