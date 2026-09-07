import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import {
  listThreadsByGenre,
  getThread,
  recentActivity,
  genreStats,
  createThread,
  createReply,
  listShelfBooks,
  listPolls,
  castVote,
  listPlacements,
  placementStats,
} from "./queries/network";

const roleEnum = z.enum(["author", "reader", "moderator"]);

export const networkRouter = createRouter({
  threadsByGenre: publicQuery
    .input(z.object({ genre: z.string().min(1).max(64) }))
    .query(({ input }) => listThreadsByGenre(input.genre)),

  thread: publicQuery
    .input(z.object({ id: z.number().int().positive() }))
    .query(({ input }) => getThread(input.id)),

  recentActivity: publicQuery
    .input(z.object({ limit: z.number().int().min(1).max(20).default(8) }).optional())
    .query(({ input }) => recentActivity(input?.limit ?? 8)),

  genreStats: publicQuery.query(() => genreStats()),

  createThread: publicQuery
    .input(
      z.object({
        genre: z.string().min(1).max(64),
        title: z.string().min(4).max(255),
        body: z.string().min(10).max(5000),
        authorName: z.string().min(2).max(120),
        authorRole: roleEnum.default("author"),
      }),
    )
    .mutation(({ input }) => createThread(input)),

  createReply: publicQuery
    .input(
      z.object({
        threadId: z.number().int().positive(),
        body: z.string().min(2).max(5000),
        authorName: z.string().min(2).max(120),
        authorRole: roleEnum.default("reader"),
      }),
    )
    .mutation(({ input }) => createReply(input)),

  shelfBooks: publicQuery.query(() => listShelfBooks()),

  polls: publicQuery.query(() => listPolls()),

  vote: publicQuery
    .input(
      z.object({
        pollId: z.number().int().positive(),
        optionIndex: z.number().int().min(0),
        voterName: z.string().min(2).max(120),
      }),
    )
    .mutation(({ input }) => castVote(input)),

  placements: publicQuery.query(() => listPlacements()),

  placementStats: publicQuery.query(() => placementStats()),
});
