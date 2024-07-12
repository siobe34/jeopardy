import { CreateJeopardyFormChallenge } from "@/app/jeopardy/board/create/_components/create-jeopardy-form-challenge";
import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type JeopardyQuestionType = { questionNumber: number; points: number };

type JeopardyFormCategoryProps = {
  categoryNumber: number;
  questions: JeopardyQuestionType[];
};

export const CreateJeopardyFormCategory = ({
  categoryNumber,
  questions,
}: JeopardyFormCategoryProps) => {
  return (
    <div className="flex flex-col gap-8 rounded-sm p-4">
      <h2 className="text-2xl leading-none tracking-tight">
        Category {categoryNumber}
      </h2>
      <JeopardyFormInputWithLabel
        inputId={`category_${categoryNumber}_categoryName`}
        label={{
          text: "Category Name",
          className: "text-lg font-semibold leading-none tracking-tight",
        }}
        type="text"
      />
      <Carousel className="w-full self-center">
        <h3 className="text-lg font-semibold">
          Category {categoryNumber} Questions
        </h3>
        <CarouselContent>
          {questions.map((question, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <CreateJeopardyFormChallenge
                  categoryNumber={categoryNumber}
                  points={question.points}
                  questionNumber={question.questionNumber}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="flex w-full justify-around pt-8">
          <CarouselPrevious
            type="button"
            className="static"
            variant="secondary"
          />
          <CarouselNext
            type="button"
            className="static"
            variant="secondary"
          />
        </div>
      </Carousel>
    </div>
  );
};
