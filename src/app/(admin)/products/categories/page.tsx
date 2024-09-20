"use client";
"use memo";

import { useCategories } from "@/hooks/use-categories"; // Usar el hook de categorías
import { Shell } from "@/components/common/Shell";
import { TitleSecction } from "@/components/common/text/TitleSecction";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoriesTable } from "@/components/categories/CategoriesTable"; // Tabla de categorías

const HeaderPage = () => (
  <div>
    <TitleSecction text="Categorías" />
    <span className="text-sm text-slate-600">
      Lista de categorías registradas en el sistema.
    </span>
  </div>
);

export default function PageCategories() {
  const { data, isLoading } = useCategories(); // Hook de categorías

  if (isLoading) {
    return (
      <Shell className="gap-2">
        <HeaderPage />
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
    return null;
  }

  return (
    <Shell className="gap-6">
      <HeaderPage />
      <CategoriesTable data={data} /> {/* Tabla de categorías */}
    </Shell>
  );
}
