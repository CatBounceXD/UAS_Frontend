import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import SurgeryDetailActions from "@/features/surgery/components/SurgeryDetailActions";
import SurgeryDetailInfo from "@/features/surgery/components/SurgeryDetailInfo";
import { getSurgeryById } from "@/features/surgery/queries";
import { auth } from "@/lib/auth";

export default async function SurgeryDetailPage({
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

  const detail = await getSurgeryById(numericId, session.user.id);

  if (!detail) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-8 text-slate-800">
      <div>
        <Link
          href="/surgery"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-sky-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Surgery
        </Link>
      </div>

      <SurgeryDetailInfo detail={detail} />

      <SurgeryDetailActions surgeryId={detail.id} status={detail.status} />
    </div>
  );
}