import { SignIn, SignedOut, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Jeopardy | Sign In",
};

export default async function Home() {
  const user = await currentUser();

  if (!!user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[hsl(331,74.5%,65.4%)] to-secondary to-70% text-white">
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
