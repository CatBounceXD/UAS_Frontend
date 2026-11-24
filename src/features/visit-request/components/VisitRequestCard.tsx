import { Star, Users } from "lucide-react";
import Link from "next/link";
import type { VisitRequestWithRelations } from "@/features/visit-request/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

function StarRatingDisplay({ rating }: { rating: number }) {
  return (
    <div className="mb-2 flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-3.5 w-3.5 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function VisitRequestCard({
  item,
}: {
  item: VisitRequestWithRelations;
}) {
  const isOngoing = item.status === "Active" || item.status === "Referred";
  const isCompleted = item.status === "Completed";

  const badgeText = isOngoing
    ? "Active"
    : isCompleted
      ? "Complete"
      : "Canceled";

  const badgeClass = isOngoing
    ? "bg-sky-50 text-sky-500"
    : isCompleted
      ? "bg-emerald-50 text-emerald-500"
      : "bg-rose-50 text-rose-500";

  const quoteText =
    item.status === "Canceled" && item.cancelReason
      ? item.cancelReason
      : item.reviewComment || item.recommendationComment || item.reasonForVisit;

  return (
    <Link
      href={`/visit-request/${item.id}`}
      className="block rounded-xl border border-slate-200/80 bg-white p-6 transition-all hover:border-sky-200 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <Avatar className="h-16 w-16 border border-slate-100">
              <AvatarImage
                src={item.doctorAvatarUrl}
                alt={item.doctorName}
                className="object-cover"
              />
              <AvatarFallback className="font-semibold">
                {item.doctorName.substring(0, 2)}
              </AvatarFallback>
            </Avatar>

            {item.hasFamilyBadge && (
              <span className="absolute -right-0.5 -bottom-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-amber-400 text-white shadow-xs">
                <Users className="h-2.5 w-2.5" />
              </span>
            )}
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              {item.doctorName}
            </h2>
            <p className="text-xs font-semibold text-sky-500">
              {item.doctorSpecialty}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">
              {item.preferredAppointmentTime}, {item.urgency}
            </p>
          </div>
        </div>

        <span
          className={`shrink-0 rounded-full px-5 py-1.5 text-xs font-semibold ${badgeClass}`}
        >
          {badgeText}
        </span>
      </div>

      <hr className="my-4 border-slate-100" />

      <div>
        {isCompleted && <StarRatingDisplay rating={item.rating ?? 4} />}
        <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">
          &ldquo;{quoteText}&rdquo;
        </p>
      </div>
    </Link>
  );
}
