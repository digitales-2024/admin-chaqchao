"use client";

import { Category } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { exportTableToCSV } from "@/lib/export";

import { CreateCategoryDialog } from "./CreateCategoryDialog";

export interface CategoriesTableToolbarActionsProps {
  table?: Table<Category>;
}

export function CategoriesTableToolbarActions({
  table,
}: CategoriesTableToolbarActionsProps) {
  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      {}
      <CreateCategoryDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (table) {
            exportTableToCSV(table, {
              filename: "categories",
              excludeColumns: ["select", "actions"],
            });
          }
        }}
      >
        <Download className="mr-2 size-4" aria-hidden="true" />
        Exportar
      </Button>
    </div>
  );
}
