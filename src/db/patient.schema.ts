import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  addressLine1: text("address_line1").notNull(),
  addressLine2: text("address_line2").default(""),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipcode: text("zipcode").notNull(),
  preferredContactMethod: text("preferred_contact_method").notNull(),
  contactInfo: text("contact_info").notNull(),
  referralSource: text("referral_source").default(""),
  ssn: text("ssn").default(""),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});