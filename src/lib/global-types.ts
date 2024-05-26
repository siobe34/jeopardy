export type SearchParams = Record<string, string | string[] | undefined>;

export type FormState = {
  responseType: "success" | "error" | null;
  serverResponses: string[] | null;
};

export type JeopardyFormProps = {
  children: React.ReactNode;
  action: (prevState: FormState, formData: FormData) => Promise<FormState>;
};
