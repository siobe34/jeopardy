"use client";

import { PartyPopperIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { createRef, useState, type FormEvent } from "react";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_components/ui/use-toast";
import {
  DEFAULT_JEOPARDY_BOARD_STATE,
  DEFAULT_JEOPARDY_BUTTON_STATE,
  DEFAULT_JEOPARDY_CATEGORY_STATE,
} from "@/lib/constants";
import { api } from "@/trpc/react";
import { challengeSchema } from "@/types/challengeSchema";

export const FillJeopardyBoard = ({ boardId }: { boardId: number }) => {
  const router = useRouter();

  const formRef = createRef<HTMLFormElement>();

  const [count, setCount] = useState(1);
  const [disableButton, setDisableButton] = useState(
    DEFAULT_JEOPARDY_BUTTON_STATE,
  );

  const [category, setCategory] = useState(DEFAULT_JEOPARDY_CATEGORY_STATE);
  const [jeopardy, setJeopardy] = useState(DEFAULT_JEOPARDY_BOARD_STATE);

  const addChallenge = api.challenge.create.useMutation({
    onSuccess: () => {
      // * Set default states
      setDisableButton(DEFAULT_JEOPARDY_BUTTON_STATE);
      setCategory(DEFAULT_JEOPARDY_CATEGORY_STATE);
      setJeopardy(DEFAULT_JEOPARDY_BOARD_STATE);

      // * Increment counter for category by 1
      setCount((prevState) => prevState + 1);

      // * If category counter is at 5, redirect, otherwise refresh the page
      if (count >= 5) {
        router.push("/dashboard");
      } else {
        formRef.current?.reset();
      }

      toast({
        title: "Success",
        description: "Saved questions!.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Unexpected Error",
        description:
          "Encountered an unexpected error. Please try to refresh the page and try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmission = (e: FormEvent) => {
    e.preventDefault();

    // * If button is already disabled prior to form submission, do not re-submit form
    if (disableButton) return;
    // * Otherwise, disable the button
    setDisableButton(true);

    const jeopardyToPassZod = Object.values(jeopardy).map((challenge) => ({
      boardId,
      category,
      question: challenge.question,
      answer: challenge.answer,
      points: challenge.points,
    }));

    const zodParser = challengeSchema.safeParse(jeopardyToPassZod);

    if (!zodParser.success) {
      zodParser.error.issues.forEach((error) =>
        toast({
          title: "Input Error",
          description: error.message,
          variant: "destructive",
        }),
      );

      // * If there are errors, the form was not submitted so the button is no longer disabled
      setDisableButton(false);
    }

    if (zodParser.success) {
      addChallenge.mutate(zodParser.data);
    }
  };

  return (
    <>
      <h2 className="mt-4 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors">
        Category {count}
      </h2>
      <form
        ref={formRef}
        onSubmit={handleFormSubmission}
        className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2"
      >
        <div className="flex flex-col gap-1 rounded-sm border p-4 sm:col-span-2 sm:mx-auto">
          <Label className="text-lg">Category Name</Label>
          <Input
            defaultValue={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder={`Name of category ${count}`}
          />
        </div>
        <div className="flex flex-col gap-1 rounded-sm border p-4">
          <Label className="text-lg">100 points</Label>
          <div className="flex flex-col gap-2">
            <Input
              defaultValue={jeopardy.question1.question}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question1: {
                    ...prevState.question1,
                    question: e.target.value,
                  },
                }))
              }
              placeholder="Question 1"
            />
            <Input
              defaultValue={jeopardy.question1.answer}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question1: {
                    ...prevState.question1,
                    answer: e.target.value,
                  },
                }))
              }
              placeholder="Answer 1"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-sm border p-4">
          <Label className="text-lg">200 points</Label>
          <div className="flex flex-col gap-2">
            <Input
              defaultValue={jeopardy.question2.question}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question2: {
                    ...prevState.question2,
                    question: e.target.value,
                  },
                }))
              }
              placeholder="Question 2"
            />
            <Input
              defaultValue={jeopardy.question2.answer}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question2: {
                    ...prevState.question2,
                    answer: e.target.value,
                  },
                }))
              }
              placeholder="Answer 2"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-sm border p-4">
          <Label className="text-lg">300 points</Label>
          <div className="flex flex-col gap-2">
            <Input
              defaultValue={jeopardy.question3.question}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question3: {
                    ...prevState.question3,
                    question: e.target.value,
                  },
                }))
              }
              placeholder="Question 3"
            />
            <Input
              defaultValue={jeopardy.question3.answer}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question3: {
                    ...prevState.question3,
                    answer: e.target.value,
                  },
                }))
              }
              placeholder="Answer 3"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-sm border p-4">
          <Label className="text-lg">400 points</Label>
          <div className="flex flex-col gap-2">
            <Input
              defaultValue={jeopardy.question4.question}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question4: {
                    ...prevState.question4,
                    question: e.target.value,
                  },
                }))
              }
              placeholder="Question 4"
            />
            <Input
              defaultValue={jeopardy.question4.answer}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question4: {
                    ...prevState.question4,
                    answer: e.target.value,
                  },
                }))
              }
              placeholder="Answer 4"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1 rounded-sm border p-4">
          <Label className="text-lg">500 points</Label>
          <div className="flex flex-col gap-2">
            <Input
              defaultValue={jeopardy.question5.question}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question5: {
                    ...prevState.question5,
                    question: e.target.value,
                  },
                }))
              }
              placeholder="Question 5"
            />
            <Input
              defaultValue={jeopardy.question5.answer}
              onChange={(e) =>
                setJeopardy((prevState) => ({
                  ...prevState,
                  question5: {
                    ...prevState.question5,
                    answer: e.target.value,
                  },
                }))
              }
              placeholder="Answer 5"
            />
          </div>
        </div>
        <Button
          type="submit"
          className="group transition-all sm:col-span-2 sm:mx-auto sm:px-8"
          disabled={disableButton}
          variant={disableButton ? "secondary" : "default"}
        >
          <span className="flex group-disabled:hidden">Save</span>
          <span className="hidden items-center justify-center gap-2 group-disabled:inline-flex">
            <PartyPopperIcon /> Saved
          </span>
        </Button>
      </form>
    </>
  );
};
