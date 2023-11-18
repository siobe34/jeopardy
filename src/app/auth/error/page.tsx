import { AlertCircleIcon } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

export default function SignInError() {
  return (
    <main className="container">
      <Card>
        <CardHeader>
          <CardTitle className="flex w-fit rounded-lg bg-destructive p-4 text-destructive-foreground">
            <AlertCircleIcon className="mr-2" /> Sign In Error
          </CardTitle>
          <CardDescription className="text-lg text-foreground">
            For some reason you don&apos;t seem to be logged in. This is likey
            an error from our side so head over to the{" "}
            <Link href="/auth/signout" className="font-semibold underline">
              Sign Out
            </Link>{" "}
            page and try signing in again.
          </CardDescription>
        </CardHeader>
      </Card>
    </main>
  );
}
