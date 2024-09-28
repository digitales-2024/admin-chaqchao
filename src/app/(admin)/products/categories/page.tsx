"use client";
"use memo";
import { useCategories } from "@/hooks/use-categories"; // Usar el hook de categorías

import { CategoriesTable } from "@/components/categories/CategoriesTable"; // Tabla de categorías
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageCategories() {
  const { data, isLoading } = useCategories(); // Hook de categorías

  if (isLoading) {
    return (
      <Shell className="gap-2">
        <HeaderPage
          title="Categorías"
          description="Lista de categorías registradas en el sistema"
        />
        <div className="flex flex-col items-end justify-center gap-4">
          <Skeleton className="h-7 w-52 justify-end" />
          <DataTableSkeleton
            columnCount={3} // Ajustar el número de columnas a las propiedades de categorías
            searchableColumnCount={1}
            filterableColumnCount={0}
            cellWidths={["1rem", "15rem", "12rem"]}
            shrinkZero
          />
        </div>
      </Shell>
    );
  }

  if (!data) {
    return (
      <Shell>
        <HeaderPage
          title="Categorías"
          description="Lista de categorías registradas en el sistema"
        />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <Shell className="gap-6">
      <HeaderPage
        title="Categorías"
        description="Lista de categorías registradas en el sistema"
      />
      <CategoriesTable data={data} /> {/* Tabla de categorías */}
    </Shell>
  );
}
