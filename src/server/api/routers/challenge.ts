import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const challengeRouter = createTRPCRouter({
  getByBoardAndUser: protectedProcedure
    .input(z.object({ boardId: z.number() }))
    .query(async ({ ctx, input }) => {
      const currentUserId = ctx.session.userId;

      const queriedChallenges = await ctx.db.query.challenges.findMany({
        with: { board: { columns: { userId: true } } },
        where: (table, { eq }) => eq(table.boardId, input.boardId),
      });

      return queriedChallenges.filter((row) => row.board?.userId === currentUserId);
    }),
});
