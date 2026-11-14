const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message =
      typeof data === "object" && data !== null && "message" in data
        ? String((data as { message: unknown }).message)
        : `Request failed with status ${response.status}`;
    throw new ApiError(message, response.status, data);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: "GET" }),

  post: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    }),

  put: <T>(endpoint: string, body: unknown, options?: RequestInit) =>
    apiFetch<T>(endpoint, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
    }),

  delete: <T>(endpoint: string, options?: RequestInit) =>
    apiFetch<T>(endpoint, { ...options, method: "DELETE" }),
};

export interface VisitRequestPayload {
  // Step 1: Patient Information
  name: string;
  email: string;
  dateOfBirth: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipcode: string;
  preferredContactMethod: string;
  contactInfo: string;
  referralSource: string;
  ssn: string;

  // Step 2: Insurance Information
  isPolicyHolderSameAsPatient: boolean;
  policyHolderName: string;
  healthInsurancePlan: string;
  healthInsuranceNumber: string;
  groupNumber: string;

  // Step 3: Appointment Information
  doctorName: string;
  doctorSpecialty: string;
  preferredAppointmentTime: string;
  urgency: string;
  reasonForVisit: string;
}

export const visitRequestApi = {
  getAll: () => api.get<VisitRequestPayload[]>("/visit-requests"),
  create: (payload: VisitRequestPayload) =>
    api.post<{ message: string; data: VisitRequestPayload }>(
      "/visit-requests",
      payload,
    ),
};

export interface DoctorDetail {
  id: number;
  name: string;
  specialty: string;
  bio: string;
  avatarUrl: string;
  rating: number;
  specialtySummary: string;
  procedures: string[];
  education: {
    undergraduate: string;
    medical: string;
  };
  training: {
    residency: string;
  };
  affiliations: {
    hospital: string[];
    professional: string[];
    team: string[];
  };
  aboutParagraphs: string[];
  certificates: {
    id: string;
    title: string;
    issuer: string;
  }[];
  media: {
    id: string;
    title: string;
    description: string;
  }[];
  contact: {
    email: string;
    phone: string;
  };
}

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

export const DOCTORS_DATA: DoctorDetail[] = [
  {
    id: 1,
    name: "Dr. Darlene Robertson",
    specialty: "Heart Surgeon",
    bio: "Dr. Berastain Jr. was born in Zaragoza, Spain while his father was in medical school. He was raised...",
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
    contact: {
      email: "darlene.robertson@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 2,
    name: "DR. SCHLIMMER",
    specialty: "Cardiologists",
    bio: "A native of Portland, Texas, Dr. Schlimmer is a board-certified, fellowship-trained orthopaedic surgeon...",
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
    contact: {
      email: "dr.schlimmer@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 3,
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
    contact: {
      email: "dr.patterson@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 4,
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
    contact: {
      email: "dr.cordell@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 5,
    name: "DR. HALLQUIST",
    specialty: "Ophthalmologists",
    bio: "Dr. April Hallquist is a board certified, fellowship-trained orthopaedic surgeon who was born and raised...",
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
    contact: {
      email: "dr.hallquist@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 6,
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
    contact: {
      email: "dr.cohn@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 7,
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
    contact: {
      email: "peter.neff@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 8,
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
    contact: {
      email: "matthew.hnatow@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 9,
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
    contact: {
      email: "edward.zey@domain.com",
      phone: "+0 123 456 7890",
    },
  },
  {
    id: 10,
    name: "Dr. Darlene Robertson",
    specialty: "Endocrinologists",
    bio: "Dr. Berastain Jr. was born in Zaragoza, Spain while his father was in medical school. He was raised...",
    avatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
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
      "Dr. Darlene Robertson brings extensive clinical expertise in endocrinology and metabolic health management.",
      "She focuses on individualized care plans that help patients achieve balanced long-term health outcomes.",
      "Dr. Darlene Robertson is currently accepting new patients.",
    ],
    certificates: DEFAULT_CERTIFICATES,
    media: DEFAULT_MEDIA,
    contact: {
      email: "darlene.endo@domain.com",
      phone: "+0 123 456 7890",
    },
  },
];