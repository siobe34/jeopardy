"use client";

import { useRouter } from "next/navigation";

import { Dialog } from "@/components/ui/dialog";

export const DialogWithRefresh = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const handleOpenChange = () => {
    router.refresh();
  };

  return <Dialog onOpenChange={handleOpenChange}>{children}</Dialog>;
};
