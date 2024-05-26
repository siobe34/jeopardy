import { redirect } from "next/navigation";

import { type SearchParams } from "@/lib/global-types";
import { SITE_ROUTES } from "@/lib/site-routes";
import { boardIdGameIdSchema } from "@/lib/zod-schemas/get-board-and-game-ids";
import { api } from "@/trpc/server";

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { boardId, gameId } = parseSearchParamsForIds(searchParams);

  if (!boardId) redirect(SITE_ROUTES.jeopardyDashboard.path);

  if (!gameId) {
    const newGame = await api.game.create({ boardId });

    redirect(
      `${SITE_ROUTES.jeopardyPlay.path}?boardId=${boardId}&gameId=${newGame.id}`,
    );
  }

  // make sure game id actually exists

  return (
    <>
      <span>Board Id: {boardId}</span>
      <span>Game Id: {gameId}</span>
    </>
  );
}

const parseSearchParamsForIds = (searchParams: SearchParams) => {
  const unsafeBoardId = searchParams.boardId ?? 0;
  const unsafeGameId = searchParams.gameId ?? 0;

  const zodParser = boardIdGameIdSchema.safeParse({
    boardId: +unsafeBoardId,
    gameId: +unsafeGameId,
  });

  if (!zodParser.success) return { boardId: null, gameId: null };

  const { data } = zodParser;

  return data;
};
