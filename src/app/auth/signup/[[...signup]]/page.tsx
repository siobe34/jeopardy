import { type Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign up!",
};

export default function Page() {
  return (
    <section className="flex items-start justify-center pt-12">
      <SignUp />
    </section>
  );
}
