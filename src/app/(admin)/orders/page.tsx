"use client";
import { useOrders } from "@/hooks/use-orders";
import { OrderStatus } from "@/types";
import { format } from "date-fns";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [activeTab, setActiveTab] = useState(tabs.table);

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

  const tabsData = [
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
        {/* filters */}
        <div className="inline-flex flex-wrap justify-end gap-2">
          <FilterStatus
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
          />
          <FilterDate date={date} setDate={setDate} />
        </div>
      </div>
      <Tabs
        defaultValue={tabs.table}
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList>
          {tabsData.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <tab.icon className="size-5" strokeWidth={1.5} />
                  </TooltipTrigger>
                  <TooltipContent>{tab.tooltip}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </TabsTrigger>
          ))}
        </TabsList>
        <Separator className="my-4" />
        <TabsContent value={tabs.table}>
          <TableOrders data={dataOrders} />
        </TabsContent>
        <TabsContent value={tabs.kanban}>
          <KanbanBoard data={dataOrders} />
        </TabsContent>
      </Tabs>
    </Shell>
  );
}
