import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/db";
import { surgeries } from "@/db/surgery.schema";

const INITIAL_SURGERIES = [
  {
    doctorName: "Dr. Darlene Robertson",
    doctorSpecialty: "Heart Surgeon",
    doctorAvatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    specialtySummary:
      "Dr. Darlene Robertson specializes in the treatment of cardiovascular and thoracic conditions and performs several surgical procedures including:",
    procedures: [
      "Coronary Artery Bypass",
      "Heart Valve Repair",
      "Minimally Invasive Cardiac Surgery",
      "Aortic Surgery",
    ],
    status: "Active",
    recommendationComment:
      "Patient shows stable preoperative cardiac markers. Recommended to proceed with scheduled minimally invasive evaluation and preoperative blood panel.",
    suggestionNote:
      "Preoperative echocardiogram and fasting lipid panel should be completed 48 hours prior to the scheduled surgical consultation.",
    patientName: "John Smith",
    patientEmail: "john.smith@domain.com",
    patientDob: "12-02-2001",
    addressLine1: "6033 Collins Inlet",
    addressLine2: "Suite 204",
    city: "West Gina",
    state: "New York",
    zipcode: "70945",
    contactInfo: "278.268.6823 x36440",
    referralSource: "Internet",
    preferredContactMethod: "Home Phone",
    ssn: "0 123 456 7890",
    isPolicyHolderSameAsPatient: true,
    policyHolderName: "John Smith",
    healthInsurancePlan: "BlueCross Comprehensive Care",
    healthInsuranceNumber: "0 123 456 789",
    groupNumber: "0 123 456 789",
    preferredAppointmentTime: "Morning",
    urgency: "With in a Month",
    reasonForVisit:
      "Follow-up surgical evaluation for persistent chest tightness during moderate exertion and review of recent stress test imaging.",
  },
  {
    doctorName: "PETER C. NEFF",
    doctorSpecialty: "Heart Surgeon",
    doctorAvatarUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
    specialtySummary:
      "Dr. Peter C. Neff specializes in vascular and cardiothoracic procedures and performs several surgical interventions including:",
    procedures: [
      "Endovascular Repair",
      "Valve Replacement",
      "Arrhythmia Surgery",
      "Thoracic Consultation",
    ],
    status: "Active",
    recommendationComment:
      "Continue current low-dose anticoagulation regimen until five days prior to procedure; anesthesia clearance has been requested.",
    suggestionNote:
      "Bring all recent ECG printouts and current medication list for preoperative surgical clearance review.",
    patientName: "John Smith",
    patientEmail: "john.smith@domain.com",
    patientDob: "12-02-2001",
    addressLine1: "6033 Collins Inlet",
    addressLine2: "Suite 204",
    city: "West Gina",
    state: "New York",
    zipcode: "70945",
    contactInfo: "278.268.6823 x36440",
    referralSource: "Doctor Referral",
    preferredContactMethod: "Home Phone",
    ssn: "0 123 456 7890",
    isPolicyHolderSameAsPatient: true,
    policyHolderName: "John Smith",
    healthInsurancePlan: "BlueCross Comprehensive Care",
    healthInsuranceNumber: "0 123 456 789",
    groupNumber: "0 123 456 789",
    preferredAppointmentTime: "Morning",
    urgency: "With in a Month",
    reasonForVisit:
      "Consultation regarding surgical repair options and recovery timeline following outpatient cardiology referral.",
  },
  {
    doctorName: "DR. HALLQUIST",
    doctorSpecialty: "Heart Surgeon",
    doctorAvatarUrl:
      "https://images.unsplash.com/photo-1594824813571-2153349aed06?w=150&auto=format&fit=crop&q=80",
    specialtySummary:
      "Dr. Hallquist specializes in minimally invasive surgical procedures and diagnostic interventions including:",
    procedures: [
      "Robotic-Assisted Surgery",
      "Arthroscopy",
      "Sports Medicine",
      "Joint Reconstruction",
    ],
    status: "Active",
    recommendationComment:
      "Imaging confirms localized structural strain; conservative physical therapy paired with outpatient surgical review is advised.",
    suggestionNote:
      "Avoid high-impact physical activity and complete baseline mobility assessment before the upcoming surgical appointment.",
    patientName: "John Smith",
    patientEmail: "john.smith@domain.com",
    patientDob: "12-02-2001",
    addressLine1: "6033 Collins Inlet",
    addressLine2: "Suite 204",
    city: "West Gina",
    state: "New York",
    zipcode: "70945",
    contactInfo: "278.268.6823 x36440",
    referralSource: "Internet",
    preferredContactMethod: "Home Phone",
    ssn: "0 123 456 7890",
    isPolicyHolderSameAsPatient: true,
    policyHolderName: "John Smith",
    healthInsurancePlan: "BlueCross Comprehensive Care",
    healthInsuranceNumber: "0 123 456 789",
    groupNumber: "0 123 456 789",
    preferredAppointmentTime: "Morning",
    urgency: "With in a Month",
    reasonForVisit:
      "Pre-surgical consultation and review of MRI findings to determine minimally invasive treatment schedule.",
  },
  {
    doctorName: "Richard Muldoone",
    doctorSpecialty: "Orthopaedic Surgeon",
    doctorAvatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    specialtySummary:
      "Dr. Muldoone specializes in the treatment of a variety of orthopaedic conditions and performs several orthopaedic procedures including:",
    procedures: [
      "Arthroscopy",
      "Sports Medicine",
      "Orthopaedic Trauma",
      "Joint Reconstruction",
      "Computer Navigation and Robotic Surgery",
    ],
    status: "Active",
    recommendationComment:
      "Candidate is cleared for outpatient arthroscopic procedure. Post-operative rehabilitation plan will begin within one week of surgery.",
    suggestionNote:
      "Fast after midnight on the evening prior to surgery and arrange transportation home following outpatient discharge.",
    patientName: "John Smith",
    patientEmail: "john.smith@domain.com",
    patientDob: "12-02-2001",
    addressLine1: "6033 Collins Inlet",
    addressLine2: "Suite 204",
    city: "West Gina",
    state: "New York",
    zipcode: "70945",
    contactInfo: "278.268.6823 x36440",
    referralSource: "Internet",
    preferredContactMethod: "Home Phone",
    ssn: "0 123 456 7890",
    isPolicyHolderSameAsPatient: true,
    policyHolderName: "John Smith",
    healthInsurancePlan: "BlueCross Comprehensive Care",
    healthInsuranceNumber: "0 123 456 789",
    groupNumber: "0 123 456 789",
    preferredAppointmentTime: "Morning",
    urgency: "Next Available",
    reasonForVisit:
      "Comprehensive orthopaedic surgical evaluation and scheduling for robotic-assisted joint reconstruction.",
  },
];

export async function GET() {
  try {
    let rows = await db.select().from(surgeries).orderBy(asc(surgeries.id));

    if (rows.length === 0) {
      await db.insert(surgeries).values(INITIAL_SURGERIES);
      rows = await db.select().from(surgeries).orderBy(asc(surgeries.id));
    }

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching surgeries:", error);
    return NextResponse.json(
      { error: "Gagal memuat data surgery dari database." },
      { status: 500 },
    );
  }
}