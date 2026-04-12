import { NextRequest, NextResponse } from "next/server";

/**
 * Middleware — runs on the Edge before every request.
 * Protects /chat (and any future routes under /chat/*).
 * Checks for a `token` cookie set by the login page.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /chat routes
  if (pathname.startsWith("/chat")) {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      // Not logged in → redirect to /login, preserving the intended destination
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/login";
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  /**
   * Run middleware on /chat and all sub-paths.
   * Excludes Next.js internals and static assets.
   */
  matcher: ["/chat/:path*"],
};
