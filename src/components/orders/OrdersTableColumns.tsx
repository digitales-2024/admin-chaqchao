import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar } from "lucide-react";

import { cn } from "@/lib/utils";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SelectStatus from "./SelectStatus";

export const getColumnsOrders = (newOrders: Order[]): ColumnDef<Order>[] => [
  {
    id: "código",
    accessorKey: "pickupCode",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Código" />
    ),
    cell: function Cell({ row }) {
      const isNew = newOrders.some((order) => order.id === row.original.id);

      return (
        <div className="relative">
          {isNew && (
            <span className="absolute -left-3 -top-6 flex -rotate-12 flex-row items-center justify-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs text-emerald-500">
              <span className="relative size-2 rounded-full bg-emerald-500">
                <span className="absolute size-2 animate-ping rounded-full bg-emerald-500" />
              </span>
              Nuevo
            </span>
          )}
          {row.getValue("código")}
        </div>
      );
    },
  },
  {
    id: "fecha",
    accessorKey: "pickupTime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: function Cell({ row }) {
      const datePassed = new Date(row.original.pickupTime) < new Date();
      return (
        <div className="inline-flex w-full items-center justify-start gap-2 truncate">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Calendar
                  className={cn("size-4 flex-shrink-0 text-slate-300", {
                    "text-emerald-500": !datePassed,
                    "text-rose-500": datePassed,
                  })}
                />
                <span className="sr-only">fecha del pedido</span>
              </TooltipTrigger>
              <TooltipContent>
                {format(row.getValue("fecha"), "PPPpp", { locale: es })}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Badge
            variant={"outline"}
            className={cn("font-light text-slate-500", {
              "text-emerald-500": !datePassed,
              "text-rose-500": datePassed,
            })}
          >
            {formatDistanceToNow(new Date(row.getValue("fecha")), {
              addSuffix: true,
              locale: es,
            })}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "cliente",
    accessorKey: "client.name",
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
