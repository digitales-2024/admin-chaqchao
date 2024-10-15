"use client";

import { GoogleIcon } from "@/assets/icons";
import { useProfile } from "@/hooks/use-profile";
import { Client } from "@/types";
import { type ColumnDef } from "@tanstack/react-table";
import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";
import { Ellipsis, Trash, RefreshCcwDot, History, Mail } from "lucide-react"; // Agrega RefreshCcwDot para la reactivación
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
import { ClientOrderHistoryDialog } from "./ClientOrderHistoryDialog";
import { DesactivateClientDialog } from "./DesactivateClientDialog";
import { ReactivateClientDialog } from "./ReactivateClientDialog"; // Asegúrate de importar el diálogo para reactivar
import { UpdateClientSheet } from "./UpdateClientSheet";

export const clientsColumns = (): ColumnDef<Client>[] => {
  return [
    {
      id: "nombre",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nombre" />
      ),
      cell: ({ row }) => (
        <div className="truncate capitalize">{row.getValue("nombre")}</div>
      ),
    },
    {
      id: "correo",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Correo" />
      ),
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("correo")}</div>
      ),
    },
    {
      id: "teléfono",
      accessorKey: "phone",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Teléfono" />
      ),
      cell: ({ row }) => (
        <div className="truncate">{row.getValue("teléfono")}</div>
      ),
    },
    {
      id: "fecha nacimiento",
      accessorKey: "birthDate",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fecha de nacimiento" />
      ),
      cell: ({ row }) => {
        return (
          <div>{format(row.original.birthDate, "PPP", { locale: es })}</div>
        );
      },
    },
    {
      id: "último acceso",
      accessorKey: "lastLogin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Último acceso" />
      ),
      cell: ({ row }) => {
        // Verificar si el valor es undefined
        if (row.original.lastLogin === undefined) {
          return <div>Sin datos</div>;
        }

        const parsedDate = parseISO(row.original.lastLogin);

        // Asegúrate de que parsedDate es un objeto Date válido
        if (isNaN(parsedDate.getTime())) {
          return <div>Sin datos</div>;
        }

        return <div>{format(parsedDate, "yyyy-MM-dd HH:mm:ss")}</div>;
      },
    },
    {
      id: "método acceso",
      accessorKey: "lastLoginMethod",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Método de acceso" />
      ),
      cell: ({ row }) => (
        <div className="">
          {!row.original.isGoogleAuth ? (
            <span className="inline-flex items-center gap-2 text-slate-400">
              <Mail /> Correo
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-slate-400">
              <GoogleIcon className="size-5" />
              Google
            </span>
          )}
        </div>
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
        const [showReactivateDialog, setShowReactivateDialog] = useState(false); // Añadido para manejar la reactivación
        const [isDialogOpen, setIsDialogOpen] = useState(false);
        const client = row.original;
        const { user } = useProfile();

        const [isOpenDialogHistory, setIsOpenDialogHistory] =
          useState<boolean>(false);

        return (
          <div>
            <UpdateClientSheet
              open={showEditDialog}
              onOpenChange={setShowEditDialog}
              client={client}
            />
            <ReactivateClientDialog // Diálogo para reactivar al cliente
              client={client}
              open={showReactivateDialog}
              onOpenChange={setShowReactivateDialog}
              onSuccess={() => {
                row.toggleSelected(false);
              }}
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
                <DropdownMenuItem onSelect={() => setIsOpenDialogHistory(true)}>
                  Ver historial de pedidos
                  <DropdownMenuShortcut>
                    <History className="size-4" aria-hidden="true" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {user?.isSuperAdmin && (
                  <DropdownMenuItem
                    onSelect={() => setShowReactivateDialog(true)}
                    disabled={row.original.isActive}
                  >
                    Reactivar
                    <DropdownMenuShortcut>
                      <RefreshCcwDot className="size-4" aria-hidden="true" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onSelect={() => setIsDialogOpen(true)}
                  disabled={!row.original.isActive}
                >
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
            {isOpenDialogHistory && (
              <ClientOrderHistoryDialog
                client={client}
                isOpen={isOpenDialogHistory}
                onOpenChange={setIsOpenDialogHistory}
              />
            )}
          </div>
        );
      },
      enablePinning: true,
    },
  ];
};
