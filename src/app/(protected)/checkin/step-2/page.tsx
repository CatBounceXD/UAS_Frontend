"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createCheckIn } from "../../../../features/checkin/actions";

export default function CheckInStep2() {
  const router = useRouter();

  const [countdown, setCountdown] = useState(10);
  const [isApproved, setIsApproved] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const patientData = sessionStorage.getItem("checkInPatient");

    if (!patientData) {
      router.replace("/checkin/step-1");
      return;
    }

    setHasData(true);
  }, [router]);

  useEffect(() => {
    if (!hasData || isApproved) return;

    if (countdown === 0) {
      setIsApproved(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, hasData, isApproved]);

  const handleContinue = async () => {
    if (isSaving) return;

    setIsSaving(true);
    setError("");

    try {
      const savedResult = sessionStorage.getItem("checkInResult");

      if (savedResult) {
        const previousResult = JSON.parse(savedResult);

        if (
          previousResult.appointmentTime &&
          previousResult.room &&
          previousResult.floor !== undefined
        ) {
          router.push("/checkin/step-3");
          return;
        }

        sessionStorage.removeItem("checkInResult");
      }

      const patientData = sessionStorage.getItem("checkInPatient");

      if (!patientData) {
        router.replace("/checkin/step-1");
        return;
      }

      const result = await createCheckIn(JSON.parse(patientData));

      if (!result.success) {
        setError(result.message ?? "Data check-in gagal disimpan.");
        return;
      }

      sessionStorage.setItem(
        "checkInResult",
        JSON.stringify({
          id: result.id,
          queueNumber: result.queueNumber,
          appointmentTime: result.appointmentTime,
          room: result.room,
          floor: result.floor,
        }),
      );

      router.push("/checkin/step-3");
    } catch (error) {
      console.error(error);
      setError("Terjadi kesalahan. Silakan coba kembali.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="mb-2 text-sm font-semibold text-blue-600">
          PATIENT CHECK-IN
        </p>

        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          {isApproved ? "Verification Complete!" : "Wait For Verification"}
        </h1>

        <p className="mb-8 text-gray-500">
          {isApproved
            ? "Your patient information has been successfully verified."
            : "Please wait while we verify your patient information."}
        </p>

        <div className="mb-8 rounded-xl bg-gray-50 p-8">
          {isApproved ? (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
                ✓
              </div>

              <h2 className="mb-2 text-xl font-bold text-green-600">
                Approved
              </h2>

              <p className="text-sm text-gray-500">
                Your information has been successfully verified.
              </p>
            </>
          ) : (
            <>
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-3xl font-bold text-blue-600">
                {countdown}
              </div>

              <h2 className="mb-2 text-xl font-bold text-gray-800">
                Pending Verification
              </h2>

              <p className="text-sm text-gray-500">
                Automatic verification in progress...
              </p>

              <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all duration-1000"
                  style={{
                    width: `${((10 - countdown) / 10) * 100}%`,
                  }}
                />
              </div>

              <p className="mt-3 text-sm text-gray-500">
                Please wait {countdown} seconds
              </p>
            </>
          )}
        </div>

        {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

        {isApproved && (
          <button
            type="button"
            onClick={handleContinue}
            disabled={isSaving}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving Check-In..." : "Continue to Your Turn"}
          </button>
        )}

        {!isApproved && (
          <p className="text-sm text-gray-400">
            Please do not close this page.
          </p>
        )}
      </div>
    </main>
  );
}
