import type { SurgeryRecord } from "@/features/surgery/queries";
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

export default function SurgeryDetailInfo({
  detail,
}: {
  detail: SurgeryRecord;
}) {
  const badgeLabel =
    detail.status === "Active"
      ? "On Going Appointment"
      : detail.status === "Completed"
        ? "Completed Appointment"
        : "Canceled Appointment";

  const badgeStyle =
    detail.status === "Active"
      ? "bg-sky-50 text-sky-500"
      : detail.status === "Completed"
        ? "bg-emerald-50 text-emerald-600"
        : "bg-rose-50 text-rose-500";

  return (
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
                <span className="font-semibold text-sky-500">Speciality :</span>{" "}
                {detail.specialtySummary}
              </p>
              {detail.procedures?.length > 0 && (
                <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5 text-xs text-slate-400">
                  {detail.procedures.map((proc) => (
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

        {/* Section: Recommendation */}
        {detail.recommendationComment && (
          <section className="space-y-4">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900">
                Recommendation
              </h2>
            </div>
            <div>
              <p className="text-xs text-slate-400">Comment</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                {detail.recommendationComment}
              </p>
            </div>
          </section>
        )}

        {/* Section: Suggestion Note */}
        <section className="space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Suggestion Note
            </h2>
          </div>
          <div>
            <p className="text-xs text-slate-400">Surgery Recommendation</p>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
              {detail.suggestionNote}
            </p>
          </div>
        </section>

        {/* Section: Patient Information */}
        <section className="space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Patient Information
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <FieldItem label="Name" value={detail.patientName} />
            <FieldItem label="Email" value={detail.patientEmail} />
            <FieldItem label="Date of Birth" value={detail.patientDob} />
            <FieldItem label="Address Line 1" value={detail.addressLine1} />
            <FieldItem
              label="Address Line 2"
              value={detail.addressLine2 || "-"}
            />
            <FieldItem label="City" value={detail.city} />
            <FieldItem label="State" value={detail.state} />
            <FieldItem label="Zipcode" value={detail.zipcode} />
            <FieldItem label="Contact Info" value={detail.contactInfo} />
            <FieldItem
              label="How did you hear about us"
              value={detail.referralSource || "-"}
            />
            <FieldItem
              label="How may we contact you"
              value={detail.preferredContactMethod}
            />
            <FieldItem
              label="Social Security Number"
              value={detail.ssn || "-"}
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
              value={detail.isPolicyHolderSameAsPatient ? "Yes" : "No"}
            />
            <FieldItem
              label="Policy Holder Name"
              value={detail.policyHolderName}
            />
            <FieldItem
              label="Health Insurance Plan"
              value={detail.healthInsurancePlan}
            />
            <FieldItem
              label="Health Insurance Number"
              value={detail.healthInsuranceNumber}
            />
            <FieldItem label="Group Number" value={detail.groupNumber || "-"} />
          </div>
        </section>

        {/* Section: Appointment Information */}
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
      </CardContent>
    </Card>
  );
}
