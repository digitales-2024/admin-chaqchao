"use client";
import { socket } from "@/socket/socket";
import { Order } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
  const uniqueOrders = newOrders.filter(
    (order, index, self) => index === self.findIndex((t) => t.id === order.id),
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
          {uniqueOrders.length > 0 && (
            <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500" />
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
                className="flex flex-col items-start px-4 py-2"
                onSelect={() => {
                  setIsOpen(false);
                  // Navegar a la página de pedidos
                  router.push(`/orders`);
                }}
              >
                <span>
                  Nuevo pedido con código de retiro{" "}
                  <span className="truncate uppercase text-emerald-500">
                    {order?.pickupCode}
                  </span>{" "}
                  para el día{" "}
                  <span className="text-slate-500">
                    {format(order?.pickupTime || new Date(), "dd/MM/yyyy", {
                      locale: es,
                    })}
                  </span>{" "}
                  de <span className="capitalize">{order?.client?.name}</span>
                </span>
                {/* <span className="text-xs text-muted-foreground">
              {order.pickupTime}
            </span> */}
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
