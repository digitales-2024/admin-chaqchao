import { OrderStatus } from "@/types/orders";
import {
  Calendar as CalendarIcon,
  Tag,
  Bookmark,
  FileDown,
  Download,
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
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div>
          <Button
            onClick={downloadReportPdf}
            variant="secondary"
            className="mr-2"
            disabled={isLoading}
          >
            <FileDown className="mr-2 inline h-4 w-4" />
            Descargar PDF
          </Button>
          <Button
            onClick={downloadReportExcel}
            variant="secondary"
            disabled={isLoading}
          >
            <Download className="mr-2 inline h-4 w-4" />
            Descargar Excel
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
