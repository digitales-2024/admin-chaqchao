import { TopProduct } from "@/types";
import { Circle, PackageCheck, Tag } from "lucide-react";
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
        <CardTitle className="text-2xl font-bold md:text-3xl">
          Reporte de Productos más vendidos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reportData.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative h-0 w-full pb-[50%]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
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
                    <span className="font-light">
                      ${product.price.toFixed(2)}
                    </span>
                  </Badge>
                </div>
                <div className="mt-4 flex">
                  <Badge
                    variant="secondary"
                    className="flex items-center space-x-1 text-sm md:text-base"
                  >
                    <PackageCheck className="mr-1 h-4 w-4" />
                    <span className="font-light">
                      {product.totalOrdered} vendidos
                    </span>
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
