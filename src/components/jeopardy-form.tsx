import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type JeopardyFormQuestion = { questionNumber: number; points: number };

type JeopardyFormProps = {
  categories: {
    categoryNumber: number;
    questions: JeopardyFormQuestion[];
  }[];
};

export const CreateJeopardyForm = ({ categories }: JeopardyFormProps) => {
  return (
    <form className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2">
      {categories.map((category) => (
        <JeopardyFormCategory
          key={category.categoryNumber}
          categoryNumber={category.categoryNumber}
          questions={category.questions}
        />
      ))}
      <Button
        type="submit"
        size="lg"
        className="max-w-fit place-self-center sm:col-span-2"
      >
        Create Jeopardy Board
      </Button>
    </form>
  );
};

const JeopardyFormCategory = ({
  categoryNumber,
  questions,
}: JeopardyFormProps["categories"][number]) => {
  return (
    <div className="flex flex-col gap-4 rounded-sm border p-4">
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
                    <JeopardyFormQuestion
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

const JeopardyFormQuestion = ({
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

type Props = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "id" | "name" | "placeholder" | "children"
> & {
  inputId: string;
  label: Omit<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    "htmlFor" | "children"
  > & { text: string };
};
const JeopardyFormInputWithLabel = ({ inputId, label, ...props }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={inputId} {...label}>
        {label.text}
      </Label>
      <Input id={inputId} name={inputId} placeholder="" {...props} />
    </div>
  );
};
