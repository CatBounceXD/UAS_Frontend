import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-2">
            <h2 className="text-lg font-bold text-[#163A5F]">
              Orthopaedic Center E-Health
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-slate-500">
              Modern patient portal for specialist appointments, surgical
              consultations, online check-in, and orthopedic health education.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#163A5F]">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="transition hover:text-[#1D9BF0]">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/resource"
                  className="transition hover:text-[#1D9BF0]"
                >
                  Resources & Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-[#1D9BF0]"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#163A5F]">
              Patient Services
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="transition hover:text-[#1D9BF0]"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/visit-request"
                  className="transition hover:text-[#1D9BF0]"
                >
                  Visit Requests
                </Link>
              </li>
              <li>
                <Link
                  href="/surgery"
                  className="transition hover:text-[#1D9BF0]"
                >
                  Surgery Schedule
                </Link>
              </li>
              <li>
                <Link
                  href="/checkin/step-1"
                  className="transition hover:text-[#1D9BF0]"
                >
                  Patient Check-In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-xs text-slate-400 sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Orthopaedic Center E-Health. All
            rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/resource" className="hover:text-[#1D9BF0]">
              Patient Guide
            </Link>
            <Link href="/contact" className="hover:text-[#1D9BF0]">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}