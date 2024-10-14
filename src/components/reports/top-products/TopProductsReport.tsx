import { TopProduct } from "@/types";
import { Circle, PackageCheck, Tag, ImageOff, Info } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ProductReportTableProps {
  reportData: TopProduct[];
}

function getStatusIcon(isActive: boolean) {
  if (isActive) {
    return (
      <span className="flex items-center text-sm text-green-500 md:text-base">
        Activo
        <Circle className="ml-2 h-4 w-4" />
      </span>
    );
  } else {
    return (
      <span className="flex items-center text-sm text-red-500 md:text-base">
        Inactivo
        <Circle className="ml-2 h-4 w-4" />
      </span>
    );
  }
}

export function TopProductsReport({ reportData }: ProductReportTableProps) {
  return (
    <Card className="container p-4">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Reporte de Productos más vendidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        {reportData.length === 0 ? (
          <Badge className="font-medium text-slate-400" variant="outline">
            <Info className="mr-2 size-3" aria-hidden="true" />
            No hay productos a mostrar
          </Badge>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {reportData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function ProductCard({ product }: { product: TopProduct }) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [product.image]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-0 w-full bg-slate-100 pb-[70%]">
          {imageError ? (
            <div className="flex h-auto flex-col content-center items-center justify-center pt-[20%] text-center">
              <ImageOff className="h-14 w-14 text-slate-400" strokeWidth={1} />
              <span className="text-sm text-slate-400">
                Imagen no disponible
              </span>
            </div>
          ) : (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <CardTitle className="text-base capitalize md:text-lg">
            {product.name}
          </CardTitle>
          {getStatusIcon(product.isActive)}
        </div>
        <CardDescription className="text-sm capitalize md:text-base">
          {product.category.name}
        </CardDescription>
        <div className="mt-4 flex">
          <Badge
            variant="secondary"
            className="flex items-center space-x-1 text-sm md:text-base"
          >
            <Tag className="mr-1 h-4 w-4" />
            <span className="font-light">${product.price.toFixed(2)}</span>
          </Badge>
        </div>
        <div className="mt-4 flex">
          <Badge
            variant="secondary"
            className="flex items-center space-x-1 text-sm md:text-base"
          >
            <PackageCheck className="mr-1 h-4 w-4" />
            <span className="font-light">{product.totalOrdered} vendidos</span>
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
