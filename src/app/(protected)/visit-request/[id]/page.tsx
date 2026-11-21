"use client";

import {
  AlertCircle,
  ArrowLeft,
  Loader2,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";
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
  referralSource?: string | null;
  ssn?: string | null;
}

interface InsuranceDetail {
  isPolicyHolderSameAsPatient?: boolean;
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
  const router = useRouter();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [detail, setDetail] = useState<VisitRequestDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State Note Modals ("Note For Yourself" & "Edit Note")
  const [note, setNote] = useState("");
  const [draftNote, setDraftNote] = useState("");
  const [noteModalMode, setNoteModalMode] = useState<"view" | "edit" | null>(
    null,
  );

  // State Cancel Appointment Modal
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);
  const [savedCancelReason, setSavedCancelReason] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!id) return;
    const storedNote = window.localStorage.getItem(`visit_request_note_${id}`);
    if (storedNote !== null) {
      setNote(storedNote);
    }
  }, [id]);

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

  const handleOpenEditNote = () => {
    setDraftNote(note);
    setNoteModalMode("edit");
  };

  const handleSaveNote = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = draftNote.trim();
    setNote(cleaned);
    if (id) {
      window.localStorage.setItem(`visit_request_note_${id}`, cleaned);
    }
    setNoteModalMode("view");
  };

  const handleDeleteNote = () => {
    setNote("");
    setDraftNote("");
    if (id) {
      window.localStorage.removeItem(`visit_request_note_${id}`);
    }
  };

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
          <span>Memuat detail appointment...</span>
        </div>
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="min-h-screen bg-slate-50/50 px-6 py-10">
        <div className="mx-auto max-w-6xl space-y-4">
          <Link
            href="/visit-request"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Visit Requests
          </Link>
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
            {error ?? "Data appointment tidak ditemukan."}
          </div>
        </div>
      </div>
    );
  }

  const isCanceled = detail.status === "Canceled";

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800">
      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <div>
          <Link
            href="/visit-request"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Visit Requests
          </Link>
        </div>

        <Card className="border-slate-100 bg-white shadow-sm">
          <CardContent className="space-y-8 p-6 sm:p-10">
            {/* Doctor Header */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
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
                    {detail.doctorSpecialty} — specializes in comprehensive
                    evaluation, diagnosis, and personalized medical procedures
                    including:
                  </p>
                  <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 text-xs text-slate-400">
                    <li>• Comprehensive Consultation</li>
                    <li>• Preventive Care</li>
                    <li>• Diagnostic Evaluation</li>
                    <li>• Follow-up Treatment</li>
                  </ul>
                </div>
              </div>

              <div className="shrink-0 self-start">
                {isCanceled ? (
                  <span className="inline-block rounded-full bg-rose-50 px-5 py-2 text-xs font-semibold text-rose-500">
                    Canceled Appointment
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setNoteModalMode("view")}
                    className="rounded-lg bg-sky-50 px-6 py-2.5 text-xs font-semibold text-sky-500 transition-colors hover:bg-sky-100"
                  >
                    View Note
                  </button>
                )}
              </div>
            </div>

            {/* Section 1: Patient Information */}
            <section className="space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Patient Information
                </h2>
                {isCanceled && (
                  <button
                    type="button"
                    onClick={() => setNoteModalMode("view")}
                    className="rounded-lg bg-sky-50 px-6 py-2 text-xs font-semibold text-sky-500 transition-colors hover:bg-sky-100"
                  >
                    View Note
                  </button>
                )}
              </div>

              {detail.patient ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                  <FieldItem label="Name" value={detail.patient.name} />
                  <FieldItem label="Email" value={detail.patient.email} />
                  <FieldItem
                    label="Date of Birth"
                    value={detail.patient.dateOfBirth}
                  />
                  <FieldItem
                    label="Address Line 1"
                    value={detail.patient.addressLine1}
                  />
                  <FieldItem
                    label="Address Line 2"
                    value={detail.patient.addressLine2 || "-"}
                  />
                  <FieldItem label="City" value={detail.patient.city} />
                  <FieldItem label="State" value={detail.patient.state} />
                  <FieldItem label="Zipcode" value={detail.patient.zipcode} />
                  <FieldItem
                    label="Contact Info"
                    value={detail.patient.contactInfo}
                  />
                  <FieldItem
                    label="How did you hear about us"
                    value={detail.patient.referralSource || "-"}
                  />
                  <FieldItem
                    label="How may we contact you"
                    value={detail.patient.preferredContactMethod}
                  />
                  <FieldItem
                    label="Social Security Number"
                    value={detail.patient.ssn || "-"}
                  />
                </div>
              ) : (
                <p className="text-xs text-slate-400">
                  Data pasien tidak tersedia.
                </p>
              )}
            </section>

            {/* Section 2: Insurance Information */}
            <section className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Insurance Information
                </h2>
              </div>

              {detail.insurance ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
                  <FieldItem
                    label="Is the Policy Holder the same as the Patient?"
                    value={
                      detail.insurance.isPolicyHolderSameAsPatient === false
                        ? "No"
                        : "Yes"
                    }
                  />
                  <FieldItem
                    label="Policy Holder Name"
                    value={detail.insurance.policyHolderName}
                  />
                  <FieldItem
                    label="Health Insurance Plan"
                    value={detail.insurance.healthInsurancePlan}
                  />
                  <FieldItem
                    label="Health Insurance Number"
                    value={detail.insurance.healthInsuranceNumber}
                  />
                  <FieldItem
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

            {/* Section 3: Appointment Information */}
            <section className="space-y-5">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">
                  Appointment Information
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

                {savedCancelReason && (
                  <div className="col-span-full rounded-xl border border-rose-200 bg-rose-50/70 p-4">
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
          </CardContent>
        </Card>

        {/* Bottom Right Buttons */}
        <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
          <Button
            type="button"
            onClick={() =>
              router.push(
                `/dashboard/doctors/${detail.doctorId ?? 1}/appointment`,
              )
            }
            className="rounded-lg bg-sky-500 px-6 py-2.5 text-xs font-semibold text-white hover:bg-sky-600"
          >
            {isCanceled ? "Book Again" : "Reschedule Appointment"}
          </Button>

          {detail.status === "Active" && (
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
          )}
        </div>
      </main>

      {/* Modal 1: Note For Yourself */}
      {noteModalMode === "view" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close note modal"
            onClick={() => setNoteModalMode(null)}
            className="fixed inset-0 bg-slate-950/60"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setNoteModalMode(null)}
              className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                Note For Yourself
              </h3>
              {note && (
                <button
                  type="button"
                  aria-label="Delete note"
                  onClick={handleDeleteNote}
                  className="rounded-lg p-1.5 text-rose-500 transition-colors hover:bg-rose-50"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <p className="mt-4 min-h-[120px] whitespace-pre-line text-sm leading-relaxed text-slate-400">
              {note ||
                "No personal note added yet. Click Edit Note to add a reminder for this appointment."}
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                type="button"
                onClick={handleOpenEditNote}
                className="rounded-lg bg-sky-500 px-8 text-xs font-semibold text-white hover:bg-sky-600"
              >
                Edit Note
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Note */}
      {noteModalMode === "edit" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close edit note modal"
            onClick={() => setNoteModalMode(null)}
            className="fixed inset-0 bg-slate-950/60"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              onClick={() => setNoteModalMode(null)}
              className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <h3 className="mt-2 text-xl font-bold text-slate-900">Edit Note</h3>

            <form onSubmit={handleSaveNote} className="mt-4 space-y-5">
              <div>
                <label
                  htmlFor="appointment-note"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Note
                </label>
                <textarea
                  id="appointment-note"
                  rows={6}
                  value={draftNote}
                  onChange={(e) => setDraftNote(e.target.value)}
                  placeholder="Write a note for yourself..."
                  className="w-full resize-none rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-600 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="rounded-lg bg-sky-500 px-10 text-xs font-semibold text-white hover:bg-sky-600"
                >
                  Save
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Cancel Appointment */}
      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            disabled={canceling}
            onClick={() => setIsCancelOpen(false)}
            className="fixed inset-0 bg-slate-950/60"
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