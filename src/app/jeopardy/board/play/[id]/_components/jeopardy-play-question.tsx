"use client";

import { useState } from "react";

import { type DialogContentProps } from "@radix-ui/react-dialog";

import { AssignTeamPoints } from "@/app/jeopardy/board/play/[id]/_components/assign-team-points";
import { JeopardyQuestionAnswerReveal } from "@/app/jeopardy/board/play/[id]/_components/jeopardy-question-answer-reveal";
import { Button, type ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/cn";

export type JeopardyData = {
  id: number;
  category: string;
  question: string;
  answer: string;
  points: number;
  status: "unsolved" | "solved";
};

export type Team = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
  points: number;
  gameId: number;
};

type Props = {
  children: React.ReactNode;
  triggerButtonProps?: ButtonProps;
  dialogContentProps?: DialogContentProps;
  jeopardyData: JeopardyData;
  teams: Team[];
};

export const JeopardyPlayQuestion = ({
  children,
  triggerButtonProps,
  dialogContentProps,
  jeopardyData,
  teams,
}: Props) => {
  const [dialogState, setDialogState] = useState(false);
  return (
    <Dialog open={dialogState} onOpenChange={setDialogState}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "aspect-square h-16 rounded-full p-4",
            triggerButtonProps?.className,
            jeopardyData.status === "solved" && "dark:brightness-50",
          )}
          variant={triggerButtonProps?.variant ?? "default"}
          disabled={jeopardyData.status === "solved"}
          {...triggerButtonProps}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent
        className={cn(
          "h-[85vh] w-[85vw] max-w-none",
          dialogContentProps?.className,
        )}
        {...dialogContentProps}
      >
        <DialogHeader>
          <DialogTitle className="text-4xl">
            {jeopardyData.category}: {jeopardyData.points} Points
          </DialogTitle>
          <DialogDescription>
            Click the &quot;Reveal Answer&quot; button to see the correct
            answer, no takebacks! Then click the name of the team that got it
            right to give them the points.
          </DialogDescription>
        </DialogHeader>
        <JeopardyQuestionAnswerReveal {...jeopardyData} />
        <DialogFooter className="flex flex-col gap-4 place-self-center sm:flex-col">
          <p className="text-center">Assign points to a team.</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            {teams.map((team) => (
              <AssignTeamPoints
                key={team.id}
                {...team}
                addPoints={jeopardyData.points}
                isSolved={jeopardyData.status === "solved"}
                setDialogState={setDialogState}
              />
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
