import { Order, OrderStatus } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ArrowBigRightDash } from "lucide-react";

import { cn } from "@/lib/utils";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { statusColors, translateStatus } from "../orders/OrderSheetDetails";
import { Badge } from "../ui/badge";

export const ordersColumns = (
  selectedOrderId: string | null,
): ColumnDef<Order>[] => {
  return [
    {
      id: "Code",
      accessorKey: "pickupCode",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Código" />
      ),
      cell: ({ row }) => (
        <div
          className={cn("relative cursor-pointer", {
            "text-indigo-600": row.original.id === selectedOrderId,
          })}
        >
          <ArrowBigRightDash
            className={cn(
              "absolute -left-4 bottom-0 top-0 size-4 animate-pulse",
              {
                hidden: row.original.id !== selectedOrderId,
              },
            )}
          />
          {row.original.pickupCode}
        </div>
      ),
    },
    {
      id: "Fecha",
      accessorKey: "pickupTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de Recogida" />
      ),
      cell: ({ row }) => {
        const pickupTime = row.getValue("Fecha") as string;
        return (
          <div
            className={cn("cursor-pointer", {
              "text-indigo-500": row.original.id === selectedOrderId,
            })}
          >
            {pickupTime
              ? format(new Date(pickupTime), "yyyy-MM-dd", { locale: es })
              : "Sin datos"}
          </div>
        );
      },
    },
    {
      id: "Estado",
      accessorKey: "orderStatus",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("Estado") as OrderStatus;
        return (
          <div className="cursor-pointer">
            <Badge
              variant="outline"
              className={`px-2 py-1 text-xs uppercase ${
                statusColors[status] || "bg-gray-100 text-gray-500"
              }`}
            >
              {translateStatus[status] || "Desconocido"}
            </Badge>
          </div>
        );
      },
    },
    {
      id: "Total",
      accessorKey: "totalAmount",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total del Pedido" />
      ),
      cell: ({ row }) => {
        const totalAmount = row.getValue("Total") as number;
        return (
          <div
            className={cn({
              "text-indigo-500": row.original.id === selectedOrderId,
            })}
          >
            S/. {totalAmount?.toFixed(2) || "00"}
          </div>
        );
      },
    },
  ];
};
