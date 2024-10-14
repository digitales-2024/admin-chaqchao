import { ProductData } from "@/types";
import { generateColors } from "@/utils/generateColors";
import { Info } from "lucide-react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";

import { ProductCard } from "./ProductCard";
import { ProductRow } from "./ProductRow";

interface ProductReportTableProps {
  reportData: ProductData[];
}

export const ProductReportTable = ({ reportData }: ProductReportTableProps) => {
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

  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  const toggleExpand = (productId: string) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

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
              <Info className="mr-2 h-4 w-4" aria-hidden="true" />
              No hay productos a mostrar
            </Badge>
          ) : (
            <div className="w-full">
              {/* Vista de escritorio */}
              <div className="hidden md:block">
                <Table className="table-fixed">
                  <TableHeader>
                    <TableRow className="bg-muted">
                      <TableHead className="w-32 text-center">Imagen</TableHead>
                      <TableHead className="w-64 text-center">
                        Producto
                      </TableHead>
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
              </div>
              {/* Vista móvil */}
              <div className="md:hidden">
                {reportData.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryColors={categoryColors}
                    expandedProduct={expandedProduct}
                    toggleExpand={toggleExpand}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
