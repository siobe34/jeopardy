import { NextResponse, type NextRequest } from "next/server";

import { getUserOnServer } from "@/lib/auth/getUserOnServer";

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const user = await getUserOnServer();

  // * If the user exists (authenticated), and they're trying to reach the signin or signup page, redirect them
  if (!!user && pathname === "/auth") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // * If any of the following conditions are met, let the request through:
  // * 1. Route beginning with: /api
  // * 2. Route beginning with: /_next/static
  // * 3. Route beginning with: /_next/image
  // * 4. Route beginning with: /favicon.ico
  // * 5. Route matches: '/auth' or '/auth/signout' to allow signing in/signing out
  // * 6. User is logged in
  if (
    [
      !!pathname.match("/((api|_next/static|_next/image|favicon.ico).*)"),
      !!["/auth", "/auth/signout"].includes(pathname),
      !!user,
    ].some((condition) => condition === true)
  ) {
    return NextResponse.next();
  } else {
    // * Redirect the request to the sign in page
    return NextResponse.redirect(new URL("/auth", req.url));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
