import { ClaimDetails } from "@/types/claim";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar } from "lucide-react";

import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";

const assetTypeTranslations: Record<string, string> = {
  PRODUCT: "PRODUCTO",
  SERVICE: "SERVICIO",
};

export const claimsTableColumns = (): ColumnDef<ClaimDetails>[] => [
  {
    id: "dateClaim",
    accessorKey: "dateClaim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fecha" />
    ),
    cell: ({ row }) => {
      const dateValue = new Date(row.getValue("dateClaim"));
      return (
        <div className="flex items-center">
          <Calendar className="mr-2 h-4 w-4" />
          <div className="min-w-40 truncate capitalize">
            {dateValue.toLocaleDateString("es-ES", {
              timeZone: "UTC",
            })}
          </div>
        </div>
      );
    },
  },
  {
    id: "claimantName",
    accessorKey: "claimantName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nombre del Reclamante" />
    ),
    cell: ({ row }) => (
      <div className="min-w-40 truncate lowercase">
        {row.getValue("claimantName")}
      </div>
    ),
  },
  {
    id: "claimantPhone",
    accessorKey: "claimantPhone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Teléfono" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("claimantPhone")}</div>
    ),
  },
  {
    id: "claimantEmail",
    accessorKey: "claimantEmail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Correo Electrónico" />
    ),
    cell: ({ row }) => (
      <div className="truncate">{row.getValue("claimantEmail")}</div>
    ),
  },
  {
    id: "assetType",
    accessorKey: "assetType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo de Bien" />
    ),
    cell: ({ row }) => {
      const assetType = row.getValue("assetType") as string;
      return (
        <div className="truncate">
          {assetTypeTranslations[assetType] || assetType}
        </div>
      );
    },
  },
];
