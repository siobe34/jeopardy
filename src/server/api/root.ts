import { boardRouter } from "@/server/api/routers/board";
import { challengeRouter } from "@/server/api/routers/challenge";
import { teamRouter } from "@/server/api/routers/teams";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  board: boardRouter,
  challenge: challengeRouter,
  teams: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
