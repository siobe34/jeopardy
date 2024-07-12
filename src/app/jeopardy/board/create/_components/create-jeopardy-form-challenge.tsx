import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";

export const CreateJeopardyFormChallenge = ({
  categoryNumber,
  questionNumber,
  points,
}: {
  categoryNumber: number;
  questionNumber: number;
  points: number;
}) => {
  return (
    <div className="something flex flex-col gap-6">
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
        label={{ text: "Points", className: "text-muted-foreground" }}
        type="number"
        value={points}
        readOnly
        disabled
      />
    </div>
  );
};
