import { eq } from "drizzle-orm";
import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { boards } from "@/server/db/schema";

export const boardRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const addedBoard = await ctx.db.insert(boards).values({
        name: input.name,
        userId: env.SUPABASE_USER_ID,
      });

      const newBoard = await ctx.db.query.boards.findFirst({
        where: (table, { eq }) => eq(table.id, parseInt(addedBoard.insertId)),
      });

      return newBoard!;
    }),
  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const deletedBoard = await ctx.db
        .delete(boards)
        .where(eq(boards.id, input.id));

      return deletedBoard;
    }),
  getByCurrentUser: publicProcedure.query(async ({ ctx }) => {
    const boards = await ctx.db.query.boards.findMany({
      where: (table, { eq }) => eq(table.userId, env.SUPABASE_USER_ID),
    });

    return boards;
  }),
});
