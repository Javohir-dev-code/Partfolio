import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function hasSessionCookie(request: NextRequest) {
  return request.cookies
    .getAll()
    .some(
      (c) =>
        c.name.startsWith("sb-") &&
        c.name.endsWith("-auth-token") &&
        c.value.length > 0
    );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isApiAuth = pathname.startsWith("/api/auth");

  if (isAdminRoute && !hasSessionCookie(request)) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === "/admin/login" && hasSessionCookie(request)) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (isApiAuth && !hasSessionCookie(request) && pathname !== "/api/auth/login") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/auth/:path*"],
};