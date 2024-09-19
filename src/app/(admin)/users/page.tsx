"use client";
"use memo";

import { useUsers } from "@/hooks/use-users";

import { Shell } from "@/components/common/Shell";
import { TitleSecction } from "@/components/common/text/TitleSecction";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersTable } from "@/components/users/UsersTable";

const HeaderPage = () => (
  <div>
    <TitleSecction text="Usuarios" />
    <span className="text-sm text-slate-600">
      Lista de usuarios administradores registrados en el sistema.
    </span>
  </div>
);

export default function PageUsers() {
  const { data, isLoading } = useUsers();

  if (isLoading) {
    return (
      <Shell className="gap-2">
        <HeaderPage />
        <div className="flex flex-col items-end justify-center gap-4">
          <Skeleton className="h-7 w-52 justify-end" />
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
  if (!data) {
    return null;
  }
  return (
    <Shell className="gap-6">
      <HeaderPage />
      <UsersTable data={data} />
    </Shell>
  );
}
