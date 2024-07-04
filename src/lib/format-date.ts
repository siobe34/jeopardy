export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-CA", { dateStyle: "medium" }).format(date);
};
