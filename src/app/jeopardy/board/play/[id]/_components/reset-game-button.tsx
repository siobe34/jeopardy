"use client";

import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { api } from "@/trpc/react";

export const ResetGameButton = ({
  gameId,
  boardId,
}: {
  gameId: number;
  boardId: number;
}) => {
  const router = useRouter();

  const { mutate: resetTeamPoints, isPending: teamMutationPending } =
    api.team.resetTeamPointsByGame.useMutation({
      onSuccess: () => router.refresh(),
    });

  const { mutate: resetBoardChallenges, isPending: boardResetPending } =
    api.boardChallenges.resetBoard.useMutation({
      onSuccess: () => router.refresh(),
    });

  const isPending = teamMutationPending && boardResetPending;

  const handleGameReset = () => {
    resetTeamPoints({ gameId });
    resetBoardChallenges({ boardId });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">Reset Game</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>This cannot be undone!!</AlertDialogTitle>
          <AlertDialogDescription>
            Resetting the game will set all questions to be unsolved and set all
            teams to have 0 points.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: "destructive" }))}
            onClick={handleGameReset}
            disabled={isPending}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
