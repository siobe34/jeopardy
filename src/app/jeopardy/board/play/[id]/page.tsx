import { z } from "zod";

import { GameControls } from "@/app/jeopardy/board/play/[id]/_components/game-controls";
import { JeopardyPlayQuestion } from "@/app/jeopardy/board/play/[id]/_components/jeopardy-play-question";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const gameId = parseParamAndGetGameId(params);

  const { boardId } = await api.game.getById({ gameId });

  const teams = await api.team.getByGame({ gameId });

  const boardChallenges = await api.boardChallenges.getAllByBoard({ boardId });

  return (
    <>
      <div className="flex h-[150px] flex-row items-center justify-start gap-6 p-4">
        {teams.map((team) => (
          <Card
            key={team.id}
            className="flex h-full flex-1 flex-col items-center justify-around"
          >
            <span className="text-lg font-light leading-loose">
              {team.name}
            </span>
            <span className="text-2xl font-semibold tracking-tight">
              {team.points} Points
            </span>
          </Card>
        ))}
        <GameControls gameId={gameId} boardId={boardId} />
      </div>
      <div className="flex gap-4 overflow-x-auto p-4">
        {boardChallenges.map((category, index) => (
          <Card
            key={index}
            className="flex h-full w-[clamp(250px,100%,100%)] min-w-[250px] flex-col shadow-md"
          >
            <CardHeader>
              <CardTitle className="text-center">{category.category}</CardTitle>
            </CardHeader>
            <CardContent className="flex h-full flex-col items-center justify-around gap-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <JeopardyPlayQuestion
                  key={i}
                  teams={teams}
                  jeopardyData={{
                    id: category.id[i]!,
                    category: category.category,
                    question: category.question[i]!,
                    answer: category.answer[i]!,
                    points: category.points[i]!,
                    status: category.status[i]!,
                  }}
                >
                  {category.points[i]}
                </JeopardyPlayQuestion>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

const parseParamAndGetGameId = (params: { id: string }) => {
  const unsafeGameId = +params.id;

  const zodParser = z.number().safeParse(unsafeGameId);

  if (!zodParser.success) {
    throw new Error(
      "This game does not appear to exist. Please try creating a new game.",
    );
  }

  return zodParser.data;
};
