import { StarsIcon } from "lucide-react";

import { Tulip } from "@/app/_components/svg/tulip";
import { Flower1 } from "@/app/_components/svg/flower";
import { Flower2 } from "@/app/_components/svg/flower2";
import { Flower3 } from "@/app/_components/svg/flower3";
import { Flower4 } from "@/app/_components/svg/flower4";

export const FlowerBanner = () => {
  return (
    <div className="relative flex w-full">
      <StarsIcon className="absolute left-[10%] top-0 hidden h-8 w-8 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[14%] top-10 hidden h-5 w-5 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[20%] top-6 hidden h-8 w-8 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[27%] top-2 hidden h-10 w-10 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[35%] top-2 hidden h-8 w-8 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[37%] top-7 hidden h-6 w-6 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[39%] top-4 hidden h-8 w-8 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[48%] top-4 hidden h-5 w-5 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[47%] top-8 hidden h-6 w-6 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[53%] top-10 hidden h-6 w-6 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[55%] top-0 hidden h-6 w-6 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[62%] top-9 hidden h-8 w-8 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[65%] top-2 hidden h-10 w-10 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[72%] top-2 hidden h-4 w-4 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[73%] top-8 hidden h-4 w-4 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[75%] top-2 hidden h-10 w-10 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[78%] top-2 hidden h-6 w-6 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[85%] top-6 hidden h-7 w-7 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[88%] top-6 hidden h-8 w-8 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[90%] top-3 hidden h-4 w-4 animate-pulse fill-secondary stroke-secondary lg:block" />
      <StarsIcon className="absolute left-[91%] top-8 hidden h-4 w-4 animate-pulse fill-secondary stroke-secondary lg:block" />
      <Flower3 className="h-16" />
      <Tulip className="h-16 stroke-secondary" />
      <Flower4 className="h-48 -translate-y-16" />
      <Flower1 className="h-16 fill-secondary" />
      <Flower3 className="h-16" />
      <Flower4 className="h-60 -translate-y-24" />
      <Flower1 className="h-16 fill-secondary" />
      <Tulip className="h-12 stroke-secondary" />
      <Flower3 className="h-16" />
      <Flower2 className="h-10 fill-secondary stroke-border" />
    </div>
  );
};
