"use client";
import { useCategories } from "@/hooks/use-categories";
import { usePermissions } from "@/hooks/use-permissions";

import { CategoriesTable } from "@/components/categories/CategoriesTable";
import { AccessDenied } from "@/components/common/AccessDenied";
import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";

export default function PageCategories() {
  const { hasPermission, isLoadingHas } = usePermissions();
  const hasCategoriesPermission = hasPermission("CAT", ["READ"]);
  const { data, isLoading } = useCategories();

  if (isLoading || isLoadingHas) {
    return (
      <Shell className="gap-2">
        <HeaderPage
          title="Categorías"
          description="Lista de categorías registradas en el sistema"
        />
        <div className="flex flex-col items-end justify-center gap-4">
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

  if (!hasCategoriesPermission) {
    return (
      <Shell>
        <HeaderPage
          title="Categorías"
          description="Lista de categorías registradas en el sistema"
        />
        <AccessDenied message="No tienes permisos para ver las categorías." />
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
