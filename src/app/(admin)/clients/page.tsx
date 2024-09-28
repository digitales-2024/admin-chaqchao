"use client";
"use memo";

import { useClients } from "@/hooks/use-clients"; // Usar el hook de clientes

import { ClientsTable } from "@/components/clients/ClientsTable"; // Tabla de clientes
import { Shell } from "@/components/common/Shell";
import { TitleSecction } from "@/components/common/text/TitleSecction";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderPage = () => (
  <div>
    <TitleSecction text="Clientes" />
    <span className="text-sm text-slate-600">
      Lista de clientes registrados en el sistema.
    </span>
  </div>
);

export default function PageClients() {
  const { data, isLoading } = useClients(); // Hook de clientes

  if (isLoading) {
    return (
      <Shell className="gap-2">
        <HeaderPage />
        <div className="flex flex-col items-end justify-center gap-4">
          <Skeleton className="h-7 w-52 justify-end" />
          <DataTableSkeleton
            columnCount={4} // Ajustar el número de columnas a las propiedades de clientes
            searchableColumnCount={2} // Ajustar según cuántas columnas sean buscables
            filterableColumnCount={1} // Ajustar según cuántas columnas sean filtrables
            cellWidths={["1rem", "15rem", "15rem", "12rem"]} // Ajustar las anchuras de las celdas
            shrinkZero
          />
        </div>
      </Shell>
    );
  }

  if (!data) {
    return null; // Manejo de errores o datos vacíos
  }

  return (
    <Shell className="gap-6">
      <HeaderPage />
      <ClientsTable data={data} /> {/* Tabla de clientes */}
    </Shell>
  );
}
