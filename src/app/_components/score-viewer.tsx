import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { api } from "@/trpc/server";

export const ScoreViewer = async ({
  defaultOpen = false,
  boardId,
}: {
  defaultOpen?: boolean;
  boardId: number;
}) => {
  const scores = await api.teams.getByBoard.query({ boardId });

  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button>View Scores</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scores</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-base text-foreground">
          <Table>
            <TableHeader>
              <TableHead>Team Name</TableHead>
              <TableHead>Score</TableHead>
            </TableHeader>
            <TableBody>
              {scores.map((team, idx) => (
                <TableRow key={idx}>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
