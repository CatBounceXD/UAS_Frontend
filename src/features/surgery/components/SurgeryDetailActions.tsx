"use client";

import { AlertCircle, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { Button } from "@/shared/components/ui/button";

export default function SurgeryDetailActions({
  surgeryId,
  status,
}: {
  surgeryId: number;
  status: string;
}) {
  const router = useRouter();
  const [accepting, setAccepting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelError, setCancelError] = useState<string | null>(null);
  const [canceling, setCanceling] = useState(false);

  if (status !== "Active") {
    return null;
  }

  const handleAcceptSurgery = async () => {
    setAccepting(true);
    setActionError(null);
    try {
      const res = await fetch(`/api/surgery/${surgeryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Completed" }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Gagal menerima jadwal surgery.");
      }
      router.push("/surgery");
      router.refresh();
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : "Gagal menerima jadwal surgery.",
      );
    } finally {
      setAccepting(false);
    }
  };

  const handleCancelSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!cancelReason.trim()) {
      setCancelError("Please enter a reason for cancellation.");
      return;
    }

    setCanceling(true);
    setCancelError(null);

    try {
      const res = await fetch(`/api/surgery/${surgeryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: "Canceled",
          cancelReason: cancelReason.trim(),
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Gagal membatalkan appointment.");
      }

      setIsCancelOpen(false);
      router.refresh();
    } catch (err: unknown) {
      setCancelError(
        err instanceof Error ? err.message : "Gagal membatalkan appointment.",
      );
    } finally {
      setCanceling(false);
    }
  };

  return (
    <>
      {actionError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs text-rose-600">
          {actionError}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
        <Button
          type="button"
          disabled={accepting}
          onClick={handleAcceptSurgery}
          className="rounded-lg bg-sky-500 px-10 py-2.5 text-xs font-semibold text-white hover:bg-sky-600"
        >
          {accepting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Accepting...
            </>
          ) : (
            "Accept"
          )}
        </Button>

        <Button
          type="button"
          disabled={accepting}
          onClick={() => {
            setCancelReason("");
            setCancelError(null);
            setIsCancelOpen(true);
          }}
          className="rounded-lg bg-rose-500 px-6 py-2.5 text-xs font-semibold text-white hover:bg-rose-600"
        >
          Cancel Appointment
        </Button>
      </div>

      {isCancelOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close modal"
            disabled={canceling}
            onClick={() => setIsCancelOpen(false)}
            className="fixed inset-0 bg-slate-950/60"
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-7 shadow-xl">
            <button
              type="button"
              aria-label="Close"
              disabled={canceling}
              onClick={() => setIsCancelOpen(false)}
              className="absolute top-4 right-4 flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-white hover:bg-slate-700"
            >
              <X className="h-3.5 w-3.5" />
            </button>

            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Cancel Appointment
            </h3>

            <form onSubmit={handleCancelSubmit} className="mt-4 space-y-5">
              <div>
                <label
                  htmlFor="cancel-reason"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Reason
                </label>
                <textarea
                  id="cancel-reason"
                  rows={5}
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Type here.."
                  disabled={canceling}
                  className="w-full resize-none rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>

              {cancelError && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-600">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{cancelError}</span>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={canceling}
                  className="rounded-lg bg-sky-500 px-6 text-xs font-semibold text-white hover:bg-sky-600"
                >
                  {canceling ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Canceling...
                    </>
                  ) : (
                    "Cancel Appointment"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
