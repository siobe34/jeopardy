import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";

import {
  createBoardChallengeInput,
  getAllBoardChallengesByBoardInput,
} from "@/lib/zod-schemas/trpc-inputs";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { boardChallenges, boards } from "@/server/db/schema";

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
  getAllByBoard: privateProcedure
    .input(getAllBoardChallengesByBoardInput)
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
        .where(eq(boardChallenges.boardId, input.boardId))
        .innerJoin(
          boards,
          and(eq(boards.userId, ctx.userId), eq(boards.id, input.boardId)),
        );

      if (!jeopardyBoardChallenges || jeopardyBoardChallenges.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "This jeopardy board could not be found. Maybe try creating a new one.",
        });
      }

      return jeopardyBoardChallenges;
    }),
});
