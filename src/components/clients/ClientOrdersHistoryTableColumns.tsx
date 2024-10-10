import { Order, OrderStatus } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
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
        let badgeClass = "";
        let statusText = "";

        switch (status) {
          case "PENDING":
            badgeClass = "bg-yellow-100 text-yellow-500";
            statusText = "Pendiente";
            break;
          case "CONFIRMED":
            badgeClass = "bg-blue-100 text-blue-500";
            statusText = "Confirmado";
            break;
          case "COMPLETED":
            badgeClass = "bg-green-100 text-green-500";
            statusText = "Completado";
            break;
          case "READY":
            badgeClass = "bg-purple-100 text-purple-500";
            statusText = "Listo";
            break;
          case "CANCELLED":
            badgeClass = "bg-red-100 text-red-500";
            statusText = "Cancelado";
            break;
          default:
            badgeClass = "bg-gray-100 text-gray-500";
            statusText = "Desconocido";
        }

        return (
          <div className="cursor-pointer">
            <Badge variant="secondary" className={badgeClass}>
              {statusText}
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
