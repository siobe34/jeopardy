"use client";

import { useRouter } from "next/navigation";

import { type Team } from "@/app/jeopardy/board/play/[id]/_components/jeopardy-play-question";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

export const AssignTeamPoints = ({
  id,
  points,
  name,
  addPoints,
  isSolved,
  setDialogState,
}: Team & {
  addPoints: number;
  isSolved: boolean;
  setDialogState: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const { mutate, isPending } = api.team.assignPoints.useMutation({
    onSuccess: () => {
      router.refresh();
      setDialogState(false);
    },
  });

  const handleClick = () => {
    mutate({ id, points: points + addPoints });
  };

  return (
    <Button
      variant="default"
      disabled={isSolved ? isPending : true}
      onClick={handleClick}
    >
      {name}
    </Button>
  );
};
