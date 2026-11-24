"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function CheckInStep4() {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reviewData = {
      rating,
      review,
      submittedAt: new Date().toISOString(),
    };

    sessionStorage.setItem("checkInReview", JSON.stringify(reviewData));

    setReviewSubmitted(true);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-sm">
        {!reviewSubmitted ? (
          <>
            <p className="mb-2 text-sm font-semibold text-blue-600">
              PATIENT CHECK-IN
            </p>

            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Patient Review
            </h1>

            <p className="mb-8 text-gray-500">
              We value your feedback. Please share your experience with our
              check-in process.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-8">
                <h2 className="mb-3 font-semibold text-gray-800">
                  How would you rate your experience?
                </h2>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-4xl transition ${
                        rating >= star ? "text-yellow-400" : "text-gray-300"
                      }`}
                      aria-label={`Rate ${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {rating > 0
                    ? `${rating} out of 5 stars`
                    : "Select your rating"}
                </p>
              </div>

              <div className="mb-8">
                <label
                  htmlFor="review"
                  className="mb-3 block font-semibold text-gray-800"
                >
                  Share your feedback
                </label>

                <textarea
                  id="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={5}
                  className="w-full rounded-xl border border-gray-300 p-4 text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={rating === 0 || !review.trim()}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Submit Review
              </button>
            </form>
          </>
        ) : (
          <div className="py-10 text-center">
            <div className="mb-5 text-6xl text-green-500">✓</div>

            <h1 className="mb-3 text-3xl font-bold text-gray-800">
              Thank You!
            </h1>

            <p className="mb-8 text-gray-500">
              Your feedback has been submitted successfully. We appreciate your
              time!
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
