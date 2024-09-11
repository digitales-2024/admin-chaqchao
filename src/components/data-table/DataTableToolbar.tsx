"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "./DataTableViewOptions";

interface DataTableToolbarProps<TData>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  placeholder?: string;
  viewOptions?: boolean;
}

export function DataTableToolbar<TData>({
  table,
  placeholder = "Buscar...",
  viewOptions = false,
  children,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col-reverse items-center justify-between gap-4 sm:flex-row">
      <div className="flex w-full flex-1 items-center space-x-2">
        <Input
          placeholder={placeholder}
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="w-full outline-none focus:outline-none sm:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Limpiar
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex w-full justify-end gap-2">
        {children}
        {viewOptions && <DataTableViewOptions table={table} />}
      </div>
    </div>
  );
}
