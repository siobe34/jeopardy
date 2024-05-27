"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { type JeopardyData } from "@/app/jeopardy/board/play/[id]/_components/jeopardy-play-question";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { api } from "@/trpc/react";

export const JeopardyQuestionAnswerReveal = ({
  id,
  answer,
  question,
  status,
}: JeopardyData) => {
  const router = useRouter();

  const { mutate, isPending } = api.boardChallenges.changeStatus.useMutation({
    onSuccess: () => {
      setStatusState("solved");
      router.refresh();
    },
  });

  const [statusState, setStatusState] = useState(status);

  const handleClick = () => {
    mutate({ id, status: "solved" });
  };

  return (
    <>
      <div className="grid grid-cols-1 grid-rows-1 place-items-center">
        <div
          className={cn(
            "absolute col-span-1 row-span-1 text-xl font-medium leading-snug tracking-tight",
            statusState === "unsolved" ? "opacity-100" : "opacity-0",
          )}
        >
          {question}
        </div>
        <div
          className={cn(
            "absolute col-span-1 row-span-1 text-xl font-medium leading-snug tracking-tight",
            statusState === "solved" ? "opacity-100" : "opacity-0",
          )}
        >
          {answer}
        </div>
      </div>
      <Button
        className={cn(
          "relative w-fit place-self-center",
          statusState === "solved" && "pointer-events-none opacity-0",
        )}
        variant={isPending ? "outline" : "default"}
        onClick={handleClick}
      >
        <span
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0",
            isPending && "opacity-100",
          )}
        >
          . . .
        </span>
        <span
          className={cn(
            "opacity-100",
            isPending && "pointer-events-none opacity-0",
          )}
        >
          Reveal Answer
        </span>
      </Button>
    </>
  );
};
