"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { FlowerBanner } from "@/app/_components/flower-banner";
import { MobileMenuButton } from "@/app/_components/mobile-menu-button";
import { Dana } from "@/app/_components/svg/dana";
import { cn } from "@/lib/cn";

export const Header = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return (
    <div>
      <header className="relative z-50 flex items-center justify-between gap-8 py-2">
        <div className="pl-4">
          <Dana
            key={pathname}
            className="animate-logo h-24 fill-secondary stroke-secondary"
          />
        </div>
        <MobileMenuButton className="peer mr-4 bg-transparent text-secondary hover:bg-transparent sm:hidden" />
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
              <li className="flex flex-col items-center justify-center border-b py-2 text-center sm:border-none sm:p-0 sm:after:h-[2px] sm:after:w-0 sm:after:bg-secondary sm:after:transition-all hover:sm:after:w-full">
                <Link href="/">Home</Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <FlowerBanner />
    </div>
  );
};
