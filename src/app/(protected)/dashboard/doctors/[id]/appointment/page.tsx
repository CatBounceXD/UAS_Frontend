import { notFound } from "next/navigation";
import DoctorAppointmentClient from "@/features/doctors/components/DoctorAppointmentClient";
import { getDoctorById } from "@/features/doctors/queries";

export default async function DoctorAppointmentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (Number.isNaN(numericId)) {
    notFound();
  }

  const doctor = await getDoctorById(numericId);

  if (!doctor) {
    notFound();
  }

  return <DoctorAppointmentClient doctor={doctor} />;
}
