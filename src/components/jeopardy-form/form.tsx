"use client";

import { createRef } from "react";
import { useFormState } from "react-dom";

type FormState = { message: string };

type JeopardyFormProps = {
  children: React.ReactNode;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};

export const CreateJeopardyForm = ({ children, action }: JeopardyFormProps) => {
  const ref = createRef<HTMLFormElement>();
  const [state, formAction] = useFormState(action, { message: "" });

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
