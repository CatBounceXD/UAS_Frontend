import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#F9FAFB] px-4 text-center">
      <div className="max-w-lg rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-[#163A5F]">
          Orthopaedic Center
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          Silakan masuk ke Dashboard untuk melihat daftar dokter dan menjadwalkan
          konsultasi.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-[#1D9BF0] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#1989d6]"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/login"
            className="rounded-lg border border-slate-200 px-6 py-2.5 text-sm font-medium text-[#163A5F] transition hover:bg-slate-50"
          >
            Login
          </Link>
        </div>
      </div>
    </main>
  );
}