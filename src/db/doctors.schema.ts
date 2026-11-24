import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const doctors = pgTable(
  "doctors",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    specialty: text("specialty").notNull(),
    bio: text("bio").notNull(),
    avatarUrl: text("avatar_url").notNull(),
    rating: integer("rating").notNull().default(5),
    specialtySummary: text("specialty_summary").notNull(),
    procedures: jsonb("procedures").$type<string[]>().notNull().default([]),
    education: jsonb("education")
      .$type<{ undergraduate: string; medical: string }>()
      .notNull(),
    training: jsonb("training").$type<{ residency: string }>().notNull(),
    affiliations: jsonb("affiliations")
      .$type<{
        hospital: string[];
        professional: string[];
        team: string[];
      }>()
      .notNull(),
    aboutParagraphs: jsonb("about_paragraphs")
      .$type<string[]>()
      .notNull()
      .default([]),
    certificates: jsonb("certificates")
      .$type<{ id: string; title: string; issuer: string }[]>()
      .notNull()
      .default([]),
    media: jsonb("media")
      .$type<{ id: string; title: string; description: string }[]>()
      .notNull()
      .default([]),
    contactEmail: text("contact_email").notNull(),
    contactPhone: text("contact_phone").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("doctors_specialty_idx").on(table.specialty)],
);
