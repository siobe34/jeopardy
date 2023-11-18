import { ArrowRightCircleIcon, PartyPopperIcon, SmileIcon } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";
import { buttonVariants } from "./_components/ui/button";
import { cn } from "@/lib/cn";

export const metadata = {
  title: "Jeopardy",
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(331,74.5%,65.4%)] to-secondary to-70% text-white">
      <Card className="relative flex h-[400px] w-4/5 flex-col items-center justify-center after:pointer-events-none after:absolute after:top-0 after:h-full after:w-full after:animate-pulse after:bg-transparent after:shadow-2xl after:shadow-accent after:duration-1000 sm:w-2/5">
        <CardHeader>
          <CardTitle>Jeopardy</CardTitle>
        </CardHeader>
        <CardContent>
          <span className="flex flex-wrap items-center justify-center gap-2 text-center text-2xl">
            Happy 26th birthday Dana!
            <SmileIcon />
            <PartyPopperIcon />
          </span>
        </CardContent>
        <CardFooter className="block text-sm text-muted-foreground">
          <Link
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "secondary", size: "lg" }),
              "text-2xl",
            )}
          >
            Click Me
            <ArrowRightCircleIcon className="ml-2" />
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
