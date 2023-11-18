import { z } from "zod";

import { BoardNotFound } from "@/app/_components/board-not-found";
import { FillJeopardyBoard } from "@/app/_components/fill-jeopardy-board";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { api } from "@/trpc/server";

export default async function BoardEdit({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let boardId: number | undefined;
  const boardIds = (await api.board.getByCurrentUser.query()).map(
    (board) => board.id,
  );

  const boardIdAsString = searchParams.id as string;

  const searchParamsZod = z
    .object({ id: z.number() })
    .safeParse({ id: parseInt(boardIdAsString) });

  if (searchParamsZod.success) {
    boardId = searchParamsZod.data.id;
  }

  if (!boardId || !boardIds.includes(boardId)) {
    return <BoardNotFound />;
  }

  return (
    <main className="container">
      <h1 className="mb-6 scroll-m-20 border-b text-3xl font-extrabold tracking-tight lg:text-4xl">
        Fill out your Jeopardy Board
      </h1>
      <Tabs defaultValue="category1">
        <TabsList className="flex h-full w-full flex-wrap sm:grid sm:grid-cols-5">
          <TabsTrigger value="category1">Category 1</TabsTrigger>
          <TabsTrigger value="category2">Category 2</TabsTrigger>
          <TabsTrigger value="category3">Category 3</TabsTrigger>
          <TabsTrigger value="category4">Category 4</TabsTrigger>
          <TabsTrigger value="category5">Category 5</TabsTrigger>
        </TabsList>
        {[1, 2, 3, 4, 5].map((categoryNumber, idx) => (
          <TabsContent key={idx} value={`category${idx + 1}`}>
            <Card>
              <CardContent>
                <FillJeopardyBoard
                  boardId={boardId ?? 0}
                  categoryNumber={categoryNumber}
                />
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </main>
  );
}
