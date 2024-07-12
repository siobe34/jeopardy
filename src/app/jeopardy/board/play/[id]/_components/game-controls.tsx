import { ResetGameButton } from "@/app/jeopardy/board/play/[id]/_components/reset-game-button";
import { SettingsButton } from "@/app/jeopardy/board/play/[id]/_components/settings-button";
import { Card } from "@/components/ui/card";
import { api } from "@/trpc/server";

export const GameControls = async ({
  gameId,
  boardId,
}: {
  gameId: number;
  boardId: number;
}) => {
  const teams = await api.team.getByGame({ gameId });

  return (
    <Card className="flex h-full flex-col items-center justify-around gap-2 p-4">
      <ResetGameButton gameId={gameId} boardId={boardId} />
      <SettingsButton gameId={gameId} boardId={boardId} teams={teams} />
    </Card>
  );
};
