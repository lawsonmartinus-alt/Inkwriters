import {
  mysqlTable,
  mysqlEnum,
  serial,
  bigint,
  varchar,
  text,
  timestamp,
  int,
} from "drizzle-orm/mysql-core";

export const threads = mysqlTable("threads", {
  id: serial("id").primaryKey(),
  genre: varchar("genre", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  body: text("body").notNull(),
  authorName: varchar("author_name", { length: 120 }).notNull(),
  authorRole: mysqlEnum("author_role", ["author", "reader", "moderator"])
    .notNull()
    .default("author"),
  pinned: int("pinned").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const replies = mysqlTable("replies", {
  id: serial("id").primaryKey(),
  threadId: bigint("thread_id", { mode: "number", unsigned: true }).notNull(),
  body: text("body").notNull(),
  authorName: varchar("author_name", { length: 120 }).notNull(),
  authorRole: mysqlEnum("author_role", ["author", "reader", "moderator"])
    .notNull()
    .default("reader"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const shelfBooks = mysqlTable("shelf_books", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  genre: varchar("genre", { length: 64 }).notNull(),
  shelf: mysqlEnum("shelf", ["currently-reading", "to-read", "read", "book-club-picks"])
    .notNull(),
  bg: varchar("bg", { length: 7 }).notNull(),
  fg: varchar("fg", { length: 7 }).notNull(),
  accent: varchar("accent", { length: 7 }).notNull(),
  addedAt: timestamp("added_at").notNull().defaultNow(),
});

export const polls = mysqlTable("polls", {
  id: serial("id").primaryKey(),
  question: varchar("question", { length: 255 }).notNull(),
  options: text("options").notNull(), // JSON array of strings
  status: mysqlEnum("status", ["open", "closed"]).notNull().default("open"),
  closesAt: timestamp("closes_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pollVotes = mysqlTable("poll_votes", {
  id: serial("id").primaryKey(),
  pollId: bigint("poll_id", { mode: "number", unsigned: true }).notNull(),
  optionIndex: int("option_index").notNull(),
  voterName: varchar("voter_name", { length: 120 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const libraryPlacements = mysqlTable("library_placements", {
  id: serial("id").primaryKey(),
  bookTitle: varchar("book_title", { length: 255 }).notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  librarySystem: varchar("library_system", { length: 180 }).notNull(),
  location: varchar("location", { length: 180 }).notNull(),
  placementType: mysqlEnum("placement_type", [
    "new-acquisition",
    "staff-pick",
    "book-club-kit",
    "featured-display",
    "digital-collection",
  ]).notNull(),
  branches: int("branches").notNull().default(1),
  placedAt: timestamp("placed_at").notNull().defaultNow(),
});
