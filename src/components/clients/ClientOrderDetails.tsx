"use client";

import { useOrders } from "@/hooks/use-orders";
import { AvatarImage } from "@radix-ui/react-avatar";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Coffee } from "lucide-react";

import { statusColors, translateStatus } from "../orders/OrderSheetDetails";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface ClientOrderDetailsProps {
  orderId: string;
}

export function ClientOrderDetails({ orderId }: ClientOrderDetailsProps) {
  const { orderById } = useOrders({
    id: orderId,
  });

  if (!orderById) {
    return (
      <div className="p-10 text-center text-gray-500">
        <Skeleton className="flex h-fit min-h-[400px] flex-col gap-4" />
      </div>
    );
  }

  return (
    <Card className="h-full border-none shadow-none">
      <CardHeader className="rounded-t-lg p-4">
        <CardTitle className="text-xl font-light uppercase">
          Pedido # {orderById?.pickupCode}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="flex h-fit min-h-[400px] flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-slate-500">
              Fecha pedido
              <span className="text-sm font-semibold text-black">
                {format(orderById.pickupTime, "PPPp", { locale: es })}
              </span>
            </div>
            <div className="flex justify-between text-slate-500">
              Estado
              <Badge
                variant="outline"
                className={`text-sm font-semibold uppercase ${
                  statusColors[orderById.orderStatus]
                }`}
              >
                {translateStatus[orderById.orderStatus]}
              </Badge>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h4 className="font-semibold">Información del Cliente</h4>
            <div className="flex justify-between text-sm text-slate-500">
              Nombre:
              <span className="capitalize">{orderById.client.name}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              Email:
              <span className="">{orderById.client.email}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-500">
              Teléfono:
              <span className="">{orderById.client.phone}</span>
            </div>
          </div>
          <Separator className="my-4" />
          <Table>
            <TableHeader>
              <TableHead></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio/U</TableHead>
              <TableHead>Precio Total</TableHead>
            </TableHeader>
            <TableBody>
              {orderById.cart.products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Avatar className="rounded-lg">
                      <AvatarImage src={product.image} />
                      <AvatarFallback>
                        <Coffee />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>
                    <span className="text-xs text-slate-400">x</span>{" "}
                    {product.quantity}
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-500">S/.</span>
                    {product.price}
                  </TableCell>
                  <TableCell>
                    <span className="text-slate-500">S/.</span>
                    {product.price * product.quantity}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableCell colSpan={orderById.cart.products.length + 1}>
                Total
              </TableCell>
              <TableCell colSpan={orderById.cart.products.length}>
                <span className="text-slate-500">S/.</span>
                {orderById.cart.products.reduce(
                  (ac, va) => ac + va.quantity * va.price,
                  0,
                )}
              </TableCell>
            </TableFooter>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
