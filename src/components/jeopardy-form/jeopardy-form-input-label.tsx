import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

export const JeopardyFormInputWithLabel = ({
  inputId,
  label,
  ...props
}: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={inputId} {...label}>
        {label.text}
      </Label>
      <Input id={inputId} name={inputId} placeholder="" {...props} />
    </div>
  );
};
