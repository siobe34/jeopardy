import { CreateJeopardyFormChallenge } from "@/app/jeopardy/board/create/_components/create-jeopardy-form-challenge";
import { JeopardyFormInputWithLabel } from "@/components/jeopardy-form/jeopardy-form-input-label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div className="flex flex-col gap-4 rounded-sm p-4">
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
      <Card>
        <Carousel className="w-full self-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Category {categoryNumber} Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter className="flex w-full justify-around pt-2">
            <CarouselPrevious type="button" className="static" />
            <CarouselNext type="button" className="static" />
          </CardFooter>
        </Carousel>
      </Card>
    </div>
  );
};
