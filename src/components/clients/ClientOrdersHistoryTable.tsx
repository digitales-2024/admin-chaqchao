"use client";

import { Order } from "@/types";
import { useMemo, useState } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { Card, CardContent } from "../ui/card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { ClientOrderDetails } from "./ClientOrderDetails";
import { ordersColumns } from "./ClientOrdersHistoryTableColumns";

export function OrdersTable({ data }: { data: Order[] }) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const columns = useMemo(() => ordersColumns(), []);

  const handleRowClick = (order: Order) => {
    setSelectedOrderId(order.id);
  };

  return (
    <div className="grid h-full flex-1 grid-cols-1 grid-rows-2 gap-4 overflow-hidden lg:grid-cols-2 lg:grid-rows-1">
      <DataTableExpanded
        data={data}
        columns={columns}
        placeholder="Buscar pedidos..."
        onClickRow={(row) => handleRowClick(row)}
      />

      {/* Detalles del pedido */}
      <ScrollArea className="h-full overflow-auto">
        <div className="h-full w-full">
          <Card>
            <CardContent>
              {selectedOrderId ? (
                <ClientOrderDetails orderId={selectedOrderId} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-center text-gray-500">
                    Seleccione un pedido para ver los detalles
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
