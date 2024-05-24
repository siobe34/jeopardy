"use client";

import { useFormStatus } from "react-dom";

export function JeopardyFormSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Add
    </button>
  );
}
