import { SignIn, SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SignedIn>
        <SignOutButton>Sign out &rarr;</SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignIn afterSignInUrl={"/"} />
      </SignedOut>
    </main>
  );
}
