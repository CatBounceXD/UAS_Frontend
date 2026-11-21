
"use client";

import { useState } from "react";

type Comment = {
  id: number;
  name: string;
  message: string;
  date: string;
};

export default function CommentSection() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      date: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };

    setComments((previous) => [newComment, ...previous]);
    setName("");
    setMessage("");
  }

  return (
    <section className="mt-12 border-t border-gray-200 pt-8">
      <h2 className="mb-2 text-2xl font-bold text-gray-900">
        Comments ({comments.length})
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
        required
        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
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
        required
        className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
        />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          Post Comment
        </button>
      </form>

      <div className="space-y-5">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-500">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-gray-200 p-5"
            >
              <div className="mb-2 flex items-center justify-between gap-4">
                <h3 className="font-semibold text-gray-900">
                  {comment.name}
                </h3>
                <span className="text-xs text-gray-500">
                  {comment.date}
                </span>
              </div>

              <p className="text-sm leading-relaxed text-gray-700">
                {comment.message}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
