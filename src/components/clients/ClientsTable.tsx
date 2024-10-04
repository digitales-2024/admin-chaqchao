"use client";
"use memo";

import { Client } from "@/types";

import { DataTable } from "../data-table/DataTable";
import { clientsColumns } from "./ClientsTableColumns";
import { ClientsTableToolbarActions } from "./ClientsTableToolbarActions";

export function ClientsTable({ data }: { data: Client[] }) {
  const columns = clientsColumns();

  return (
    <DataTable
      data={data}
      columns={columns}
      toolbarActions={<ClientsTableToolbarActions />}
      placeholder="Buscar clientes..."
    />
  );
}
