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
  // TODO: remove manual throttling
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const data = Array.from(formData.entries());

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

  const parsedData = jeopardyCreationSchema.safeParse(jeopardyBoardData);

  if (parsedData.success) {
    const createdJeopardyBoardId = saveJeopardyBoardToDatabase({
      boardData: parsedData.data,
    });

    return { message: "New jeopardy board successfully created." };
  }

  // TODO
  // parse data
  // create trpc router for jeopardy board challenges and create entries from parsed data
  // return success message

  // return error msg if failed

  return { boardName: "", message: "error" };
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
