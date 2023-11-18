"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { toast } from "@/app/_components/ui/use-toast";
import { getAuthOnClient } from "@/lib/auth/getAuthOnClient";

export default function SignOut() {
  const router = useRouter();
  const { auth } = getAuthOnClient();

  useEffect(() => {
    const signOutAsync = async () => {
      const { error } = await auth.signOut();

      if (!error) {
        router.replace("/auth");
        return;
      }

      toast({
        title: "Sign Out Error",
        description: "Unexpected error signing out, please try again.",
        variant: "destructive",
      });
    };

    void signOutAsync();
  }, [router, auth]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(331,74.5%,65.4%)] to-secondary to-70% text-white">
      Signing Out...
    </main>
  );
}
