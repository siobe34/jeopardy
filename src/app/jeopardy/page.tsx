import { api } from "@/trpc/server";

export default async function Page() {
  const boards = await api.board.getAllByUser();
  return (
    <>
      <h1>Jeopardy Boards</h1>
      <section>
        <ul>
          {boards.map((board) => (
            <li key={board.id}>{board.name}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
