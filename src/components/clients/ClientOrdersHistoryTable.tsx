"use client";

import { useState } from "react";

import { DataTableExpanded } from "../data-table/DataTableExpanded";
import { ClientOrderDetails } from "./ClientOrderDetails";
import { useOrdersData } from "./ClientOrdersHistoryTableColumns";

interface OrdersTableProps {
  clientId: string;
}

export function OrdersTable({ clientId }: OrdersTableProps) {
  const [selectedOrderId] = useState<string | null>(null);
  const { columns, data } = useOrdersData(clientId);

  // // Manejar el clic en la fila
  // const handleRowClick = (orderId: string) => {
  //   setSelectedOrderId(orderId);
  //   console.log("Esto deberia funcionar");
  // };

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <DataTableExpanded
          data={data}
          columns={columns}
          placeholder="Buscar pedidos..."
        />
      </div>
      <div className="order-1 lg:order-2">
        {selectedOrderId ? (
          <ClientOrderDetails orderId={selectedOrderId} />
        ) : (
          <div className="rounded-md bg-gray-50 p-4">
            <p className="text-center text-gray-500">
              Seleccione un pedido para ver los detalles
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
