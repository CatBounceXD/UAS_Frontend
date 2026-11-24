import { db } from "../index";
import {
  type doctors,
  insurances,
  patients,
  user,
  visitRequests,
} from "../schema";

type DoctorRow = typeof doctors.$inferSelect;

export async function seedVisitRequests(doctorList: DoctorRow[]) {
  const existingUsers = await db.select().from(user).limit(1);

  if (existingUsers.length === 0) {
    console.log(
      "Belum ada user terdaftar di tabel user, lewati seeding visit_requests.",
    );
    return;
  }

  if (doctorList.length === 0) {
    console.log("Belum ada dokter, lewati seeding visit_requests.");
    return;
  }

  const findDoctor = (name: string, fallbackIndex: number) =>
    doctorList.find((d) => d.name.toLowerCase() === name.toLowerCase()) ??
    doctorList[fallbackIndex % doctorList.length];

  const doc1 = findDoctor("Dr. Darlene Robertson", 0);
  const doc2 = findDoctor("PETER C. NEFF", 6);
  const doc3 = findDoctor("DR. HALLQUIST", 4);
  const doc4 = findDoctor("MATTHEW D. HNATOW", 7);

  const targetUser = existingUsers[0];

  const [samplePatient] = await db
    .insert(patients)
    .values({
      userId: targetUser.id,
      name: targetUser.name || "John Smith",
      email: targetUser.email || "john.smith@domain.com",
      dateOfBirth: targetUser.dob || "12-02-2001",
      addressLine1: "6033 Collins Inlet",
      addressLine2: "Apt 4B",
      city: "West Gina",
      state: "New York",
      zipcode: "70945",
      preferredContactMethod: "Home Phone",
      contactInfo: targetUser.phone || "278.268.6823 x36440",
      referralSource: "Internet",
      ssn: "0 123 456 7890",
    })
    .returning();

  const [sampleInsurance] = await db
    .insert(insurances)
    .values({
      patientId: samplePatient.id,
      isPolicyHolderSameAsPatient: true,
      policyHolderName: targetUser.name || "John Smith",
      healthInsurancePlan: "BlueCross Comprehensive Care",
      healthInsuranceNumber: "0 123 456 789",
      groupNumber: "0 123 456 789",
    })
    .returning();

  const defaultComment =
    "Patient responded well to initial clinical assessment. Continue prescribed medication and follow up with routine diagnostic monitoring as scheduled.";

  console.log("Memasukkan data visit_requests ke Neon...");
  await db.insert(visitRequests).values([
    {
      userId: targetUser.id,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: doc1.id,
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Routine cardiovascular consultation and evaluation of recent blood pressure and ECG readings.",
      recommendationComment: defaultComment,
      status: "Active",
      hasFamilyBadge: false,
    },
    {
      userId: targetUser.id,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: doc2.id,
      referredByDoctorId: doc1.id,
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Specialist referral consultation for comprehensive diagnostic imaging and treatment planning.",
      recommendationComment: defaultComment,
      status: "Referred",
      hasFamilyBadge: true,
    },
    {
      userId: targetUser.id,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: doc3.id,
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Outpatient clinical consultation and follow-up wellness screening.",
      recommendationComment: defaultComment,
      reviewComment:
        "Very thorough explanation of the diagnosis and clear step-by-step recovery guidance.",
      rating: 4,
      status: "Completed",
      hasFamilyBadge: false,
    },
    {
      userId: targetUser.id,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: doc4.id,
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Post-treatment follow-up and review of laboratory test results.",
      recommendationComment: defaultComment,
      reviewComment:
        "Friendly clinical staff and punctual appointment schedule.",
      rating: 4,
      status: "Completed",
      hasFamilyBadge: false,
    },
  ]);
}