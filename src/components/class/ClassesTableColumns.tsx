import { ClassesDataAdmin } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, ChevronDown, ChevronUp, Clock } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Badge } from "../ui/badge";
import ParticipantsCell from "./ParticipantsClassCell";

export const classesTableColumns = (
  colors: string[],
  uniqueLanguage: string[],
  newParticipants: { [key: string]: number }, // Cambiar el tipo de newParticipants
): ColumnDef<ClassesDataAdmin>[] => [
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
      <div className="flex items-center">
        <Calendar className="mr-2 h-4 w-4" />
        <div className="min-w-40 truncate capitalize">
          {row.getValue("fecha")}
        </div>
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
      <div className="flex items-center">
        <Clock className="mr-1 h-4 w-4" />
        <div className="min-w-40 truncate lowercase">
          {row.getValue("horario")}
        </div>
      </div>
    ),
  },
  {
    id: "lenguaje",
    accessorKey: "languageClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lenguaje" />
    ),
    cell: ({ row }) => {
      const languageName = row.getValue("lenguaje") as string;
      const index = uniqueLanguage.indexOf(languageName);
      const borderColor = colors[index];
      return (
        <Badge
          variant="outline"
          className="truncate capitalize"
          style={{ borderColor }}
        >
          {row.getValue("lenguaje")}
        </Badge>
      );
    },
  },
  {
    id: "participantes",
    accessorKey: "totalParticipants",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Participantes" />
    ),
    cell: ({ row }) => {
      const totalParticipants = row.getValue("participantes") as number;
      const key = row.original.dateClass + row.original.scheduleClass;
      const newParticipantsCount = newParticipants[key] || 0;

      return (
        <ParticipantsCell
          totalParticipants={totalParticipants}
          newParticipantsCount={newParticipantsCount}
        />
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
