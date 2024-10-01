"use client";
import { useOrders } from "@/hooks/use-orders";

import { ErrorPage } from "@/components/common/ErrorPage";
import { HeaderPage } from "@/components/common/HeaderPage";
import { Shell } from "@/components/common/Shell";
import { DataTableSkeleton } from "@/components/data-table/DataTableSkeleton";
import { FilterDate } from "@/components/orders/FilterDate";
import { FilterStatus } from "@/components/orders/FilterStatus";
import { TableOrders } from "@/components/orders/TableOrders";

export default function PagerOrders() {
  const { dataOrders, isLoadingOrders } = useOrders();

  if (isLoadingOrders) {
    return (
      <Shell>
        <HeaderPage
          title="Roles"
          description="Aquí puedes ver la lista de roles registrados en la aplicación."
        />
        <DataTableSkeleton columnCount={5} searchableColumnCount={1} />
      </Shell>
    );
  }

  if (!dataOrders) {
    return (
      <Shell>
        <HeaderPage
          title="Roles"
          description="Aquí puedes ver la lista de roles registrados en la aplicación."
        />
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
          <FilterStatus />
          <FilterDate />
        </div>
      </div>
      <TableOrders data={dataOrders} />
    </Shell>
  );
}
