import { Order, OrderStatus } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { statusColors, translateStatus } from "../orders/OrderSheetDetails";
import { Badge } from "../ui/badge";

export const ordersColumns = (): ColumnDef<Order>[] => {
  return [
    {
      id: "FechaDeRecogida",
      accessorKey: "pickupTime",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de Recogida" />
      ),
      cell: ({ row }) => {
        const pickupTime = row.getValue("FechaDeRecogida") as string;
        return (
          <div className="cursor-pointer">
            {pickupTime
              ? format(new Date(pickupTime), "PPP", { locale: es })
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
        return <div>S/. {totalAmount.toFixed(2)}</div>;
      },
    },
  ];
};
