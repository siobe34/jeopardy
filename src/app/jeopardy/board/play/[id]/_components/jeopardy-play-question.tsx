import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};
export const JeopardyPlayQuestion = ({ children }: Props) => {
  return (
    <Button className="aspect-square h-16 rounded-full p-4">{children}</Button>
  );
};
