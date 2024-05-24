import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { boards } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const createBoardInput = z.object({
  name: z.string().max(128, {
    message:
      "Board name is too long, sorry but please pick another board name.",
  }),
});

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
  getByUser: privateProcedure.query(async ({ ctx }) => {
    const usersJeopardyBoards = await ctx.db
      .select({
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
