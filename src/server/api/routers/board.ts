import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import { createBoardInput } from "@/lib/zod-schemas/trpc-inputs";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { boards } from "@/server/db/schema";

export const boardRouter = createTRPCRouter({
  create: privateProcedure
    .input(createBoardInput)
    .mutation(async ({ ctx, input }) => {
      const newBoard = await ctx.db
        .insert(boards)
        .values({
          name: input.name,
          userId: ctx.userId,
        })
        .returning();

      if (!newBoard[0])
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error encountered, please try again.",
        });

      return newBoard[0];
    }),
  getAllByUser: privateProcedure.query(async ({ ctx }) => {
    const usersJeopardyBoards = await ctx.db
      .select({
        id: boards.id,
        name: boards.name,
        userId: boards.userId,
        createdAt: boards.createdAt,
        updatedAt: boards.updatedAt,
      })
      .from(boards)
      .where(eq(boards.userId, ctx.userId));

    return usersJeopardyBoards;
  }),
});
