import { SignInButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect("/jeopardy");

  return (
    <SignedOut>
      <SignInButton />
    </SignedOut>
  );
}
