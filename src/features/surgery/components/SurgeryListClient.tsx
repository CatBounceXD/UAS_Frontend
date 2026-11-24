"use client";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export interface SurgeryItem {
  id: number;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatarUrl: string;
  status: string;
  suggestionNote: string;
  preferredAppointmentTime: string;
  urgency: string;
}

type TabStatus = "Active" | "Completed" | "Canceled";

const TABS: TabStatus[] = ["Active", "Completed", "Canceled"];

export default function SurgeryListClient({ userName }: { userName: string }) {
  const [items, setItems] = useState<SurgeryItem[]>([]);
  const [activeTab, setActiveTab] = useState<TabStatus>("Active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    fetch("/api/surgery")
      .then(async (res) => {
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(json?.error || "Gagal memuat daftar surgery.");
        }
        return (json?.data ?? []) as SurgeryItem[];
      })
      .then((data) => {
        if (mounted) setItems(data);
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Gagal memuat daftar surgery.",
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

  const filteredItems = items.filter((item) => item.status === activeTab);

  return (
    <div className="space-y-8 text-slate-800">
      <div>
        <p className="text-sm text-slate-500">Hi {userName},</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome Back {userName}
        </h1>
      </div>

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
            <span>Memuat jadwal surgery...</span>
          </div>
        ) : error ? (
          <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 p-6 text-center text-sm text-rose-600">
            {error}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-12 text-center text-sm text-slate-400">
            Belum ada jadwal surgery dengan status {activeTab}.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
            {filteredItems.map((item) => (
              <Link
                key={item.id}
                href={`/surgery/${item.id}`}
                className="block rounded-xl border border-slate-200/80 bg-white p-6 transition-all hover:border-sky-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
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

                <hr className="my-4 border-slate-100" />

                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    Suggestion Note
                  </p>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-400">
                    “{item.suggestionNote}”
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
