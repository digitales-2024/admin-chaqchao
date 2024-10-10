"use client";

import { Order } from "@/types";
import { useMemo, useState } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
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
      <div className="order-1 lg:order-1">
        {/* Esto asegura que la tabla siempre esté arriba, incluso en móviles */}
        <DataTableExpanded
          data={data}
          columns={columns}
          placeholder="Buscar pedidos..."
          onClickRow={(row) => handleRowClick(row)}
        />
      </div>
      <div className="order-2 lg:order-2">
        {selectedOrderId ? (
          <ClientOrderDetails orderId={selectedOrderId} />
        ) : (
          <div className="max-h-[80vh] overflow-auto rounded-md bg-gray-50 p-4">
            <p className="text-center text-gray-500">
              Seleccione un pedido para ver los detalles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
