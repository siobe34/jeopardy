import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import {
  createGameInput,
  getGameByBoardAndGameIdInput,
} from "@/lib/zod-schemas/trpc-inputs";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { games } from "@/server/db/schema";

export const gameRouter = createTRPCRouter({
  create: privateProcedure
    .input(createGameInput)
    .mutation(async ({ ctx, input }) => {
      const newGame = await ctx.db
        .insert(games)
        .values({
          boardId: input.boardId,
        })
        .returning();

      if (!newGame[0])
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error encountered, please try again.",
        });

      return newGame[0];
    }),
  getByBoardAndGameId: privateProcedure
    .input(getGameByBoardAndGameIdInput)
    .query(async ({ ctx, input }) => {
      const game = await ctx.db
        .select()
        .from(games)
        .where(
          and(eq(games.id, input.gameId), eq(games.boardId, input.boardId)),
        );

      if (!game[0])
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "This game apparently does not exist in our databases. Please try creating a new game.",
        });

      return game[0];
    }),
});
