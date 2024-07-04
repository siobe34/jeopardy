import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link, { type LinkProps } from "next/link";

import { Logo } from "@/components/logo";
import { ThemeToggler } from "@/components/theme-toggler";
import { SITE_ROUTES } from "@/lib/site-routes";

export const SiteHeader = () => {
  return (
    <header className="relative mb-40 flex items-center justify-between gap-2 bg-background px-2 pb-3 pt-2 shadow-md sm:mb-3">
      <Link href={SITE_ROUTES.home.path}>
        <Logo className="h-8 w-24 fill-secondary" />
      </Link>
      <div className="absolute left-1/2 top-full flex w-full -translate-x-1/2 flex-col items-center justify-center border-b-2 bg-background sm:static sm:ml-auto sm:w-fit sm:translate-x-0 sm:flex-row sm:gap-8 sm:border-b-0 sm:pr-2">
        <SignedIn>
          <SiteHeaderLink href={SITE_ROUTES.jeopardyCreate.path}>
            Create New Board
          </SiteHeaderLink>
          <SiteHeaderLink href={SITE_ROUTES.jeopardyDashboard.path}>
            All Boards
          </SiteHeaderLink>
        </SignedIn>
      </div>
      <SignedIn>
        <ThemeToggler className="ml-auto mr-2 sm:ml-2" />
        <UserButton />
      </SignedIn>
      <SignedOut>
        <ThemeToggler />
      </SignedOut>
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
      className="w-full rounded-md border-t px-4 py-6 text-center text-foreground/80 transition-all hover:bg-accent hover:text-foreground sm:w-auto sm:border-t-0 sm:py-2"
    >
      {children}
    </Link>
  );
};
