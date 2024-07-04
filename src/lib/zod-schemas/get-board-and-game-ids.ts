import { z } from "zod";

export const boardIdGameIdSchema = z.object({
  boardId: z.number(),
  gameId: z.number(),
});
