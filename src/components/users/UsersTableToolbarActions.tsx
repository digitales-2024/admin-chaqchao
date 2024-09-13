"use client";

import { User } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { exportTableToCSV } from "@/lib/export";

import { CreateUsersDialog } from "./CreateUserDialog";
import { DeleteUsersDialog } from "./DeleteUsersDialog";

export interface UsersTableToolbarActionsProps {
  table?: Table<User>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      {table && table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <DeleteUsersDialog
          users={table
            .getFilteredSelectedRowModel()
            .rows.map((row) => row.original)}
          onSuccess={() => table.toggleAllRowsSelected(false)}
        />
      ) : null}
      <CreateUsersDialog />
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (table) {
            exportTableToCSV(table, {
              filename: "users",
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
