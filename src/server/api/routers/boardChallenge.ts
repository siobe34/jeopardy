import { z } from "zod";

import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { boardChallenges, boards } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

const createBoardChallengeInput = z.array(
  z.object({
    category: z.string(),
    question: z.string().min(1, {
      message: "The jeopardy question must be at least 1 character long.",
    }),
    answer: z.string().min(1, {
      message: "The jeopardy answer must be at least 1 character long.",
    }),
    points: z.number().int().min(0),
    boardId: z.number(),
  }),
);

const getAllByBoardInput = z.object({ boardId: z.number() });

export const boardChallengeRouter = createTRPCRouter({
  createMany: privateProcedure
    .input(createBoardChallengeInput)
    .mutation(async ({ ctx, input }) => {
      const createdJeopardyBoardChallenges = await ctx.db
        .insert(boardChallenges)
        .values(input)
        .returning();

      return createdJeopardyBoardChallenges;
    }),

  // Query all jeopardy questions for a particular jeopardy board for the signed in user
  getAllByBoard: privateProcedure
    .input(getAllByBoardInput)
    .query(async ({ ctx, input }) => {
      const jeopardyBoardChallenges = await ctx.db
        .select({
          answer: boardChallenges.answer,
          boardId: boardChallenges.boardId,
          category: boardChallenges.category,
          createdAt: boardChallenges.createdAt,
          id: boardChallenges.id,
          points: boardChallenges.points,
          question: boardChallenges.question,
          status: boardChallenges.status,
          updatedAt: boardChallenges.updatedAt,
        })
        .from(boardChallenges)
        .where(
          and(
            eq(boards.userId, ctx.userId),
            eq(boardChallenges.boardId, input.boardId),
          ),
        );

      return jeopardyBoardChallenges;
    }),
});
