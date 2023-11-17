import { z } from "zod";

export const challengeSchema = z.array(
  z.object({
    category: z.string().min(1, "The category must be at least 1 character."),
    question: z.string().min(1, "The question must be at least 1 character."),
    answer: z.string().min(1, "The answer must be at least 1 character."),
    points: z.number(),
    boardId: z.number(),
  }),
);
