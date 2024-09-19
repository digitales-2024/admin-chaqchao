import { useLogoutMutation } from "@/redux/services/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { useAuth } from "./use-auth";

export const useLogout = () => {
  const { clearUser } = useAuth();

  const [logout, { isLoading, error, isSuccess }] = useLogoutMutation();

  const signOut = async () => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await logout();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Cerrando sesión...",
      success: "Sesión cerrada correctamente",
      error: "Ocurrió un error al cerrar la sesión",
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      clearUser();
      router.push("/sign-in");
    }
  }, [isSuccess, clearUser, router]);

  return { signOut, isLoading, error };
};
