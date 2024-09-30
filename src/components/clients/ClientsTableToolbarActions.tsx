"use client";

import { Client } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import { exportTableToCSV } from "@/lib/export";

export interface ClientsTableToolbarActionsProps {
  table?: Table<Client>;
}

export function ClientsTableToolbarActions({
  table,
}: ClientsTableToolbarActionsProps) {
  return (
    <div className="flex w-fit flex-wrap items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (table) {
            exportTableToCSV(table, {
              filename: "clients",
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
