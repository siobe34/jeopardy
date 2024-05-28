import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { SITE_ROUTES } from "@/lib/site-routes";

export default function Home() {
  const { userId } = auth();

  if (userId) redirect(SITE_ROUTES.jeopardyDashboard.path);

  redirect(SITE_ROUTES.authLogin.path);
}
