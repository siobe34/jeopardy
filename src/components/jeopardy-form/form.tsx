"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { cn } from "@/lib/cn";

export type FormState = {
  responseType: "success" | "error" | null;
  serverResponses: string[] | null;
};

type JeopardyFormProps = Omit<
  React.FormHTMLAttributes<HTMLFormElement>,
  "action"
> & {
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export const JeopardyForm = ({
  children,
  className,
  action,
  ...props
}: JeopardyFormProps) => {
  const [state, formAction] = useFormState(action, {
    responseType: null,
    serverResponses: null,
  });

  useEffect(() => {
    if (state.responseType === "success") {
      state.serverResponses?.forEach((message) => toast.success(message));
    }

    if (state.responseType === "error") {
      state.serverResponses?.forEach((message) => toast.error(message));
    }

    if (state.responseType === null) {
      state.serverResponses?.forEach((message) => toast(message));
    }
  }, [state]);

  return (
    <form
      className={cn(
        "flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2",
        className,
      )}
      action={formAction}
      {...props}
    >
      {children}
    </form>
  );
};
