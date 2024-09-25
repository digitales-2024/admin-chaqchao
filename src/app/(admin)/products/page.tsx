"use client";
"use memo";

import { useProducts } from "@/hooks/use-products";

import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { ProductsTable } from "@/components/products/ProductsTable";
import { Skeleton } from "@/components/ui/skeleton";

export default function PageUsers() {
  const { dataProductsAll, isLoading } = useProducts();

  if (isLoading) {
    return (
      <Shell className="gap-2">
        <HeaderPage
          title="Productos"
          description="Lista de productos registrados en el sistema."
        />
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
  if (!dataProductsAll) {
    return null;
  }
  return (
    <Shell className="gap-6">
      <HeaderPage
        title="Productos"
        description="Lista de productos registrados en el sistema."
      />
      <ProductsTable data={dataProductsAll} />
    </Shell>
  );
}
