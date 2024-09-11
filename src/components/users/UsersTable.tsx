"use client";
"use memo";

import { User } from "@/types";
import { useMemo } from "react";

import { DataTable } from "../data-table/DataTable";
import { getColumns } from "./UsersTableColumns";
import { UsersTableToolbarActions } from "./UsersTableToolbarActions";

export function UsersTable({ data }: { data: User[] }) {
  const columns = useMemo(() => getColumns(), []);

  return (
    <DataTable
      data={data}
      columns={columns}
      toolbarActions={<UsersTableToolbarActions />}
    />
  );
}
