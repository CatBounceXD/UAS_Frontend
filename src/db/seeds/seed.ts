import { db } from "../index";
import {
  checkIn,
  doctors,
  insurances,
  patients,
  surgeries,
  visitRequests,
} from "../schema";
import { seedResources } from "./resource.seed";
import { seedSurgeries } from "./surgery.seed";
import { seedVisitRequests } from "./visit-request.seed";

const DEFAULT_EDUCATION = {
  undergraduate: "University of Notre Dame, South Bend, IN.",
  medical: "Case Western Reserve University, Cleveland, OH",
};

const DEFAULT_TRAINING = {
  residency:
    "University of Texas at Houston, Department of Health Sciences, Houston, TX.",
};

const DEFAULT_AFFILIATIONS = {
  hospital: [
    "Christus Spohn South Hospital",
    "Doctor's Regional Medical Center",
    "South Texas Surgical Hospital",
    "CCOPS",
  ],
  professional: [
    "Nueces County Medical Society",
    "Texas Medical Association",
    "American Medical Association",
  ],
  team: [
    "Corpus Christi Hooks",
    "Texas A&M University in Corpus Christi",
    "Texas A&M University in Kingsville",
  ],
};

const DEFAULT_CERTIFICATES = [
  {
    id: "cert-1",
    title: "Certificate of Completion",
    issuer: "American Board of Medical Specialties",
  },
  {
    id: "cert-2",
    title: "Clinical Fellowship",
    issuer: "Texas Medical Association",
  },
  {
    id: "cert-3",
    title: "Certificate of Appreciation",
    issuer: "South Texas Medical Center",
  },
  {
    id: "cert-4",
    title: "Board Certification",
    issuer: "National Board of Physicians",
  },
  {
    id: "cert-5",
    title: "Advanced Surgical Care",
    issuer: "Medical Excellence Institute",
  },
];

const DEFAULT_MEDIA = [
  {
    id: "media-1",
    title: "Patient Care & Consultation",
    description: "Learn more about modern clinical procedures and recovery",
  },
  {
    id: "media-2",
    title: "Minimally Invasive Treatment",
    description: "Overview of diagnostic and outpatient care options",
  },
  {
    id: "media-3",
    title: "Preventive Health Guide",
    description: "Tips and protocols for long-term patient wellness",
  },
  {
    id: "media-4",
    title: "Post-Treatment Rehabilitation",
    description: "Step-by-step recovery plan with our clinical team",
  },
  {
    id: "media-5",
    title: "Medical Technology Overview",
    description: "How precision diagnostics improve patient outcomes",
  },
];

const SEED_DOCTORS = [
  {
    name: "Dr. Darlene Robertson",
    specialty: "Heart Surgeon",
    bio: "Dr. Darlene Robertson is a board-certified heart surgeon dedicated to delivering comprehensive cardiovascular care.",
    avatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    specialtySummary:
      "Specializes in cardiovascular and thoracic surgical procedures with a focus on minimally invasive heart care including:",
    procedures: [
      "Coronary Artery Bypass",
      "Heart Valve Repair",
      "Minimally Invasive Cardiac Surgery",
      "Aortic Surgery",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "Dr. Darlene Robertson is a board-certified heart surgeon dedicated to delivering comprehensive cardiovascular surgical care.",
      "She completed advanced fellowship training in cardiothoracic surgery and works closely with multidisciplinary teams to ensure optimal patient recovery.",
      "Dr. Darlene Robertson is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "darlene.robertson@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "DR. SCHLIMMER",
    specialty: "Cardiologists",
    bio: "A native of Portland, Texas, Dr. Schlimmer is a board-certified, fellowship-trained cardiovascular specialist...",
    avatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    rating: 4,
    specialtySummary:
      "Dr. Schlimmer specializes in the treatment of a variety of cardiovascular and clinical conditions and performs procedures including:",
    procedures: [
      "Interventional Cardiology",
      "Echocardiography",
      "Preventive Cardiology",
      "Heart Rhythm Management",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "A native of Portland, Texas, Dr. Schlimmer is a board-certified, fellowship-trained specialist who earned his medical degree and completed his residency at the University of Texas Health Science Center at San Antonio.",
      "He has staff memberships at South Texas Surgical Hospital, Christus Spohn South Hospital, Doctor's Regional Medical Center, and CCOPS.",
      "Dr. Schlimmer is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "dr.schlimmer@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "DR. PATTERSON",
    specialty: "Anesthesiologists",
    bio: "A native of Corpus Christi, Texas and a graduate of Ray High School, Dr. Patterson earned his medical...",
    avatarUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    specialtySummary:
      "Specializes in perioperative medicine, regional anesthesia, and acute pain management procedures including:",
    procedures: [
      "Regional Nerve Blocks",
      "Perioperative Care",
      "Pain Management",
      "Surgical Anesthesia",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "A native of Corpus Christi, Texas and a graduate of Ray High School, Dr. Patterson earned his medical degree with honors and specialized in anesthesiology and pain management.",
      "He focuses on patient comfort, safety, and rapid recovery across outpatient and inpatient surgical procedures.",
      "Dr. Patterson is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "dr.patterson@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "DR. CORDELL",
    specialty: "Dermatologists",
    bio: "Dr. Davin Cordell was born in the sunny state of Florida in Gainesville, but his family kept him moving...",
    avatarUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    rating: 4,
    specialtySummary:
      "Specializes in medical, surgical, and cosmetic dermatology treatments including:",
    procedures: [
      "Skin Cancer Screening",
      "Acne & Eczema Care",
      "Dermatologic Surgery",
      "Laser Skin Therapy",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "Dr. Davin Cordell was born in the sunny state of Florida in Gainesville and brings extensive experience in diagnosing and treating complex skin conditions.",
      "He is dedicated to preventive skin health and personalized dermatological treatment plans for patients of all ages.",
      "Dr. Cordell is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "dr.cordell@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "DR. HALLQUIST",
    specialty: "Ophthalmologists",
    bio: "Dr. April Hallquist is a board-certified, fellowship-trained ophthalmologist who was born and raised...",
    avatarUrl:
      "https://images.unsplash.com/photo-1594824813571-2153349aed06?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    specialtySummary:
      "Specializes in comprehensive eye care, cataract surgery, and retinal diagnostics including:",
    procedures: [
      "Cataract Surgery",
      "Glaucoma Management",
      "LASIK Consultation",
      "Retinal Care",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "Dr. April Hallquist is a board-certified, fellowship-trained specialist committed to preserving and restoring vision through modern ophthalmic techniques.",
      "She combines advanced diagnostic imaging with compassionate patient education to tailor every treatment plan.",
      "Dr. Hallquist is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "dr.hallquist@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "DR. COHN",
    specialty: "Neurologists",
    bio: "Dr. Cohn was born in San Antonio and raised in the Texas Hill Country. He received his undergraduate...",
    avatarUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80",
    rating: 4,
    specialtySummary:
      "Specializes in diagnosing and treating disorders of the brain, spine, and nervous system including:",
    procedures: [
      "Migraine & Headache Care",
      "Neuromuscular Diagnostics",
      "Stroke Prevention",
      "EEG & EMG Testing",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "Dr. Cohn was born in San Antonio and raised in the Texas Hill Country. He focuses on evidence-based neurological care for acute and chronic conditions.",
      "He works closely with physical therapists and primary care physicians to support long-term neurological wellness.",
      "Dr. Cohn is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "dr.cohn@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "PETER C. NEFF",
    specialty: "Endocrinologists",
    bio: "Dr. Neff was born and raised in Corpus Christi, Texas and attended Mary Carroll High School. After...",
    avatarUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    specialtySummary:
      "Specializes in hormone health, diabetes management, and metabolic disorders including:",
    procedures: [
      "Diabetes Care",
      "Thyroid Disorders",
      "Metabolic Health",
      "Bone & Calcium Disorders",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "Dr. Peter C. Neff was born and raised in Corpus Christi, Texas and attended Mary Carroll High School before pursuing medical training in endocrinology.",
      "He partners with patients to build sustainable management plans for thyroid conditions, diabetes, and metabolic wellness.",
      "Dr. Neff is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "peter.neff@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "MATTHEW D. HNATOW",
    specialty: "Neurologists",
    bio: 'Dr. Hnatow (pronounced "NATO") is a native of South Texas. Born in San Antonio and raised in Carrizo...',
    avatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
    rating: 4,
    specialtySummary:
      "Specializes in clinical neurology, movement disorders, and neuro-rehabilitation including:",
    procedures: [
      "Movement Disorders",
      "Neuropathy Care",
      "Cognitive Assessments",
      "Spine & Nerve Evaluation",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      'Dr. Matthew D. Hnatow (pronounced "NATO") is a native of South Texas, born in San Antonio and raised in Carrizo.',
      "He is committed to thorough diagnostic evaluation and personalized neurological treatment across South Texas communities.",
      "Dr. Hnatow is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "matthew.hnatow@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "EDWARD B. ZEY",
    specialty: "Dermatologists",
    bio: 'A native of Corpus Christi, Texas and a graduate of Richard King High School, Edward "Eb" earned...',
    avatarUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
    rating: 5,
    specialtySummary:
      "Specializes in clinical dermatology, preventive skin care, and minor dermatologic procedures including:",
    procedures: [
      "Full-Body Skin Exams",
      "Psoriasis Treatment",
      "Mole & Lesion Removal",
      "Sun Damage Prevention",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      'A native of Corpus Christi, Texas and a graduate of Richard King High School, Edward "Eb" Zey earned his medical credentials with a focus on patient-centered dermatology.',
      "He provides comprehensive diagnosis and treatment for acute and chronic skin conditions.",
      "Dr. Zey is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "edward.zey@domain.com",
    contactPhone: "+0 123 456 7890",
  },
  {
    name: "Dr. Elena Vance",
    specialty: "Endocrinologists",
    bio: "Dr. Elena Vance brings extensive clinical expertise in endocrinology and metabolic health management...",
    avatarUrl:
      "https://images.unsplash.com/photo-1594824813571-2153349aed06?w=150&auto=format&fit=crop&q=80",
    rating: 4,
    specialtySummary:
      "Specializes in endocrine system disorders, metabolic regulation, and preventive hormone care including:",
    procedures: [
      "Endocrine Consultations",
      "Thyroid & Parathyroid Care",
      "Insulin Therapy Management",
      "Metabolic Screening",
    ],
    education: DEFAULT_EDUCATION,
    training: DEFAULT_TRAINING,
    affiliations: DEFAULT_AFFILIATIONS,
    aboutParagraphs: [
      "Dr. Elena Vance brings extensive clinical expertise in endocrinology and metabolic health management.",
      "She focuses on individualized care plans that help patients achieve balanced long-term health outcomes.",
      "Dr. Elena Vance is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contactEmail: "elena.vance@domain.com",
    contactPhone: "+0 123 456 7890",
  },
];

async function seed() {
  console.log("Seeding database...");

  try {
    console.log("Membersihkan data transaksi & doctors lama...");
    await db.delete(checkIn);
    await db.delete(surgeries);
    await db.delete(visitRequests);
    await db.delete(insurances);
    await db.delete(patients);
    await db.delete(doctors);

    console.log("Memasukkan data dokter ke Neon...");
    const insertedDoctors = await db
      .insert(doctors)
      .values(SEED_DOCTORS)
      .returning();

    await seedSurgeries(insertedDoctors);
    await seedVisitRequests(insertedDoctors);
    await seedResources();

    console.log("Seeding seluruh database berhasil!");
    process.exit(0);
  } catch (error) {
    console.error("Terjadi kesalahan saat seeding:", error);
    process.exit(1);
  }
}

seed();
