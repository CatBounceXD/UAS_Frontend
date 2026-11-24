import { Star } from "lucide-react";
import type { VisitRequestDetailRecord } from "@/features/visit-request/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Card, CardContent } from "@/shared/components/ui/card";

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

export default function VisitRequestDetailInfo({
  detail,
}: {
  detail: VisitRequestDetailRecord;
}) {
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
                <span className="font-semibold text-sky-500">Speciality :</span>{" "}
                {specialtySummary}
              </p>
              {procedures.length > 0 && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 text-xs text-slate-400">
                  {procedures.map((proc) => (
                    <li key={proc}>&bull; {proc}</li>
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
            <h2 className="text-base font-bold text-slate-900">Referred by</h2>
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
            <FieldItem label="Name" value={detail.patient?.name || "-"} />
            <FieldItem label="Email" value={detail.patient?.email || "-"} />
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
            <FieldItem label="City" value={detail.patient?.city || "-"} />
            <FieldItem label="State" value={detail.patient?.state || "-"} />
            <FieldItem label="Zipcode" value={detail.patient?.zipcode || "-"} />
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
  );
}
