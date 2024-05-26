import { redirect } from "next/navigation";

import { createJeopardyBoard } from "@/app/jeopardy/board/create/_actions/new-jeopardy";
import { CreateJeopardyForm } from "@/components/jeopardy-form/form";
import { JeopardyFormCategory } from "@/components/jeopardy-form/jeopardy-category";
import { JeopardyFormSubmitButton } from "@/components/jeopardy-form/submit-button";
import { SITE_ROUTES } from "@/lib/site-routes";

type SearchParams = Record<string, string | string[] | undefined>;

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const boardName = String(searchParams.name);

  if (!boardName) redirect(`${SITE_ROUTES.jeopardyCreate.path}?name=New Board`);

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
    <>
      <h1>Create a Jeopardy</h1>
      <CreateJeopardyForm action={createJeopardyBoard} boardName={boardName}>
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
      </CreateJeopardyForm>
    </>
  );
}
