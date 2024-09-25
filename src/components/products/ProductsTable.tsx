"use client";
"use memo";

import { useProfile } from "@/hooks/use-profile";
import { ProductData } from "@/types";
import { generateColors } from "@/utils/generateColors";
import { useMemo } from "react";

import { DataTable } from "../data-table/DataTable";
import { productsColumns } from "./ProductsTableColumns";
import { ProductsTableToolbarActions } from "./ProductsTableToolbarActions";

export function ProductsTable({ data }: { data: ProductData[] }) {
  const { user } = useProfile();

  // Obtener categorías únicas
  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(data.map((product) => product.category.name)));
  }, [data]);

  // Generar colores basados en la cantidad de categorías únicas
  const colors = useMemo(
    () => generateColors(uniqueCategories.length),
    [uniqueCategories],
  );

  const columns = useMemo(
    () =>
      productsColumns(user?.isSuperAdmin || false, uniqueCategories, colors),
    [user, uniqueCategories, colors],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      toolbarActions={<ProductsTableToolbarActions />}
      placeholder="Buscar productos..."
    />
  );
}
