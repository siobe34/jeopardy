import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { boards } from "@/server/db/schema";

export const boardRouter = createTRPCRouter({
  create: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const currentUserId = ctx.user?.id;

      if (!currentUserId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message:
            "You are not signed in. Please sign in and try visiting this page again.",
        });
      }

      const addedBoard = await ctx.db.insert(boards).values({
        name: input.name,
        userId: currentUserId,
      });

      const newBoard = await ctx.db.query.boards.findFirst({
        where: (table, { eq }) => eq(table.id, parseInt(addedBoard.insertId)),
      });

      if (!newBoard) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected error while trying to add new jeopardy board.",
        });
      }

      return newBoard;
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedBoard = await ctx.db
        .delete(boards)
        .where(eq(boards.id, input.id));

      return deletedBoard;
    }),
  getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.user?.id;

    if (!currentUserId) {
      return null;
    }

    const boards = await ctx.db.query.boards.findMany({
      where: (table, { eq }) => eq(table.userId, currentUserId),
    });

    return boards;
  }),
});
