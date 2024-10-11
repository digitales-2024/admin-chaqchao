import {
  Calendar as CalendarIcon,
  ChartNoAxesCombined,
  Download,
  FileDown,
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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePickerWithRange } from "../DatePickerWithRange";

interface TopProductsFiltersFormProps {
  productDateRange: { from: string; to: string | undefined };
  setProductDateRange: (value: {
    from: string;
    to: string | undefined;
  }) => void;
  topValue: string;
  setTopValue: (value: string) => void;
  isLoading: boolean;
  downloadReportPdf: () => void;
  downloadReportExcel: () => void;
}

export function TopProductsFiltersForm({
  productDateRange,
  setProductDateRange,
  topValue,
  setTopValue,
  isLoading,
  downloadReportPdf,
  downloadReportExcel,
}: TopProductsFiltersFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filtros de Productos</CardTitle>
        <CardDescription>
          Personaliza tu reporte de productos con los siguientes filtros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="top-select">
              <ChartNoAxesCombined className="mr-2 inline h-4 w-4" />
              Productos a mostrar
            </Label>
            <Select value={topValue} onValueChange={setTopValue}>
              <SelectTrigger id="top-select">
                <SelectValue>
                  <span className="capitalize">
                    {topValue === "all" ? "Todas" : `Top ${topValue}`}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="10">Top 10</SelectItem>
                <SelectItem value="15">Top 15</SelectItem>
                <SelectItem value="20">Top 20</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="product-date-range">
              <CalendarIcon className="mr-2 inline h-4 w-4" />
              Rango de fechas
            </Label>
            <DatePickerWithRange
              value={productDateRange}
              onChange={setProductDateRange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <div>
          <Button
            onClick={downloadReportPdf}
            variant="secondary"
            className="my-4 mr-2 sm:my-0"
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
