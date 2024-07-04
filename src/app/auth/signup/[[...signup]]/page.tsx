import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex items-start justify-center pt-12">
      <SignUp />
    </section>
  );
}
