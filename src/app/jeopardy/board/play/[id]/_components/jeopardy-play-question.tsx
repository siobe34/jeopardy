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

type JeopardyData = {
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
          variant={triggerButtonProps?.variant ?? "outline"}
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
        <div className="grid grid-cols-1 grid-rows-1 place-items-center">
          <div
            className={cn(
              "absolute col-span-1 row-span-1 text-xl font-medium leading-snug tracking-tight",
              jeopardyData.status === "unsolved" ? "opacity-100" : "opacity-0",
            )}
          >
            {jeopardyData.question}
          </div>
          <div
            className={cn(
              "absolute col-span-1 row-span-1 text-xl font-medium leading-snug tracking-tight",
              jeopardyData.status === "solved" ? "opacity-100" : "opacity-0",
            )}
          >
            {jeopardyData.answer}
          </div>
        </div>
        <Button className="w-fit place-self-center">Reveal Answer</Button>
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