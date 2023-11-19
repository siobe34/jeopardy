"use client";

import { useRouter } from "next/navigation";
import { createRef, useState } from "react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { toast } from "@/app/_components/ui/use-toast";
import { cn } from "@/lib/cn";
import { api } from "@/trpc/react";

type Props = {
  answer: string;
  boardId: number;
  category: string;
  points: number;
  question: string;
  status: "solved" | "unsolved";
  teams: { team1: string; team2: string; team3: string };
};

export const JeopardyQuestion = ({
  answer,
  boardId,
  category,
  points,
  question,
  status,
  teams,
}: Props) => {
  const router = useRouter();

  const dialogCloseRef = createRef<HTMLButtonElement>();
  const [showAnswer, setShowAnswer] = useState(false);

  const markChallengeCompleted = api.challenge.markCompleted.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const addPointsToTeam = api.teams.addPointsByTeam.useMutation({
    onSuccess: (data) => {
      // * Close the dialog
      dialogCloseRef.current?.click();

      // * Display notifications and provide updates
      toast({
        title: "Points Added",
        description: `${points} points were added to team: ${data.name}.`,
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Couldn't update the team's score.",
        variant: "destructive",
      });
    },
  });

  const handleCompletionOfChallenge = (teamToAddPoints: string) => {
    // * Add the points to the relevant team
    addPointsToTeam.mutate({
      boardId,
      points,
      name: teamToAddPoints,
    });

    // * Mark the challenge completed and refresh so the UI updates
    markChallengeCompleted.mutate({ boardId, question });
  };

  const handleDialogStateChange = () => {
    setShowAnswer(false);
  };

  return (
    <Dialog onOpenChange={handleDialogStateChange}>
      <DialogTrigger asChild>
        <Button
          className="flex aspect-square w-fit self-center rounded-full border-foreground/80 p-8 text-2xl font-semibold tracking-tight transition-all hover:border-secondary hover:bg-secondary hover:text-secondary-foreground"
          variant={status === "solved" ? "secondary" : "outline"}
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
        {status === "unsolved" && (
          <div className="flex flex-col gap-4">
            <p>Select the team who got the right answer</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {Object.values(teams).map((team) => (
                <Button
                  key={team}
                  onClick={() => handleCompletionOfChallenge(team)}
                >
                  {team}
                </Button>
              ))}
            </div>
          </div>
        )}
        <DialogClose ref={dialogCloseRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};
