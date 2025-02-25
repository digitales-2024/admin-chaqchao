import { OrderReportData } from "@/types/orders";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  Calendar,
  User,
  MapPin,
  ChevronUp,
  ChevronDown,
  Users,
  Info,
} from "lucide-react";
import React, { useState } from "react";

import {
  iconsStatus,
  statusColors,
  translateStatus,
} from "@/components/orders/OrderSheetDetails";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrderReportTableProps {
  reportData: OrderReportData[];
}

export function OrderReportTable({ reportData }: OrderReportTableProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <Card className="container mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reporte de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        {reportData.length === 0 ? (
          <Badge className="font-medium text-slate-400" variant="outline">
            <Info className="mr-2 size-3" aria-hidden="true" />
            No hay pedidos a mostrar
          </Badge>
        ) : (
          <div className="grid gap-6">
            {reportData.map((order, index) => (
              <Card className="overflow-hidden" key={index}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Pedido #{order.pickupCode}
                    </CardTitle>
                    <Badge
                      className={`${statusColors[order.orderStatus]} flex items-center space-x-1`}
                      variant="outline"
                    >
                      {iconsStatus[order.orderStatus]}
                      <span className="text-sm font-extralight">
                        {translateStatus[order.orderStatus]}
                      </span>
                    </Badge>
                  </div>
                  <CardDescription>
                    Creada el{" "}
                    {format(new Date(order.createdAt), "dd/MM/yyyy HH:mm")}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(
                          new Date(order.pickupTime),
                          "d 'de' MMMM 'de' yyyy, HH:mm",
                          { locale: es },
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Badge variant="outline" className="border-emerald-500">
                        <span className="mr-1 font-light">S/. </span>
                        <span className="font-light">
                          Total:{" "}
                          {order.totalAmount && order.totalAmount.toFixed(2)}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      {order.someonePickup ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}

                      <span>
                        {order.someonePickup
                          ? "Recogida por terceros"
                          : "Recogida personal"}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-start space-x-2 md:col-span-3">
                      <MapPin className="mt-1 h-4 w-4 text-muted-foreground" />
                      <span>{order.pickupAddress}</span>
                    </div>
                  </div>
                  {order.comments && (
                    <>
                      <div className="mt-2 flex justify-end">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleExpand(order.id)}
                            >
                              {expandedOrderId === order.id ? (
                                <>
                                  <ChevronUp className="mr-1 h-4 w-4" />
                                  Menos detalles
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="mr-1 h-4 w-4" />
                                  Más detalles
                                </>
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {expandedOrderId === order.id
                                ? "Ocultar detalles adicionales"
                                : "Ver detalles adicionales"}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      {expandedOrderId === order.id && (
                        <div className="mt-4 rounded-md bg-muted p-2">
                          <p className="text-sm italic">{order.comments}</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
