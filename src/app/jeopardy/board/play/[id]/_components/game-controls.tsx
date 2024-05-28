"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/react";

export const GameControls = ({
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
    <Card className="flex h-full flex-col items-center justify-around gap-2 p-4">
      <Button
        variant="ghost"
        className="border border-transparent bg-accent hover:border-border"
        onClick={handleGameReset}
        disabled={isPending}
      >
        Reset Board
      </Button>
      <Button
        variant="ghost"
        className="border border-transparent bg-accent hover:border-border"
      >
        Settings
      </Button>
    </Card>
  );
};
