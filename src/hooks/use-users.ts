import {
  useCreateUserMutation,
  useGeneratePasswordMutation,
  useGetUsersQuery,
} from "@/redux/services/usersApi";
import { CustomErrorData, User } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

export const useUsers = () => {
  const { data, error, isLoading } = useGetUsersQuery();
  const [generatePassword, { data: password }] = useGeneratePasswordMutation();
  const [createUser, { isSuccess: isSuccessCreateUser }] =
    useCreateUserMutation();
  const handleGeneratePassword = async () => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await generatePassword(null);
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
      loading: "Generando...",
      success: "Contraseña generada",
      error: (error) => {
        return error.message;
      },
    });
  };

  const onCreateUser = async (input: Partial<User>) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createUser(input);
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
      loading: "Creando...",
      success: "Usuario creado",
      error: (error) => {
        return error.message;
      },
    });
  };

  return {
    data,
    error,
    isLoading,
    handleGeneratePassword,
    password,
    onCreateUser,
    isSuccessCreateUser,
  };
};
