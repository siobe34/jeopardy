"use client";

import { createRef } from "react";
import { useFormState } from "react-dom";

import { JeopardyFormSubmitButton } from "@/components/jeopardy-form/submit-button";
import { JeopardyFormCategory } from "@/components/jeopardy-form/jeopardy-category";

type FormState = { message: string };

type JeopardyFormQuestion = { questionNumber: number; points: number };

export type JeopardyFormProps = {
  categories: {
    categoryNumber: number;
    questions: JeopardyFormQuestion[];
  }[];
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export const CreateJeopardyForm = ({
  categories,
  action,
}: JeopardyFormProps) => {
  const ref = createRef<HTMLFormElement>();
  const [state, formAction] = useFormState(action, { message: "" });

  return (
    <form
      ref={ref}
      className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2"
      action={(formData) => {
        console.log("submitting form");
        ref.current?.reset();

        formAction(formData);
      }}
    >
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
    </form>
  );
};
