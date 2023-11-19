import { DeleteBoard } from "@/app/_components/delete-board";
import { NewBoard } from "@/app/_components/new-board";
import { PlayButton } from "@/app/_components/play-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { env } from "@/env.mjs";
import { api } from "@/trpc/server";

export const metadata = {
  title: "Jeopardy | Dashboard",
};

export default async function DashboardHome() {
  const jeopardyBoards = await api.board.getByCurrentUser.query();

  return (
    <main className="container flex flex-col gap-4">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
        Your Jeopardy Boards
      </h1>
      <NewBoard userId={env.SUPABASE_USER_ID} />
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
              <PlayButton boardId={board.id} />
              <DeleteBoard boardId={board.id} />
            </CardContent>
          </Card>
        ))
      )}
    </main>
  );
}
