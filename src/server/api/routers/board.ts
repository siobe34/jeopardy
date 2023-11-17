import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { boards } from "@/server/db/schema";

export const boardRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.session.userId;

      const newBoard = await ctx.db.insert(boards).values({
        name: input.name,
        userId: currentUserId,
      });

      // TODO: fix return, currently returns an ExecutedQuery
      return newBoard;
    }),
  getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.userId;

    const boards = await ctx.db.query.boards.findMany({
      where: (boards, { eq }) => eq(boards.userId, currentUserId),
    });

    return boards;
  }),
});
