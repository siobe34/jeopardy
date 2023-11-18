"use client";

import { Loader2Icon, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/app/_components/ui/button";
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
import { type TNewBoard } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { boardSchema } from "@/types/boardSchema";

export const NewBoard = ({ userId }: { userId: string }) => {
  const formId = "new-board";

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const defaultBoardState = {
    name: "",
    status: "active",
    userId: userId,
  } as const;

  const [boardState, setBoardState] = useState<TNewBoard>(defaultBoardState);

  const createBoard = api.board.create.useMutation({
    onSuccess: (data) => {
      // * Redirect to add the jeopardy info for the new board
      router.push(`/board/new?id=${data.id}`);

      // * Reset state
      setBoardState(defaultBoardState);
      setLoading(false);

      toast({
        title: "Success",
        description:
          "New board was created successfully! Go ahead and fill in the jeopardy questions to complete the board.",
        variant: "success",
      });
    },
    onError: () => {
      setLoading(false);

      toast({
        title: "Unexpected Error",
        description:
          "Could not create the new jeopardy board. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFormSubmission = (e: FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const zodParser = boardSchema.safeParse(boardState);

    if (!zodParser.success) {
      setLoading(false);

      zodParser.error.issues.forEach((error) =>
        toast({
          title: "Input Error",
          description: error.message,
          variant: "destructive",
        }),
      );
    }

    if (zodParser.success) {
      createBoard.mutate(zodParser.data);
    }
  };

  return (
    <form id={formId} onSubmit={handleFormSubmission} className="self-end">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusIcon className="mr-2" />
            New Board
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Jeopardy Board</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center sm:gap-4">
            <Label
              htmlFor="name"
              className="pb-1 leading-relaxed sm:pb-0 sm:text-right"
            >
              Name
            </Label>
            <Input
              id="name"
              placeholder="Chore Description"
              defaultValue={boardState.name ?? ""}
              onChange={(e) =>
                setBoardState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }))
              }
              className="sm:col-span-3"
            />
          </div>
          <Button type="submit" form={formId} disabled={loading}>
            {loading && <Loader2Icon className="mr-2 animate-spin" />}
            Create
          </Button>
        </DialogContent>
      </Dialog>
    </form>
  );
};
