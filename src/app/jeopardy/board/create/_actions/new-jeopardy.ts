"use server";

import { z } from "zod";

import { type FormState } from "@/components/jeopardy-form/form";
import { createBoardChallengeElement } from "@/lib/zod-schemas/trpc-inputs";
import { api } from "@/trpc/server";

const jeopardyCreationSchema = z.array(
  createBoardChallengeElement.omit({ boardId: true }),
);

export const createJeopardyBoard = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const unsafeBoardName = formData.get("boardName");

  const data = Array.from(formData.entries()).filter((entry) =>
    entry[0].startsWith("category"),
  );

  // group questions/answers/points for all 5 jeopardy categories and respective category name
  const jeopardyBoardData = [
    [0, 16],
    [16, 32],
    [32, 48],
    [48, 64],
    [64, 80],
  ]
    .map(([start, end]) => {
      const [categoryName, ...categoryData] = data.slice(start, end);

      return groupJeopardyQuestions({
        categoryName: categoryName![1] as string,
        categoryData,
      });
    })
    .flat();

  const parseBoardName = z
    .string()
    .min(1, { message: "Jeopardy board name must be at least 1 character." })
    .safeParse(unsafeBoardName);

  if (!parseBoardName.success) {
    const { errors } = parseBoardName.error;
    return {
      responseType: "error",
      serverResponses: Array.from(new Set(errors.map((err) => err.message))),
    };
  }

  const boardName = parseBoardName.data;

  const zodParser = jeopardyCreationSchema.safeParse(jeopardyBoardData);

  if (zodParser.success) {
    const newJeopardyBoard = await api.board.create({
      name: boardName,
    });

    const boardChallengesWithBoardId = zodParser.data.map((i) => ({
      ...i,
      boardId: newJeopardyBoard.id,
    }));

    await api.boardChallenges.createMany(boardChallengesWithBoardId);

    return {
      responseType: "success",
      serverResponses: ["New jeopardy board successfully created."],
    };
  }

  const { errors } = zodParser.error;

  return {
    responseType: "error",
    serverResponses: Array.from(new Set(errors.map((err) => err.message))),
  };
};

const groupJeopardyQuestions = ({
  categoryName,
  categoryData,
}: {
  categoryName: string;
  categoryData: [string, FormDataEntryValue][];
}) => {
  const challenges = [];

  let n = 0;
  while (n < 5) {
    const challenge = {
      category: categoryName,
      question: "",
      answer: "",
      points: 0,
    };

    for (let i = 0; i < 3; i++) {
      const value = categoryData[i + 3 * n]![1];

      if (i == 0) challenge.question = value as unknown as string;
      if (i == 1) challenge.answer = value as unknown as string;
      if (i == 2) challenge.points = +value as unknown as number;

      if (i == 2) n++;
    }

    challenges.push(challenge);
  }

  return challenges;
};
