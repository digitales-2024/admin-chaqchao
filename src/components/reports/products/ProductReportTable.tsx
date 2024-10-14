import { ProductData } from "@/types";
import {
  DollarSign,
  ImageOff,
  ShieldMinus,
  ShieldAlert,
  PackageCheck,
  PackageX,
  CheckSquare,
  SquareX,
} from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect, ReactNode } from "react";

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

function ProductRow({ product }: { product: ProductData }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [product.image]);

  return (
    <TableRow key={product.id} className="transition-colors">
      <TableCell className="flex w-36 items-center justify-items-center">
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
          <div className="text-xl font-semibold">{product.name}</div>
          <Badge variant="secondary" className="text-sm">
            {product.category.name}
          </Badge>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
      </TableCell>
      <TableCell className="w-24">
        <div className="flex items-center space-x-1 text-sm text-slate-500">
          <DollarSign className="h-4 w-4 text-slate-500" strokeWidth={1} />
          <span>{product.price.toFixed(2)}</span>
        </div>
      </TableCell>
      <TableCell className="w-40">
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
  return (
    <Card className="container p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Reporte de Productos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="bg-muted">
                <TableHead className="w-36 text-center">Imagen</TableHead>
                <TableHead className="w-64 text-center">Producto</TableHead>
                <TableHead className="w-24 text-center">Precio</TableHead>
                <TableHead className="w-40 text-center">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((product) => (
                <ProductRow key={product.id} product={product} />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
