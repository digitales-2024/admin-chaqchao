"use client";
"use memo";

import { usePermissions } from "@/hooks/use-permissions";
import { useUsers } from "@/hooks/use-users";

import { AccessDenied } from "@/components/common/AccessDenied";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { UsersTable } from "@/components/users/UsersTable";

export default function PageUsers() {
  const { hasPermission, isLoadingHas } = usePermissions();
  const hasUsersPermission = hasPermission("USR", ["READ"]);
  const { data, isLoading } = useUsers();

  if (isLoading || isLoadingHas) {
    return (
      <Shell className="gap-2">
        <HeaderPage
          title="Usuarios"
          description="
          Aquí puedes ver la lista de usuarios registrados en la aplicación.
        "
        />
        <div className="flex flex-col items-end justify-center gap-4">
          <DataTableSkeleton
            columnCount={5}
            searchableColumnCount={1}
            filterableColumnCount={0}
            cellWidths={["1rem", "15rem", "12rem", "12rem", "8rem"]}
            shrinkZero
          />
        </div>
      </Shell>
    );
  }
  if (!hasUsersPermission) {
    return (
      <Shell>
        <HeaderPage
          title="Usuarios"
          description="Aquí puedes ver la lista de usuarios registrados en la aplicación."
        />
        <AccessDenied message="No tienes permisos para ver los usuarios." />
      </Shell>
    );
  }

  if (!data) {
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
    <Shell className="gap-6">
      <HeaderPage
        title="Usuarios"
        description="
          Aquí puedes ver la lista de usuarios registrados en la aplicación.
        "
      />
      <UsersTable data={data} />
    </Shell>
  );
}
