"use client";

import { useState } from "react";
import type { VisitRequestWithRelations } from "@/features/visit-request/queries";
import VisitRequestCard from "./VisitRequestCard";

type TabOption = "Completed" | "Canceled";

const TABS: TabOption[] = ["Completed", "Canceled"];

export default function VisitRequestListClient({
  items,
}: {
  items: VisitRequestWithRelations[];
}) {
  const [activeTab, setActiveTab] = useState<TabOption>("Completed");

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

      {filteredItems.length === 0 ? (
        <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/50 p-12 text-center text-sm text-slate-400">
          Belum ada riwayat kunjungan pada tab {activeTab}.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredItems.map((item) => (
            <VisitRequestCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
