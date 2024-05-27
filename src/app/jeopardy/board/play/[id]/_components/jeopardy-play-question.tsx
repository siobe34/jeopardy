import { type DialogContentProps } from "@radix-ui/react-dialog";

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
import { JeopardyQuestionAnswerReveal } from "./jeopardy-question-answer-reveal";

export type JeopardyData = {
  id: number;
  category: string;
  question: string;
  answer: string;
  points: number;
  status: "unsolved" | "solved";
};

type Props = {
  children: React.ReactNode;
  triggerButtonProps?: ButtonProps;
  dialogContentProps?: DialogContentProps;
  jeopardyData: JeopardyData;
};

export const JeopardyPlayQuestion = ({
  children,
  triggerButtonProps,
  dialogContentProps,
  jeopardyData,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "aspect-square h-16 rounded-full p-4",
            triggerButtonProps?.className,
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
            Click "Reveal Answer" to see the correct answer, no takebacks! Then
            click the name of the team that got it right to give them the
            points.
          </DialogDescription>
        </DialogHeader>
        <JeopardyQuestionAnswerReveal {...jeopardyData} />
        <DialogFooter className="flex flex-col gap-4 place-self-center sm:flex-col">
          <p>Assign points to a team.</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button>Team 1</Button>
            <Button>Team 2</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
