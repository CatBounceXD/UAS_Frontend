
"use client";

import { useRouter } from "next/navigation";

export default function CheckInStep3() {
  const router = useRouter();

  const queueInformation = [
    {
      title: "Appointment Time",
      value: "To Be Announced",
      description: "Your appointment schedule",
    },
    {
      title: "Patient Number",
      value: "Not Assigned",
      description: "Your queue number",
    },
    {
      title: "Room Number",
      value: "To Be Announced",
      description: "Your consultation room",
    },
    {
      title: "Floor Number",
      value: "To Be Announced",
      description: "Your consultation floor",
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">

        {/* Header */}
        <p className="mb-2 text-sm font-semibold text-blue-600">
          PATIENT CHECK-IN
        </p>

        <h1 className="mb-2 text-3xl font-bold text-gray-800">
          Your Queue Information
        </h1>

        <p className="mb-8 text-gray-500">
          Your check-in has been completed. Please check your appointment
          and queue information below.
        </p>

        {/* Status */}
        <div className="mb-8 flex items-center gap-3 rounded-xl bg-green-50 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-xl text-green-600">
            ✓
          </div>

          <div>
            <h2 className="font-semibold text-green-700">
              Check-In Successful
            </h2>

            <p className="text-sm text-green-600">
              Your information has been verified.
            </p>
          </div>
        </div>

        {/* Queue Information */}
        <h2 className="mb-4 text-lg font-bold text-gray-800">
          Appointment Details
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {queueInformation.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-gray-200 p-5"
            >
              <p className="mb-2 text-sm text-gray-500">
                {item.title}
              </p>

              <p className="mb-1 text-lg font-bold text-gray-800">
                {item.value}
              </p>

              <p className="text-xs text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Information */}
        <div className="mt-6 rounded-xl bg-blue-50 p-4">
          <p className="text-sm leading-relaxed text-blue-700">
            Please wait for your appointment details to be updated.
            Make sure to arrive on time and follow the instructions
            provided by the healthcare staff.
          </p>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => router.push("/checkin/step-2")}
            className="w-full rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Back
          </button>

          <button
            type="button"
            onClick={() => router.push("/checkin/step-4")}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </main>
  );
}
