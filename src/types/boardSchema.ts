import { z } from "zod";

export const boardSchema = z.object({
  name: z
    .string()
    .min(1, "The name of the board has to be at least 1 character."),
  userId: z
    .string()
    .min(1, "Error with user ID, please sign out and sign back in."),
  status: z.enum(["active", "archived"]),
});
