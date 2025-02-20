import {
  ClassesDataAdmin,
  TypeClass,
  typeClassColors,
  typeClassLabels,
} from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ClipboardX,
  Clock,
  Ellipsis,
} from "lucide-react";
import { useState } from "react";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";
import { ClosedClassDialog } from "./ClosedClassDialog";
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
        <div className="min-w-40 truncate normal-case">
          {format(new Date(row.getValue("fecha")), "PPP", { locale: es })}
        </div>
      </div>
    ),
  },
  {
    id: "tipo clase",
    accessorKey: "typeClass",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de Clase" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <div className="min-w-40 truncate capitalize">
          <span
            className={cn(
              "font-medium",
              typeClassColors[row.getValue("tipo clase") as TypeClass],
            )}
          >
            {typeClassLabels[row.getValue("tipo clase") as TypeClass]}
          </span>
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
    cell: ({ row }) => {
      return (
        <div className="flex min-w-40 items-center gap-4">
          <Clock className="mr-1 h-4 w-4" />
          <div className="truncate lowercase">{row.getValue("horario")}</div>
          <Badge
            variant="outline"
            className={cn("truncate text-xs font-thin lowercase", {
              "border-none bg-rose-50 text-rose-500": row.original.isClosed,
              "border-none bg-emerald-50 text-emerald-500":
                !row.original.isClosed,
            })}
          >
            {row.original.isClosed ? "cerrada" : "abierta"}
          </Badge>
        </div>
      );
    },
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
          typeClass={row.original.typeClass}
          totalParticipants={totalParticipants}
          newParticipantsCount={newParticipantsCount}
        />
      );
    },
    enableSorting: false,
    enableHiding: false,
    enablePinning: true,
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
  {
    id: "actions",
    cell: function Cell({ row }) {
      const [setshowClosedClass, setSetshowClosedClass] =
        useState<boolean>(false);
      return (
        <>
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
            <DropdownMenuContent>
              <DropdownMenuItem
                onSelect={() => {
                  setSetshowClosedClass(true);
                }}
              >
                {row.original.isClosed ? "Abrir clase" : "Cerrar clase"}
                <DropdownMenuShortcut>
                  <ClipboardX className="ml-2 size-4" aria-hidden="true" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ClosedClassDialog
            open={setshowClosedClass}
            onOpenChange={setSetshowClosedClass}
            class={row.original}
          />
        </>
      );
    },
  },
];
