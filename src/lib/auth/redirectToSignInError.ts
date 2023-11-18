import { redirect } from "next/navigation";

export const redirectToSignInError = () => {
  redirect("/auth/error");
};
