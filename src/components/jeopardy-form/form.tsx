"use client";

import { createRef } from "react";
import { useFormState } from "react-dom";

export type FormState = { boardName: string; message: string };

type JeopardyFormProps = {
  children: React.ReactNode;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
  boardName: string;
};

export const CreateJeopardyForm = ({
  children,
  action,
  boardName,
}: JeopardyFormProps) => {
  const ref = createRef<HTMLFormElement>();
  const [state, formAction] = useFormState(action, {
    boardName,
    message: "",
  });

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
