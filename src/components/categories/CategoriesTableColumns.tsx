"use client";

import { Category } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { DesactivateCategoryDialog } from "./DesactivateCategoryDialog";
import { UpdateCategorySheet } from "./UpdateCategorySheet";

export const categoriesColumns = (): ColumnDef<Category>[] => {
  return [
    {
      id: "select",
      size: 10,
      header: ({ table }) => (
        <div className="px-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="px-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => (
        <div className="truncate capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descripción" />
      ),
      cell: ({ row }) => (
        <div className="truncate capitalize">{row.getValue("description")}</div>
      ),
    },
    {
      id: "actions",
      size: 10,
      cell: function Cell({ row }) {
        const [showEditDialog, setShowEditDialog] = useState(false);
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const category = row.original;

        return (
          <div>
            <UpdateCategorySheet
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              category={category}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="Open menu"
                  variant="ghost"
                  className="flex size-8 p-0 data-[state=open]:bg-muted"
                >
                  <Ellipsis className="size-4" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                  Desactivar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DesactivateCategoryDialog
              category={category}
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </div>
        );
      },
      enablePinning: true,
    },
  ];
};
