import { useOrders } from "@/hooks/use-orders";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { DataTableSkeleton } from "../data-table/DataTableSkeleton";
import { translateStatus } from "../orders/OrderSheetDetails";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ClientOrderDetailsProps {
  orderId: string;
}

export function ClientOrderDetails({ orderId }: ClientOrderDetailsProps) {
  const { orderById } = useOrders({
    id: orderId,
  });

  if (!orderById) {
    // Si el pedido no ha sido cargado o no existe, muestra skeleton
    return (
      <DataTableSkeleton
        columnCount={5}
        rowCount={4}
        searchableColumnCount={2}
        filterableColumnCount={1}
        showViewOptions={true}
        cellWidths={["20%", "20%", "20%", "20%", "20%"]}
        withPagination={true}
      />
    );
  }

  let badgeClass = "bg-gray-100 text-gray-500";
  const statusText = translateStatus[orderById?.orderStatus] || "Desconocido";

  switch (orderById?.orderStatus) {
    case "PENDING":
      badgeClass = "bg-yellow-100 text-yellow-500";
      break;
    case "CONFIRMED":
      badgeClass = "bg-blue-100 text-blue-500";
      break;
    case "COMPLETED":
      badgeClass = "bg-green-100 text-green-500";
      break;
    case "READY":
      badgeClass = "bg-purple-100 text-purple-500";
      break;
    case "CANCELLED":
      badgeClass = "bg-red-100 text-red-500";
      break;
    default:
      badgeClass = "bg-gray-100 text-gray-500";
      break;
  }

  return (
    <Card className="max-h-[500px] w-full overflow-y-auto rounded-lg shadow-lg">
      <CardHeader className="rounded-t-lg bg-gradient-to-r">
        <CardTitle className="text-xl font-bold">Detalles del pedido</CardTitle>
      </CardHeader>
      <CardContent className="bg-white p-4">
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold">Estado:</p>
            <Badge variant="secondary" className={badgeClass}>
              {statusText}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-semibold">Código de recogida:</p>
            <p className="text-sm">{orderById?.pickupCode || "--"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Fecha de recogida:</p>
            <p className="text-sm">
              {orderById?.pickupTime
                ? format(new Date(orderById.pickupTime), "PPPp", {
                    locale: es,
                  })
                : "--"}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Dirección de recogida:</p>
            <p className="text-sm">{orderById?.pickupAddress || "--"}</p>
          </div>
        </div>

        <h4 className="mb-2 text-lg font-semibold">Productos:</h4>
        {orderById?.cart?.products?.length > 0 ? (
          <div className="space-y-4">
            {orderById.cart.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-md bg-gray-100 p-2 shadow-sm"
              >
                <div>
                  <p className="text-sm font-semibold">{product.name}</p>
                  <p className="text-sm">Código: {product.id}</p>
                  <p className="text-sm">Categoría: {product.category.name}</p>
                  <p className="text-sm">
                    Precio: S/. {product.price.toFixed(2)} x {product.quantity}{" "}
                    unidades
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm">No hay productos en este pedido.</p>
        )}
      </CardContent>
    </Card>
  );
}
