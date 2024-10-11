"use client";

import { Order } from "@/types";
import { useMemo, useState } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { Card, CardContent } from "../ui/card";
import { ClientOrderDetails } from "./ClientOrderDetails";
import { ordersColumns } from "./ClientOrdersHistoryTableColumns";

export function OrdersTable({ data }: { data: Order[] }) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const columns = useMemo(() => ordersColumns(), []);

  const handleRowClick = (order: Order) => {
    setSelectedOrderId(order.id);
  };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {/* Tabla de pedidos */}

      <DataTableExpanded
        data={data}
        columns={columns}
        placeholder="Buscar pedidos..."
        onClickRow={(row) => handleRowClick(row)}
      />

      {/* Detalles del pedido */}
      <Card>
        <CardContent className="size-full">
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
  );
}
