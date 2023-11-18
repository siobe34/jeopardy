import Link from "next/link";
import { z } from "zod";

import { FillJeopardyBoard } from "@/app/_components/fill-jeopardy-board";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
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
    return (
      <main className="container">
        <Card>
          <CardHeader>
            <CardTitle>Couldn&apos;t find this board</CardTitle>
            <CardDescription>
              Looks like the board with this ID doesn&apos;t exist. You can add
              a new board from the{" "}
              <Link href="/dashboard" className="text-foreground underline">
                Dashboard
              </Link>
              .
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
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
