import { ChevronRight } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import VisitRequestListClient from "@/features/visit-request/components/VisitRequestListClient";
import { getVisitRequestsByUserId } from "@/features/visit-request/queries";
import { auth } from "@/lib/auth";

export default async function VisitRequestPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const userName = session.user.name || "John";
  const items = await getVisitRequestsByUserId(session.user.id);

  const upcomingItem = items.find(
    (item) => item.status === "Active" || item.status === "Referred",
  );

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

      <VisitRequestListClient items={items} />
    </div>
  );
}
