import { ProductData } from "@/types";
import { generateColors } from "@/utils/generateColors";
import {
  ImageOff,
  ShieldMinus,
  ShieldAlert,
  PackageCheck,
  PackageX,
  CheckSquare,
  SquareX,
  Info,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, useMemo, ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ProductReportTableProps {
  reportData: ProductData[];
}

function StatusIcon({
  condition,
  positiveIcon,
  negativeIcon,
  label,
}: {
  condition: boolean;
  positiveIcon: React.ReactNode;
  negativeIcon: React.ReactNode;
  label: ReactNode;
}) {
  return (
    <div className="flex items-center space-x-1">
      {condition ? positiveIcon : negativeIcon}
      <span>{label}</span>
    </div>
  );
}

function ProductRow({
  product,
  categoryColors,
}: {
  product: ProductData;
  categoryColors: { [key: string]: string };
}) {
  const [imageError, setImageError] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [product.image]);

  const handleDescriptionClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <TableRow key={product.id} className="transition-colors">
      <TableCell className="flex w-full items-center justify-center justify-items-center">
        {imageError ? (
          <div className="flex size-24 flex-col items-center justify-center rounded-lg bg-slate-100 text-center">
            <ImageOff className="h-10 w-10 text-slate-400" strokeWidth={1} />
            <span className="text-xs text-slate-400">Imagen no disponible</span>
          </div>
        ) : (
          <div className="">
            <Image
              src={product.image}
              alt={product.name}
              width={144}
              height={144}
              className="h-24 w-24 rounded-lg object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        )}
      </TableCell>
      <TableCell className="w-64">
        <div className="space-y-2">
          <div>
            <span className="text-sm font-light">{product.name}</span>
          </div>
          <Badge
            variant="outline"
            className="capitalize"
            style={{ borderColor: categoryColors[product.category.name] }}
          >
            <span className="font-extralight">{product.category.name}</span>
          </Badge>
          <div className="flex items-center space-x-1 text-justify">
            <span
              className={`text-sm text-slate-500 ${isDescriptionExpanded ? "" : "line-clamp-2"}`}
              onClick={handleDescriptionClick}
              style={{ cursor: "pointer" }}
            >
              {product.description}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="w-20">
        <div className="flex justify-center space-x-1 text-center text-sm text-slate-500">
          <span className="mr-2 h-4 w-4 items-center text-slate-500">S/. </span>
          <span className="">{product.price.toFixed(2)}</span>
        </div>
      </TableCell>
      <TableCell className="w-28">
        <div className="flex flex-col space-y-2">
          <StatusIcon
            condition={product.isActive}
            positiveIcon={<CheckSquare className="h-4 w-4 text-emerald-500" />}
            negativeIcon={<SquareX className="h-4 w-4 text-red-500" />}
            label={
              <span
                className={
                  product.isActive ? "text-emerald-500" : "text-red-500"
                }
              >
                {product.isActive ? "Activo" : "Inactivo"}
              </span>
            }
          />
          <StatusIcon
            condition={product.isAvailable}
            positiveIcon={<PackageCheck className="h-4 w-4 text-emerald-500" />}
            negativeIcon={<PackageX className="h-4 w-4 text-red-500" />}
            label={
              <span
                className={
                  product.isAvailable ? "text-emerald-500" : "text-red-500"
                }
              >
                {product.isAvailable ? "Disponible" : "No disponible"}
              </span>
            }
          />
          <StatusIcon
            condition={!product.isRestricted}
            positiveIcon={<ShieldMinus className="h-4 w-4 text-orange-500" />}
            negativeIcon={<ShieldAlert className="h-4 w-4 text-slate-500" />}
            label={
              <span
                className={
                  !product.isRestricted ? "text-orange-500" : "text-slate-500"
                }
              >
                {!product.isRestricted ? "Sin restricciones" : "Restringido"}
              </span>
            }
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function ProductReportTable({ reportData }: ProductReportTableProps) {
  // Obtener categorías únicas
  const uniqueCategories = useMemo(() => {
    return Array.from(
      new Set(reportData.map((product) => product.category.name)),
    );
  }, [reportData]);

  // Generar colores basados en la cantidad de categorías únicas
  const colors = useMemo(
    () => generateColors(uniqueCategories.length),
    [uniqueCategories],
  );

  // Crear un objeto para mapear categorías a colores
  const categoryColors = useMemo(() => {
    const colorMap: { [key: string]: string } = {};
    uniqueCategories.forEach((category, index) => {
      colorMap[category] = colors[index];
    });
    return colorMap;
  }, [uniqueCategories, colors]);

  return (
    <Card className="container p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Reporte de Productos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {reportData.length === 0 ? (
            <Badge className="font-medium text-slate-400" variant="outline">
              <Info className="mr-2 size-3" aria-hidden="true" />
              No hay productos a mostrar
            </Badge>
          ) : (
            <Table className="table-fixed">
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="w-32 text-center">Imagen</TableHead>
                  <TableHead className="w-64 text-center">Producto</TableHead>
                  <TableHead className="w-20 text-center">Precio</TableHead>
                  <TableHead className="w-28 text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportData.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    categoryColors={categoryColors}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
