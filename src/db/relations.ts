import { relations } from "drizzle-orm";
import { account, session, user } from "./auth-schema";
import { checkIn } from "./check-in.schema";
import { doctors } from "./doctors.schema";
import { insurances } from "./insurance.schema";
import { patients } from "./patient.schema";
import { articleComments, articles } from "./resource.schema";
import { surgeries } from "./surgery.schema";
import { visitRequests } from "./visit-request.schema";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  patients: many(patients),
  visitRequests: many(visitRequests),
  surgeries: many(surgeries),
  checkIns: many(checkIn),
  articleComments: many(articleComments),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const doctorsRelations = relations(doctors, ({ many }) => ({
  visitRequests: many(visitRequests, { relationName: "assignedDoctor" }),
  referredVisitRequests: many(visitRequests, {
    relationName: "referringDoctor",
  }),
  surgeries: many(surgeries),
}));

export const patientsRelations = relations(patients, ({ one, many }) => ({
  user: one(user, {
    fields: [patients.userId],
    references: [user.id],
  }),
  insurances: many(insurances),
  visitRequests: many(visitRequests),
  surgeries: many(surgeries),
}));

export const insurancesRelations = relations(insurances, ({ one, many }) => ({
  patient: one(patients, {
    fields: [insurances.patientId],
    references: [patients.id],
  }),
  visitRequests: many(visitRequests),
  surgeries: many(surgeries),
}));

export const visitRequestsRelations = relations(
  visitRequests,
  ({ one, many }) => ({
    user: one(user, {
      fields: [visitRequests.userId],
      references: [user.id],
    }),
    patient: one(patients, {
      fields: [visitRequests.patientId],
      references: [patients.id],
    }),
    insurance: one(insurances, {
      fields: [visitRequests.insuranceId],
      references: [insurances.id],
    }),
    doctor: one(doctors, {
      fields: [visitRequests.doctorId],
      references: [doctors.id],
      relationName: "assignedDoctor",
    }),
    referredByDoctor: one(doctors, {
      fields: [visitRequests.referredByDoctorId],
      references: [doctors.id],
      relationName: "referringDoctor",
    }),
    surgeries: many(surgeries),
    checkIns: many(checkIn),
  }),
);

export const surgeriesRelations = relations(surgeries, ({ one }) => ({
  user: one(user, {
    fields: [surgeries.userId],
    references: [user.id],
  }),
  visitRequest: one(visitRequests, {
    fields: [surgeries.visitRequestId],
    references: [visitRequests.id],
  }),
  patient: one(patients, {
    fields: [surgeries.patientId],
    references: [patients.id],
  }),
  insurance: one(insurances, {
    fields: [surgeries.insuranceId],
    references: [insurances.id],
  }),
  doctor: one(doctors, {
    fields: [surgeries.doctorId],
    references: [doctors.id],
  }),
}));

export const checkInRelations = relations(checkIn, ({ one }) => ({
  user: one(user, {
    fields: [checkIn.userId],
    references: [user.id],
  }),
  visitRequest: one(visitRequests, {
    fields: [checkIn.visitRequestId],
    references: [visitRequests.id],
  }),
}));

export const articlesRelations = relations(articles, ({ many }) => ({
  comments: many(articleComments),
}));

export const articleCommentsRelations = relations(
  articleComments,
  ({ one }) => ({
    article: one(articles, {
      fields: [articleComments.articleId],
      references: [articles.id],
    }),
    user: one(user, {
      fields: [articleComments.userId],
      references: [user.id],
    }),
  }),
);