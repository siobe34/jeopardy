import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { SITE_ROUTES } from "@/lib/site-routes";

export const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 px-2">
      <Link href={SITE_ROUTES.home.path}>Jeopardy Logo</Link>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
};
