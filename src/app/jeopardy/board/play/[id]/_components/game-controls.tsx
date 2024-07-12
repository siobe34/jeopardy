import { ResetGameButton } from "@/app/jeopardy/board/play/[id]/_components/reset-game-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const GameControls = ({
  gameId,
  boardId,
}: {
  gameId: number;
  boardId: number;
}) => {
  return (
    <Card className="flex h-full flex-col items-center justify-around gap-2 p-4">
      <ResetGameButton gameId={gameId} boardId={boardId} />
      <Button
        variant="secondary"
        disabled={true} // TODO: implement this functionality then enable the button
      >
        Settings
      </Button>
    </Card>
  );
};
