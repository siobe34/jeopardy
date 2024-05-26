import { z } from "zod";

import { api } from "@/trpc/server";

export default async function Page({ params }: { params: { id: string } }) {
  const gameId = parseParamAndGetGameId(params);

  const { boardId } = await api.game.getById({ gameId });

  // get the board challenges
  const boardChallenges = await api.boardChallenges.getAllByBoard({ boardId });

  return <h1>{params.id}</h1>;
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
