import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { decodeToken } from "./lib/jwt/decodeToken";
import { getToken } from "./lib/jwt/getToken";
import { redirectToLogin } from "./lib/jwt/redirectToLogin";

const routesNotRequiringAuth = ["/sign-in", "/update-password"];

export async function middleware(request: NextRequest) {
  // Extraer la cookie llamada 'access_token'
  const token = getToken(request);
  console.log("🚀 ~ middleware ~ token:", token);

  // Decodificar el token
  const decodedToken = token ? decodeToken(token) : null;
  console.log("🚀 ~ middleware ~ decodedToken:", decodedToken);

  // Si no hay cookie, redirigimos al usuario a la página de login
  if (!token && !routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
    return redirectToLogin(request);
  }

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
