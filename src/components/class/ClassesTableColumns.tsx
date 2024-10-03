import { ClassesDataAdmin } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, Users } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "../ui/badge";

export const classesTableColumns = (): ColumnDef<ClassesDataAdmin>[] => [
  {
    id: "select",
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
    size: 10,
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
  },
  {
    id: "fecha",
    accessorKey: "dateClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => (
      <div className="min-w-40 truncate capitalize">
        {row.getValue("fecha")}
      </div>
    ),
  },
  {
    id: "horario",
    accessorKey: "scheduleClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Horario" />
    ),
    cell: ({ row }) => (
      <div className="min-w-40 truncate lowercase">
        {row.getValue("horario")}
      </div>
    ),
  },
  {
    id: "lenguaje",
    accessorKey: "languageClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lenguaje" />
    ),
    cell: ({ row }) => (
      <div className="min-w-40 truncate capitalize">
        {row.getValue("lenguaje")}
      </div>
    ),
  },
  {
    id: "participantes",
    accessorKey: "totalParticipants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Participantes" />
    ),
    cell: ({ row }) => {
      const totalParticipants = row.getValue("participantes") as number;
      return (
        <div className="min-w-40 truncate">
          <Badge variant="secondary">
            <Users className="mr-1 h-4 w-4" />
            <span className="text-sm font-light">{totalParticipants}/8 </span>
          </Badge>
        </div>
      );
    },
  },
  {
    id: "detalles",
    size: 10,
    accessorKey: "classes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Detalles" />
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
