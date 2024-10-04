"use client";
import { useOrders } from "@/hooks/use-orders";
import { OrderStatus } from "@/types";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { BetweenVerticalStart, TableProperties } from "lucide-react";
import { useState } from "react";

import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { FilterDate } from "@/components/orders/FilterDate";
import { FilterStatus } from "@/components/orders/FilterStatus";
import { KanbanBoard } from "@/components/orders/kanban/KanbanBoard";
import { TableOrders } from "@/components/orders/TableOrders";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const tabs = {
  table: "Tabla",
  kanban: "Kanban",
};

export default function PagerOrders() {
  const [date, setDate] = useState<Date>(new Date());
  const [filterStatus, setFilterStatus] = useState<OrderStatus>(
    OrderStatus.ALL,
  );
  const { dataOrders, isLoadingOrders } = useOrders(
    format(date, "yyyy-MM-dd"),
    filterStatus,
  );
  const [activeView, setActiveView] = useState(tabs.table);

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

  const viewData = [
    {
      id: tabs.table,
      icon: TableProperties,
      tooltip: "Ver pedidos en formato de tabla",
    },
    {
      id: tabs.kanban,
      icon: BetweenVerticalStart,
      tooltip: "Ver pedidos en formato de kanban",
    },
  ];

  return (
    <Shell>
      <div className="flex flex-wrap justify-between gap-4">
        <HeaderPage title="Pedidos" />
        <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-2">
          <FilterStatus
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterDate date={date} setDate={setDate} />
        </div>
      </div>
      <div className="flex justify-end">
        <div className="flex w-fit space-x-1 rounded-xl bg-secondary p-1">
          {viewData.map(({ id, icon: Icon, tooltip }) => (
            <Button
              key={id}
              variant="ghost"
              className={`${
                activeView === id
                  ? "text-slate-500"
                  : "text-muted-foreground hover:text-primary"
              } relative z-10 flex items-center justify-center rounded-lg px-[10px] text-sm font-medium transition focus-visible:outline-2`}
              onClick={() => setActiveView(id)}
            >
              <span className="sr-only">view</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Icon className="size-5" strokeWidth={1.5} />
                  </TooltipTrigger>
                  <TooltipContent>{tooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {activeView === id && (
                <motion.span
                  layoutId="bubble"
                  className="absolute inset-0 -z-10 bg-white"
                  style={{ borderRadius: 8 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Button>
          ))}
        </div>
      </div>
      <Separator />
      {activeView === tabs.table && <TableOrders data={dataOrders} />}
      {activeView === tabs.kanban && <KanbanBoard data={dataOrders} />}
    </Shell>
  );
}
