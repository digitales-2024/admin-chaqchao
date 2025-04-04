"use client";

import { useProducts } from "@/hooks/use-products";
import { familyLabels, ProductData } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import {
  Ellipsis,
  ImageOff,
  Package,
  PackageCheck,
  PackageX,
  RefreshCcwDot,
  ScanEye,
  Trash,
} from "lucide-react";
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
import { Switch } from "../ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DeleteProductsDialog } from "./DeleteProductDialog";
import { ProductImageDialog } from "./ProductImageDialog";
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
      id: "images",
      size: 10,
      accessorKey: "images",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Imagen" />
      ),
      cell: function ImageCell({ row }) {
        const images = row.getValue("images") as { url: string }[];
        const categoryName = row.getValue("categoría") as string;
        const index = uniqueCategories.indexOf(categoryName);
        const borderColor = colors[index];

        const [imageError, setImageError] = useState(false);
        return (
          <ProductImageDialog
            images={images}
            product={row?.original}
            borderColor={borderColor}
          >
            <div className="group relative flex h-20 w-20 cursor-pointer flex-col items-center justify-center text-center">
              {imageError ? (
                <ImageOff className="size-8 text-slate-400" strokeWidth={1} />
              ) : images.length > 0 ? (
                <img
                  src={images[0]?.url}
                  alt={row.original.name}
                  key={row.original.id}
                  width={80}
                  height={80}
                  className="h-full w-full rounded-md object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <ImageOff className="size-8 text-slate-400" strokeWidth={1} />
              )}
              <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <ScanEye strokeWidth={1.5} className="h-12 w-12 text-white" />
              </div>
            </div>
          </ProductImageDialog>
        );
      },
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
      id: "categoría",
      accessorKey: "category.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Categoría" />
      ),
      cell: ({ row }) => {
        const categoryName = row.getValue("categoría") as string;
        const index = uniqueCategories.indexOf(categoryName);
        const borderColor = colors[index];
        return (
          <div className="inline-flex justify-center gap-2">
            <Badge
              variant="outline"
              className="truncate capitalize"
              style={{ borderColor }}
            >
              {categoryName}
            </Badge>
            <Tooltip delayDuration={0}>
              <TooltipTrigger>
                <Package
                  className="size-5 opacity-55"
                  style={{ color: borderColor }}
                />
              </TooltipTrigger>
              <TooltipContent
                className="relative w-fit max-w-28 text-xs"
                align="end"
              >
                {familyLabels[row.original.category.family]}
              </TooltipContent>
            </Tooltip>
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
        <span
          className="cursor-default justify-center text-base"
          aria-hidden="true"
        >
          {new Intl.NumberFormat("es-PE", {
            style: "currency",
            currency: "PEN",
          }).format(row.getValue("precio") as number)}
        </span>
      ),
    },
    {
      id: "Stock Máximo",
      accessorKey: "maxStock",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Stock Máximo" />
      ),
      cell: ({ row }) => (
        <span
          className="cursor-default justify-center text-base"
          aria-hidden="true"
        >
          {row.original.maxStock}
        </span>
      ),
    },
    {
      id: "disponibilidad",
      accessorKey: "isAvailable",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Disponibilidad" />
      ),
      cell: function Cell({ row }) {
        const { onToggleProductActivation } = useProducts();
        const [isAvailable, setIsAvailable] = useState(
          row.original.isAvailable,
        );

        const handleToggle = async () => {
          const productId = row.original.id;
          await onToggleProductActivation(productId);
          setIsAvailable((prev) => !prev);
        };
        return (
          <div className="flex w-56 justify-center gap-4">
            <>
              <div className="flex flex-col items-center">
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleToggle}
                  className="translate-y-0.5"
                />
              </div>
              {row.getValue("disponibilidad") ? (
                <span className="inline-flex items-center gap-2 text-emerald-500">
                  <PackageCheck
                    className="size-4 flex-shrink-0"
                    aria-hidden="true"
                  />
                  Disponible
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 truncate text-red-500">
                  <PackageX className="size-4" aria-hidden="true" />
                  No disponible
                </span>
              )}
            </>
          </div>
        );
      },
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
        const [showDeleteDialog, setShowDeleteDialog] = useState(false);
        const [showReactivateDialog, setShowReactivateDialog] = useState(false);
        const [showEditDialog, setShowEditDialog] = useState(false);

        const { isActive } = row.original;
        return (
          <div>
            <div>
              {showEditDialog && (
                <UpdateProductSheet
                  open={showEditDialog}
                  onOpenChange={setShowEditDialog}
                  product={row?.original}
                />
              )}

              {showDeleteDialog && (
                <DeleteProductsDialog
                  open={showDeleteDialog}
                  onOpenChange={setShowDeleteDialog}
                  products={[row?.original]}
                  showTrigger={false}
                  onSuccess={() => {
                    row.toggleSelected(false);
                  }}
                />
              )}
              {showReactivateDialog && (
                <ReactivateProductsDialog
                  open={showReactivateDialog}
                  onOpenChange={setShowReactivateDialog}
                  products={[row?.original]}
                  showTrigger={false}
                  onSuccess={() => {
                    row.toggleSelected(false);
                  }}
                />
              )}
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

  return columns;
};
