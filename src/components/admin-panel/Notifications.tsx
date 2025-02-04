"use client";
import { socket } from "@/socket/socket";
import { Order } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Bell, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [newOrders, setNewOrders] = useState<Order[]>([]);
  const router = useRouter();

  socket.on("new-order", (order: Order) => {
    setNewOrders((prevOrders) => [...prevOrders, order]);
  });

  // Eliminar los duplicados
  const uniqueOrders = newOrders
    .filter(
      (order, index, self) =>
        index === self.findIndex((t) => t.id === order.id),
    )
    .reverse();

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
          {uniqueOrders.length > 0 && (
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-emerald-500">
              <span className="absolute right-0 top-0 h-2 w-2 animate-ping rounded-full bg-emerald-500" />
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between border-b px-4 py-2 font-semibold">
          <span>Notificaciones</span>
          <span className="text-xs text-muted-foreground">
            {uniqueOrders.length} nuevo
          </span>
        </div>
        <ScrollArea className="h-[300px]">
          {uniqueOrders.length > 0 &&
            uniqueOrders.map((order) => (
              <DropdownMenuItem
                key={order.id}
                className="flex-rows flex cursor-pointer items-start justify-start gap-2 px-4 py-2"
                onSelect={() => {
                  setIsOpen(false);
                  // Navegar a la página de pedidos
                  router.push(`/orders`);
                }}
              >
                <div className="rounded-full bg-emerald-100 p-2">
                  <ShoppingBag className="text-emerald-500" />
                </div>
                <div className="flex flex-col gap-2">
                  <span>
                    Nuevo pedido{" "}
                    <span className="truncate uppercase text-emerald-500">
                      # {order?.pickupCode}
                    </span>{" "}
                  </span>
                  <span className="text-xs capitalize">
                    {order?.client?.name || order.customerName}{" "}
                    {order?.client?.lastName || order.customerLastName} (
                    {order?.client?.phone || order.customerPhone})
                  </span>
                  <span className="flex flex-col items-start text-xs text-slate-500">
                    <Badge variant={"outline"} className="text-balance">
                      Fecha de recogida:{" "}
                    </Badge>
                    <span>
                      {format(order?.pickupTime || new Date(), "PPPp", {
                        locale: es,
                      })}
                    </span>
                  </span>{" "}
                </div>
              </DropdownMenuItem>
            ))}
          {uniqueOrders.length === 0 && (
            <div className="px-4 py-2 text-center text-sm text-muted-foreground">
              No hay nuevas notificaciones
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
