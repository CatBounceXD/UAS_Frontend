"use client";

import { ChevronRight, Loader2, Star, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export interface VisitRequestItem {
  id: number;
  doctorId: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  preferredAppointmentTime: string;
  urgency: string;
  reasonForVisit: string;
  recommendationComment?: string | null;
  reviewComment?: string | null;
  cancelReason?: string | null;
  status: string;
  rating?: number | null;
  hasFamilyBadge: boolean;
}

type TabOption = "Completed" | "Canceled";

const TABS: TabOption[] = ["Completed", "Canceled"];

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

export default function VisitRequestListClient({
  userName,
}: {
  userName: string;
}) {
  const [items, setItems] = useState<VisitRequestItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabOption>("Completed");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch("/api/visit-request")
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat daftar kunjungan.");
        }
        return (json?.data ?? []) as VisitRequestItem[];
      })
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Gagal memuat daftar kunjungan.",
          );
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  const upcomingItem = items.find(
    (item) => item.status === "Active" || item.status === "Referred",
  );

  const filteredItems =
    activeTab === "Canceled"
      ? items.filter((item) => item.status === "Canceled")
      : items
          .filter((item) => item.status !== "Canceled")
          .sort((a, b) => {
            const aActive = a.status === "Active" || a.status === "Referred";
            const bActive = b.status === "Active" || b.status === "Referred";
            if (aActive === bActive) return 0;
            return aActive ? -1 : 1;
          });

  return (
    <div className="space-y-8 text-slate-800">
      {/* Header + Upcoming Appointment Banner */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Hi {userName},</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back {userName}
          </h1>
        </div>

        {upcomingItem && (
          <Link
            href={`/visit-request/${upcomingItem.id}`}
            className="rounded-xl bg-sky-100/80 px-4 py-2.5 text-left transition-colors hover:bg-sky-100"
          >
            <p className="text-xs font-bold text-sky-500">
              Upcoming Appointment
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-[11px] font-medium text-sky-500">
              <span>8:00 AM - 4:00 PM</span>
              <ChevronRight className="h-3 w-3" />
            </p>
          </Link>
        )}
      </div>

      {/* Main White Container */}
      <div className="min-h-[420px] rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="inline-flex overflow-hidden rounded-lg bg-sky-50">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-7 py-2.5 text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-sky-500 text-white"
                    : "text-sky-500 hover:bg-sky-100/70"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center gap-2 text-sm text-slate-400">
            <Loader2 className="h-5 w-5 animate-spin text-sky-500" />
            <span>Memuat riwayat kunjungan...</span>
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-600">
            {error}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-12 text-center text-sm text-slate-400">
            Belum ada riwayat kunjungan pada tab {activeTab}.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredItems.map((item) => {
              const isOngoing =
                item.status === "Active" || item.status === "Referred";
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
                  : item.reviewComment ||
                    item.recommendationComment ||
                    item.reasonForVisit;

              return (
                <Link
                  key={item.id}
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
                    {isCompleted && (
                      <StarRatingDisplay rating={item.rating ?? 4} />
                    )}
                    <p className="line-clamp-3 text-xs leading-relaxed text-slate-400">
                      &ldquo;{quoteText}&rdquo;
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}