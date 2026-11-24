"use client";

import { useState } from "react";
import type { SurgeryRecord } from "@/features/surgery/queries";
import SurgeryCard from "./SurgeryCard";

type TabStatus = "Active" | "Completed" | "Canceled";

const TABS: TabStatus[] = ["Active", "Completed", "Canceled"];

export default function SurgeryListClient({
  surgeries,
}: {
  surgeries: SurgeryRecord[];
}) {
  const [activeTab, setActiveTab] = useState<TabStatus>("Active");

  const filteredItems = surgeries.filter((item) => item.status === activeTab);

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
          Belum ada jadwal surgery dengan status {activeTab}.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {filteredItems.map((item) => (
            <SurgeryCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
