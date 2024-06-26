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
}: Team & { addPoints: number; isSolved: boolean }) => {
  const router = useRouter();

  const { mutate, isPending } = api.team.assignPoints.useMutation({
    onSuccess: () => router.refresh(),
  });

  const handleClick = () => {
    mutate({ id, points: points + addPoints });
  };

  return (
    <Button onClick={handleClick} disabled={isSolved ? isPending : true}>
      {name}
    </Button>
  );
};
