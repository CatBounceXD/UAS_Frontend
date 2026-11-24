import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import VisitRequestDetailActions from "@/features/visit-request/components/VisitRequestDetailActions";
import VisitRequestDetailInfo from "@/features/visit-request/components/VisitRequestDetailInfo";
import { getVisitRequestDetailById } from "@/features/visit-request/queries";
import { auth } from "@/lib/auth";

export default async function VisitRequestDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const detail = await getVisitRequestDetailById(numericId, session.user.id);

  if (!detail) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8 text-slate-800">
      <div>
        <Link
          href="/visit-request"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Visit Request
        </Link>
      </div>

      <VisitRequestDetailInfo detail={detail} />

      <VisitRequestDetailActions
        visitRequestId={detail.id}
        doctorId={detail.doctorId}
        status={detail.status}
      />
    </div>
  );
}
