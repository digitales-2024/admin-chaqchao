"use client";
import { Order } from "@/types";
import { useMemo, useState } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { OrderSheetDetails } from "./OrderSheetDetails";
import { getColumnsOrders } from "./OrdersTableColumns";

export const TableOrders = ({ data }: { data: Order[] }) => {
  const columns = useMemo(() => getColumnsOrders(), []);

  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
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
      <OrderSheetDetails
        order={selectedOrder}
        open={openDetailsOrder}
        onOpenChange={() => setOpenDetailsOrder(false)}
      />
    </>
  );
};
