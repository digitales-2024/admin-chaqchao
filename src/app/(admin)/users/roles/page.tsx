"use client";
import { usePermissions } from "@/hooks/use-permissions";
import { useRol } from "@/hooks/use-rol";

import { AccessDenied } from "@/components/common/AccessDenied";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { RolesTable } from "@/components/users/roles/RolesTable";

export default function PageRoles() {
  const { hasPermission, isLoadingHas } = usePermissions();
  const hasRolesPermission = hasPermission("ROL", ["READ"]);
  const { dataRoles, isLoadingRoles } = useRol();

  if (isLoadingRoles || isLoadingHas) {
    return (
      <Shell>
        <HeaderPage
          title="Roles"
          description="Aquí puedes ver la lista de roles registrados en la aplicación."
        />
        <DataTableSkeleton columnCount={5} searchableColumnCount={1} />
      </Shell>
    );
  }

  if (!hasRolesPermission) {
    return (
      <Shell>
        <HeaderPage
          title="Roles"
          description="Aquí puedes ver la lista de roles registrados en la aplicación."
        />
        <AccessDenied message="No tienes permisos para ver los roles." />
      </Shell>
    );
  }

  if (!dataRoles) {
    return (
      <Shell>
        <HeaderPage
          title="Roles"
          description="Aquí puedes ver la lista de roles registrados en la aplicación."
        />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <Shell>
      <HeaderPage
        title="Roles"
        description="Aquí puedes ver la lista de roles registrados en la aplicación."
      />
      <RolesTable data={dataRoles} />
    </Shell>
  );
}
