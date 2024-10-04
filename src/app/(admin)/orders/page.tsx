"use client";
import { useModeViewOrder } from "@/hooks/use-mode-view-order";
import { useOrders } from "@/hooks/use-orders";
import { useStore } from "@/hooks/use-store";
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
import { SwitchModeView } from "@/components/orders/SwitchModeView";
import { TableOrders } from "@/components/orders/TableOrders";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function PagerOrders() {
  const mode = useStore(useModeViewOrder, (state) => state);

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
      <HeaderPage title="Pedidos" />
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-0">
        <Label className="w-32">Filtros</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <FilterStatus
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterDate date={date} setDate={setDate} />
        </div>
      </div>
      <div className="flex items-center">
        <Label className="w-32">Modo de vista</Label>
        <SwitchModeView />
      </div>
      <Separator />
      {mode?.modeViewOrder === "table" && <TableOrders data={dataOrders} />}
      {mode?.modeViewOrder === "kanban" && <KanbanBoard data={dataOrders} />}
    </Shell>
  );
}
