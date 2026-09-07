import { createRouter, publicQuery } from "./middleware";
import { networkRouter } from "./networkRouter";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  network: networkRouter,
});

export type AppRouter = typeof appRouter;
