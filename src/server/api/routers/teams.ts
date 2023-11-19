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
  getByBoard: publicProcedure
    .input(z.object({ boardId: z.number() }))
    .query(async ({ ctx, input }) => {
      const teams = await ctx.db.query.teams.findMany({
        where: (table, { eq }) => eq(table.boardId, input.boardId),
      });

      return teams;
    }),
});
