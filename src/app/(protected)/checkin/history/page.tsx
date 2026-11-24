import {
  ArrowLeft,
  CalendarDays,
  ClipboardList,
  Clock,
  MapPin,
  Plus,
  Star,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCheckInsByUserId } from "@/features/checkin/queries";
import { auth } from "@/lib/auth";

export default async function CheckInHistoryPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const history = await getCheckInsByUserId(session.user.id);

  return (
    <div className="mx-auto max-w-5xl space-y-6 pb-10 text-slate-800">
      {/* Header & Navigasi */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#1D9BF0]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Check-In History
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            View your past check-in tickets, room assignments, and submitted reviews.
          </p>
        </div>

        <Link
          href="/checkin/step-1"
          className="inline-flex items-center gap-2 rounded-xl bg-[#1D9BF0] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1989d6]"
        >
          <Plus className="h-4 w-4" />
          <span>New Check-In</span>
        </Link>
      </div>

      {/* Daftar Riwayat */}
      {history.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sky-50 text-[#1D9BF0]">
            <ClipboardList className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">
            No Check-In History Yet
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-slate-500">
            You haven&apos;t completed any patient check-in. Start a new check-in to get your queue number.
          </p>
          <Link
            href="/checkin/step-1"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1D9BF0] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1989d6]"
          >
            Start Check-In
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((item) => {
            const isCompleted = item.status === "completed";

            return (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-sky-200"
              >
                {/* Top Bar: Queue Number, Tanggal & Status */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-[#163A5F] px-3 py-1.5 text-sm font-bold tracking-wider text-white">
                      {item.queueNumber}
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {item.fullName}
                      </h2>
                      <p className="flex items-center gap-1.5 text-xs text-slate-400">
                        <CalendarDays className="h-3.5 w-3.5" />
                        <span>
                          {new Date(item.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                      isCompleted
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-sky-50 text-sky-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                {/* Info Jadwal, Ruangan & Data Pasien */}
                <div className="mt-4 grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
                  <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#1D9BF0]" />
                    <div>
                      <p className="text-xs text-slate-400">Appointment Time</p>
                      <p className="font-semibold text-slate-800">
                        {item.appointmentTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 rounded-xl bg-slate-50 p-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#1D9BF0]" />
                    <div>
                      <p className="text-xs text-slate-400">Location</p>
                      <p className="font-semibold text-slate-800">
                        Room {item.room} • Floor {item.floor}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-3">
                    <p className="text-xs text-slate-400">Patient Info</p>
                    <p className="font-semibold text-slate-800">
                      {item.gender} • {item.phone}
                    </p>
                  </div>
                </div>

                {/* Keluhan */}
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Complaint
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-700">
                    {item.complaint}
                  </p>
                </div>

                {/* Ulasan Pasien (jika sudah diisi di Step 4) */}
                {item.rating !== null && (
                  <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50/50 p-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-700">
                        Your Check-In Review
                      </span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (item.rating ?? 0)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {item.reviewComment && (
                      <p className="mt-2 text-sm text-slate-600">
                        &ldquo;{item.reviewComment}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}