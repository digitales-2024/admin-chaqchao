import { Order } from "@/types";
import { DraggableProvided } from "@hello-pangea/dnd";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import * as React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { iconsStatus, statusColors } from "../OrderSheetDetails";

type OrderItemProps = {
  order: Order;
  isDragging: boolean;
  provided: DraggableProvided;
  setOpenDetailsOrder: (value: boolean) => void;
  setSelectedOrder: (value: Order | null) => void;
};

function OrderItem({
  isDragging,
  provided,
  order,
  setOpenDetailsOrder,
  setSelectedOrder,
}: OrderItemProps) {
  const pickupDate = toZonedTime(new Date(order.pickupTime), "America/Lima");
  return (
    <li
      className="relative"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <Card
        className={cn(isDragging ? "bg-slate-50" : "")}
        onClick={() => {
          setOpenDetailsOrder(true);
          setSelectedOrder(order);
        }}
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
            <div>
              <Badge variant="outline" className="mr-2">
                Cliente:{" "}
              </Badge>
              <span className="font-light capitalize">{order.client.name}</span>
            </div>
            <div>
              <Badge variant="outline" className="mr-2">
                Fecha:{" "}
              </Badge>
              <span className="font-light capitalize">
                {formatInTimeZone(
                  pickupDate,
                  "America/Lima",
                  "EEEE, dd MMMM, hh:mm a",
                  {
                    locale: es,
                  },
                )}
              </span>
            </div>
          </div>
        </CardContent>
        <Separator className="my-4" />
        <CardFooter className="flex items-center justify-between font-bold">
          <span>Total</span>
          <span>
            S/. {order.totalAmount && Number(order.totalAmount).toFixed(2)}
          </span>
        </CardFooter>
      </Card>
    </li>
  );
}

export default React.memo<OrderItemProps>(OrderItem);
