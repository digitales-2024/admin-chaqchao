import { useOrders } from "@/hooks/use-orders";
import { Order, OrderStatus } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Clock,
  PackageOpen,
  Copy,
  CreditCard,
  Mail,
  MessageCircleMore,
  MoreVertical,
  PackageCheck,
  PackageX,
  Phone,
  Truck,
} from "lucide-react";
import { useState } from "react";

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

import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "../ui/sheet";

export const statusColors: Record<Order["orderStatus"], string> = {
  CONFIRMED: "border-slate-300 text-slate-300",
  READY: "border-cyan-500 text-cyan-500",
  COMPLETED: "border-green-500 text-green-500",
  CANCELLED: "border-rose-500 text-rose-500",
};

export const iconsStatus: Record<Order["orderStatus"], React.ReactElement> = {
  CONFIRMED: <Clock size={15} />,
  READY: <PackageCheck size={15} />,
  COMPLETED: <Truck size={15} />,
  CANCELLED: <PackageX size={15} />,
};
export const translateStatus: Record<Order["orderStatus"], string> = {
  CONFIRMED: "Pendiente",
  READY: "Listo",
  COMPLETED: "Completado",
  CANCELLED: "Cancelado",
};
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

  const [isCopy, setIsCopy] = useState<boolean>(false);
  const handleCopyOrderID = () => {
    setIsCopy(true);
    navigator.clipboard.writeText(orderById?.pickupCode as string);
    setTimeout(() => {
      setIsCopy(false);
    }, 2000);
  };

  const { onOrderStatusUpdate, onDownloadPdf } = useOrders();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex h-full min-h-screen flex-col gap-5 sm:max-w-[36rem]">
        <ScrollArea className="h-fit">
          <SheetTitle className="flex flex-row flex-wrap-reverse items-start gap-2 bg-muted/50 py-4">
            <div className="grid gap-0.5">
              <CardTitle className="group relative flex w-fit items-center gap-2 text-lg">
                <span className="font-thin uppercase text-slate-500">
                  Pedido#{" "}
                </span>
                <span className="truncate">{orderById?.pickupCode}</span>
                <span
                  className={cn(
                    "absolute -top-3 right-0 rotate-12 truncate text-xs font-thin text-slate-400 transition-all duration-300",
                    {
                      "scale-0 opacity-0": !isCopy,
                      "scale-105 opacity-100": isCopy,
                    },
                  )}
                >
                  copiado
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={handleCopyOrderID}
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
                className={`${statusColors[orderById?.orderStatus as keyof typeof statusColors]} flex gap-2 font-light`}
              >
                {
                  iconsStatus[
                    orderById?.orderStatus as keyof typeof iconsStatus
                  ]
                }
                {
                  translateStatus[
                    orderById?.orderStatus as keyof typeof translateStatus
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
                  <DropdownMenuItem
                    onSelect={() =>
                      order?.id && onDownloadPdf(order.id, order.pickupCode)
                    }
                  >
                    Exportar
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="hover:cursor-pointer hover:text-rose-500"
                    onSelect={() =>
                      onOrderStatusUpdate(
                        orderById?.id as string,
                        OrderStatus.CANCELLED,
                      )
                    }
                  >
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
                {orderById?.cart.products.map((product) => (
                  <li
                    className="flex items-center justify-between"
                    key={product.id}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Avatar className="bg-slate-100">
                        <AvatarImage src={product.image} alt={product.name} />
                        <AvatarFallback>
                          <PackageOpen />
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-muted-foreground">
                        {product.name} x{" "}
                        <span className="text-xs">{product.quantity}</span>
                      </span>
                    </div>
                    <span>S/.{product.price}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-xs font-extralight text-slate-400">
                    Subtotal
                  </span>
                  <span>S/. 00</span>
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
                      <a href={`mailto: ${orderById?.client.email}`}>
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
                      <a href={`tel:${orderById?.client.phone}`}>
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
            <ScrollBar orientation="horizontal" />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
