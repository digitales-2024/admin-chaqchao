"use client";
import { useOrders } from "@/hooks/use-orders";
import { OrderStatus } from "@/types";
import { format } from "date-fns";
import { useState } from "react";

import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { FilterDate } from "@/components/orders/FilterDate";
import { FilterStatus } from "@/components/orders/FilterStatus";
import { TableOrders } from "@/components/orders/TableOrders";

export default function PagerOrders() {
  const [date, setDate] = useState<Date>(new Date());
  const [filterStatus, setFilterStatus] = useState<OrderStatus>(
    OrderStatus.ALL,
  );
  const { dataOrders, isLoadingOrders } = useOrders(
    format(date, "yyyy-MM-dd"),
    filterStatus,
  );

  if (isLoadingOrders) {
    return (
      <Shell>
        <HeaderPage title="Pedidos" />
        <DataTableSkeleton columnCount={5} searchableColumnCount={1} />
      </Shell>
    );
  }

  if (!dataOrders) {
    return (
      <Shell>
        <HeaderPage title="Pedidos" />
        <ErrorPage />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="flex flex-wrap justify-between gap-4">
        <HeaderPage title="Pedidos" />
        {/* filter */}
        <div className="inline-flex flex-wrap justify-end gap-2">
          <FilterStatus
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterDate date={date} setDate={setDate} />
        </div>
      </div>
      <TableOrders data={dataOrders} />
    </Shell>
  );
}
