import { useOrders } from "@/hooks/use-orders";
import { Order } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Apple,
  Copy,
  CreditCard,
  Mail,
  MessageCircleMore,
  MoreVertical,
  PackageX,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetFooter, SheetTitle } from "../ui/sheet";
import { iconsStatus, statusColors, translateStatus } from "./kanban/OrderCard";

interface OrderSheetDetailsProps {
  order: Order | null;
  open: boolean;
  onOpenChange: () => void;
}

export const OrderSheetDetails = ({
  order,
  open,
  onOpenChange,
}: OrderSheetDetailsProps) => {
  const { orderById } = useOrders({
    id: order?.id,
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-full min-h-screen flex-col gap-5 sm:max-w-[36rem]">
        <ScrollArea className="h-fit">
          <SheetTitle className="flex flex-row flex-wrap-reverse items-start gap-2 bg-muted/50 py-4">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                <span className="font-thin uppercase text-slate-500">
                  Pedido#{" "}
                </span>
                <span className="truncate">{orderById?.pickupCode}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription className="text-xs font-thin">
                Fecha:{" "}
                <span>
                  {format(
                    orderById ? orderById?.pickupTime : new Date(),
                    "PPPp",
                    {
                      locale: es,
                    },
                  )}
                </span>
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Badge
                variant="outline"
                className={`${statusColors[order?.orderStatus as keyof typeof statusColors]} flex gap-2 font-light`}
              >
                {iconsStatus[order?.orderStatus as keyof typeof iconsStatus]}
                {
                  translateStatus[
                    order?.orderStatus as keyof typeof translateStatus
                  ]
                }
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="outline" className="h-8 w-8">
                    <MoreVertical className="h-3.5 w-3.5" />
                    <span className="sr-only">Mas</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Exportar</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Cancelar
                    <DropdownMenuShortcut>
                      <PackageX className="size-4" aria-hidden="true" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SheetTitle>
          <div className="flex-1 px-0 py-2 sm:px-6">
            <div className="grid gap-4">
              <div className="font-semibold">Detalles del pedido</div>
              <ul className="grid gap-3">
                {orderById?.cart.map((item) => (
                  <li
                    className="flex items-center justify-between"
                    key={item.id}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Avatar className="bg-slate-100">
                        <AvatarImage src={item.image} alt={item.name} />
                        <AvatarFallback>
                          <Apple />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">
                        {item.name} x{" "}
                        <span className="text-xs">{item.quantity}</span>
                      </span>
                    </div>
                    <span>S/.{item.price}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-xs font-extralight text-slate-400">
                    Subtotal
                  </span>
                  <span>
                    S/.
                    {orderById?.cart.reduce(
                      (acc, item) => acc + item.price * item.quantity,
                      0,
                    )}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-xs font-extralight text-slate-400">
                    Impuesto
                  </span>
                  <span>S/.00</span>
                </li>
                <li className="flex items-center justify-between font-semibold">
                  <span className="text-muted-foreground">Total</span>
                  <span>S/. 000</span>
                </li>
              </ul>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Información del cliente</div>
              <dl className="grid gap-3">
                <div className="flex flex-wrap items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Cliente</dt>
                  <dd className="capitalize">{orderById?.client.name}</dd>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <dt className="text-sm text-muted-foreground">
                    Correo electrónico
                  </dt>
                  <dd className="group/email">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover/email:opacity-100"
                    >
                      <span className="sr-only">Email client</span>
                      <a href="mailto:">
                        <Mail className="h-3 w-3" />
                      </a>
                    </Button>
                    {orderById?.client.email}
                  </dd>
                </div>
                <div className="flex flex-wrap items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Teléfono</dt>
                  <dd className="group/phone space-x-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover/phone:opacity-100"
                    >
                      <span className="sr-only">Phone client</span>
                      <a href="tel:">
                        <Phone className="h-3 w-3" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-6 w-6 opacity-0 transition-opacity group-hover/phone:opacity-100"
                    >
                      <span className="sr-only">Phone client</span>
                      <a
                        href={`https://wa.me/${orderById?.client.phone.replace(/\s+/g, "")}`}
                        target="_blank"
                      >
                        <MessageCircleMore className="h-3 w-3" />
                      </a>
                    </Button>
                    {orderById?.client.phone}
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className="my-4" />
            <div className="grid gap-3">
              <div className="font-semibold">Información de pago</div>
              <dl className="grid gap-3">
                <div className="flex flex-wrap items-center justify-between">
                  <dt className="flex items-center gap-1 text-muted-foreground">
                    <CreditCard className="h-4 w-4 flex-shrink-0" />
                    Visa
                  </dt>
                  <dd>**** **** **** 4532</dd>
                </div>
              </dl>
            </div>

            <SheetFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <div className="text-xs text-muted-foreground">
                {orderById?.updatedAt
                  ? format(orderById.updatedAt, "PPPp", { locale: es })
                  : "Fecha no disponible"}
              </div>
            </SheetFooter>
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
