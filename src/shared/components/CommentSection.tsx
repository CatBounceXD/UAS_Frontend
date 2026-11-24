"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createArticleComment } from "@/features/resources/queries";

export type ArticleCommentItem = {
  id: number;
  authorName: string;
  content: string;
  createdAt: string | Date;
};

interface CommentSectionProps {
  articleId: number;
  slug: string;
  initialComments: ArticleCommentItem[];
  defaultAuthorName?: string;
}

export default function CommentSection({
  articleId,
  slug,
  initialComments,
  defaultAuthorName = "",
}: CommentSectionProps) {
  const router = useRouter();
  const [name, setName] = useState(defaultAuthorName);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !message.trim() || submitting) return;

    setSubmitting(true);
    setError(null);

    const res = await createArticleComment({
      articleId,
      slug,
      authorName: name,
      content: message,
    });

    if (!res.ok) {
      setError(res.message);
      setSubmitting(false);
      return;
    }

    if (!defaultAuthorName) {
      setName("");
    }
    setMessage("");
    setSubmitting(false);
    router.refresh();
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Comments ({initialComments.length})
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Share your thoughts about this article.
      </p>

      <form onSubmit={handleSubmit} className="mb-10 space-y-4">
        <div>
          <label
            htmlFor="comment-name"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={Boolean(defaultAuthorName) || submitting}
            required
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>

        <div>
          <label
            htmlFor="comment-message"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Your Comment
          </label>
          <textarea
            id="comment-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            disabled={submitting}
            required
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          {submitting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="space-y-5">
        {initialComments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          initialComments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-gray-200 p-5"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <h3 className="font-semibold text-gray-900">
                  {comment.authorName}
                </h3>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-700">
                {comment.content}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}