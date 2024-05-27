import { z } from "zod";

export const createBoardInput = z.object({
  name: z.string().max(128, {
    message:
      "Board name is too long, sorry but please pick a shorter board name.",
  }),
});

export const createBoardChallengeElement = z.object({
  category: z.string().min(1, {
    message: "The jeopardy category name must be at least 1 character long.",
  }),
  question: z.string().min(1, {
    message: "The jeopardy question must be at least 1 character long.",
  }),
  answer: z.string().min(1, {
    message: "The jeopardy answer must be at least 1 character long.",
  }),
  points: z.number().int().min(0),
  boardId: z.number(),
});

export const createBoardChallengeInput = z.array(createBoardChallengeElement);

export const getAllBoardChallengesByBoardInput = z.object({
  boardId: z.number(),
});

export const setBoardChallengeStatus = z.object({
  id: z.number(),
  status: z.enum(["solved", "unsolved"]),
});

export const createGameInput = getAllBoardChallengesByBoardInput;

export const getGameByBoardAndGameIdInput = z.object({
  boardId: z.number(),
  gameId: z.number(),
});

export const getGameByIdInput = getGameByBoardAndGameIdInput.pick({
  gameId: true,
});

export const createTeamInput = z.array(
  z.object({
    name: z.string(),
    gameId: z.number(),
  }),
);

export const getTeamsByGameIdInput = getGameByIdInput;

export const assignTeamPointsInput = z.object({
  id: z.number(),
  points: z.number().int().min(0),
});
