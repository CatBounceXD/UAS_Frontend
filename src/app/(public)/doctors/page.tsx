import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DoctorCard from "@/features/doctors/components/DoctorCard";
import { getAllDoctors } from "@/features/doctors/queries";

export default async function PublicDoctorsPage() {
  const doctorList = await getAllDoctors();

  return (
    <div className="space-y-6 text-slate-800">
      <div>
        <Link
          href="/"
          className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#1D9BF0]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Our Specialists
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Browse our medical specialists and view their clinical profiles.
        </p>
      </div>

      {doctorList.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Data dokter belum tersedia.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {doctorList.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}