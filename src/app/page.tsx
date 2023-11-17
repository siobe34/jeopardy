import { SignIn, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="to-secondary flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(331,74.5%,65.4%)] to-70% text-white">
      <SignedOut>
        <SignIn
          afterSignInUrl={"/dashboard"}
          appearance={{
            variables: {
              colorPrimary: "hsl(331,74.5%,72.4%)",
            },
          }}
        />
      </SignedOut>
    </main>
  );
}
