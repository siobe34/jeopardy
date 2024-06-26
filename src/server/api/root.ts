import { boardRouter } from "@/server/api/routers/board";
import { boardChallengeRouter } from "@/server/api/routers/boardChallenge";
import { gameRouter } from "@/server/api/routers/game";
import { teamRouter } from "@/server/api/routers/team";
import { userRouter } from "@/server/api/routers/user";
import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  board: boardRouter,
  boardChallenges: boardChallengeRouter,
  game: gameRouter,
  team: teamRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
