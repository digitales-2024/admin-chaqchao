import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const routesNotRequiringAuth = ["/sign-in", "/update-password"];

export async function middleware(request: NextRequest) {
  // Extraer la cookie llamada 'token'
  const token = request.cookies.get("access_token");

  // Si no hay cookie, redirigimos al usuario a la página de login
  if (!token && !routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  //TODO Verificar el token

  // Si hay cookie, redirigimos al usuario a la página de inicio
  if (token && routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static).*)"],
};
