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
      <div className="flex flex-col gap-2 p-10 text-center text-gray-500">
        <Skeleton className="flex h-6" />
        <Skeleton className="flex h-5" />
        <Skeleton className="flex h-5" />
        <Separator className="my-4" />
        <Skeleton className="flex h-5" />
        <Skeleton className="flex h-5" />
        <Skeleton className="flex h-5" />
      </div>
    );
  }

  return (
    <Card className="h-full border-none p-0 shadow-none md:p-2">
      <CardHeader className="rounded-t-lg p-4">
        <CardTitle className="text-xl font-light uppercase">
          Pedido # {orderById?.pickupCode}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between text-slate-500 sm:flex-row">
            Fecha pedido
            <span className="text-sm font-semibold text-black">
              {format(orderById.pickupTime, "PPPp", { locale: es })}
            </span>
          </div>
          <div className="flex flex-col items-start text-slate-500 sm:flex-row md:justify-between">
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
          <div className="flex flex-col justify-between text-sm text-slate-500 sm:flex-row">
            Nombre:
            <span className="capitalize text-slate-900">
              {orderById.client.name}
            </span>
          </div>
          <div className="flex flex-col justify-between text-sm text-slate-500 sm:flex-row">
            Email:
            <span className="text-slate-900">{orderById.client.email}</span>
          </div>
          <div className="flex flex-col justify-between text-sm text-slate-500 sm:flex-row">
            Teléfono:
            <span className="text-slate-900">{orderById.client.phone}</span>
          </div>
        </div>
        <Separator className="my-4" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Precio/U</TableHead>
              <TableHead>Precio Total</TableHead>
            </TableRow>
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
                  <span className="text-xs text-slate-400">x</span>
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
            <TableRow>
              <TableCell colSpan={4} className="text-right">
                Total
              </TableCell>
              <TableCell>
                <span className="text-slate-500">S/.</span>
                {orderById.cart.products.reduce(
                  (ac, va) => ac + va.quantity * va.price,
                  0,
                )}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
