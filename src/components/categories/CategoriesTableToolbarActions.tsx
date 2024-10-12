"use client";

import { useProfile } from "@/hooks/use-profile";
import { Category } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { exportTableToCSV } from "@/lib/export";

import { CreateCategoryDialog } from "./CreateCategoryDialog";

export interface CategoriesTableToolbarActionsProps {
  table?: Table<Category>;
  exportFile?: boolean;
}

export function CategoriesTableToolbarActions({
  table,
  exportFile = false,
}: CategoriesTableToolbarActionsProps) {
  const { user } = useProfile();
  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      <CreateCategoryDialog />

      {exportFile ||
        (user?.isSuperAdmin && (
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
        ))}
    </div>
  );
}
