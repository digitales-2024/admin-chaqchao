"use client";

import { Client } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Ellipsis, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "../data-table/DataTableColumnHeader";
import { Badge } from "../ui/badge";
import { DesactivateClientDialog } from "./DesactivateClientDialog";
import { UpdateClientSheet } from "./UpdateClientSheet";

export const clientsColumns = (): ColumnDef<Client>[] => {
  return [
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => (
        <div className="truncate capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Correo" />
      ),
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("email")}</div>
      ),
    },
    {
      id: "phone",
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Teléfono" />
      ),
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("phone")}</div>
      ),
    },
    {
      id: "birthDate",
      accessorKey: "birthDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de nacimiento" />
      ),
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue("birthDate")), "yyyy-MM-dd")}</div> // Formatea la fecha correctamente
      ),
    },
    {
      id: "lastLogin",
      accessorKey: "lastLogin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Último acceso" />
      ),
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue("lastLogin")), "yyyy-MM-dd")}</div> // Formatea la fecha correctamente
      ),
    },
    {
      id: "estado",
      accessorKey: "isActive",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Estado" />
      ),
      cell: ({ row }) => (
        <div>
          {row.getValue("estado") ? (
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-500"
            >
              Activo
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-red-100 text-red-500">
              Inactivo
            </Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      size: 10,
      cell: function Cell({ row }) {
        const [showEditDialog, setShowEditDialog] = useState(false);
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const client = row.original;

        return (
          <div>
            <UpdateClientSheet
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              client={client}
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
                <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
                  Editar
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsDialogOpen(true)}>
                  Eliminar
                  <DropdownMenuShortcut>
                    <Trash className="size-4" aria-hidden="true" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DesactivateClientDialog
              client={client}
              isOpen={isDialogOpen}
              onOpenChange={setIsDialogOpen}
              onSuccess={() => setIsDialogOpen(false)}
            />
          </div>
        );
      },
      enablePinning: true,
    },
  ];
};
