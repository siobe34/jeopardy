import { SignedIn, SignOutButton } from "@clerk/nextjs";

import { MobileMenuButton } from "@/app/_components/mobile-menu-button";
import { cn } from "@/lib/cn";

export const Header = () => {
  return (
    <header className="relative z-50 flex items-center justify-between gap-8 py-2">
      <div className="pl-4">
        <h1>Dana</h1>
      </div>
      <MobileMenuButton className="text-secondary peer mr-4 bg-transparent hover:bg-transparent sm:hidden" />
      <div
        className={cn(
          "bg-background text-foreground",
          "absolute top-full grid w-full",
          "grid-rows-[0fr] peer-[.active]:grid-rows-[1fr] peer-[.active]:border-b-2",
          "transition-[grid-template-rows] duration-300 ease-out",
          "sm:static sm:w-auto sm:grid-rows-1 sm:border-none sm:bg-transparent sm:pr-4 sm:text-inherit",
        )}
      >
        <div className="max-sm:overflow-hidden">
          <ul className="flex flex-col sm:flex-row sm:gap-6">
            <SignedIn>
              <li className="sm:after:bg-secondary flex flex-col items-center justify-center border-b py-2 text-center sm:border-none sm:p-0 sm:after:h-[2px] sm:after:w-0 sm:after:transition-all hover:sm:after:w-full">
                <SignOutButton />
              </li>
            </SignedIn>
          </ul>
        </div>
      </div>
    </header>
  );
};
