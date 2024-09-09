import { useLoginMutation } from "@/redux/services/authApi";
import { Credentials } from "@/types";
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
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Iniciando sesión...",
      success: "Sesión iniciada correctamente",
      error: "Ocurrió un error al iniciar sesión",
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
