export const refreshToken = async () => {
  // Extraer la cookie llamada 'access_token'
  return new Promise((resolve) => {
    // Realice una solicitud de publicación al punto final de actualización de token
    fetch(process.env["NEXT_PUBLIC_BACKEND_URL"] + "/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => resolve(json));
  });
};
