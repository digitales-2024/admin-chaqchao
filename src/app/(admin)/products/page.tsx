"use client";
"use memo";

import { useProducts } from "@/hooks/use-products";

import { Shell } from "@/components/common/Shell";
import { TitleSecction } from "@/components/common/text/TitleSecction";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { ProductsTable } from "@/components/products/ProductsTable";
import { Skeleton } from "@/components/ui/skeleton";

const HeaderPage = () => (
  <div>
    <TitleSecction text="Productos" />
    <span className="text-sm text-slate-600">
      Lista de productos registrados en el sistema.
    </span>
  </div>
);

export default function PageUsers() {
  const { dataProductsAll, isLoading } = useProducts();

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
  if (!dataProductsAll) {
    return null;
  }
  return (
    <Shell className="gap-6">
      <HeaderPage />
      <ProductsTable data={dataProductsAll} />
    </Shell>
  );
}
