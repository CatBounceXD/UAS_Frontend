"use server";

import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { db } from "@/db";
import { articleComments, articles, resources } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function getAllResources() {
  return db.select().from(resources).orderBy(asc(resources.id));
}

export async function getAllArticles() {
  return db.select().from(articles).orderBy(asc(articles.id));
}

export async function getArticleBySlug(slug: string) {
  const [article] = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);

  if (!article) return null;

  const comments = await db
    .select()
    .from(articleComments)
    .where(eq(articleComments.articleId, article.id))
    .orderBy(desc(articleComments.createdAt));

  return {
    ...article,
    comments,
  };
}

export async function createArticleComment(payload: {
  articleId: number;
  slug: string;
  authorName: string;
  content: string;
}) {
  const trimmedName = payload.authorName.trim();
  const trimmedContent = payload.content.trim();

  if (!trimmedName || !trimmedContent) {
    return { ok: false as const, message: "Nama dan komentar wajib diisi." };
  }

  const session = await auth.api.getSession({ headers: await headers() });

  const [created] = await db
    .insert(articleComments)
    .values({
      articleId: payload.articleId,
      userId: session?.user?.id ?? null,
      authorName: session?.user?.name || trimmedName,
      content: trimmedContent,
    })
    .returning();

  revalidatePath(`/resource/${payload.slug}`);

  return { ok: true as const, data: created };
}
