import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { decodeToken } from "./lib/jwt/decodeToken";
import { getToken } from "./lib/jwt/getToken";
import { redirectToLogin } from "./lib/jwt/redirectToLogin";

const routesNotRequiringAuth = ["/sign-in", "/update-password"];

export async function middleware(request: NextRequest) {
  // Extraer la cookie llamada 'access_token'
  const token = getToken(request);

  try {
    // Si no hay cookie, redirigimos al usuario a la página de login
    if (!token && !routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
      return redirectToLogin(request);
    }

    // Decodificar el token
    const decodedToken = token ? decodeToken(token) : null;

    // Verificamos si el token expiro, mandamos un error si es así
    if (decodedToken && decodedToken.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        throw new Error("TokenExpiredError");
      }
    }

    // Si hay cookie, redirigimos al usuario a la página de inicio
    if (token && routesNotRequiringAuth.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    const response = NextResponse.next();

    return response;
  } catch (error) {
    // Si el error es de token expirado, redirigimos al usuario a la página de login y limpiamos la cookie
    if ((error as Error)?.message) {
      const response = redirectToLogin(request);
      response.cookies.delete("access_token");
      return response;
    }
  }
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|static).*)"],
};
