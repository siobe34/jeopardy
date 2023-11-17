import { EditIcon, PartyPopperIcon, Trash2Icon } from "lucide-react";

import { NewBoard } from "@/app/_components/new-board";
import { Button } from "@/app/_components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { api } from "@/trpc/server";
import { currentUser } from "@clerk/nextjs";

export default async function DashboardHome() {
  const user = await currentUser();

  const jeopardyBoards = await api.board.getByCurrentUser.query();

  return (
    <main className="container flex flex-col gap-4">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Your Jeopardy Boards
      </h1>
      {!!user && <NewBoard userId={user.id} />}
      {jeopardyBoards.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No boards!</CardTitle>
            <CardDescription>
              Looks like you don&apos;t have any jeopardy boards yet. Go ahead
              and a new one with the button above!
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        jeopardyBoards.map((board) => (
          <Card key={board.id}>
            <CardHeader>
              <CardTitle>{board.name}</CardTitle>
              <CardDescription className="capitalize">
                {board.status}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <Button variant="secondary">
                Play!
                <PartyPopperIcon className="ml-2" />
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Button>
                  <EditIcon className="mr-2" />
                  Edit Board
                </Button>
                <Button
                  variant="destructive"
                  className="hover:bg-destructive/80"
                >
                  <Trash2Icon className="mr-2" />
                  Delete Board
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
