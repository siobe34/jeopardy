"use client";

import { useRouter } from "next/navigation";
import { createRef, useState, type ChangeEvent } from "react";

import { type Team } from "@/app/jeopardy/board/play/[id]/_components/jeopardy-play-question";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/trpc/react";
import { MinusIcon, PlusIcon } from "lucide-react";

export const SettingsButton = ({
  gameId,
  boardId,
  teams,
}: {
  gameId: number;
  boardId: number;
  teams: Team[];
}) => {
  const refCloseDialog = createRef<HTMLButtonElement>();
  const router = useRouter();
  const [allTeams, setAllTeams] = useState(teams);

  const { mutate, isPending } = api.team.assignPoints.useMutation({
    onSuccess: () => {
      refCloseDialog.current?.click();
      router.refresh();
    },
  });

  const handleUpdateTeamPoints = () => {
    allTeams.forEach((team) => mutate({ id: team.id, points: team.points }));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Settings</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Game Settings</DialogTitle>
          <DialogDescription>
            Manually adjust the points for each team.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-6 py-8 sm:flex-row">
          {teams.map((team, idx) => (
            <TeamPoints
              key={team.id}
              currentTeamIndex={idx}
              allTeams={allTeams}
              setAllTeams={setAllTeams}
            />
          ))}
        </div>
        <DialogFooter className="gap-2">
          <DialogClose
            ref={refCloseDialog}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </DialogClose>
          <Button onClick={handleUpdateTeamPoints} disabled={isPending}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const TeamPoints = ({
  currentTeamIndex,
  allTeams,
  setAllTeams,
}: {
  currentTeamIndex: number;
  allTeams: Team[];
  setAllTeams: React.Dispatch<React.SetStateAction<Team[]>>;
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    setAllTeams((prevState) => {
      const prevTeamState = prevState[currentTeamIndex];
      if (!prevTeamState) return prevState;

      const newState = [...prevState];
      newState.splice(currentTeamIndex, 1, {
        ...prevTeamState,
        points: value,
      });
      return newState;
    });
  };

  const handleSubtractingPoints = () => {
    setAllTeams((prevState) => {
      const prevTeamState = prevState[currentTeamIndex];
      if (!prevTeamState) return prevState;

      const newState = [...prevState];
      newState.splice(currentTeamIndex, 1, {
        ...prevTeamState,
        points: prevTeamState.points - 100,
      });
      return newState;
    });
  };

  const handleAddingPoints = () => {
    setAllTeams((prevState) => {
      const prevTeamState = prevState[currentTeamIndex];
      if (!prevTeamState) return prevState;

      const newState = [...prevState];
      newState.splice(currentTeamIndex, 1, {
        ...prevTeamState,
        points: prevTeamState.points + 100,
      });
      return newState;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{allTeams[currentTeamIndex]?.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-start justify-center gap-2">
          <Label>Points</Label>
          <Input
            className="text-center"
            type="number"
            min={0}
            step={100}
            value={allTeams[currentTeamIndex]?.points}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex items-center justify-around">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleSubtractingPoints}
          >
            <MinusIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={handleAddingPoints}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
