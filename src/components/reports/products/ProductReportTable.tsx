import { ProductData } from "@/types";
import { Tag } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface ProductReportTableProps {
  reportData: ProductData[];
}

function getStatusIcon(
  isActive: boolean,
  isRestricted: boolean,
  isAvailable: boolean,
) {
  // Aquí puedes definir los íconos que deseas mostrar según el estado del producto
  if (isActive) {
    return <span className="text-green-500">Activo</span>;
  } else if (isRestricted) {
    return <span className="text-red-500">Restringido</span>;
  } else if (isAvailable) {
    return <span className="text-yellow-500">Disponible</span>;
  } else {
    return <span className="text-gray-500">Inactivo</span>;
  }
}

export function ProductReportTable({ reportData }: ProductReportTableProps) {
  return (
    <Card className="container mx-auto p-4">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">
          Reporte de Productos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reportData.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500} // Especifica el ancho de la imagen
                  height={300} // Especifica la altura de la imagen
                  className="h-48 w-full object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-2 flex items-start justify-between">
                  <CardTitle>{product.name}</CardTitle>
                  {getStatusIcon(
                    product.isActive,
                    product.isRestricted,
                    product.isAvailable,
                  )}
                </div>
                <CardDescription>{product.category.name}</CardDescription>
                <div className="mt-4 flex">
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1"
                  >
                    <Tag className="mr-1 h-3 w-3" />
                    <span>${product.price.toFixed(2)}</span>
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}