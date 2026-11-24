import {
  date,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { visitRequests } from "./visit-request.schema";

export const checkIn = pgTable(
  "check_in",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    visitRequestId: integer("visit_request_id").references(
      () => visitRequests.id,
      { onDelete: "set null" },
    ),
    queueNumber: text("queue_number").notNull(),
    fullName: text("full_name").notNull(),
    birthDate: date("birth_date").notNull(),
    gender: text("gender").notNull(),
    phone: text("phone").notNull(),
    address: text("address").notNull(),
    complaint: text("complaint").notNull(),
    appointmentTime: text("appointment_time").notNull().default("09:00 AM"),
    room: text("room").notNull().default("201"),
    floor: integer("floor").notNull().default(2),
    status: text("status").notNull().default("approved"), // pending | approved | completed
    rating: integer("rating"),
    reviewComment: text("review_comment"),
    reviewedAt: timestamp("reviewed_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("check_in_userId_idx").on(table.userId),
    index("check_in_visitRequestId_idx").on(table.visitRequestId),
  ],
);
