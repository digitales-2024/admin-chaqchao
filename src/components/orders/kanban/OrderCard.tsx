import { Order } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, PackageCheck, Truck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderCardProps {
  order: Order;
  isOverlay?: boolean;
  setSelectedOrder?: (order: Order) => void;
  setOpenDetailsOrder?: (open: boolean) => void;
}

export type OrderType = "Order";

export interface OrderDragData {
  type: OrderType;
  order: Order;
}
export const statusColors: Record<Order["orderStatus"], string> = {
  CONFIRMED: "border-slate-300 text-slate-300",
  READY: "border-cyan-500 text-cyan-500",
  COMPLETED: "border-green-500 text-green-500",
};

export const iconsStatus: Record<Order["orderStatus"], React.ReactElement> = {
  CONFIRMED: <Clock size={15} />,
  READY: <PackageCheck size={15} />,
  COMPLETED: <Truck size={15} />,
};
export const translateStatus: Record<Order["orderStatus"], string> = {
  CONFIRMED: "Pendiente",
  READY: "Listo",
  COMPLETED: "Completado",
};

export function OrderCard({
  order,
  isOverlay,
  setSelectedOrder,
  setOpenDetailsOrder,
}: OrderCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: order.id,
    data: {
      type: "Order",
      order,
    } satisfies OrderDragData,
    attributes: {
      roleDescription: "Order",
    },
  });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("mx-auto w-full max-w-[374px]", {
    variants: {
      dragging: {
        over: "ring-2 opacity-30",
        overlay: "ring-2 ring-primary",
      },
    },
  });

  return (
    <div
      {...attributes}
      {...listeners}
      className="m-0 h-full min-w-[370px] cursor-grab p-0"
      onClick={() => {
        setSelectedOrder?.(order);
        setOpenDetailsOrder?.(true);
      }}
    >
      <span className="sr-only">Move order</span>
      <Card
        ref={setNodeRef}
        style={style}
        className={variants({
          dragging: isOverlay ? "overlay" : isDragging ? "over" : undefined,
        })}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            PEDIDO #{order.pickupCode}
          </CardTitle>
          <Badge
            variant="outline"
            className={`${statusColors[order.orderStatus as keyof typeof statusColors]} p-2`}
          >
            {iconsStatus[order.orderStatus]}
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <p>
              <Badge variant="outline" className="mr-2">
                Cliente:{" "}
              </Badge>
              <span className="font-light capitalize">{order.client.name}</span>
            </p>
            <p>
              <Badge variant="outline" className="mr-2">
                Fecha:{" "}
              </Badge>
              <span className="font-light">
                {format(order.pickupTime, "PPPp", { locale: es })}
              </span>
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center justify-between font-bold">
            <span>Total</span>
            <span>S/. {order.totalAmount}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
