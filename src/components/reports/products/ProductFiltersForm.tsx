import { Category } from "@/types";
import {
  Calendar as CalendarIcon,
  Search,
  Tag,
  Bookmark,
  CheckSquare,
  XSquare,
  Archive,
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

interface ProductFiltersFormProps {
  productName: string;
  setProductName: (value: string) => void;
  productDateRange: { from: string; to: string | undefined };
  setProductDateRange: (value: {
    from: string;
    to: string | undefined;
  }) => void;
  priceMin: string;
  setPriceMin: (value: string) => void;
  priceMax: string;
  setPriceMax: (value: string) => void;
  isActive: boolean;
  setIsProductActive: (value: boolean) => void;
  isRestricted: boolean;
  setIsRestricted: (value: boolean) => void;
  isAvailable: boolean;
  setIsAvailable: (value: boolean) => void;
  categoryName: string;
  setCategoryName: (value: string) => void;
  categoriesData: Category[];
  isLoadingCategories: boolean;
  downloadReportPdf: () => void;
  downloadReportExcel: () => void;
  isLoading: boolean;
}

export function ProductFiltersForm({
  productName,
  setProductName,
  productDateRange,
  setProductDateRange,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  isActive,
  setIsProductActive,
  isRestricted,
  setIsRestricted,
  isAvailable,
  setIsAvailable,
  categoryName,
  setCategoryName,
  categoriesData,
  isLoadingCategories,
  downloadReportPdf,
  downloadReportExcel,
  isLoading,
}: ProductFiltersFormProps) {
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
            <Label htmlFor="product-name">
              <Search className="mr-2 inline h-4 w-4" />
              Nombre del producto
            </Label>
            <Input
              id="product-name"
              placeholder="Buscar por nombre"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
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
          <div className="grid gap-2">
            <Label htmlFor="price-range">
              <Tag className="mr-2 inline h-4 w-4" />
              Rango de precios
            </Label>
            <div className="flex space-x-2">
              <Input
                id="price-min"
                type="number"
                placeholder="Min"
                value={priceMin}
                onChange={(e) => setPriceMin(e.target.value)}
              />
              <Input
                id="price-max"
                type="number"
                placeholder="Max"
                value={priceMax}
                onChange={(e) => setPriceMax(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-active"
              checked={isActive}
              onCheckedChange={(value) => setIsProductActive(Boolean(value))}
            />
            <Label htmlFor="is-active">
              <CheckSquare className="mr-2 inline h-4 w-4" />
              Activo
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-restricted"
              checked={isRestricted}
              onCheckedChange={(value) => setIsRestricted(Boolean(value))}
            />
            <Label htmlFor="is-restricted">
              <XSquare className="mr-2 inline h-4 w-4" />
              Restringido
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="is-available"
              checked={isAvailable}
              onCheckedChange={(value) => setIsAvailable(Boolean(value))}
            />
            <Label htmlFor="is-available">
              <Archive className="mr-2 inline h-4 w-4" />
              Disponible
            </Label>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category-name">
              <Bookmark className="mr-2 inline h-4 w-4" />
              Categoría
            </Label>
            <Select value={categoryName} onValueChange={setCategoryName}>
              <SelectTrigger id="category-name">
                <SelectValue>
                  <span className="capitalize">
                    {categoryName === "all" ? "Todas" : categoryName}
                  </span>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {isLoadingCategories ? (
                  <SelectItem value="loading" disabled>
                    Cargando categorías...
                  </SelectItem>
                ) : (
                  categoriesData?.map((category) => (
                    <SelectItem
                      className="capitalize"
                      key={category.id}
                      value={category.name}
                    >
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
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
