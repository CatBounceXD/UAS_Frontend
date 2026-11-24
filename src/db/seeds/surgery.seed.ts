import { asc } from "drizzle-orm";
import { db } from "../index";
import { doctors, surgeries } from "../schema";

const SURGEON_SPECIALTY_MAP: Record<string, string> = {
  "Heart Surgeon": "Heart Surgeon",
  Cardiologists: "Cardiac Surgeon",
  Anesthesiologists: "Surgical Anesthesiologist",
  Dermatologists: "Dermatologic Surgeon",
  Ophthalmologists: "Ophthalmic Surgeon",
  Neurologists: "Neurosurgeon",
  Endocrinologists: "Endocrine Surgeon",
};

function toSurgeonSpecialty(specialty: string): string {
  if (SURGEON_SPECIALTY_MAP[specialty]) {
    return SURGEON_SPECIALTY_MAP[specialty];
  }
  if (specialty.toLowerCase().includes("surgeon")) {
    return specialty;
  }
  return `${specialty.replace(/ists$/i, "ic")} Surgeon`;
}

const SURGERY_CASES = [
  {
    status: "Active",
    recommendationComment:
      "Patient shows stable preoperative markers. Recommended to proceed with scheduled minimally invasive surgical evaluation and preoperative lab panel.",
    suggestionNote:
      "Preoperative diagnostic imaging and fasting blood panel should be completed 48 hours prior to the scheduled surgical consultation.",
    preferredAppointmentTime: "Morning",
    urgency: "With in a Month",
    reasonForVisit:
      "Follow-up surgical evaluation for persistent symptoms during moderate exertion and review of recent diagnostic imaging.",
  },
  {
    status: "Active",
    recommendationComment:
      "Continue current preoperative medication regimen until five days prior to procedure; anesthesia clearance has been requested.",
    suggestionNote:
      "Bring all recent diagnostic test printouts and current medication list for preoperative surgical clearance review.",
    preferredAppointmentTime: "Morning",
    urgency: "With in a Month",
    reasonForVisit:
      "Consultation regarding surgical repair options and recovery timeline following outpatient specialist referral.",
  },
  {
    status: "Active",
    recommendationComment:
      "Imaging confirms localized condition; conservative preparation paired with outpatient surgical review is advised.",
    suggestionNote:
      "Avoid strenuous physical activity and complete baseline clinical assessment before the upcoming surgical appointment.",
    preferredAppointmentTime: "Morning",
    urgency: "With in a Month",
    reasonForVisit:
      "Pre-surgical consultation and review of scan findings to determine minimally invasive treatment schedule.",
  },
  {
    status: "Active",
    recommendationComment:
      "Candidate is cleared for outpatient surgical procedure. Post-operative rehabilitation plan will begin within one week of surgery.",
    suggestionNote:
      "Fast after midnight on the evening prior to surgery and arrange transportation home following outpatient discharge.",
    preferredAppointmentTime: "Morning",
    urgency: "Next Available",
    reasonForVisit:
      "Comprehensive surgical evaluation and scheduling for minimally invasive specialist procedure.",
  },
  {
    status: "Completed",
    recommendationComment:
      "Post-operative recovery progressing well with clean incision healing. Continue prescribed recovery protocol.",
    suggestionNote:
      "Schedule routine post-operative check-up in two weeks and continue prescribed medications.",
    preferredAppointmentTime: "Morning",
    urgency: "Routine",
    reasonForVisit:
      "Post-surgical follow-up consultation and evaluation of recovery progress.",
  },
  {
    status: "Active",
    recommendationComment:
      "Preoperative neurological and clinical screening completed. Cleared to proceed with scheduled surgical intervention.",
    suggestionNote:
      "Complete preoperative blood work 24 hours before admission and follow pre-surgery dietary guidelines.",
    preferredAppointmentTime: "Afternoon",
    urgency: "With in a Month",
    reasonForVisit:
      "Specialist surgical consultation and treatment planning based on recent clinical evaluation.",
  },
];

export async function seedSurgeries() {
  const existingDoctors = await db
    .select()
    .from(doctors)
    .orderBy(asc(doctors.id))
    .limit(SURGERY_CASES.length);

  if (existingDoctors.length === 0) {
    console.log(
      "Belum ada data dokter di tabel doctors, lewati seeding surgeries.",
    );
    return;
  }

  console.log("Membersihkan data surgeries lama...");
  await db.delete(surgeries);

  const surgeryRows = existingDoctors.map((doc, index) => {
    const template = SURGERY_CASES[index % SURGERY_CASES.length];
    return {
      doctorId: doc.id,
      doctorName: doc.name,
      doctorSpecialty: toSurgeonSpecialty(doc.specialty),
      doctorAvatarUrl: doc.avatarUrl,
      specialtySummary: doc.specialtySummary,
      procedures: doc.procedures,
      status: template.status,
      recommendationComment: template.recommendationComment,
      suggestionNote: template.suggestionNote,
      patientName: "John Smith",
      patientEmail: "john.smith@domain.com",
      patientDob: "12-02-2001",
      addressLine1: "6033 Collins Inlet",
      addressLine2: "Suite 204",
      city: "West Gina",
      state: "New York",
      zipcode: "70945",
      contactInfo: "278.268.6823 x36440",
      referralSource: index % 2 === 0 ? "Internet" : "Doctor Referral",
      preferredContactMethod: "Home Phone",
      ssn: "0 123 456 7890",
      isPolicyHolderSameAsPatient: true,
      policyHolderName: "John Smith",
      healthInsurancePlan: "BlueCross Comprehensive Care",
      healthInsuranceNumber: "0 123 456 789",
      groupNumber: "0 123 456 789",
      preferredAppointmentTime: template.preferredAppointmentTime,
      urgency: template.urgency,
      reasonForVisit: template.reasonForVisit,
    };
  });

  console.log(
    `Memasukkan ${surgeryRows.length} data surgeries yang terhubung ke doctors...`,
  );
  await db.insert(surgeries).values(surgeryRows);
}
