
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Upload,
  FileImage,
  FileText,
  Check,
  Trash2,
  CircleCheck,
} from "lucide-react";

const documents = [
  { id: "id-card", title: "ID Card", icon: FileImage },
  { id: "selfie", title: "Selfie Photo", icon: FileImage },
  { id: "insurance", title: "Insurance Card", icon: FileImage },
  { id: "medication", title: "Medication List", icon: FileText },
  { id: "allergy", title: "Allergy List", icon: FileText },
];

const resources = [
  {
    title: "Mako Total Hip Replacement",
    description:
      "Learn more about Stryker's Mako Total Hip replacement.",
    image: "/Resource1.png",
  },
  {
    title: "Orthopedic Treatment",
    description:
      "Learn more about orthopedic treatment and patient care.",
    image: "/Resource2.png",
  },
  {
    title: "Patient Recovery",
    description:
      "Discover information about patient recovery.",
    image: "/Resource3.jpg",
  },
  {
    title: "Advanced Healthcare",
    description:
      "Explore the latest healthcare information.",
    image: "/Resource4.jpg",
  },
];

export default function CheckInPage() {
  const [uploadedFiles, setUploadedFiles] = useState<
    Record<string, File | null>
  >({});

  const [message, setMessage] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [rating, setRating] = useState(0);
const [review, setReview] = useState("");
const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const allDocumentsUploaded = documents.every(
    (doc) => uploadedFiles[doc.id]
  );

  function handleFileChange(id: string, file: File | null) {
    setUploadedFiles((previous) => ({
      ...previous,
      [id]: file,
    }));

    setMessage("");
  }

 function handleContinue() {
  if (!allDocumentsUploaded) {
    setMessage("Please upload all required documents first.");
    return;
  }

  setCurrentStep(2);
  setMessage("");
}


if (currentStep === 2) {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white px-4 py-8 shadow-sm md:px-8">

        {/* Progress Steps */}
        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-sky-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
              <Check size={16} />
            </span>
            <span className="text-[10px] font-medium sm:text-xs">
              Documents
            </span>
          </div>

          <div className="h-[2px] flex-1 bg-sky-400" />

          <div className="flex items-center gap-2 text-sky-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
              <Check size={16} />
            </span>
            <span className="text-[10px] font-medium sm:text-xs">
              Verification
            </span>
          </div>

          <div className="h-[2px] flex-1 bg-slate-200" />

          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
              3
            </span>
            <span className="text-[10px] sm:text-xs">Your Turn</span>
          </div>

          <div className="h-[2px] flex-1 bg-slate-200" />

          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
              4
            </span>
            <span className="text-[10px] sm:text-xs">Review</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#123d70] sm:text-3xl">
            Wait For <span className="text-sky-500">Verification</span>
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Your documents have been submitted successfully.
          </p>
        </div>

        {/* Verification Status */}
        <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-sky-200 bg-sky-50 p-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-sky-500">
            <FileText size={28} />
          </div>

          <h2 className="text-lg font-semibold text-[#123d70]">
            Waiting for Verification
          </h2>

          <p className="mt-2 text-xs leading-relaxed text-slate-500">
            Your documents are ready and waiting to be reviewed.
            Please wait while the verification process is completed.
          </p>

          <span className="mt-4 inline-block rounded-full bg-amber-100 px-4 py-2 text-[11px] font-medium text-amber-700">
            Pending Verification
          </span>
        </div>

        {/* Uploaded Documents */}
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-4 text-sm font-semibold text-[#123d70]">
            Submitted Documents
          </h2>

          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-sky-50 p-2 text-sky-500">
                    <FileText size={20} />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-medium text-[#123d70]">
                      {doc.title}
                    </p>
                    <p className="truncate text-[10px] text-slate-400">
                      {uploadedFiles[doc.id]?.name}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 text-[10px] font-medium text-amber-600">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
<div className="mx-auto mt-8 flex max-w-3xl justify-between gap-3">

  <button
    type="button"
    onClick={() => setCurrentStep(1)}
    className="rounded-lg border border-sky-500 px-6 py-3 text-xs font-medium text-sky-600 hover:bg-sky-50"
  >
    Back to Documents
  </button>

  <button
    type="button"
    onClick={() => setCurrentStep(3)}
    className="rounded-lg bg-sky-500 px-6 py-3 text-xs font-medium text-white hover:bg-sky-600"
  >
    Continue to Your Turn
  </button>

</div>
</div>
</main>
  );
}
            


if (currentStep === 3) {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white px-4 py-8 shadow-sm md:px-8">

        {/* Progress Steps */}
        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2 text-sky-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
              <Check size={16} />
            </span>
            <span className="text-[10px] font-medium sm:text-xs">Documents</span>
          </div>

          <div className="h-[2px] flex-1 bg-sky-400" />

          <div className="flex items-center gap-2 text-sky-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
              <Check size={16} />
            </span>
            <span className="text-[10px] font-medium sm:text-xs">Verification</span>
          </div>

          <div className="h-[2px] flex-1 bg-sky-400" />

          <div className="flex items-center gap-2 text-sky-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-white">
              3
            </span>
            <span className="text-[10px] font-medium sm:text-xs">Your Turn</span>
          </div>

          <div className="h-[2px] flex-1 bg-slate-200" />

          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">4</span>
            <span className="text-[10px] sm:text-xs">Review</span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#123d70] sm:text-3xl">
            Wait For <span className="text-sky-500">Your Turn</span>
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Your documents have been verified. Please check your appointment details.
          </p>
        </div>

        {/* Appointment Information */}
        <div className="mx-auto max-w-3xl rounded-xl border border-sky-200 bg-sky-50 p-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-sky-500">
              <FileText size={28} />
            </div>
            <h2 className="text-lg font-semibold text-[#123d70]">
              Appointment Information
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Please review your appointment details below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-slate-400">Appointment Time</p>
              <p className="mt-2 text-sm font-semibold text-[#123d70]">
                To Be Announced
              </p>
            </div>

            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-slate-400">Patient Number</p>
              <p className="mt-2 text-sm font-semibold text-[#123d70]">
                Not Assigned
              </p>
            </div>

            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-slate-400">Room Number</p>
              <p className="mt-2 text-sm font-semibold text-[#123d70]">
                To Be Announced
              </p>
            </div>

            <div className="rounded-lg bg-white p-4">
              <p className="text-xs text-slate-400">Floor Number</p>
              <p className="mt-2 text-sm font-semibold text-[#123d70]">
                To Be Announced
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-white p-4">
            <p className="text-xs font-medium text-[#123d70]">Notes</p>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              Please arrive before your scheduled appointment and
              follow the instructions provided by the hospital staff.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
          <p className="text-sm font-semibold text-amber-700">
            Waiting For Your Turn
          </p>
          <p className="mt-1 text-xs text-amber-600">
            Please wait for your appointment information to be confirmed.
          </p>
        </div>

        {/* Navigation */}
        <div className="mx-auto mt-8 flex max-w-3xl flex-col justify-between gap-3 sm:flex-row">
          <button
          type="button"
            onClick={() => setCurrentStep(2)}
            className="rounded-lg border border-slate-200 px-6 py-3 text-xs font-medium text-slate-500 hover:bg-slate-50"
          >
            Back to Verification
          </button>

          <button
            type="button"
            onClick={() => setCurrentStep(4)}
            className="rounded-lg bg-sky-500 px-6 py-3 text-xs font-medium text-white hover:bg-sky-600"
          >
            Continue
          </button>
                </div> 

      </div>
    </main>
  );
}


if (currentStep === 4) {
  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white px-4 py-8 shadow-sm md:px-8">

        <div className="mb-10 text-center">
          <h1 className="text-2xl font-bold text-[#123d70] sm:text-3xl">
            Review Your <span className="text-sky-500">Visit</span>
          </h1>
          <p className="mt-2 text-xs text-slate-400">
            Thank you for choosing our healthcare service.
          </p>
        </div>

        {reviewSubmitted ? (
          <div className="mx-auto max-w-xl rounded-xl bg-sky-50 p-8 text-center">
            <CircleCheck size={48} className="mx-auto mb-4 text-sky-500" />
            <h2 className="text-xl font-bold text-[#123d70]">
              Thank You for Your Feedback!
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Your review has been submitted successfully.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-xl border border-slate-200 p-6 text-center">
            <h2 className="text-lg font-semibold text-[#123d70]">
              How Was Your Experience?
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Please rate your visit with us.
            </p>

            <div className="my-6 flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl ${
                    rating >= star ? "text-yellow-400" : "text-slate-300"
                  }`}
                  aria-label={`Rate ${star} stars`}
                >
                  ★
                </button>
              ))}
            </div>

            <div className="text-left">
              <label
                htmlFor="review"
                className="mb-2 block text-sm font-medium text-[#123d70]"
                >
                Your Feedback
                </label>
              <textarea
                id="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Share your experience..."
                className="min-h-32 w-full rounded-lg border border-slate-200 p-3 text-sm outline-none focus:border-sky-400"
              />
            </div>

            <button
              type="button"
              disabled={rating === 0}
              onClick={() => setReviewSubmitted(true)}
              className="mt-6 w-full rounded-lg bg-sky-500 px-6 py-3 text-sm font-medium text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Submit Review
            </button>
          </div>
        )}

        <div className="mx-auto mt-8 max-w-xl">
          <button
            type="button"
            onClick={() => setCurrentStep(3)}
            className="rounded-lg border border-slate-200 px-6 py-3 text-xs font-medium text-slate-500 hover:bg-slate-50"
          >
            Back to Your Turn
          </button>
        </div>

      </div>
    </main>
  );
}


  return (
    <main className="min-h-screen bg-[#f8fafc] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-6xl rounded-xl bg-white px-4 py-8 shadow-sm md:px-8">

        {/* Progress Steps */}
        <div className="mx-auto mb-10 flex max-w-3xl items-center justify-center gap-2 sm:gap-4">

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 text-sky-500 sm:flex-row">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white">
              <Check size={16} />
            </span>
            <span className="text-center text-[10px] font-medium sm:text-xs">
              Documents
            </span>
          </div>

          <div className="h-[2px] flex-1 bg-sky-400" />

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 text-slate-400 sm:flex-row">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200">
              2
            </span>
            <span className="text-center text-[10px] sm:text-xs">
              Verification
            </span>
          </div>

          <div className="h-[2px] flex-1 bg-slate-200" />

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-2 text-slate-400 sm:flex-row">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200">
              3
            </span>
            <span className="text-center text-[10px] sm:text-xs">
              Your Turn
            </span>
          </div>

          <div className="h-[2px] flex-1 bg-slate-200" />

          {/* Step 4 */}
          <div className="flex flex-col items-center gap-2 text-slate-400 sm:flex-row">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200">
              4
            </span>
            <span className="text-center text-[10px] sm:text-xs">
              Review
            </span>
          </div>
        </div>

        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-[#123d70] sm:text-3xl">
            Wait For <span className="text-sky-500">Documents</span>
          </h1>

          <p className="mt-2 text-xs text-slate-400">
            Please upload all required documents to continue your check-in.
          </p>
        </div>

        {/* Upload Information */}
        <div className="mb-4 rounded-lg bg-slate-50 p-3">
          <p className="text-xs font-medium text-slate-600">
            Document Requirements
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            File size: 1MB - 5MB
          </p>

          <p className="text-[11px] text-slate-400">
            Allowed file types: JPG, JPEG, PNG, DOC, DOCX, PDF
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Fields marked with (*) are required.
          </p>
        </div>

        {/* Upload Documents */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

          {documents.map((doc) => {
            const Icon = doc.icon;
            const file = uploadedFiles[doc.id];

            return (
              <div
                key={doc.id}
                className={`relative flex min-h-32 flex-col items-center justify-center rounded-lg border-2 border-dashed p-3 text-center transition ${
                  file
                    ? "border-sky-500 bg-sky-50"
                    : "border-slate-200 bg-slate-50 hover:border-sky-400"
                }`}
              >
                {file ? (
                  <>
                    <CircleCheck
                      size={25}
                      className="mb-2 text-sky-500"
                    />

                    <p className="text-xs font-semibold text-sky-700">
                      {doc.title}
                    </p>

                    <p className="mt-1 max-w-full truncate text-[10px] text-slate-500">
                      {file.name}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleFileChange(doc.id, null)
                      }
                      className="absolute right-2 top-2 text-slate-400 transition hover:text-red-500"
                      aria-label={`Remove ${doc.title}`}
                    >
                      <Trash2 size={14} />
                    </button>
                  </>
                ) : (
                  <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                    <Icon
                      size={26}
                      className="mb-2 text-sky-500"
                    />

                    <span className="text-xs font-medium text-sky-600">
                      {doc.title}{" "}
                      <span className="text-red-500">*</span>
                    </span>

                    <Upload
                      size={16}
                      className="mt-3 text-sky-400"
                    />

                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) =>
                        handleFileChange(
                          doc.id,
                          e.target.files?.[0] ?? null
                        )
                      }
                    />
                  </label>
                )}
              </div>
            );
          })}
        </div>

        

        {/* Continue Button */}
        <div className="mt-7 flex flex-col items-center">
          <button
            type="button"
            onClick={handleContinue}
            disabled={!allDocumentsUploaded}
            className="rounded-lg bg-sky-500 px-8 py-3 text-xs font-medium text-white shadow-sm transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Continue to next step
          </button>

          {message && (
            <p className="mt-3 text-center text-xs text-sky-600">
              {message}
            </p>
          )}
        </div>

        {/* Patient Information Photo */}
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-[#123d70]">
            Patient Information
          </h2>

          <div className="overflow-hidden rounded-xl">
            <Image
              src="/Resource1.png"
              alt="Patient Information"
              width={1200}
              height={500}
              className="aspect-[16/6] w-full object-cover"
            />
          </div>
        </section>

        {/* Healthcare Resources */}
        <section className="mt-10">
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-[#123d70]">
              Healthcare Resources
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Explore our latest articles and healthcare information.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {resources.map((resource) => (
              <article
                key={resource.title}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white p-2 transition hover:-translate-y-1 hover:shadow-md"
              >
                <Image
                  src={resource.image}
                  alt={resource.title}
                  width={400}
                  height={250}
                  className="aspect-video w-full rounded-md object-cover"
                />

                <div className="p-2">
                  <h3 className="text-xs font-semibold text-[#123d70]">
                    {resource.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-[11px] leading-relaxed text-slate-400">
                    {resource.description}
                  </p>
                </div>
              </article>
            ))}

          </div>
        </section>

      </div>
    </main>
  );
}
