import { usePermissions } from "@/hooks/use-permissions";

interface ProtectedRoute {
  module: string; // Código del módulo
  permissions: string[]; // Lista de permisos necesarios
}

export const useProtectedRoutes = () => {
  const { hasPermission, isLoadingHas } = usePermissions();

  const canAccessRoute = ({ module, permissions }: ProtectedRoute): boolean => {
    return hasPermission(module, permissions);
  };

  return { canAccessRoute, isLoadingHas };
};
