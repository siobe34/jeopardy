"use client";

import { useState } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { cn } from "@/lib/cn";

type Props = {
  answer: string;
  category: string;
  points: number;
  question: string;
};

export const JeopardyQuestion = ({
  answer,
  category,
  points,
  question,
}: Props) => {
  const [showAnswer, setShowAnswer] = useState(false);

  const handleDialogStateChange = () => {
    setShowAnswer(false);
  };
  return (
    <Dialog onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>
        <Button
          className="flex aspect-square w-fit self-center rounded-full border-foreground/80 p-8 text-2xl font-semibold tracking-tight transition-all hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
          variant="outline"
        >
          {points}
        </Button>
      </DialogTrigger>
      <DialogContent className="h-4/5 text-center sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="flex flex-col gap-2 text-3xl text-foreground">
          <span>{question}</span>
          <span className="text-lg italic">Worth {points} points</span>
        </DialogDescription>
        <div
          className={cn(
            "h-fit rounded-md border border-secondary p-8 text-lg opacity-0 transition-all duration-500 ease-in",
            showAnswer && "opacity-100",
          )}
        >
          {answer}
        </div>
        <Button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
