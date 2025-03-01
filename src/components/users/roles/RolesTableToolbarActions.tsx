"use client";

import { useProfile } from "@/hooks/use-profile";
import { Role } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { exportTableToCSV } from "@/lib/export";

import { CreateRolesDialog } from "./CreateRolesDialog";
import { DeleteRolesDialog } from "./DeleteRolesDialog";
import { ReactivateRolesDialog } from "./ReactivateRolesDialog";

export interface RolesTableToolbarActionsProps {
  table?: Table<Role>;
}

export function RolesTableToolbarActions({
  table,
}: RolesTableToolbarActionsProps) {
  const { user } = useProfile();

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {table && table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <>
          <DeleteRolesDialog
            roles={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
          {user?.isSuperAdmin && (
            <ReactivateRolesDialog
              roles={table
                .getFilteredSelectedRowModel()
                .rows.map((row) => row.original)}
              onSuccess={() => table.toggleAllRowsSelected(false)}
            />
          )}
        </>
      ) : null}
      <CreateRolesDialog />
      {user?.isSuperAdmin && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (table) {
              exportTableToCSV(table, {
                filename: "roles",
                excludeColumns: ["select", "actions"],
              });
            }
          }}
        >
          <Download className="mr-2 size-4" aria-hidden="true" />
          Exportar
        </Button>
      )}
    </div>
  );
}
