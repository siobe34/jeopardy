import { TRPCError } from "@trpc/server";

import { createTeamInput } from "@/lib/zod-schemas/trpc-inputs";
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
});
