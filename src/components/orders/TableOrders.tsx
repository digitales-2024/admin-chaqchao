"use client";
import { Order } from "@/types";
import { useMemo } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { getColumnsOrders } from "./OrdersTableColumns";

interface TableOrdersProps {
  data: Order[];
  setOpenDetailsOrder: (value: boolean) => void;
  setSelectedOrder: (value: Order | null) => void;
}

export const TableOrders = ({
  data,
  setOpenDetailsOrder,
  setSelectedOrder,
}: TableOrdersProps) => {
  const columns = useMemo(() => getColumnsOrders(), []);

  return (
    <>
      <DataTableExpanded
        columns={columns}
        data={data}
        placeholder="Buscar pedidos..."
        onClickRow={(row) => {
          setOpenDetailsOrder(true);
          setSelectedOrder(row);
        }}
      />
    </>
  );
};
