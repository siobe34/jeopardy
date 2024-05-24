import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// TODO: add protected routes here (regex patterns supported)
const isProtectedRoute = createRouteMatcher(["/jeopardy(.*)"]);

export default clerkMiddleware((auth, req) => {
  // Redirect all unauthenticated requests to protected routes to the login page
  if (isProtectedRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
