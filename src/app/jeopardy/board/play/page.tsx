import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { createJeopardyTeams } from "@/app/jeopardy/board/play/_actions/new-jeopardy-teams";
import { JeopardyForm } from "@/components/jeopardy-form/form";
import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";
import { JeopardyFormSubmitButton } from "@/components/jeopardy-form/submit-button";
import { type SearchParams } from "@/lib/global-types";
import { SITE_ROUTES } from "@/lib/site-routes";
import { boardIdGameIdSchema } from "@/lib/zod-schemas/get-board-and-game-ids";
import { api } from "@/trpc/server";

export const metadata: Metadata = {
  title: "New Game",
};

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

  const game = await api.game.getByBoardAndGameId({ gameId, boardId });

  return (
    <JeopardyForm action={createJeopardyTeams} className="auto-rows-min">
      <JeopardyFormInputWithLabel
        inputId="gameId"
        className="hidden"
        label={{
          text: "Game Id",
          className: "hidden",
        }}
        type="text"
        defaultValue={game.id}
        readOnly
      />
      <div className="mt-12 flex flex-col items-center gap-8 sm:col-span-2">
        <JeopardyFormInputWithLabel
          inputId="team1"
          className=""
          label={{
            text: "Team 1",
            className: "text-lg font-semibold leading-none tracking-tight",
          }}
          type="text"
        />
        <JeopardyFormInputWithLabel
          inputId="team2"
          className=""
          label={{
            text: "Team 2",
            className: "text-lg font-semibold leading-none tracking-tight",
          }}
          type="text"
        />
      </div>
      <JeopardyFormSubmitButton
        size="lg"
        className="mt-12 max-w-fit self-center sm:col-span-2 sm:self-start sm:justify-self-center"
      >
        Start Game
      </JeopardyFormSubmitButton>
    </JeopardyForm>
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
