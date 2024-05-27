import { TRPCError } from "@trpc/server";
import { and, eq, sql } from "drizzle-orm";

import {
  createBoardChallengeInput,
  getAllBoardChallengesByBoardInput,
  setBoardChallengeStatus,
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
          category: boardChallenges.category,
          id: sql<
            number[]
          >`ARRAY_AGG(${boardChallenges.id} ORDER BY ${boardChallenges.id})`,
          boardId: sql<number[]>`ARRAY_AGG(${boardChallenges.boardId})`,
          question: sql<string[]>`ARRAY_AGG(${boardChallenges.question})`,
          answer: sql<string[]>`ARRAY_AGG(${boardChallenges.answer})`,
          points: sql<number[]>`ARRAY_AGG(${boardChallenges.points})`,
          status: sql<
            Array<"solved" | "unsolved">
          >`ARRAY_AGG(${boardChallenges.status})`,
        })
        .from(boardChallenges)
        .where(eq(boardChallenges.boardId, input.boardId))
        .innerJoin(
          boards,
          and(eq(boards.userId, ctx.userId), eq(boards.id, input.boardId)),
        )
        .groupBy(boardChallenges.category);

      if (!jeopardyBoardChallenges || jeopardyBoardChallenges.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "This jeopardy board could not be found. Maybe try creating a new one.",
        });
      }

      return jeopardyBoardChallenges;
    }),
  changeStatus: privateProcedure
    .input(setBoardChallengeStatus)
    .mutation(async ({ ctx, input }) => {
      const changedChallenge = await ctx.db
        .update(boardChallenges)
        .set({ status: input.status })
        .where(eq(boardChallenges.id, input.id))
        .returning();

      if (!changedChallenge || !changedChallenge[0])
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error encountered, please try again.",
        });

      return changedChallenge[0];
    }),
});
