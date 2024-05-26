import { redirect } from "next/navigation";

import { createJeopardyBoard } from "@/app/jeopardy/board/create/_actions/new-jeopardy";
import { JeopardyForm } from "@/components/jeopardy-form/form";
import { JeopardyFormCategory } from "@/components/jeopardy-form/jeopardy-category";
import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";
import { JeopardyFormSubmitButton } from "@/components/jeopardy-form/submit-button";
import { type SearchParams } from "@/lib/global-types";
import { SITE_ROUTES } from "@/lib/site-routes";

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const boardName = searchParams.name;

  if (!boardName || boardName === "" || typeof boardName !== "string")
    redirect(`${SITE_ROUTES.jeopardyCreate.path}?name=New Board`);

  const questions = [
    { questionNumber: 1, points: 100 },
    { questionNumber: 2, points: 200 },
    { questionNumber: 3, points: 300 },
    { questionNumber: 4, points: 400 },
    { questionNumber: 5, points: 500 },
  ];

  const categories = [
    { categoryNumber: 1, questions },
    { categoryNumber: 2, questions },
    { categoryNumber: 3, questions },
    { categoryNumber: 4, questions },
    { categoryNumber: 5, questions },
  ];

  return (
    <JeopardyForm action={createJeopardyBoard}>
      <JeopardyFormInputWithLabel
        inputId="boardName"
        className="w-fit place-self-center sm:place-self-start"
        label={{
          text: "Board Name",
          className:
            "place-self-center text-lg font-semibold leading-none tracking-tight sm:place-self-start",
        }}
        type="text"
        defaultValue={boardName}
      />
      {categories.map((category) => (
        <JeopardyFormCategory
          key={category.categoryNumber}
          categoryNumber={category.categoryNumber}
          questions={category.questions}
        />
      ))}
      <JeopardyFormSubmitButton
        size="lg"
        className="max-w-fit place-self-center sm:col-span-2"
      >
        Create Jeopardy Board
      </JeopardyFormSubmitButton>
    </JeopardyForm>
  );
}
