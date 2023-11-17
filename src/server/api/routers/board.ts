import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const boardRouter = createTRPCRouter({
  // create: protectedProcedure.input({}).mutation(({ ctx, input }) => {
  //   //
  // }),
  getByCurrentUser: protectedProcedure.query(async ({ ctx }) => {
    const currentUserId = ctx.session.userId;

    const boards = await ctx.db.query.boards.findMany({
      where: (boards, { eq }) => eq(boards.userId, currentUserId),
    });

    return boards;
  }),
});
