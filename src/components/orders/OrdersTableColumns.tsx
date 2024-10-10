import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SelectStatus from "./SelectStatus";

export const getColumnsOrders = (): ColumnDef<Order>[] => [
  {
    id: "código",
    accessorKey: "pickupCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: ({ row }) => <div>{row.getValue("código")}</div>,
  },
  {
    id: "fecha",
    accessorKey: "pickupTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <div className="inline-flex w-full items-center justify-start gap-2 truncate">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Calendar className="size-4 flex-shrink-0 text-slate-300" />
              <span className="sr-only">fecha del pedido</span>
            </TooltipTrigger>
            <TooltipContent>
              {format(row.getValue("fecha"), "PPPpp", { locale: es })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Badge variant="outline" className="font-light text-slate-500">
          {formatDistanceToNow(new Date(row.getValue("fecha")), {
            addSuffix: true,
            locale: es,
          })}
        </Badge>
      </div>
    ),
  },
  {
    id: "cliente",
    accessorKey: "clientName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
    cell: ({ row }) => (
      <div className="truncate capitalize">{row.original.client.name}</div>
    ),
  },
  {
    id: "total",
    accessorKey: "totalAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div className="inline-flex gap-2">
        <span className="text-xs text-slate-400">S/.</span>
        {row.getValue("total") || 0}
      </div>
    ),
  },
  {
    id: "estado",
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => (
      <SelectStatus id={row.original.id} data={row.original.orderStatus} />
    ),
  },
];
