import { ArrowLeft, UserRound } from "lucide-react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug } from "@/features/resources/queries";
import { auth } from "@/lib/auth";
import CommentSection from "@/shared/components/CommentSection";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [{ id }, session] = await Promise.all([
    params,
    auth.api.getSession({ headers: await headers() }),
  ]);

  const article = await getArticleBySlug(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-5 py-10">
      <article className="mx-auto max-w-4xl bg-white px-6 py-8 shadow-sm md:px-12 md:py-10">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs text-gray-400">
          <Link href="/resource" className="hover:text-blue-600">
            Resource
          </Link>
          <span>&gt;</span>
          <span className="text-blue-600">Article</span>
        </div>

        {/* Article Title */}
        <h1 className="mb-4 text-2xl font-semibold leading-tight tracking-wide text-gray-900 md:text-3xl">
          {article.title}
        </h1>

        {/* Main Image */}
        <div className="mb-6">
          <Image
            src={article.imageUrl}
            alt={article.title}
            width={1200}
            height={650}
            className="aspect-video w-full object-cover"
            priority
          />
        </div>

        {/* Author */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700">
            <UserRound size={20} />
          </div>

          <div className="text-xs">
            <p className="font-medium text-gray-800">{article.authorName}</p>
            <p className="text-gray-400">Author</p>
          </div>
        </div>

        {/* Article Content */}
        <div className="space-y-6 text-sm leading-7 text-gray-600">
          <p>{article.introduction}</p>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900">
              {article.heading}
            </h2>

            {article.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-4">
                {paragraph}
              </p>
            ))}
          </section>

          {/* Quote */}
          {article.quote && (
            <blockquote className="border-l-2 border-gray-300 py-2 pl-7 text-sm italic leading-7 text-gray-600">
              &ldquo;{article.quote}&rdquo;
            </blockquote>
          )}

          <p>{article.closing}</p>
        </div>

        {/* Comment Section */}
        <CommentSection
          articleId={article.id}
          slug={article.slug}
          initialComments={article.comments.map((c) => ({
            id: c.id,
            authorName: c.authorName,
            content: c.content,
            createdAt: c.createdAt.toISOString(),
          }))}
          defaultAuthorName={session?.user?.name}
        />

        {/* Back Button */}
        <div className="mt-10 border-t border-gray-100 pt-6">
          <Link
            href="/resource"
            className="inline-flex items-center gap-2 text-sm text-blue-700 hover:text-blue-900"
          >
            <ArrowLeft size={16} />
            Back to Resources
          </Link>
        </div>
      </article>
    </main>
  );
}
