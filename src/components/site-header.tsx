import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";

import { SITE_ROUTES } from "@/lib/site-routes";

export const SiteHeader = () => {
  return (
    <header className="flex items-center justify-between gap-2 px-2">
      <Link href={SITE_ROUTES.home.path}>Jeopardy Logo</Link>
      <div className="flex items-center justify-center gap-8">
        <SignedIn>
          <Link
            href={SITE_ROUTES.jeopardyDashboard.path}
            className="rounded-md border-b px-4 py-2 hover:bg-accent"
          >
            All Boards
          </Link>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};
