import { redirect } from "next/navigation";

export const metadata = {
  title: "Jeopardy | Sign In",
};

export default function Home() {
  redirect("/auth");
}
