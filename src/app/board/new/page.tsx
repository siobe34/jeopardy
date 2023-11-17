import { z } from "zod";

import { FillJeopardyBoard } from "@/app/_components/fill-jeopardy-board";
import { Card, CardContent } from "@/app/_components/ui/card";
import { api } from "@/trpc/server";

export default async function BoardEdit({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let boardId;

  const boardIdAsString = searchParams.id as string;

  const searchParamsZod = z
    .object({ id: z.number() })
    .safeParse({ id: parseInt(boardIdAsString) });

  if (searchParamsZod.success) {
    boardId = searchParamsZod.data.id;
  }

  const boardData = await api.challenge.getByBoardAndUser.query({
    boardId: boardId ?? 0,
  });

  // REMOVEME
  console.log(boardData);

  // TODO fix the error message
  if (!boardId) return <main className="container">Error</main>;

  return (
    <main className="container">
      <h1 className="mb-6 scroll-m-20 border-b text-3xl font-extrabold tracking-tight lg:text-4xl">
        Fill out your Jeopardy Board
      </h1>
      <div className="">
        <Card>
          <CardContent>
            <FillJeopardyBoard boardId={boardId} />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
