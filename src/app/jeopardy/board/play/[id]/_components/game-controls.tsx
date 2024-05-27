import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const GameControls = () => {
  return (
    <Card className="flex h-full flex-col items-center justify-around gap-2 p-4">
      <Button
        variant="ghost"
        className="border border-transparent bg-accent hover:border-border"
      >
        Reset Game
      </Button>
      <Button
        variant="ghost"
        className="border border-transparent bg-accent hover:border-border"
      >
        Settings
      </Button>
    </Card>
  );
};
