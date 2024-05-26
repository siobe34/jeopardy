import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";

export const JeopardyFormQuestion = ({
  categoryNumber,
  questionNumber,
  points,
}: {
  categoryNumber: number;
  questionNumber: number;
  points: number;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <JeopardyFormInputWithLabel
        inputId={`category_${categoryNumber}_question_${questionNumber}`}
        label={{ text: `Question ${questionNumber}` }}
        type="text"
      />
      <JeopardyFormInputWithLabel
        inputId={`category_${categoryNumber}_answer_${questionNumber}`}
        label={{ text: `Answer ${questionNumber}` }}
        type="text"
      />
      <JeopardyFormInputWithLabel
        inputId={`category_${categoryNumber}_points_${questionNumber}`}
        label={{ text: "Points" }}
        type="number"
        value={points}
        disabled
      />
    </div>
  );
};
