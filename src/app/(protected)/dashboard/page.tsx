import Link from "next/link";
import DoctorCard from "@/features/doctors/components/DoctorCard";
import { DOCTORS_DATA } from "@/lib/api";
import { Button } from "@/shared/components/ui/button";

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
          <Link href="/checkin">
            <Button className="rounded-full bg-sky-500 px-6 py-2.5 font-medium text-white shadow-sm hover:bg-sky-600">
              Check - In
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DOCTORS_DATA.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </main>
    </div>
  );
}
