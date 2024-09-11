"use client";

import { User } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { CircleCheck, Ellipsis, Timer, Trash } from "lucide-react";
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
import { DeleteUsersDialog } from "./DeleteUsersDialog";

export const getColumns = (): ColumnDef<User>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre" />
    ),
    cell: ({ row }) => (
      <div className="min-w-56 capitalize">{row.getValue("name")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo" />
    ),
    cell: ({ row }) => <div>{row.getValue("email")}</div>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => <div>{row.getValue("phone")}</div>,
  },
  {
    accessorKey: "mustChangePassword",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Habilitación" />
    ),
    cell: ({ row }) => (
      <div>
        <div className="inline-flex items-center gap-2 text-xs text-slate-600">
          {row.getValue("mustChangePassword") ? (
            <>
              <Timer className="size-4 flex-shrink-0" aria-hidden="true" />
              Debe cambiar contraseña
            </>
          ) : (
            <>
              <CircleCheck
                className="size-4 text-emerald-500"
                aria-hidden="true"
              />
              Habilitado
            </>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Estado" />
    ),
    cell: ({ row }) => (
      <div>
        {row.getValue("isActive") ? (
          <Badge
            variant="outline"
            className="border-emerald-500 text-emerald-500"
          >
            Activo
          </Badge>
        ) : (
          <Badge variant="outline" className="border-red-500 text-red-500">
            Inactivo
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "lastLogin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Última conexión" />
    ),
    cell: ({ row }) => (
      <div>
        {format(parseISO(row.getValue("lastLogin")), "yyyy-MM-dd HH:mm:ss")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      // const [isUpdatePending, startUpdateTransition] = useTransition();
      // const [showUpdateTaskSheet, setShowUpdateTaskSheet] =
      //   useState(false);
      const [showDeleteTaskDialog, setShowDeleteTaskDialog] = useState(false);

      return (
        <>
          {/* <UpdateTaskSheet
              open={showUpdateTaskSheet}
              onOpenChange={setShowUpdateTaskSheet}
              task={row.original}
            /> */}
          <DeleteUsersDialog
            open={showDeleteTaskDialog}
            onOpenChange={setShowDeleteTaskDialog}
            users={[row?.original]}
            showTrigger={false}
            onSuccess={() => row.toggleSelected(false)}
          />
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
              <DropdownMenuItem onSelect={() => console.log("a")}>
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => setShowDeleteTaskDialog(true)}>
                Eliminar
                <DropdownMenuShortcut>
                  <Trash className="size-4" aria-hidden="true" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
