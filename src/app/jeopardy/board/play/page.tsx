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
    // max height of 95vh is very "magic numbery" and almost certainly breaks down in some cases
    // oh and the 95vh is because the overall app grid is 5vh for the header and 95vh for the main content
    <div className="grid h-full max-h-[95vh] w-full overflow-hidden border-8 border-fuchsia-600">
      Board Id: {searchParams.boardId}
    </div>
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
