import { useOrders } from "@/hooks/use-orders";
import { format } from "date-fns";
import { es } from "date-fns/locale";

import { translateStatus } from "../orders/OrderSheetDetails";
import { Badge } from "../ui/badge";

interface ClientOrderDetailsProps {
  orderId: string;
  comments?: string; //Recupero los comentarios
}

export function ClientOrderDetails({ orderId }: ClientOrderDetailsProps) {
  const { orderById } = useOrders({
    id: orderId,
  });

  if (!orderById) {
    // Si el pedido no ha sido cargado o no existe
    return <p>Cargando detalles del pedido...</p>;
  }
  let badgeClass = "bg-gray-100 text-gray-500";
  //para poder traducir y usar estilos a la vez en los estados
  const statusText = translateStatus[orderById?.orderStatus] || "Desconocido";

  // Aquí hacemos el switch sobre el estado del pedido
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
    <div className="rounded-md bg-gray-50 p-4">
      <h4 className="mb-2 font-semibold">
        Detalles del pedido: {orderById?.pickupCode || "--"}
      </h4>
      <p className="mb-2 text-sm">
        Estado:{" "}
        <div className="cursor-pointer">
          <Badge variant="secondary" className={badgeClass}>
            {statusText}
          </Badge>
        </div>
      </p>
      <p className="mb-2 text-sm">
        Fecha de recogida:{" "}
        {orderById?.pickupTime
          ? format(new Date(orderById.pickupTime), "PPPp", {
              locale: es,
            })
          : "--"}
      </p>
      <p className="mb-2 text-sm">
        Dirección de recogida: {orderById?.pickupAddress || "--"}
      </p>

      <h4 className="mb-2 font-semibold">Productos:</h4>
      {orderById?.cart?.products?.length > 0 ? (
        <ul className="mb-4">
          {orderById.cart.products.map((product) => (
            <li key={product.id} className="mb-2 flex">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm">Categoría: {product.category.name}</p>
                <p className="text-sm">
                  Precio: S/ {product.price.toFixed(2)} x {product.quantity}{" "}
                  unidades
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4 text-sm">No hay productos en este pedido.</p>
      )}
    </div>
  );
}
