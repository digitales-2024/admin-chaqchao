import { useLoginMutation } from "@/redux/services/authApi";
import { Credentials, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { useAuth } from "./use-auth";

export const useLogin = () => {
  const [login, { data, isSuccess, isLoading, error }] = useLoginMutation();
  const { setUser } = useAuth();
  const router = useRouter();

  const onLogin: SubmitHandler<Credentials> = async (credentials) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await login(credentials);
          if (result.error && "data" in result.error) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          }
          if (result.error) {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Iniciando sesión...",
      success: "Sesión iniciada correctamente",
      error: (error) => {
        return error.message;
      },
    });
  };

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
      router.replace("/");
    }
  }, [data, isSuccess, setUser, router]);

  return { onLogin, isLoading, error };
};
