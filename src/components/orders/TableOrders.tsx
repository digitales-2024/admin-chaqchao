"use client";
import { Order } from "@/types";
import { useMemo, useState } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { OrderSheetDetails } from "./OrderSheetDetails";
import { getColumnsOrders } from "./OrdersTableColumns";

export const TableOrders = ({ data }: { data: Order[] }) => {
  const columns = useMemo(() => getColumnsOrders(), []);

  const [openDetailsOrder, setOpenDetailsOrder] = useState(false);

  return (
    <>
      <DataTableExpanded
        columns={columns}
        data={data}
        placeholder="Buscar pedidos..."
        getSubRows={(row) => row.comments as unknown as []}
        onClickRow={() => setOpenDetailsOrder(true)}
      />
      <OrderSheetDetails
        open={openDetailsOrder}
        onOpenChange={() => setOpenDetailsOrder(false)}
      />
    </>
  );
};
