import Link from "next/link";

import { api } from "@/trpc/server";
import { SITE_ROUTES } from "@/lib/site-routes";

export default async function Page() {
  const boards = await api.board.getAllByUser();
  return (
    <>
      <h1>Jeopardy Boards</h1>
      <Link href={SITE_ROUTES.jeopardyCreate.path}>Create a Jeopardy</Link>
      <section>
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <Link href={`${SITE_ROUTES.jeopardyPlay.path}?id=${board.id}`}>
                {board.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
