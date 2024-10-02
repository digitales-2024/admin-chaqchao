"use client";
import { Order } from "@/types";
import { useMemo } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { getColumnsOrders } from "./OrdersTableColumns";

export const TableOrders = ({ data }: { data: Order[] }) => {
  const columns = useMemo(() => getColumnsOrders(), []);

  return (
    <DataTableExpanded
      columns={columns}
      data={data}
      placeholder="Buscar pedidos..."
      getSubRows={(row) => row.comments as unknown as []}
      // toolbarActions={<RolesTableToolbarActions />}
      renderExpandedRow={(row) => <ProductsExpanded data={row} />}
    />
  );
};

const ProductsExpanded = ({ data }: { data: Order }) => {
  return (
    <div>
      <p>{data.comments}</p>
    </div>
  );
};
