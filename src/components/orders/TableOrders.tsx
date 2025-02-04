"use client";
import { socket } from "@/socket/socket";
import { Order } from "@/types";
import { useMemo, useState } from "react";

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
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  socket.on("new-order", (order: Order) => {
    setNewOrders((prevOrders) => [...prevOrders, order]);
  });
  const columns = useMemo(() => getColumnsOrders(newOrders), [newOrders]);

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
