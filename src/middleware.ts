import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const isAuthenticated = !!cookies().get("user");

  const loginUrl = new URL('/login', nextUrl.origin);
  const registerUrl = new URL('/register', nextUrl.origin);
  const rootUrl = new URL('/', nextUrl.origin);

  // If the user is not authenticated
  if (!isAuthenticated) {
    // Allow access to /login and /register routes
    if (nextUrl.pathname === loginUrl.pathname || nextUrl.pathname === registerUrl.pathname) {
      return NextResponse.next();
    }

    // Redirect to login page for all other routes
    return NextResponse.redirect(loginUrl);
  }

  // If the user is authenticated
  if (isAuthenticated) {
    // Redirect away from /login and /register routes
    if (nextUrl.pathname === loginUrl.pathname || nextUrl.pathname === registerUrl.pathname) {
      return NextResponse.redirect(rootUrl);
    }
  }

  // Allow access to other routes
  return NextResponse.next();
}

// Define the matcher for routes
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
};
