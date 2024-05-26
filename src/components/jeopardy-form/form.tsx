"use client";

import { useSearchParams } from "next/navigation";
import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

export type FormState = {
  boardName: string;
  responseType: "success" | "error" | null;
  serverResponses: string[] | null;
};

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
      ref={ref}
      className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2"
      action={formAction}
    >
      {children}
    </form>
  );
};
