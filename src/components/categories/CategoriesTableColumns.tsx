"use client";

import { useProfile } from "@/hooks/use-profile";
import { Category, familyLabels } from "@/types";
import { capitalizeSentences } from "@/utils/capitalizeSentences";
import { type ColumnDef } from "@tanstack/react-table";
import { Trash, Ellipsis, RefreshCcwDot } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import { DesactivateCategoryDialog } from "./DesactivateCategoryDialog";
import { ReactivateCategoryDialog } from "./ReactivateCategoryDialog";
import { UpdateCategorySheet } from "./UpdateCategorySheet";

export const categoriesColumns = (): ColumnDef<Category>[] => {
  return [
    {
      id: "select",
      size: 10,
      header: () => null,
      enableSorting: false,
      enableHiding: false,
      enablePinning: true,
    },
    {
      id: "nombre",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => (
        <div className="truncate capitalize">{row.getValue("nombre")}</div>
      ),
    },
    {
      id: "descripción",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Descripción" />
      ),
      cell: function Cell({ row }) {
        const description = row.getValue("descripción") as string;
        const [expandido, setExpandido] = useState(false);

        const handleToggle = () => {
          setExpandido(!expandido);
        };
        return (
          <div
            className={cn(
              "w-72 truncate",
              expandido ? "whitespace-normal" : "whitespace-nowrap",
            )}
            onClick={handleToggle}
          >
            {description ? (
              capitalizeSentences(description)
            ) : (
              <span className="text-xs text-slate-300">Sin descripción</span>
            )}
          </div>
        );
      },
    },
    {
      id: "familia",
      accessorKey: "family",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Familia" />
      ),
      cell: ({ row }) => (
        <div className="w-56 truncate capitalize">
          {familyLabels[row.original.family]}
        </div>
      ),
    },
    {
      id: "estado",
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("estado") ? (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-500"
            >
              Activo
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-500">
              Inactivo
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      size: 10,
      cell: function Cell({ row }) {
        const [showEditDialog, setShowEditDialog] = useState(false);
        const [showReactivateDialog, setShowReactivateDialog] = useState(false);
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const category = row.original;

        const { user } = useProfile();

        return (
          <div>
            {showEditDialog && (
              <UpdateCategorySheet
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                category={category}
              />
            )}
            <ReactivateCategoryDialog
              category={category}
              open={showReactivateDialog}
              onOpenChange={setShowReactivateDialog}
              onSuccess={() => {
                row.toggleSelected(false);
              }}
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
                {user?.isSuperAdmin && (
                  <DropdownMenuItem
                    onSelect={() => setShowReactivateDialog(true)}
                    disabled={row.original.isActive}
                  >
                    Reactivar
                    <DropdownMenuShortcut>
                      <RefreshCcwDot className="size-4" aria-hidden="true" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                  Eliminar
                  <DropdownMenuShortcut>
                    <Trash className="size-4" aria-hidden="true" />
                  </DropdownMenuShortcut>
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
