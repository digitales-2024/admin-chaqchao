import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { getToken } from "./lib/jwt/getToken";
import { redirectToLogin } from "./lib/jwt/redirectToLogin";

const routesNotRequiringAuth = ["/sign-in", "/update-password"];

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/favicon") ||
    request.nextUrl.pathname.startsWith("/static")
  ) {
    return NextResponse.next();
  }

  // Extraer la cookie llamada 'access_token'
  const token = getToken(request);

  // Si la ruta es más compleja (probablemente un submenú), dar un poco más de flexibilidad
  const isDeepRoute = request.nextUrl.pathname.split("/").length > 2;

  // Si no hay token y la ruta requiere autenticación, redirigir a login
  if (
    !token &&
    !routesNotRequiringAuth.includes(request.nextUrl.pathname) &&
    !isDeepRoute
  ) {
    return redirectToLogin(request);
  }

  // Si hay token y el usuario intenta acceder a una ruta pública, redirigir a la página de inicio
  if (token && routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Permitir la solicitud
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static).*)"],
};
