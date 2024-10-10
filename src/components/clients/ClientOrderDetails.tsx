"use client";

import { useOrders } from "@/hooks/use-orders";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { translateStatus } from "../orders/OrderSheetDetails";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";

interface ClientOrderDetailsProps {
  orderId: string;
}

export function ClientOrderDetails({ orderId }: ClientOrderDetailsProps) {
  const { orderById } = useOrders({
    id: orderId,
  });

  if (!orderById) {
    return (
      <div className="p-4 text-center text-gray-500">
        Cargando detalles del pedido...
      </div>
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
    <Card className="h-full max-h-[500px] overflow-hidden rounded-lg border shadow-lg">
      <CardHeader className="rounded-t-lg p-4">
        <CardTitle className="text-xl font-bold">Detalles del Pedido</CardTitle>
      </CardHeader>
      <CardContent className="h-full p-0">
        {/* Usamos ScrollArea de Radix para permitir el desplazamiento */}
        <ScrollArea className="h-[400px] max-h-[400px]">
          <div className="space-y-4 p-4">
            <div className="grid grid-cols-2 gap-4">
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
                    className="flex items-center justify-between rounded-md bg-gray-100 p-3 shadow-sm"
                  >
                    <div>
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="text-sm">Código: {product.id}</p>
                      <p className="text-sm">
                        Categoría: {product.category.name}
                      </p>
                      <p className="text-sm">
                        Precio: S/. {product.price.toFixed(2)} x{" "}
                        {product.quantity} unidades
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm">No hay productos en este pedido.</p>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
