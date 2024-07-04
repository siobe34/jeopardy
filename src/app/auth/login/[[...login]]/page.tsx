import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="flex items-start justify-center pt-12">
      <SignIn />
    </section>
  );
}
