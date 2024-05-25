import { CreateJeopardyForm } from "@/components/jeopardy-form/form";
import { createJeopardyBoard } from "@/app/jeopardy/board/create/_actions/new-jeopardy";

export default function Page() {
  const questions = [
    { questionNumber: 1, points: 100 },
    { questionNumber: 2, points: 200 },
    { questionNumber: 3, points: 300 },
    { questionNumber: 4, points: 400 },
    { questionNumber: 5, points: 500 },
  ];

  const categories = [
    { categoryNumber: 1, questions },
    { categoryNumber: 2, questions },
    { categoryNumber: 3, questions },
    { categoryNumber: 4, questions },
    { categoryNumber: 5, questions },
  ];

  return (
    <>
      <h1>Create a Jeopardy</h1>
      <CreateJeopardyForm
        categories={categories}
        action={createJeopardyBoard}
      />
    </>
  );
}
