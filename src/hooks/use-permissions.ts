import { useProfile } from "./use-profile";
import { useRol } from "./use-rol";

export const usePermissions = () => {
  const { user, isLoading } = useProfile();
  const { dataRole, isLoadingRole } = useRol(
    user?.roles[0].id ? { id: user?.roles[0].id } : {},
  );
  /**
   * Verificar que el rol tenga permisos en este modulo
   * @param {string} moduleCode - Codigo del modulo
   * @param {string} permissionCode - Codigo del permiso
   * @returns {boolean} - Si el rol tiene permisos en el modulo
   */
  const hasPermission = (
    moduleCode: string,
    permissionCodes: string[],
  ): boolean => {
    return (
      dataRole?.rolPermissions.some(
        ({ module, permissions }) =>
          module.cod === moduleCode &&
          permissionCodes.every((code) =>
            permissions.some(({ cod }) => cod === code),
          ),
      ) ?? false
    );
  };

  const isLoadingHas = isLoading || isLoadingRole;
  return { hasPermission, isLoadingHas };
};
