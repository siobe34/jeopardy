"use client";

import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export function JeopardyFormSubmitButton({
  children,
  className,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="secondary"
      className={cn(className, "relative")}
      disabled={pending}
      {...props}
    >
      <span
        className={cn(
          "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0",
          pending && "opacity-100",
        )}
      >
        . . .
      </span>
      <span
        className={cn(
          "opacity-100",
          pending && "pointer-events-none opacity-0",
        )}
      >
        {children}
      </span>
    </Button>
  );
}
