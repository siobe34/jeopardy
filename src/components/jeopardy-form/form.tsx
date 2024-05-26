"use client";

import { useSearchParams } from "next/navigation";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export type FormState = { boardName: string; serverResponses: string[] | null };

type JeopardyFormProps = {
  children: React.ReactNode;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export const CreateJeopardyForm = ({ children, action }: JeopardyFormProps) => {
  const searchParams = useSearchParams();
  const boardName = searchParams.get("name") ?? "New Board";

  const ref = createRef<HTMLFormElement>();
  const [state, formAction] = useFormState(action, {
    boardName,
    serverResponses: null,
  });

  useEffect(() => {
    state.serverResponses?.forEach((message) => toast(message));
  }, [state]);

  return (
    <form
      ref={ref}
      className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2"
      action={formAction}
    >
      {children}
    </form>
  );
};
