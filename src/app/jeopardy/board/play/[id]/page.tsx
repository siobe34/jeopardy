import { z } from "zod";

import { api } from "@/trpc/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function Page({ params }: { params: { id: string } }) {
  const gameId = parseParamAndGetGameId(params);

  const { boardId } = await api.game.getById({ gameId });

  const boardChallenges = await api.boardChallenges.getAllByBoard({ boardId });

  return (
    <>
      <div className="h-[150px] bg-blue-100">Show Teams and Points here</div>
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
                // TODO: add modal to show the question when it's selected
                <Button key={i} className="aspect-square h-16 rounded-full p-4">
                  {category.points[i]}
                </Button>
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
