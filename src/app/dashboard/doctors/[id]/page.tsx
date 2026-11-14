"use client";

import { ArrowLeft, Award, Mail, Phone, Play, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DOCTORS_DATA } from "@/lib/api";

export default function DoctorDetailsPage() {
  const params = useParams<{ id: string }>();
  const doctor =
    DOCTORS_DATA.find((item) => String(item.id) === params.id) ??
    DOCTORS_DATA[0];

  if (!doctor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Back Link */}
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#163A5F] transition hover:text-[#1D9BF0]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Doctors</span>
          </Link>
        </div>

        {/* Main Details Container */}
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-10">
          {/* 1. Top Doctor Profile Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-slate-100 pb-8 lg:flex-row lg:items-start">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <Avatar className="h-24 w-24 shrink-0 border border-slate-100">
                <AvatarImage
                  src={doctor.avatarUrl}
                  alt={doctor.name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-slate-100 text-lg font-bold text-[#163A5F]">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-[#163A5F]">
                  {doctor.name}
                </h1>

                <p className="max-w-2xl text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-[#1D9BF0]">
                    Speciality :{" "}
                  </span>
                  {doctor.specialtySummary}
                </p>

                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-xs text-slate-400">
                  {doctor.procedures.map((procedure) => (
                    <li key={procedure} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-slate-400" />
                      <span>{procedure}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Rating & Book Appointment CTA */}
            <div className="flex flex-row items-center justify-between gap-4 lg:flex-col lg:items-end">
              <div className="flex items-center gap-1.5">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-3.5 w-3.5 ${
                        star <= doctor.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-medium text-slate-500">
                  {doctor.rating}/5
                </span>
              </div>

              <Link
                href={`/dashboard/doctors/${doctor.id}/appointment`}
                className="rounded-lg bg-[#1D9BF0] px-5 py-2.5 text-xs font-medium text-white shadow-sm transition hover:bg-[#1989d6]"
              >
                Book an appointment
              </Link>
            </div>
          </div>

          {/* 2. Education & Training */}
          <div className="grid grid-cols-1 gap-8 border-b border-slate-100 py-7 md:grid-cols-2">
            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#163A5F]">Education</h2>

              <div>
                <p className="text-xs font-semibold text-[#1D9BF0]">
                  Undergraduate :
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {doctor.education.undergraduate}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#1D9BF0]">MEDICAL:</p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {doctor.education.medical}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-base font-bold text-[#163A5F]">Training</h2>

              <div>
                <p className="text-xs font-semibold text-[#1D9BF0]">
                  Orthopaedica Surgery Residency :
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  {doctor.training.residency}
                </p>
              </div>
            </div>
          </div>

          {/* 3. Affiliations */}
          <div className="border-b border-slate-100 py-7">
            <h2 className="mb-4 text-base font-bold text-[#163A5F]">
              Affiliations
            </h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h3 className="mb-2 text-xs font-semibold text-[#1D9BF0]">
                  Hospital Affiliations
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {doctor.affiliations.hospital.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold text-[#1D9BF0]">
                  Professional Affiliations
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {doctor.affiliations.professional.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-2 text-xs font-semibold text-[#1D9BF0]">
                  Team Affiliations
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {doctor.affiliations.team.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 4. About Doctor */}
          <div className="border-b border-slate-100 py-7">
            <h2 className="mb-3 text-base font-bold text-[#163A5F]">
              About {doctor.name}
            </h2>
            <div className="space-y-3 text-xs leading-relaxed text-slate-400">
              {doctor.aboutParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* 5. Certificates */}
          <div className="border-b border-slate-100 py-7">
            <h2 className="mb-4 text-base font-bold text-[#163A5F]">
              Certificates
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
              {doctor.certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex flex-col items-center justify-center rounded-xl border border-slate-100 bg-white p-3 text-center shadow-2xs transition hover:border-sky-200"
                >
                  <div className="flex h-24 w-full flex-col items-center justify-center rounded-lg border border-amber-200/70 bg-[#FDFBF7] px-2">
                    <Award className="mb-1 h-5 w-5 text-amber-600/80" />
                    <p className="line-clamp-1 font-serif text-[10px] font-semibold text-slate-700">
                      {cert.title}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[9px] text-slate-400">
                      {cert.issuer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Media */}
          <div className="border-b border-slate-100 py-7">
            <h2 className="mb-4 text-base font-bold text-[#163A5F]">Media</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
              {doctor.media.map((item) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-xl border border-slate-100 bg-white p-2.5 shadow-2xs transition hover:shadow-sm"
                >
                  <div className="relative flex h-24 w-full items-center justify-center rounded-lg bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100">
                    <button
                      type="button"
                      aria-label={`Play ${item.title}`}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D9BF0] text-white shadow-sm transition hover:scale-105 hover:bg-[#1989d6]"
                    >
                      <Play className="ml-0.5 h-3.5 w-3.5 fill-white" />
                    </button>
                  </div>

                  <div className="mt-2.5 px-0.5">
                    <h3 className="line-clamp-1 text-xs font-bold text-[#163A5F]">
                      {item.title}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Contact Us */}
          <div className="pt-7">
            <h2 className="mb-4 text-base font-bold text-[#163A5F]">
              Contact us
            </h2>

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-center gap-2.5">
                  <Mail className="h-4 w-4 text-[#1D9BF0]" />
                  <span>{doctor.contact.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="h-4 w-4 text-[#1D9BF0]" />
                  <span>{doctor.contact.phone}</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-2.5">
                <a
                  href="#facebook"
                  aria-label="Facebook"
                  className="flex h-6 w-6 items-center justify-center rounded bg-[#1877F2] text-xs font-bold text-white transition hover:opacity-90"
                >
                  f
                </a>
                <a
                  href="#twitter"
                  aria-label="Twitter"
                  className="flex h-6 w-6 items-center justify-center rounded bg-[#1DA1F2] text-xs font-bold text-white transition hover:opacity-90"
                >
                  t
                </a>
                <a
                  href="#linkedin"
                  aria-label="LinkedIn"
                  className="flex h-6 w-6 items-center justify-center rounded bg-[#0A66C2] text-xs font-bold text-white transition hover:opacity-90"
                >
                  in
                </a>
                <a
                  href="#instagram"
                  aria-label="Instagram"
                  className="flex h-6 w-6 items-center justify-center rounded bg-[#E4405F] text-xs font-bold text-white transition hover:opacity-90"
                >
                  ig
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}