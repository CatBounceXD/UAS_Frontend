import {
  index,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const resources = pgTable("resources", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  category: text("category").notNull().default("gallery"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const articles = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(), // contoh: "article-1" atau "adult-reconstruction"
    title: text("title").notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    authorName: text("author_name").notNull(),
    introduction: text("introduction").notNull(),
    heading: text("heading").notNull(),
    paragraphs: jsonb("paragraphs").$type<string[]>().notNull().default([]),
    quote: text("quote"),
    closing: text("closing").notNull(),
    publishedAt: timestamp("published_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("articles_slug_idx").on(table.slug)],
);

export const articleComments = pgTable(
  "article_comments",
  {
    id: serial("id").primaryKey(),
    articleId: integer("article_id")
      .notNull()
      .references(() => articles.id, { onDelete: "cascade" }),
    userId: text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),
    authorName: text("author_name").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("article_comments_articleId_idx").on(table.articleId),
    index("article_comments_userId_idx").on(table.userId),
  ],
);
