"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const JeopardyBoardName = (props: Props) => {
  return (
    <div
      className={cn("flex flex-col-reverse gap-1", props.className)}
      {...props}
    >
      <Input
        id="boardName"
        name="boardName"
        type="text"
        className="peer invalid:text-destructive invalid:focus-visible:ring-destructive dark:invalid:text-destructive-foreground dark:invalid:focus-visible:ring-destructive-foreground"
        placeholder=""
      />
      <Label
        htmlFor="boardName"
        className="duration-30 pointer-events-none text-foreground transition-all peer-placeholder-shown:translate-x-3 peer-placeholder-shown:translate-y-8 peer-placeholder-shown:text-foreground/80 peer-invalid:text-destructive peer-[:focus-within:placeholder-shown]:text-foreground/80 dark:peer-invalid:text-destructive-foreground"
      >
        Board Name
      </Label>
    </div>
  );
};
