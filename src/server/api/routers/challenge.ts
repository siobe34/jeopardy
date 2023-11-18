import { z } from "zod";

import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { challenges } from "@/server/db/schema";
import { challengeSchema } from "@/types/challengeSchema";

export const challengeRouter = createTRPCRouter({
  create: publicProcedure
    .input(challengeSchema)
    .mutation(async ({ ctx, input }) => {
      const addedChallenges = await ctx.db.insert(challenges).values(
        input.map((newChallenge) => ({
          boardId: newChallenge.boardId,
          question: newChallenge.question,
          answer: newChallenge.answer,
          category: newChallenge.category,
          points: newChallenge.points,
        })),
      );

      return addedChallenges;
    }),
  getByBoardAndUser: publicProcedure
    .input(z.object({ boardId: z.number() }))
    .query(async ({ ctx, input }) => {
      const queriedChallenges = await ctx.db.query.challenges.findMany({
        with: { board: { columns: { userId: true } } },
        where: (table, { eq }) => eq(table.boardId, input.boardId),
      });

      return queriedChallenges.filter(
        (row) => row.board?.userId === env.SUPABASE_USER_ID,
      );
    }),
});
