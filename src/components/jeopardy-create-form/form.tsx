"use client";

import { createRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";

import { type JeopardyFormProps } from "@/lib/global-types";

export const CreateJeopardyForm = ({ children, action }: JeopardyFormProps) => {
  const ref = createRef<HTMLFormElement>();
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
      ref={ref}
      className="flex flex-col gap-4 p-4 sm:grid sm:grid-cols-2"
      action={formAction}
    >
      {children}
    </form>
  );
};
