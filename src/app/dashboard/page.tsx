import DoctorCard, { type Doctor } from "@/components/DoctorCard";
import { Button } from "@/components/ui/button";

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Darlene Robertson",
    specialty: "Heart Surgeon",
    bio: "Dr. Berastain Jr. was born in Zaragoza, Spain while his father was in medical school. He was raised...",
    avatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "DR. SCHLIMMER",
    specialty: "Cardiologists",
    bio: "A native of Portland, Texas, Dr. Schlimmer is a board-certified, fellowship-trained orthopaedic surgeon...",
    avatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "DR. PATTERSON",
    specialty: "Anesthesiologists",
    bio: "A native of Corpus Christi, Texas and a graduate of Ray High School, Dr. Patterson earned his medical...",
    avatarUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "DR. CORDELL",
    specialty: "Dermatologists",
    bio: "Dr. Davin Cordell was born in the sunny state of Florida in Gainesville, but his family kept him moving...",
    avatarUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "DR. HALLQUIST",
    specialty: "Ophthalmologists",
    bio: "Dr. April Hallquist is a board certified, fellowship-trained orthopaedic surgeon who was born and raised...",
    avatarUrl:
      "https://images.unsplash.com/photo-1594824813571-2153349aed06?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "DR. COHN",
    specialty: "Neurologists",
    bio: "Dr. Cohn was born in San Antonio and raised in the Texas Hill Country. He received his undergraduate...",
    avatarUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "PETER C. NEFF",
    specialty: "Endocrinologists",
    bio: "Dr. Neff was born and raised in Corpus Christi, Texas and attended Mary Carroll High School. After...",
    avatarUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    name: "MATTHEW D. HNATOW",
    specialty: "Neurologists",
    bio: 'Dr. Hnatow (pronounced "NATO") is a native of South Texas. Born in San Antonio and raised in Carrizo...',
    avatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    name: "EDWARD B. ZEY",
    specialty: "Dermatologists",
    bio: 'A native of Corpus Christi, Texas and a graduate of Richard King High School, Edward "Eb" earned...',
    avatarUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 10,
    name: "Dr. Darlene Robertson",
    specialty: "Endocrinologists",
    bio: "Dr. Berastain Jr. was born in Zaragoza, Spain while his father was in medical school. He was raised...",
    avatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      <main className="mx-auto max-w-7xl px-8 py-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm text-slate-500">Hi John,</p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome Back John
            </h1>
          </div>
          <Button className="rounded-full bg-sky-500 px-6 py-2.5 font-medium text-white shadow-sm hover:bg-sky-600">
            Check - In
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>
    </div>
  );
}
