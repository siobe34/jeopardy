import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { createJeopardyBoard } from "@/app/jeopardy/board/create/_actions/new-jeopardy";
import { CreateJeopardyFormCategory } from "@/app/jeopardy/board/create/_components/create-jeopardy-form-category";
import { JeopardyForm } from "@/components/jeopardy-form/form";
import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";
import { JeopardyFormSubmitButton } from "@/components/jeopardy-form/submit-button";
import { Card } from "@/components/ui/card";
import { type SearchParams } from "@/lib/global-types";
import { SITE_ROUTES } from "@/lib/site-routes";

export const metadata: Metadata = {
  title: "Create",
};

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
      <Card className="col-span-2 h-fit p-6">
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
      </Card>
      {categories.map((category) => (
        <Card key={category.categoryNumber}>
          <CreateJeopardyFormCategory
            categoryNumber={category.categoryNumber}
            questions={category.questions}
          />
        </Card>
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
