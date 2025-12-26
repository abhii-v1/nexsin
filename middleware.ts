import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const session = req.cookies.get("session");

  if (!session && req.nextUrl.pathname.startsWith("/home")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
