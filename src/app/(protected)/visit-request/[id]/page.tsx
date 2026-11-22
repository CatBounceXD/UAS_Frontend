"use client";

import { AlertCircle, ArrowLeft, Loader2, Star, X } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

interface VisitRequestDetail {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  preferredAppointmentTime: string;
  urgency: string;
  reasonForVisit: string;
  status: string;
  rating?: number | null;
  reviewComment?: string | null;
  recommendationComment?: string | null;
  referredByName?: string | null;
  referredBySpecialty?: string | null;
  referredByAvatarUrl?: string | null;
  cancelReason?: string | null;
  patient?: {
    name: string;
    email: string;
    dateOfBirth: string;
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    zipcode: string;
    preferredContactMethod: string;
    contactInfo: string;
    referralSource?: string | null;
    ssn?: string | null;
  } | null;
  insurance?: {
    isPolicyHolderSameAsPatient: boolean;
    policyHolderName: string;
    healthInsurancePlan: string;
    healthInsuranceNumber: string;
    groupNumber?: string | null;
  } | null;
  doctor?: {
    specialtySummary?: string;
    procedures?: string[];
  } | null;
}

function FieldItem({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "col-span-full" : undefined}>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-800">{value || "-"}</p>
    </div>
  );
}

export default function VisitRequestDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [detail, setDetail] = useState<VisitRequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/visit-request/${id}`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat detail kunjungan.");
        }
        return (json?.data ?? json) as VisitRequestDetail;
      })
      .then((data) => {
        if (active) setDetail(data);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal memuat data dari server.",
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleCancelSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;

    if (!cancelReason.trim()) {
      setCancelError("Please enter a reason for cancellation.");
      return;
    }

    setCanceling(true);
    setCancelError(null);

    try {
      const res = await fetch(`/api/visit-request/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Canceled",
          cancelReason: cancelReason.trim(),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Gagal membatalkan appointment.");
      }

      setDetail((prev) =>
        prev
          ? {
              ...prev,
              status: "Canceled",
              cancelReason: cancelReason.trim(),
            }
          : prev,
      );
      setIsCancelOpen(false);
    } catch (err: unknown) {
      setCancelError(
        err instanceof Error ? err.message : "Gagal membatalkan appointment.",
      );
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
          <span>Memuat detail kunjungan...</span>
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="mx-auto max-w-6xl space-y-4 py-6">
        <Link
          href="/visit-request"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Visit Request
        </Link>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-600">
          {error ?? "Data kunjungan tidak ditemukan."}
        </div>
      </div>
    );
  }

  const isOngoing =
    detail.status === "Active" || detail.status === "Referred";
  const isCompleted = detail.status === "Completed";

  const badgeLabel =
    detail.status === "Referred"
      ? "Referred Appointment"
      : detail.status === "Active"
        ? "On Going Appointment"
        : isCompleted
          ? "Confirm Appointment"
          : "Canceled Appointment";

  const badgeStyle =
    detail.status === "Referred"
      ? "bg-amber-50 text-amber-500"
      : detail.status === "Active"
        ? "bg-sky-50 text-sky-500"
        : isCompleted
          ? "bg-emerald-50 text-emerald-500"
          : "bg-rose-50 text-rose-500";

  const specialtySummary =
    detail.doctor?.specialtySummary ||
    `${detail.doctorName} specializes in comprehensive ${detail.doctorSpecialty.toLowerCase()} evaluation and clinical procedures including:`;

  const procedures = detail.doctor?.procedures ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8 text-slate-800">
      <div>
        <Link
          href="/visit-request"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Visit Request
        </Link>
      </div>

      <Card className="border-slate-100 bg-white shadow-sm">
        <CardContent className="space-y-8 p-6 sm:p-10">
          {/* Doctor Header */}
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-6 sm:flex-row sm:items-start">
            <div className="flex items-start gap-5">
              <Avatar className="h-24 w-24 border border-slate-100">
                <AvatarImage
                  src={detail.doctorAvatarUrl}
                  alt={detail.doctorName}
                  className="object-cover"
                />
                <AvatarFallback className="text-lg font-semibold">
                  {detail.doctorName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1.5">
                <h1 className="text-2xl font-bold text-slate-900">
                  {detail.doctorName}
                </h1>
                <p className="text-xs leading-relaxed text-slate-400">
                  <span className="font-semibold text-sky-500">
                    Speciality :
                  </span>{" "}
                  {specialtySummary}
                </p>
                {procedures.length > 0 && (
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 text-xs text-slate-400">
                    {procedures.map((proc) => (
                      <li key={proc}>• {proc}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="shrink-0 self-start">
              <span
                className={`inline-block rounded-full px-5 py-2 text-xs font-semibold ${badgeStyle}`}
              >
                {badgeLabel}
              </span>
            </div>
          </div>

          {/* Section: Referred by (for Referred status) */}
          {detail.status === "Referred" && detail.referredByName && (
            <section className="space-y-4">
              <h2 className="text-base font-bold text-slate-900">
                Referred by
              </h2>
              <div className="flex items-center gap-3.5">
                <Avatar className="h-12 w-12 border border-slate-100">
                  <AvatarImage
                    src={detail.referredByAvatarUrl || undefined}
                    alt={detail.referredByName}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-xs font-semibold">
                    {detail.referredByName.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {detail.referredByName}
                  </p>
                  <p className="text-xs font-semibold text-sky-500">
                    {detail.referredBySpecialty || "Specialist"}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section: Reviews (for Completed status) */}
          {isCompleted && (
            <section className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Reviews</h2>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-slate-400">Rating Stars</p>
                  <div className="mt-1.5 flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= (detail.rating ?? 4)
                            ? "fill-amber-400 text-amber-400"
                            : "fill-slate-200 text-slate-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Comment</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    {detail.reviewComment ||
                      "Great clinical care and clear explanation during the appointment."}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section: Patient Information */}
          <section className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Patient Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <FieldItem
                label="Name"
                value={detail.patient?.name || "-"}
              />
              <FieldItem
                label="Email"
                value={detail.patient?.email || "-"}
              />
              <FieldItem
                label="Date of Birth"
                value={detail.patient?.dateOfBirth || "-"}
              />
              <FieldItem
                label="Address Line 1"
                value={detail.patient?.addressLine1 || "-"}
              />
              <FieldItem
                label="Address Line 2"
                value={detail.patient?.addressLine2 || "-"}
              />
              <FieldItem
                label="City"
                value={detail.patient?.city || "-"}
              />
              <FieldItem
                label="State"
                value={detail.patient?.state || "-"}
              />
              <FieldItem
                label="Zipcode"
                value={detail.patient?.zipcode || "-"}
              />
              <FieldItem
                label="Contact Info"
                value={detail.patient?.contactInfo || "-"}
              />
              <FieldItem
                label="How did you hear about us"
                value={detail.patient?.referralSource || "-"}
              />
              <FieldItem
                label="How may we contact you"
                value={detail.patient?.preferredContactMethod || "-"}
              />
              <FieldItem
                label="Social Security Number"
                value={detail.patient?.ssn || "-"}
              />
            </div>
          </section>

          {/* Section: Insurance Information */}
          <section className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Insurance Information
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
              <FieldItem
                label="Is the Policy Holder the same as the Patient?"
                value={
                  detail.insurance
                    ? detail.insurance.isPolicyHolderSameAsPatient
                      ? "Yes"
                      : "No"
                    : "Yes"
                }
              />
              <FieldItem
                label="Policy Holder Name"
                value={
                  detail.insurance?.policyHolderName ||
                  detail.patient?.name ||
                  "-"
                }
              />
              <FieldItem
                label="Health Insurance Plan"
                value={detail.insurance?.healthInsurancePlan || "-"}
              />
              <FieldItem
                label="Health Insurance Number"
                value={detail.insurance?.healthInsuranceNumber || "-"}
              />
              <FieldItem
                label="Group Number"
                value={detail.insurance?.groupNumber || "-"}
              />
            </div>
          </section>

          {/* Section: Appointment Information */}
          <section className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                {isCompleted
                  ? "Appointment Information"
                  : "Last Appointment Information"}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
              <FieldItem
                label="Preferred Appointment Time"
                value={detail.preferredAppointmentTime}
              />
              <FieldItem label="Urgency" value={detail.urgency} />
              <FieldItem
                label="Reason for Visit"
                value={detail.reasonForVisit}
                fullWidth
              />
              {detail.cancelReason && (
                <div className="col-span-full rounded-xl border border-rose-200 bg-rose-50/70 p-4">
                  <p className="text-xs font-semibold text-rose-700">
                    Cancellation Reason
                  </p>
                  <p className="mt-1 text-sm text-rose-600">
                    {detail.cancelReason}
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Section: Recommendation */}
          <section className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Recommendation
              </h2>
            </div>
            <div>
              <p className="text-xs text-slate-400">Comment</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {detail.recommendationComment ||
                  "Continue following the prescribed treatment plan and contact our clinic if symptoms change."}
              </p>
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Bottom Action Buttons (only for Active / Referred) */}
      {isOngoing && (
        <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
          <Link href={`/dashboard/doctors/${detail.doctorId}/appointment`}>
            <Button
              type="button"
              className="rounded-lg bg-sky-500 px-6 py-2.5 text-xs font-semibold text-white hover:bg-sky-600"
            >
              Reschedule Appointment
            </Button>
          </Link>

          <Button
            type="button"
            onClick={() => {
              setCancelReason("");
              setCancelError(null);
              setIsCancelOpen(true);
            }}
            className="rounded-lg bg-rose-500 px-6 py-2.5 text-xs font-semibold text-white hover:bg-rose-600"
          >
            Cancel Appointment
          </Button>
        </div>
      )}

      {/* Modal: Cancel Appointment */}
      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            disabled={canceling}
            onClick={() => setIsCancelOpen(false)}
            className="fixed inset-0 bg-slate-950/60"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              disabled={canceling}
              onClick={() => setIsCancelOpen(false)}
              className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Cancel Appointment
            </h3>

            <form onSubmit={handleCancelSubmit} className="mt-4 space-y-5">
              <div>
                <label
                  htmlFor="cancel-reason"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Reason
                </label>
                <textarea
                  id="cancel-reason"
                  rows={5}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Type here.."
                  disabled={canceling}
                  className="w-full resize-none rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {cancelError && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{cancelError}</span>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={canceling}
                  className="rounded-lg bg-sky-500 px-6 text-xs font-semibold text-white hover:bg-sky-600"
                >
                  {canceling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Canceling...
                    </>
                  ) : (
                    "Cancel Appointment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}