"use client";

import { useRouter } from "next/navigation";
import { createRef } from "react";
import { Trash2Icon } from "lucide-react";

import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/_components/ui/dialog";
import { toast } from "@/app/_components/ui/use-toast";
import { api } from "@/trpc/react";

export const DeleteBoard = ({ boardId }: { boardId: number }) => {
  const router = useRouter();

  const dialogCloseRef = createRef<HTMLButtonElement>();

  const deleteBoard = api.board.delete.useMutation({
    onSuccess: () => {
      // * Programatically close the dialog/modal
      dialogCloseRef.current?.click();

      // * Refresh the current path and reset default state for task
      router.refresh();

      toast({
        title: "Success",
        description: "The board was successfully deleted.",
        variant: "success",
      });
    },
    onError: () => {
      toast({
        title: "Unexpected Error",
        description: "Could not delete the jeopardy board. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDeleteConfirmation = () => {
    deleteBoard.mutate({ id: boardId });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="hover:bg-destructive/80">
          <Trash2Icon className="mr-2" />
          Delete Board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Deleting Board</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base">
          You are attempting to delete a jeopardy board.
          <p className="font-extrabold text-foreground">
            This action cannot be undone.
          </p>
        </DialogDescription>
        <Button
          variant="destructive"
          className="hover:bg-destructive/80"
          onClick={handleDeleteConfirmation}
        >
          Confirm Delete
        </Button>
        <DialogClose ref={dialogCloseRef} className="hidden" />
      </DialogContent>
    </Dialog>
  );
};
