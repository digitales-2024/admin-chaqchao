"use client";

import { useProducts } from "@/hooks/use-products";
import { useProfile } from "@/hooks/use-profile";
import { ProductData } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { CreateProductDialog } from "./CreateProductDialog";
import { DeleteProductsDialog } from "./DeleteProductDialog";
import { ReactivateProductsDialog } from "./ReactivateProductsDialog";

export interface ProductsTableToolbarActionsProps {
  table?: Table<ProductData>;
  exportFile?: boolean;
}

export function ProductsTableToolbarActions({
  table,
  exportFile = false,
}: ProductsTableToolbarActionsProps) {
  const { user } = useProfile();

  const { onDownloadExcel } = useProducts();

  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      {table && table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <>
          <DeleteProductsDialog
            products={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
          {user?.isSuperAdmin && (
            <ReactivateProductsDialog
              products={table
                .getFilteredSelectedRowModel()
                .rows.map((row) => row.original)}
              onSuccess={() => table.toggleAllRowsSelected(false)}
            />
          )}
        </>
      ) : null}
      <CreateProductDialog />
      {(exportFile || user?.isSuperAdmin) && (
        <Button variant="outline" size="sm" onClick={onDownloadExcel}>
          <Download className="mr-2 size-4" aria-hidden="true" />
          Exportar
        </Button>
      )}
    </div>
  );
}
