import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/format-date";
import { SITE_ROUTES } from "@/lib/site-routes";
import { api } from "@/trpc/server";

export default async function Page() {
  const boards = await api.board.getAllByUser();
  return (
    <section className="flex flex-col gap-6 p-2 pt-8">
      {boards.length === 0 ? (
        <p className="text-lg leading-relaxed">
          You have yet to create any jeopardy boards.
          <br />
          Go ahead and create one with the &quot;Create New Board&quot; button
          above!
        </p>
      ) : (
        boards.map((board) => (
          <Card key={board.id} className="flex flex-row items-center">
            <CardHeader>
              <CardTitle>{board.name}</CardTitle>
              <CardDescription>{formatDate(board.createdAt)}</CardDescription>
            </CardHeader>
            <CardFooter className="ml-auto p-6">
              <Link
                href={`${SITE_ROUTES.jeopardyPlay.path}?boardId=${board.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Play!
              </Link>
            </CardFooter>
          </Card>
        ))
      )}
    </section>
  );
}
