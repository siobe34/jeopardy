import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

import {
  assignTeamPointsInput,
  createTeamInput,
  getTeamsByGameIdInput,
} from "@/lib/zod-schemas/trpc-inputs";
import { createTRPCRouter, privateProcedure } from "@/server/api/trpc";
import { teams } from "@/server/db/schema";

export const teamRouter = createTRPCRouter({
  create: privateProcedure
    .input(createTeamInput)
    .mutation(async ({ ctx, input }) => {
      const newTeams = await ctx.db.insert(teams).values(input).returning();

      if (!newTeams || newTeams.length === 0)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error encountered, please try again.",
        });

      return newTeams;
    }),
  getByGame: privateProcedure
    .input(getTeamsByGameIdInput)
    .query(async ({ ctx, input }) => {
      const teamsForGame = await ctx.db
        .select()
        .from(teams)
        .where(eq(teams.gameId, input.gameId));

      if (!teamsForGame || teamsForGame.length === 0)
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "No teams were found for this game which is unexpected. Please try to create a new game.",
        });

      return teamsForGame;
    }),
  assignPoints: privateProcedure
    .input(assignTeamPointsInput)
    .mutation(async ({ ctx, input }) => {
      const updatedTeam = await ctx.db
        .update(teams)
        .set({ points: input.points })
        .where(eq(teams.id, input.id))
        .returning();

      if (!updatedTeam || updatedTeam[0])
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unexpected server error encountered, please try again.",
        });

      return updatedTeam[0];
    }),
});
