import { OrderReportData, OrderStatus } from "@/types/orders";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { motion } from "framer-motion";
import {
  Calendar,
  DollarSign,
  User,
  MapPin,
  CheckSquare,
  ChevronUp,
  ChevronDown,
  Users,
} from "lucide-react";
import React, { useState } from "react";

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
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface OrderReportTableProps {
  reportData: OrderReportData[];
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.READY:
      return "bg-green-500";
    case OrderStatus.CONFIRMED:
      return "bg-blue-500";
    case OrderStatus.PENDING:
      return "bg-yellow-500";
    case OrderStatus.COMPLETED:
      return "bg-gray-500";
    case OrderStatus.CANCELLED:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

const getStatusIcon = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.READY:
      return <CheckSquare className="h-4 w-4" />;
    case OrderStatus.CONFIRMED:
      return <CheckSquare className="h-4 w-4" />;
    case OrderStatus.PENDING:
      return <CheckSquare className="h-4 w-4" />;
    case OrderStatus.COMPLETED:
      return <CheckSquare className="h-4 w-4" />;
    case OrderStatus.CANCELLED:
      return <CheckSquare className="h-4 w-4" />;
    default:
      return <CheckSquare className="h-4 w-4" />;
  }
};

const getStatusLabel = (status: OrderStatus) => {
  switch (status) {
    case OrderStatus.READY:
      return "Listo";
    case OrderStatus.CONFIRMED:
      return "Confirmado";
    case OrderStatus.PENDING:
      return "Pendiente";
    case OrderStatus.COMPLETED:
      return "Completado";
    case OrderStatus.CANCELLED:
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

export function OrderReportTable({ reportData }: OrderReportTableProps) {
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <Card className="container mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Reporte de Pedidos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          {reportData.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      Pedido #{order.pickupCode}
                    </CardTitle>
                    <Badge
                      className={`${getStatusColor(order.orderStatus as OrderStatus)} flex items-center space-x-1`}
                    >
                      {getStatusIcon(order.orderStatus as OrderStatus)}
                      <span className="text-sm font-extralight">
                        {getStatusLabel(order.orderStatus as OrderStatus)}
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
                        <DollarSign className="h-4 w-4" strokeWidth={1} />
                        <span className="font-light">
                          Total: {order.totalAmount.toFixed(2)}
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
                        <TooltipProvider>
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
                        </TooltipProvider>
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
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
