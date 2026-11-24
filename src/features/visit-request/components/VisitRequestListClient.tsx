"use client";

import {
  ArrowRight,
  Calendar,
  Clock,
  Loader2,
  Star,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import type { VisitRequestWithRelations } from "@/features/visit-request/queries";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";

type TabType = "Active" | "Completed" | "Canceled";

export default function VisitRequestListClient({
  visitRequests = [],
}: {
  visitRequests: VisitRequestWithRelations[];
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("Active");

  // State modal review
  const [reviewTarget, setReviewTarget] =
    useState<VisitRequestWithRelations | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState<string | null>(null);

  const activeItems = visitRequests.filter(
    (item) => item.status === "Active" || item.status === "Referred",
  );
  const completedItems = visitRequests.filter(
    (item) => item.status === "Completed",
  );
  const canceledItems = visitRequests.filter(
    (item) => item.status === "Canceled",
  );

  const filteredItems =
    activeTab === "Active"
      ? activeItems
      : activeTab === "Completed"
        ? completedItems
        : canceledItems;

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "Active", label: "Active", count: activeItems.length },
    { key: "Completed", label: "Completed", count: completedItems.length },
    { key: "Canceled", label: "Canceled", count: canceledItems.length },
  ];

  const openReviewModal = (item: VisitRequestWithRelations) => {
    setReviewTarget(item);
    setRating(5);
    setReviewComment("");
    setReviewError(null);
  };

  const handleReviewSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!reviewTarget || submittingReview) return;

    if (!reviewComment.trim()) {
      setReviewError("Please write a short review comment.");
      return;
    }

    setSubmittingReview(true);
    setReviewError(null);

    try {
      const res = await fetch(`/api/visit-request/${reviewTarget.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          reviewComment: reviewComment.trim(),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Failed to submit review.");
      }

      setReviewTarget(null);
      router.refresh();
    } catch (err) {
      setReviewError(
        err instanceof Error ? err.message : "Failed to submit review.",
      );
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                isSelected
                  ? "bg-[#163A5F] text-white shadow-sm"
                  : "bg-white text-slate-600 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  isSelected
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-12 text-center shadow-sm">
          <p className="text-base font-semibold text-slate-800">
            No {activeTab.toLowerCase()} visit requests
          </p>
          <p className="mt-1 text-sm text-slate-500">
            {activeTab === "Active"
              ? "Schedule an appointment with one of our specialists from the dashboard."
              : `You don't have any ${activeTab.toLowerCase()} appointments yet.`}
          </p>
          {activeTab === "Active" && (
            <Link href="/doctors" className="mt-5 inline-block">
              <Button className="rounded-xl bg-[#1D9BF0] px-6 text-white hover:bg-[#1989d6]">
                Find a Doctor
              </Button>
            </Link>
          )}
        </div>
      ) : (
        /* Visit Request Cards */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredItems.map((item) => {
            const statusBadgeStyle =
              item.status === "Referred"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : item.status === "Active"
                  ? "bg-sky-50 text-sky-700 border-sky-200"
                  : item.status === "Completed"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : "bg-rose-50 text-rose-700 border-rose-200";

            return (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-sky-200"
              >
                <div>
                  {/* Header Card */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <Avatar className="h-12 w-12 border border-slate-100">
                        <AvatarImage
                          src={item.doctorAvatarUrl}
                          alt={item.doctorName}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-slate-100 font-bold text-[#163A5F]">
                          {item.doctorName.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {item.doctorName}
                        </h3>
                        <p className="text-xs font-medium text-sky-600">
                          {item.doctorSpecialty}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${statusBadgeStyle}`}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Badges Tambahan (Referred / Family) */}
                  {(item.referredByName || item.hasFamilyBadge) && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.referredByName && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700">
                          <UserCheck className="h-3.5 w-3.5" />
                          Referred by {item.referredByName}
                        </span>
                      )}
                      {item.hasFamilyBadge && (
                        <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          <Users className="h-3.5 w-3.5" />
                          Family Visit
                        </span>
                      )}
                    </div>
                  )}

                  {/* Metadata Jadwal */}
                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-sky-500" />
                      {item.preferredAppointmentTime}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-sky-500" />
                      {item.urgency}
                    </span>
                  </div>

                  {/* Reason for Visit */}
                  <p className="mt-3 line-clamp-2 text-sm text-slate-600">
                    {item.reasonForVisit}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                  {item.status === "Completed" ? (
                    item.rating ? (
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= (item.rating ?? 0)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-200"
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-xs font-medium text-slate-500">
                          ({item.rating}/5)
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => openReviewModal(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 transition hover:bg-amber-100"
                      >
                        <Star className="h-3.5 w-3.5" />
                        Give Review
                      </button>
                    )
                  ) : (
                    <span className="text-xs text-slate-400">
                      ID #{item.id}
                    </span>
                  )}

                  <Link
                    href={`/visit-request/${item.id}`}
                    className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-[#1D9BF0] transition hover:text-[#163A5F]"
                  >
                    <span>View Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Give Review */}
      {reviewTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            disabled={submittingReview}
            onClick={() => setReviewTarget(null)}
            className="fixed inset-0 bg-slate-950/60"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              disabled={submittingReview}
              onClick={() => setReviewTarget(null)}
              className="absolute top-4 right-4 flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200"
            >
              <X className="h-4 w-4" />
            </button>

            <h3 className="text-xl font-bold text-slate-900">
              Rate Your Consultation
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Share your experience with{" "}
              <span className="font-semibold text-slate-700">
                {reviewTarget.doctorName}
              </span>
            </p>

            <form onSubmit={handleReviewSubmit} className="mt-5 space-y-4">
              <div>
                <span className="mb-2 block text-xs font-semibold text-slate-700">
                  Rating
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="transition hover:scale-110"
                    >
                      <Star
                        className={`h-7 w-7 ${
                          star <= rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="visit-review-comment"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Review Comment
                </label>
                <textarea
                  id="visit-review-comment"
                  rows={4}
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your feedback about the doctor and consultation..."
                  disabled={submittingReview}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-sm text-slate-700 focus:border-sky-400 focus:bg-white focus:outline-none"
                />
              </div>

              {reviewError && (
                <p className="rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
                  {reviewError}
                </p>
              )}

              <div className="flex justify-end gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  disabled={submittingReview}
                  onClick={() => setReviewTarget(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submittingReview}
                  className="bg-[#1D9BF0] text-white hover:bg-[#1989d6]"
                >
                  {submittingReview ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
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
