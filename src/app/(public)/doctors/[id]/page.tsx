import { ArrowLeft } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import DoctorDetailView from "@/features/doctors/components/DoctorDetailView";
import { getDoctorById } from "@/features/doctors/queries";
import { auth } from "@/lib/auth";

export default async function PublicDoctorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, session] = await Promise.all([
    params,
    auth.api.getSession({ headers: await headers() }),
  ]);

  const numericId = Number(id);
  if (Number.isNaN(numericId)) {
    notFound();
  }

  const doctor = await getDoctorById(numericId);
  if (!doctor) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        href="/doctors"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#1D9BF0]"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Doctors</span>
      </Link>

      <DoctorDetailView doctor={doctor} isAuthenticated={Boolean(session)} />
    </div>
  );
}
