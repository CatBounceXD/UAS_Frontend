import { redirect } from "next/navigation";

export default async function DoctorDetailRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/doctors/${id}`);
}
