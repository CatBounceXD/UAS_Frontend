import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import SurgeryDetailActions from "@/features/surgery/components/SurgeryDetailActions";
import SurgeryDetailInfo from "@/features/surgery/components/SurgeryDetailInfo";
import { getSurgeryById } from "@/features/surgery/queries";

export default async function SurgeryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const detail = await getSurgeryById(numericId);

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
