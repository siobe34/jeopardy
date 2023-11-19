import { ArrowLeftCircleIcon } from "lucide-react";
import Link from "next/link";
import { z } from "zod";

import { BoardNotFound } from "@/app/_components/board-not-found";
import { JeopardyQuestion } from "@/app/_components/jeopardy-question";
import { ScoreViewer } from "@/app/_components/score-viewer";
import { buttonVariants } from "@/app/_components/ui/button";
import { groupArrayOfObjsBy } from "@/lib/groupArrayOfObjsBy";
import { api } from "@/trpc/server";

export const metadata = {
  title: "Jeopardy | Play!",
};

export default async function Game({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const unsafeBoardId = searchParams.id as string;
  const team1 = searchParams.team1;
  const team2 = searchParams.team2;
  const team3 = searchParams.team3;

  const parseBoardId = z
    .object({ id: z.number() })
    .safeParse({ id: parseInt(unsafeBoardId) });

  const parseTeamNames = z
    .object({ team1: z.string(), team2: z.string(), team3: z.string() })
    .safeParse({ team1, team2, team3 });

  if (!parseBoardId.success || !parseTeamNames.success) {
    return <BoardNotFound />;
  }

  const boardId = parseBoardId.data.id;
  const teamNames = parseTeamNames.data;

  let queriedJeopardyData = await api.challenge.getByBoardAndUser.query({
    boardId,
  });

  if (queriedJeopardyData.length > 30) {
    queriedJeopardyData = queriedJeopardyData.slice(0, 30);
  }

  const jeopardyData = groupArrayOfObjsBy({
    array: queriedJeopardyData,
    groupByKeys: ["category"],
  });

  return (
    <main className="h-[calc(100vh-12rem)] max-h-[calc(100vh-12rem)] w-full overflow-hidden p-12 pt-2">
      <div className="flex gap-4">
        <Link
          href="/dashboard"
          className={buttonVariants({ variant: "default" })}
        >
          <ArrowLeftCircleIcon className="mr-2" /> Dashboard
        </Link>
        <ScoreViewer boardId={boardId} />
      </div>
      <div className="mt-4 hidden place-items-center border-b border-b-secondary sm:grid sm:grid-cols-6">
        <span className="text-sm text-muted-foreground">Category 1</span>
        <span className="text-sm text-muted-foreground">Category 2</span>
        <span className="text-sm text-muted-foreground">Category 3</span>
        <span className="text-sm text-muted-foreground">Category 4</span>
        <span className="text-sm text-muted-foreground">Category 5</span>
        <span className="text-sm text-muted-foreground">Category 6</span>
      </div>
      <div className="flex h-full flex-col gap-2 sm:grid sm:grid-cols-6">
        {Object.entries(jeopardyData).map(([category, data], colIdx) => (
          <div
            key={colIdx}
            className="relative mt-2 flex flex-col gap-4 overflow-auto rounded-lg border px-4 pb-2"
          >
            <h2 className="sticky top-0 bg-background pt-2 text-center text-2xl font-semibold tracking-tight">
              {category}
            </h2>
            {data.map((jeopardyChallenge, rowIdx) => (
              <JeopardyQuestion
                key={`${colIdx}-${rowIdx}`}
                answer={jeopardyChallenge.answer}
                boardId={boardId}
                category={category}
                points={jeopardyChallenge.points}
                question={jeopardyChallenge.question}
                status={jeopardyChallenge.status}
                teams={teamNames}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
