"use client";

import { useClients } from "@/hooks/use-clients";
import { usePermissions } from "@/hooks/use-permissions";

import { ClientsTable } from "@/components/clients/ClientsTable";
import { AccessDenied } from "@/components/common/AccessDenied";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageClients() {
  const { hasPermission, isLoadingHas } = usePermissions();
  const hasClientsPermission = hasPermission("CST", ["READ"]);
  const { dataClientsAll, isLoading } = useClients();

  if (isLoading || isLoadingHas) {
    return (
      <Shell className="gap-2">
        <HeaderPage
          title="Clientes"
          description="Lista de clientes registrados en el sistema."
        />
        <div className="flex flex-col items-end justify-center gap-4">
          <Skeleton className="h-7 w-52 justify-end" />
          <DataTableSkeleton
            columnCount={4} // Ajusta según las propiedades de los clientes
            searchableColumnCount={2} // Ajusta según cuántas columnas sean buscables
            filterableColumnCount={1} // Ajusta según cuántas columnas sean filtrables
            cellWidths={["1rem", "15rem", "15rem", "12rem"]} // Ajusta según tus necesidades
            shrinkZero
          />
        </div>
      </Shell>
    );
  }

  if (!hasClientsPermission) {
    return (
      <Shell className="gap-2">
        <HeaderPage
          title="Clientes"
          description="Lista de clientes registrados en el sistema."
        />
        <AccessDenied message="No tienes permisos para ver los clientes." />
      </Shell>
    );
  }

  if (!dataClientsAll) {
    return null;
  }

  return (
    <Shell className="gap-6">
      <HeaderPage
        title="Clientes"
        description="Lista de clientes registrados en el sistema."
      />
      <ClientsTable data={dataClientsAll} /> {/* Tabla de clientes */}
    </Shell>
  );
}
