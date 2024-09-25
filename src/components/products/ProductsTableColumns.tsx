"use client";

import { ProductData } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { Ellipsis, RefreshCcwDot, Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import { DeleteProductsDialog } from "./DeleteProductDialog";
import { ReactivateProductsDialog } from "./ReactivateProductsDialog";
import { UpdateProductSheet } from "./UpdateProductSheet";

export const productsColumns = (
  isSuperAdmin: boolean,
  uniqueCategories: string[],
  colors: string[],
): ColumnDef<ProductData>[] => {
  const columns: ColumnDef<ProductData>[] = [
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
      id: "imagen",
      size: 10,
      accessorKey: "image",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Imagen" />
      ),
      cell: ({ row }) => (
        <Image
          src={row.getValue("imagen") as string}
          alt="imagen"
          width={50}
          height={50}
          className="size-16 rounded-md object-cover"
        />
      ),
    },
    {
      id: "nombre",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => (
        <div className="min-w-40 truncate capitalize">
          {row.getValue("nombre") as string}
        </div>
      ),
    },
    {
      id: "categoria",
      accessorKey: "category.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categoria" />
      ),
      cell: ({ row }) => {
        const categoryName = row.getValue("categoria") as string;
        const index = uniqueCategories.indexOf(categoryName);
        const borderColor = colors[index];
        return (
          <div className="flex justify-center">
            <Badge
              variant="outline"
              className="truncate capitalize"
              style={{ borderColor }}
            >
              {categoryName}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "precio",
      accessorKey: "price",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Precio" />
      ),
      cell: ({ row }) => (
        <div>
          {new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
          }).format(row.getValue("precio") as number)}
        </div>
      ),
    },
    {
      id: "disponibilidad",
      accessorKey: "isAvailable",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Disponibilidad" />
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("disponibilidad") ? (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-500"
            >
              Disponible
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-500">
              No disponible
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      size: 10,
      cell: function Cell({ row }) {
        const [showDeleteDialog, setShowDeleteDialog] = useState(false);
        const [showReactivateDialog, setShowReactivateDialog] = useState(false);
        const [showEditDialog, setShowEditDialog] = useState(false);

        const { isActive } = row.original;
        return (
          <div>
            <div>
              <UpdateProductSheet
                open={showEditDialog}
                onOpenChange={setShowEditDialog}
                product={row?.original}
              />
              <DeleteProductsDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                users={[row?.original]}
                showTrigger={false}
                onSuccess={() => {
                  row.toggleSelected(false);
                }}
              />
              <ReactivateProductsDialog
                open={showReactivateDialog}
                onOpenChange={setShowReactivateDialog}
                products={[row?.original]}
                showTrigger={false}
                onSuccess={() => {
                  row.toggleSelected(false);
                }}
              />
            </div>
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
                <DropdownMenuItem
                  onSelect={() => setShowEditDialog(true)}
                  disabled={!isActive}
                >
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isSuperAdmin && (
                  <DropdownMenuItem
                    onSelect={() => setShowReactivateDialog(true)}
                    disabled={isActive}
                  >
                    Reactivar
                    <DropdownMenuShortcut>
                      <RefreshCcwDot className="size-4" aria-hidden="true" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onSelect={() => setShowDeleteDialog(true)}
                  disabled={!isActive}
                >
                  Eliminar
                  <DropdownMenuShortcut>
                    <Trash className="size-4" aria-hidden="true" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      },
      enablePinning: true,
    },
  ];

  if (isSuperAdmin) {
    columns.splice(5, 0, {
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
              Desactivo
            </Badge>
          )}
        </div>
      ),
    });
  }

  return columns;
};
