import { db } from "../index";
import { insurances, patients, user, visitRequests } from "../schema";

export async function seedVisitRequests() {
  const existingUsers = await db.select().from(user).limit(1);

  if (existingUsers.length === 0) {
    console.log(
      "Belum ada user terdaftar di tabel user, lewati seeding visit_requests.",
    );
    return;
  }

  const targetUser = existingUsers[0];

  console.log("Membersihkan data visit_requests lama...");
  await db.delete(visitRequests);

  const [samplePatient] = await db
    .insert(patients)
    .values({
      name: targetUser.name || "John Smith",
      email: targetUser.email || "john.smith@domain.com",
      dateOfBirth: "12-02-2001",
      addressLine1: "6033 Collins Inlet",
      addressLine2: "6033 Collins Inlet",
      city: "West Gina",
      state: "New York",
      zipcode: "70945",
      preferredContactMethod: "Home Phone",
      contactInfo: "278.268.6823 x36440",
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
      doctorId: 1,
      doctorName: "Dr. Darlene Robertson",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
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
      doctorId: 7,
      doctorName: "PETER C. NEFF",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
      preferredAppointmentTime: "Morning",
      urgency: "With in a Month",
      reasonForVisit:
        "Specialist referral consultation for comprehensive diagnostic imaging and treatment planning.",
      recommendationComment: defaultComment,
      referredByName: "Dr. Darlene Robertson",
      referredBySpecialty: "Heart Surgeon",
      referredByAvatarUrl:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
      status: "Referred",
      hasFamilyBadge: true,
    },
    {
      userId: targetUser.id,
      patientId: samplePatient.id,
      insuranceId: sampleInsurance.id,
      doctorId: 5,
      doctorName: "DR. HALLQUIST",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1594824813571-2153349aed06?w=150&auto=format&fit=crop&q=80",
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
      doctorId: 8,
      doctorName: "MATTHEW D. HNATOW",
      doctorSpecialty: "Heart Surgeon",
      doctorAvatarUrl:
        "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
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