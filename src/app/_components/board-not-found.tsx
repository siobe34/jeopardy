import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export const BoardNotFound = () => {
  return (
    <main className="container">
      <Card>
        <CardHeader>
          <CardTitle>Couldn&apos;t find this board</CardTitle>
          <CardDescription>
            Looks like no board with this ID exists. You can add a new board
            from the{" "}
            <Link href="/dashboard" className="text-foreground underline">
              Dashboard
            </Link>
            .
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
};
