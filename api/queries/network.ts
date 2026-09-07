import { desc, eq, count, sql } from "drizzle-orm";
import { getDb } from "./connection";
import { threads, replies, shelfBooks, polls, pollVotes, libraryPlacements } from "@db/schema";

export async function listThreadsByGenre(genre: string) {
  const db = getDb();
  const rows = await db
    .select({
      id: threads.id,
      genre: threads.genre,
      title: threads.title,
      body: threads.body,
      authorName: threads.authorName,
      authorRole: threads.authorRole,
      pinned: threads.pinned,
      createdAt: threads.createdAt,
      replyCount: count(replies.id),
    })
    .from(threads)
    .leftJoin(replies, eq(replies.threadId, threads.id))
    .where(eq(threads.genre, genre))
    .groupBy(threads.id)
    .orderBy(desc(threads.pinned), desc(threads.createdAt));
  return rows;
}

export async function getThread(id: number) {
  const db = getDb();
  const thread = await db.select().from(threads).where(eq(threads.id, id)).limit(1);
  if (!thread[0]) return null;
  const threadReplies = await db
    .select()
    .from(replies)
    .where(eq(replies.threadId, id))
    .orderBy(replies.createdAt);
  return { ...thread[0], replies: threadReplies };
}

export async function recentActivity(limit = 8) {
  const db = getDb();
  return db
    .select({
      id: threads.id,
      genre: threads.genre,
      title: threads.title,
      authorName: threads.authorName,
      authorRole: threads.authorRole,
      createdAt: threads.createdAt,
      replyCount: count(replies.id),
    })
    .from(threads)
    .leftJoin(replies, eq(replies.threadId, threads.id))
    .groupBy(threads.id)
    .orderBy(desc(threads.createdAt))
    .limit(limit);
}

export async function genreStats() {
  const db = getDb();
  const threadCounts = await db
    .select({ genre: threads.genre, threads: count(threads.id) })
    .from(threads)
    .groupBy(threads.genre);

  const replyCounts = await db
    .select({ genre: threads.genre, replies: count(replies.id) })
    .from(replies)
    .innerJoin(threads, eq(replies.threadId, threads.id))
    .groupBy(threads.genre);

  const replyMap = new Map(replyCounts.map((r) => [r.genre, r.replies]));
  return threadCounts.map((t) => ({
    genre: t.genre,
    threads: t.threads,
    replies: replyMap.get(t.genre) ?? 0,
  }));
}

export async function createThread(input: {
  genre: string;
  title: string;
  body: string;
  authorName: string;
  authorRole: "author" | "reader" | "moderator";
}) {
  const db = getDb();
  const result = await db.insert(threads).values({
    genre: input.genre,
    title: input.title,
    body: input.body,
    authorName: input.authorName,
    authorRole: input.authorRole,
  });
  return { id: Number(result[0].insertId) };
}

export async function createReply(input: {
  threadId: number;
  body: string;
  authorName: string;
  authorRole: "author" | "reader" | "moderator";
}) {
  const db = getDb();
  await db.insert(replies).values({
    threadId: input.threadId,
    body: input.body,
    authorName: input.authorName,
    authorRole: input.authorRole,
  });
  return { ok: true };
}

// ── Group bookshelf ────────────────────────────────────────────────
export async function listShelfBooks() {
  const db = getDb();
  return db.select().from(shelfBooks).orderBy(desc(shelfBooks.addedAt));
}

// ── Polls ──────────────────────────────────────────────────────────
export async function listPolls() {
  const db = getDb();
  const allPolls = await db.select().from(polls).orderBy(desc(polls.createdAt));
  const voteCounts = await db
    .select({ pollId: pollVotes.pollId, optionIndex: pollVotes.optionIndex, votes: count() })
    .from(pollVotes)
    .groupBy(pollVotes.pollId, pollVotes.optionIndex);

  return allPolls.map((p) => {
    const options = JSON.parse(p.options) as string[];
    const counts = options.map(
      (_, i) => voteCounts.find((v) => v.pollId === p.id && v.optionIndex === i)?.votes ?? 0,
    );
    return {
      id: p.id,
      question: p.question,
      options,
      counts,
      totalVotes: counts.reduce((a, b) => a + b, 0),
      status: p.status,
      closesAt: p.closesAt,
      createdAt: p.createdAt,
    };
  });
}

export async function castVote(input: { pollId: number; optionIndex: number; voterName: string }) {
  const db = getDb();
  const poll = await db.select().from(polls).where(eq(polls.id, input.pollId)).limit(1);
  if (!poll[0] || poll[0].status !== "open") {
    throw new Error("This poll is closed.");
  }
  const options = JSON.parse(poll[0].options) as string[];
  if (input.optionIndex < 0 || input.optionIndex >= options.length) {
    throw new Error("Invalid option.");
  }
  await db.insert(pollVotes).values({
    pollId: input.pollId,
    optionIndex: input.optionIndex,
    voterName: input.voterName,
  });
  return { ok: true };
}

// ── Library placements ─────────────────────────────────────────────
export async function listPlacements() {
  const db = getDb();
  return db.select().from(libraryPlacements).orderBy(desc(libraryPlacements.placedAt));
}

export async function placementStats() {
  const db = getDb();
  const rows = await db
    .select({
      placements: count(),
      branches: sql<number>`coalesce(sum(${libraryPlacements.branches}), 0)`,
      systems: sql<number>`count(distinct ${libraryPlacements.librarySystem})`,
      titles: sql<number>`count(distinct ${libraryPlacements.bookTitle})`,
    })
    .from(libraryPlacements);
  const r = rows[0];
  return {
    placements: r?.placements ?? 0,
    branches: Number(r?.branches ?? 0),
    systems: Number(r?.systems ?? 0),
    titles: Number(r?.titles ?? 0),
  };
}
