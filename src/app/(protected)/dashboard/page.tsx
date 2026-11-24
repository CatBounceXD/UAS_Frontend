import { headers } from "next/headers";
import Link from "next/link";
import DoctorCard from "@/features/doctors/components/DoctorCard";
import { getAllDoctors } from "@/features/doctors/queries";
import { auth } from "@/lib/auth";
import { Button } from "@/shared/components/ui/button";

export default async function DashboardPage() {
  const [session, doctorList] = await Promise.all([
    auth.api.getSession({ headers: await headers() }),
    getAllDoctors(),
  ]);

  const userName = session?.user?.name || "Patient";

  return (
    <div className="space-y-8 text-slate-800">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Hi {userName},</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome Back {userName}
          </h1>
        </div>
        <Link href="/checkin">
          <Button className="rounded-full bg-sky-500 px-6 py-2.5 font-medium text-white shadow-sm hover:bg-sky-600">
            Check - In
          </Button>
        </Link>
      </div>

      {doctorList.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Data dokter belum tersedia. Jalankan <code>npm run db:seed</code>{" "}
          terlebih dahulu.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {doctorList.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  );
}
