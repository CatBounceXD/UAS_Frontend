import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import type { doctors } from "@/db/schema";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

type DoctorRecord = typeof doctors.$inferSelect;

export default function DoctorDetailView({ doctor }: { doctor: DoctorRecord }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-6 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border border-slate-100">
            <AvatarImage
              src={doctor.avatarUrl}
              alt={doctor.name}
              className="object-cover"
            />
            <AvatarFallback className="bg-slate-100 text-lg font-bold text-[#163A5F]">
              {doctor.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-2xl font-bold text-[#163A5F]">{doctor.name}</h1>
            <p className="text-sm font-semibold text-[#1D9BF0]">
              {doctor.specialty}
            </p>
            <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-[#1D9BF0]" />
                {doctor.contactEmail}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-[#1D9BF0]" />
                {doctor.contactPhone}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/dashboard/doctors/${doctor.id}/appointment`}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#1D9BF0] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1989d6]"
        >
          Request Appointment
        </Link>
      </div>

      <div className="mt-6 space-y-6 text-sm text-slate-600">
        <div>
          <h2 className="mb-2 text-base font-bold text-[#163A5F]">About</h2>
          <div className="space-y-2 leading-relaxed">
            {doctor.aboutParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-base font-bold text-[#163A5F]">
            Specialty & Procedures
          </h2>
          <p className="mb-3 leading-relaxed">{doctor.specialtySummary}</p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {doctor.procedures.map((procedure) => (
              <li
                key={procedure}
                className="rounded-lg bg-[#F4F6F9] px-3.5 py-2 text-xs font-medium text-[#163A5F]"
              >
                • {procedure}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
