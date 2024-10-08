"use client";
import { useViewModeStore } from "@/hooks/use-mode-view-order";
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
import { KanbanBoard } from "@/components/orders/kanban/KanbanBoard";
import SwitchModeView from "@/components/orders/SwitchModeView";
import { TableOrders } from "@/components/orders/TableOrders";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PagerOrders() {
  const { viewMode } = useViewModeStore();
  const [date, setDate] = useState<Date>(new Date());
  const [filterStatus, setFilterStatus] = useState<OrderStatus>(
    OrderStatus.ALL,
  );
  const { dataOrders, isLoadingOrders } = useOrders({
    dateFilter: format(date, "yyyy-MM-dd"),
    status: filterStatus,
  });

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
      <div className="flex items-center justify-between">
        <HeaderPage title="Pedidos" />
        <SwitchModeView />
      </div>
      <div className="flex flex-col items-end justify-between gap-2 md:flex-row md:items-center">
        <p className="flex gap-2 text-sm font-extralight text-slate-400">
          <span>Total</span>
          {dataOrders.length || 0}
        </p>
        <div className="flex w-full flex-col justify-end gap-2 md:flex-row md:items-center md:gap-2">
          <Label>Filtros</Label>
          <FilterStatus
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterDate date={date ?? new Date()} setDate={setDate} />
        </div>
      </div>
      <Separator />
      {viewMode === "table" && <TableOrders data={dataOrders} />}
      {viewMode === "kanban" && <KanbanBoard data={dataOrders} />}
      {/* <KanbanBoard data={dataOrders} /> */}
    </Shell>
  );
}
