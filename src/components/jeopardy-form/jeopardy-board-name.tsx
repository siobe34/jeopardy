"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/cn";
import { SITE_ROUTES } from "@/lib/site-routes";

type Props = React.HTMLAttributes<HTMLDivElement>;

export const JeopardyBoardName = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialValue = searchParams.get("name") ?? "New Board";

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (value === "") return;

    router.replace(`${SITE_ROUTES.jeopardyCreate.path}?name=${value}`);
  }, [value]);

  return (
    <div className={cn("flex flex-col gap-1", props.className)} {...props}>
      <Label
        htmlFor="boardName"
        className="text-2xl font-semibold leading-loose tracking-tight"
      >
        Board Name
      </Label>
      <Input
        id="boardName"
        name="boardName"
        type="text"
        placeholder=""
        defaultValue={value}
        onChange={({ target }) => setValue(target.value)}
      />
    </div>
  );
};
