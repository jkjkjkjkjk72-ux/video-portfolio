import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // /admin (login page itself) is always accessible
  if (pathname === "/admin") return NextResponse.next();

  // All other /admin/* routes require auth cookie
  if (pathname.startsWith("/admin/")) {
    const auth = request.cookies.get("admin_auth");
    if (auth?.value !== "true") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
