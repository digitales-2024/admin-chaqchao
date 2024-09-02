import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routesNotRequiringAuth = ["/sign-in", "/update-password"];

export function middleware(request: NextRequest) {
  // Assume a "Cookie:nextjs=fast" header to be present on the incoming request
  // Getting cookies from the request using the `RequestCookies` API
  const cookie = request.cookies.get("token");

  // Si no hay cookie, redirigimos al usuario a la página de login
  if (!cookie && !routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Si hay cookie, redirigimos al usuario a la página de inicio
  if (cookie && routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static).*)"],
};
