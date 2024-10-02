import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format, formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import SelectStatus from "./SelectStatus";

export const getColumnsOrders = (): ColumnDef<Order>[] => [
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
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
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
      <div className="truncate capitalize">{row.getValue("cliente")}</div>
    ),
  },
  {
    id: "total",
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => (
      <div className="inline-flex gap-2">
        <span className="text-xs text-slate-400">S/.</span>
        {row.getValue("total")}
      </div>
    ),
  },
  {
    id: "estado",
    accessorKey: "orderStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => <SelectStatus data={row.original.orderStatus} />,
  },
  {
    id: "productos",
    size: 10,
    accessorKey: "products",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Productos" />
    ),
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          {...{
            onClick: row.getToggleExpandedHandler(),
          }}
        >
          {row.getIsExpanded() ? <ChevronUp /> : <ChevronDown />}
        </Button>
      ) : null;
    },
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
  },
];
