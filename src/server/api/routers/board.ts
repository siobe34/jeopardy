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
