import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { NextRequest } from "next/server";


import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from "@/config";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthenticated = !!cookies().get("user");

  const isPublicRoute = (
    (PUBLIC_ROUTES.find(route => nextUrl.pathname.startsWith(route)) ||
      nextUrl.pathname === ROOT) &&
    !PROTECTED_SUB_ROUTES.find(route => nextUrl.pathname.includes(route))
  );

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
