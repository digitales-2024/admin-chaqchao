"use client";

import { useProfile } from "@/hooks/use-profile";
import { User } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { exportTableToCSV } from "@/lib/export";

import { CreateUsersDialog } from "./CreateUserDialog";
import { DeleteUsersDialog } from "./DeleteUsersDialog";
import { ReactivateUsersDialog } from "./ReactivateUsersDialog";

export interface UsersTableToolbarActionsProps {
  table?: Table<User>;
}

export function UsersTableToolbarActions({
  table,
}: UsersTableToolbarActionsProps) {
  const { user } = useProfile();

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {table && table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <>
          <DeleteUsersDialog
            users={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
          <ReactivateUsersDialog
            users={table
              .getFilteredSelectedRowModel()
              .rows.map((row) => row.original)}
            onSuccess={() => table.toggleAllRowsSelected(false)}
          />
        </>
      ) : null}
      <CreateUsersDialog />
      {user?.isSuperAdmin && (
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
      )}
    </div>
  );
}
