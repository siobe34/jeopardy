import { SignedIn, UserButton } from "@clerk/nextjs";
import Link, { type LinkProps } from "next/link";

import { SITE_ROUTES } from "@/lib/site-routes";
import { Logo } from "./logo";

export const SiteHeader = () => {
  return (
    <header className="mb-3 flex items-center justify-between gap-2 px-2 pb-3 pt-2 shadow-md">
      <Link href={SITE_ROUTES.home.path}>
        <Logo className="h-8 w-24" />
      </Link>
      <div className="flex items-center justify-center gap-8">
        <SignedIn>
          <SiteHeaderLink href={SITE_ROUTES.jeopardyCreate.path}>
            Create New Board
          </SiteHeaderLink>
          <SiteHeaderLink href={SITE_ROUTES.jeopardyDashboard.path}>
            All Boards
          </SiteHeaderLink>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

type SiteHeaderLinkProps = {
  children: React.ReactNode;
} & LinkProps;

const SiteHeaderLink = ({ children, ...props }: SiteHeaderLinkProps) => {
  return (
    <Link
      {...props}
      className="rounded-md px-4 py-2 text-foreground/80 transition-all hover:bg-accent hover:text-foreground"
    >
      {children}
    </Link>
  );
};
