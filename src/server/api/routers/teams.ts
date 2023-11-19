import { TRPCError } from "@trpc/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { teams } from "@/server/db/schema";

export const teamRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.array(z.object({ boardId: z.number(), name: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const addedTeams = await ctx.db.insert(teams).values(
        input.map((team) => ({
          boardId: team.boardId,
          name: team.name,
          score: 0,
        })),
      );

      return addedTeams;
    }),
  addPointsByTeam: publicProcedure
    .input(
      z.object({ boardId: z.number(), name: z.string(), points: z.number() }),
    )
    .mutation(async ({ ctx, input }) => {
      const teamToUpdate = await ctx.db.query.teams.findFirst({
        where: (table, { eq }) =>
          and(eq(table.boardId, input.boardId), eq(table.name, input.name)),
      });

      if (!teamToUpdate) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Could not find a team to update points for.",
        });
      }

      const newScore = teamToUpdate.score + input.points;

      await ctx.db
        .update(teams)
        .set({ score: newScore })
        .where(
          and(
            eq(teams.boardId, input.boardId),
            eq(teams.name, teamToUpdate.name),
          ),
        );

      return teamToUpdate;
    }),
  getByBoard: publicProcedure
    .input(z.object({ boardId: z.number() }))
    .query(async ({ ctx, input }) => {
      const teams = await ctx.db.query.teams.findMany({
        where: (table, { eq }) => eq(table.boardId, input.boardId),
      });

      return teams;
    }),
});
