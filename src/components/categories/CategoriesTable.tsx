"use client";
"use memo";

import { Category } from "@/types";

import { DataTable } from "../data-table/DataTable";
import { categoriesColumns } from "./CategoriesTableColumns";
import { CategoriesTableToolbarActions } from "./CategoriesTableToolbarActions";

export function CategoriesTable({ data }: { data: Category[] }) {
  const columns = categoriesColumns();

  return (
    <DataTable
      data={data}
      columns={columns}
      toolbarActions={<CategoriesTableToolbarActions />}
      placeholder="Buscar categorías..."
    />
  );
}
