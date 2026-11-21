"use client";

import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent } from "@/shared/components/ui/card";

interface PatientDetail {
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
}

interface InsuranceDetail {
  policyHolderName: string;
  healthInsurancePlan: string;
  healthInsuranceNumber: string;
  groupNumber?: string | null;
}

interface VisitRequestDetail {
  id: number;
  doctorId?: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  preferredAppointmentTime: string;
  urgency: string;
  reasonForVisit: string;
  status: string;
  patient?: PatientDetail | null;
  insurance?: InsuranceDetail | null;
}

function InfoItem({
  label,
  value,
  icon,
  fullWidth = false,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className={fullWidth ? "sm:col-span-2" : undefined}>
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-0.5 flex items-start gap-1.5 font-medium text-slate-800">
        {icon}
        <span>{value}</span>
      </p>
    </div>
  );
}

export default function VisitRequestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [detail, setDetail] = useState<VisitRequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [savedCancelReason, setSavedCancelReason] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!id) return;
    let active = true;
    setLoading(true);
    setError(null);

    fetch(`/api/visit-requests/${id}`)
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat detail visit request.");
        }
        return (json?.data ?? json) as VisitRequestDetail;
      })
      .then((data) => {
        if (active) setDetail(data);
      })
      .catch((err: unknown) => {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Gagal memuat data dari server.",
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
      let res = await fetch(`/api/visit-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Canceled",
          cancelReason: cancelReason.trim(),
        }),
      });

      if (res.status === 405) {
        res = await fetch(`/api/visit-requests/${id}`, { method: "DELETE" });
      }

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Gagal membatalkan appointment.");
      }

      const updated = json?.data ?? json;
      setDetail((prev) =>
        prev ? { ...prev, status: updated?.status || "Canceled" } : prev,
      );
      setSavedCancelReason(cancelReason.trim());
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
      <div className="flex min-h-screen items-center justify-center bg-slate-50/50">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
          <span>Memuat detail visit request...</span>
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-6 py-10">
        <div className="mx-auto max-w-4xl space-y-4">
          <Link
            href="/visit-request"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Visit Requests
          </Link>
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
            {error ?? "Data visit request tidak ditemukan."}
          </div>
        </div>
      </div>
    );
  }

  const badgeStyle =
    detail.status === "Active"
      ? "bg-sky-100 text-sky-700"
      : detail.status === "Complete"
        ? "bg-emerald-100 text-emerald-700"
        : "bg-rose-100 text-rose-700";

  const fullAddress = detail.patient
    ? [
        detail.patient.addressLine1,
        detail.patient.addressLine2,
        `${detail.patient.city}, ${detail.patient.state} ${detail.patient.zipcode}`,
      ]
        .filter(Boolean)
        .join(", ")
    : "";

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <div className="flex items-center justify-between">
          <Link
            href="/visit-request"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Visit Requests
          </Link>
          <span
            className={`rounded-full px-3.5 py-1 text-xs font-semibold ${badgeStyle}`}
          >
            {detail.status}
          </span>
        </div>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardContent className="space-y-8 p-6 sm:p-8">
            <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
              <Avatar className="h-20 w-20 border border-slate-100">
                <AvatarImage
                  src={detail.doctorAvatarUrl}
                  alt={detail.doctorName}
                  className="object-cover"
                />
                <AvatarFallback className="text-base font-semibold">
                  {detail.doctorName.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-xs font-medium text-slate-400">
                  Request ID #{detail.id}
                </p>
                <h1 className="text-xl font-bold text-slate-900">
                  {detail.doctorName}
                </h1>
                <p className="text-sm font-semibold text-sky-500">
                  {detail.doctorSpecialty}
                </p>
                <p className="pt-1 text-xs leading-relaxed text-slate-400">
                  Dedicated specialist providing comprehensive consultation,
                  diagnosis, and personalized treatment plans for patients.
                </p>
              </div>
            </div>

            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <User className="h-4 w-4 text-sky-500" />
                <h2 className="text-sm font-bold text-slate-900">
                  Patient Information
                </h2>
              </div>
              {detail.patient ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                  <InfoItem label="Patient Name" value={detail.patient.name} />
                  <InfoItem
                    label="Date of Birth"
                    value={detail.patient.dateOfBirth}
                  />
                  <InfoItem
                    label="Email Address"
                    value={detail.patient.email}
                    icon={<Mail className="mt-0.5 h-3.5 w-3.5 text-slate-400" />}
                  />
                  <InfoItem
                    label="Preferred Contact"
                    value={`${detail.patient.contactInfo} (${detail.patient.preferredContactMethod})`}
                    icon={<Phone className="mt-0.5 h-3.5 w-3.5 text-slate-400" />}
                  />
                  <InfoItem
                    label="Address"
                    value={fullAddress}
                    icon={
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    }
                    fullWidth
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Data pasien tidak tersedia.
                </p>
              )}
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <Shield className="h-4 w-4 text-sky-500" />
                <h2 className="text-sm font-bold text-slate-900">
                  Insurance Information
                </h2>
              </div>
              {detail.insurance ? (
                <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                  <InfoItem
                    label="Health Insurance Plan"
                    value={detail.insurance.healthInsurancePlan}
                  />
                  <InfoItem
                    label="Policy Holder Name"
                    value={detail.insurance.policyHolderName}
                  />
                  <InfoItem
                    label="Health Insurance Number"
                    value={detail.insurance.healthInsuranceNumber}
                  />
                  <InfoItem
                    label="Group Number"
                    value={detail.insurance.groupNumber || "-"}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Pasien tidak menggunakan asuransi (Self-Pay).
                </p>
              )}
            </section>

            <section className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <Calendar className="h-4 w-4 text-sky-500" />
                <h2 className="text-sm font-bold text-slate-900">
                  Appointment Information
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-x-8 gap-y-4 text-sm sm:grid-cols-2">
                <InfoItem
                  label="Preferred Appointment Time"
                  value={detail.preferredAppointmentTime}
                  icon={
                    <Calendar className="mt-0.5 h-3.5 w-3.5 text-sky-500" />
                  }
                />
                <InfoItem
                  label="Urgency"
                  value={detail.urgency}
                  icon={<Clock className="mt-0.5 h-3.5 w-3.5 text-sky-500" />}
                />
                <InfoItem
                  label="Reason for Visit"
                  value={detail.reasonForVisit}
                  icon={
                    <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-sky-500" />
                  }
                  fullWidth
                />
                {savedCancelReason && (
                  <div className="rounded-lg border border-rose-200 bg-rose-50/70 p-3.5 sm:col-span-2">
                    <p className="text-xs font-semibold text-rose-700">
                      Cancellation Reason
                    </p>
                    <p className="mt-1 text-sm text-rose-600">
                      {savedCancelReason}
                    </p>
                  </div>
                )}
              </div>
            </section>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 pt-6">
              <Button
                type="button"
                onClick={() =>
                  router.push(
                    `/dashboard/doctors/${detail.doctorId ?? 1}/appointment`,
                  )
                }
                className="rounded-full bg-sky-500 px-6 text-white hover:bg-sky-600"
              >
                {detail.status === "Active" ? "Reschedule" : "Book Again"}
              </Button>
              {detail.status === "Active" && (
                <Button
                  type="button"
                  onClick={() => {
                    setCancelReason("");
                    setCancelError(null);
                    setIsCancelOpen(true);
                  }}
                  className="rounded-full bg-rose-500 px-6 text-white hover:bg-rose-600"
                >
                  Cancel Appointment
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            disabled={canceling}
            onClick={() => setIsCancelOpen(false)}
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-[1px]"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900">
                Cancel Appointment
              </h3>
              <button
                type="button"
                aria-label="Close modal"
                disabled={canceling}
                onClick={() => setIsCancelOpen(false)}
                className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCancelSubmit} className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="cancel-reason"
                  className="mb-1.5 block text-xs font-medium text-slate-600"
                >
                  Reason for cancellation
                </label>
                <textarea
                  id="cancel-reason"
                  rows={4}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Enter your reason for canceling this appointment..."
                  disabled={canceling}
                  className="w-full resize-none rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {cancelError && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{cancelError}</span>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button
                  type="submit"
                  disabled={canceling}
                  className="rounded-full bg-sky-500 px-6 text-white hover:bg-sky-600"
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