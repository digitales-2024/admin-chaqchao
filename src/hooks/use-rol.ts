import {
  useCreateRoleMutation,
  useDeleteRolesMutation,
  useGetRolesQuery,
  useGetRolPermissionsQuery,
  useUpdateRoleMutation,
} from "@/redux/services/rolesApi";
import { CreateRolesSchema } from "@/schemas";
import { CustomErrorData, Role } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner";

import { UpdateRoleSchema } from "@/components/users/roles/UpdateRoleSheet";

export const useRol = () => {
  const { data: dataRoles, isLoading: isLoadingRoles } = useGetRolesQuery();
  const [
    createRole,
    { isLoading: isLoadingCreateRole, isSuccess: isSuccessCreateRole },
  ] = useCreateRoleMutation();
  const [deleteRoles, { isLoading: isLoadingDeleteRoles }] =
    useDeleteRolesMutation();

  const [
    updateRole,
    { isLoading: isLoadingUpdateRole, isSuccess: isSuccessUpdateRole },
  ] = useUpdateRoleMutation();
  const { data: dataRolPermissions, isLoading: isLoadingRolPermissions } =
    useGetRolPermissionsQuery();

  const onCreateRole = async (input: CreateRolesSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await createRole(input);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
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

    return toast.promise(promise(), {
      loading: "Creando rol...",
      success: "Rol creado con éxito",
      error: (err) => err.message,
    });
  };

  const onDeleteRoles = async (roles: Role[]) => {
    const ids = roles.map((role) => role.id);

    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await deleteRoles({ ids });
          if (result.error) {
            reject(new Error("Ocurrió un error inesperado"));
          }
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });

    toast.promise(promise(), {
      loading: "Eliminando roles...",
      success: "Roles eliminados con éxito",
      error: (err) => err.message,
    });
  };

  const onUpdateRole = async (input: UpdateRoleSchema) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const result = await updateRole(input);
          if (
            result.error &&
            typeof result.error === "object" &&
            "data" in result.error
          ) {
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
      loading: "Actualizando...",
      success: "Rol actualizado",
      error: (error) => {
        return error.message;
      },
    });
  };

  return {
    dataRoles,
    isLoadingRoles,
    onCreateRole,
    isLoadingCreateRole,
    isSuccessCreateRole,
    onDeleteRoles,
    isLoadingDeleteRoles,
    onUpdateRole,
    isLoadingUpdateRole,
    isSuccessUpdateRole,
    dataRolPermissions,
    isLoadingRolPermissions,
  };
};
