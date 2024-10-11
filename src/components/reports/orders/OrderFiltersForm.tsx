import { OrderStatus } from "@/types/orders";
import {
  Calendar as CalendarIcon,
  Tag,
  Bookmark,
  CheckSquare,
} from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePickerWithRange } from "../DatePickerWithRange";

interface OrderFiltersFormProps {
  orderDateRange: { from: string; to: string | undefined };
  setOrderDateRange: (value: { from: string; to: string | undefined }) => void;
  orderStatus: OrderStatus;
  setOrderStatus: (value: OrderStatus) => void;
  totalAmount: string;
  setTotalAmount: (value: string) => void;
  isActive: boolean;
  setIsOrderActive: (value: boolean) => void;
  isLoading: boolean;
  downloadReportPdf: () => void;
  downloadReportExcel: () => void;
}

export function OrderFiltersForm({
  orderDateRange,
  setOrderDateRange,
  orderStatus,
  setOrderStatus,
  totalAmount,
  setTotalAmount,
  isActive,
  setIsOrderActive,
  isLoading,
  downloadReportPdf,
  downloadReportExcel,
}: OrderFiltersFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros de Pedidos</CardTitle>
        <CardDescription>
          Personaliza tu reporte de pedidos con los siguientes filtros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="order-date-range">
              <CalendarIcon className="mr-2 inline h-4 w-4" />
              Rango de fechas
            </Label>
            <DatePickerWithRange
              value={orderDateRange}
              onChange={setOrderDateRange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="order-status">
              <Bookmark className="mr-2 inline h-4 w-4" />
              Estado de la orden
            </Label>
            <Select value={orderStatus} onValueChange={setOrderStatus}>
              <SelectTrigger id="order-status">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={OrderStatus.ALL}>Todos</SelectItem>
                <SelectItem value={OrderStatus.PENDING}>Pendiente</SelectItem>
                <SelectItem value={OrderStatus.CONFIRMED}>
                  Confirmado
                </SelectItem>
                <SelectItem value={OrderStatus.READY}>Listo</SelectItem>
                <SelectItem value={OrderStatus.COMPLETED}>
                  Completado
                </SelectItem>
                <SelectItem value={OrderStatus.CANCELLED}>Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="total-amount">
              <Tag className="mr-2 inline h-4 w-4" />
              Monto Total
            </Label>
            <Input
              id="total-amount"
              type="number"
              placeholder="Monto Total"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-active"
              checked={isActive}
              onCheckedChange={(value) => setIsOrderActive(Boolean(value))}
            />
            <Label htmlFor="is-active">
              <CheckSquare className="mr-2 inline h-4 w-4" />
              Activo
            </Label>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button
            onClick={downloadReportPdf}
            variant="outline"
            className="mr-2"
            disabled={isLoading}
          >
            Descargar PDF
          </Button>
          <Button
            onClick={downloadReportExcel}
            variant="outline"
            disabled={isLoading}
          >
            Descargar Excel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
