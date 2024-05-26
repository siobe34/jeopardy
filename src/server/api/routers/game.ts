import { TRPCError } from "@trpc/server";

import { createGameInput } from "@/lib/zod-schemas/trpc-inputs";
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
});
