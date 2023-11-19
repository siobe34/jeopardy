"use client";

import { PartyPopperIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button, buttonVariants } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { Input } from "@/app/_components/ui/input";
import { Label } from "@/app/_components/ui/label";
import { toast } from "@/app/_components/ui/use-toast";
import { api } from "@/trpc/react";

export const PlayButton = ({ boardId }: { boardId: number }) => {
  const router = useRouter();

  const [teamNames, setTeamNames] = useState({
    team1: "Team 1",
    team2: "Team 2",
    team3: "Team 3",
  });

  const createTeams = api.teams.create.useMutation({
    onSuccess: () => {
      router.push(
        `/game?id=${boardId}&team1=${teamNames.team1}&team2=${teamNames.team2}&team3=${teamNames.team3}`,
      );
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Error creating teams, please refresh and try again.",
        variant: "destructive",
      });
    },
  });

  const handlePlayButtonClick = () => {
    createTeams.mutate([
      { boardId, name: teamNames.team1 },
      { boardId, name: teamNames.team2 },
      { boardId, name: teamNames.team3 },
    ]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={buttonVariants({ variant: "secondary" })}>
          Play!
          <PartyPopperIcon className="ml-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make your teams</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
          <Label
            htmlFor="team1"
            className="pb-1 leading-relaxed sm:pb-0 sm:text-right"
          >
            Name Team 1
          </Label>
          <Input
            id="team1"
            placeholder="Team Name"
            defaultValue={teamNames.team1}
            onChange={(e) =>
              setTeamNames((prevState) => ({
                ...prevState,
                team1: e.target.value,
              }))
            }
            className="sm:col-span-3"
          />
          <Label
            htmlFor="team2"
            className="pb-1 leading-relaxed sm:pb-0 sm:text-right"
          >
            Name Team 2
          </Label>
          <Input
            id="team2"
            placeholder="Team Name"
            defaultValue={teamNames.team2}
            onChange={(e) =>
              setTeamNames((prevState) => ({
                ...prevState,
                team2: e.target.value,
              }))
            }
            className="sm:col-span-3"
          />
          <Label
            htmlFor="team3"
            className="pb-1 leading-relaxed sm:pb-0 sm:text-right"
          >
            Name Team 3
          </Label>
          <Input
            id="team3"
            placeholder="Team Name"
            defaultValue={teamNames.team3}
            onChange={(e) =>
              setTeamNames((prevState) => ({
                ...prevState,
                team3: e.target.value,
              }))
            }
            className="sm:col-span-3"
          />
        </div>
        <Button variant="secondary" onClick={handlePlayButtonClick}>
          Play!
          <PartyPopperIcon className="ml-2" />
        </Button>
      </DialogContent>
    </Dialog>
  );
};
