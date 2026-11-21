"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckInStep4() {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reviewData = {
      rating,
      review,
      submittedAt: new Date().toISOString(),
    };

    // Simpan review sementara di browser
    sessionStorage.setItem(
      "checkInReview",
      JSON.stringify(reviewData)
    );

    setReviewSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm">

        <p className="mb-2 text-sm font-semibold text-blue-600">
          PATIENT CHECK-IN
        </p>

        {reviewSubmitted ? (
          <div className="py-10 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
              ✓
            </div>

            <h1 className="mb-3 text-3xl font-bold text-gray-800">
              Thank You!
            </h1>

            <p className="mb-8 text-gray-500">
              Your review has been successfully submitted.
              Thank you for sharing your experience with us.
            </p>

            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
            >
              Back to Home
            </button>
          </div>
        ) : (
          <>
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Patient Review
            </h1>

            <p className="mb-8 text-gray-500">
              We would love to hear about your experience.
              Please share your feedback with us.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Rating */}
              <div>
                <p className="mb-3 font-medium text-gray-700">
                  How would you rate your experience?
                </p>

                <div className="flex justify-center gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      aria-label={`Rate ${star} out of 5 stars`}
                      aria-pressed={rating === star}
                      className={`text-4xl transition ${
                        star <= rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>

                <p className="mt-2 text-center text-sm text-gray-500">
                  {rating > 0
                    ? `${rating} out of 5 stars`
                    : "Select your rating"}
                </p>
              </div>

              {/* Review */}
              <div>
                <label
                  htmlFor="review"
                  className="mb-2 block font-medium text-gray-700"
                >
                  Your Feedback
                </label>

                <textarea
                  id="review"
                  name="review"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your experience here..."
                  rows={5}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={rating === 0 || !review.trim()}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Submit Review
              </button>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
