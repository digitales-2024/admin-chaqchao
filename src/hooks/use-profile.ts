import {
  useProfileQuery,
  useUpdatePasswordMutation,
} from "@/redux/services/adminApi";
import { useUpdateUserMutation } from "@/redux/services/usersApi";
import { CustomErrorData, User } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

import { FormUpdateInfoProps } from "@/components/account/FormUpdateInfo";
import { FormUpdateSecurityProps } from "@/components/account/FormUpdateSecurity";

import { useAuth } from "./use-auth";
import { useLogout } from "./use-logout";

export const useProfile = () => {
  const { setUser } = useAuth();
  const { signOut } = useLogout();

  const { data: user, refetch } = useProfileQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const onUpdate = async (dataForm: FormUpdateInfoProps) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateUser({ id: user?.id, ...dataForm });
          if (result.error && "data" in result.error) {
            const error = (result.error.data as CustomErrorData).message;
            const message = translateError(error as string);
            reject(new Error(message));
          }
          resolve(result);
          setUser(result?.data?.data as User);
          refetch();
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Actualizando información...",
      success: "información actualizado correctamente",
      error: (error) => {
        return error.message;
      },
    });
  };

  const [updatePassword, { isLoading: isLoadingUpdatePassword }] =
    useUpdatePasswordMutation();

  const onUpdatePassword = async (data: FormUpdateSecurityProps) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updatePassword(data);
          if (result.error && "data" in result.error) {
            const error = (result.error.data as CustomErrorData).message;

            const message = translateError(error as string);
            reject(new Error(message));
          }
          resolve(result);
          signOut();
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Actualizando contraseña...",
      success: "Contraseña actualizada correctamente",
      error: (error) => {
        return error.message;
      },
    });
  };

  return {
    user,
    onUpdate,
    isLoading,
    onUpdatePassword,
    isLoadingUpdatePassword,
  };
};
