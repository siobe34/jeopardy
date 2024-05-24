import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 px-2">
      <Link href="/">Jeopardy Logo</Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
