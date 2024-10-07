import { Order } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Clock,
  Mail,
  MessageCircleMore,
  PackageCheck,
  Phone,
  Truck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  console.log("🚀 ~ setSelectedOrder:", setSelectedOrder);
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
          <div className="mb-4 text-sm text-muted-foreground">
            Fecha: {format(order.pickupTime, "PPPp", { locale: es })}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2">
            <h3 className="font-semibold">Datos del cliente</h3>
            <p className="text-balance capitalize">{order.clientName}</p>
            <p className="text-sm text-muted-foreground">{order.clientPhone}</p>
            <p className="text-sm text-muted-foreground">{order.clientEmail}</p>
          </div>
          <div className="mt-4 flex justify-between space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                (window.location.href = `tel:${order.clientPhone}`)
              }
            >
              <Phone className="h-4 w-4" />
              <span className="sr-only">Llamar</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                (window.location.href = `mailto:${order.clientEmail}`)
              }
            >
              <Mail className="h-4 w-4" />
              <span className="sr-only">Enviar correo</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                window.open(
                  `https://wa.me/${order.clientPhone.replace(/\s+/g, "")}`,
                  "_blank",
                )
              }
            >
              <MessageCircleMore className="h-4 w-4" />
              <span className="sr-only">Enviar WhatsApp</span>
            </Button>
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
