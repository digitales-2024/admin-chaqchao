import { User } from "@/types";

// Interfaz para la respuesta de la API
interface ApiResponse {
  user: User;
  [key: string]: any; // Para otros campos adicionales
}
// Función para llamar a la API y verificar el token y el estado del usuario
export async function verifyUserToken(
  token: string,
): Promise<{ setCookieHeader: string | null; data: ApiResponse }> {
  const response = await fetch(
    process.env["NEXT_PUBLIC_BACKEND_URL"] + "/auth/refresh-token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `token=${token}`,
      },
      credentials: "include",
    },
  );

  if (!response.ok) {
    return response.json();
  }

  const setCookieHeader = response.headers.get("set-cookie");
  const data: ApiResponse = await response.json();

  return { setCookieHeader, data };
}
