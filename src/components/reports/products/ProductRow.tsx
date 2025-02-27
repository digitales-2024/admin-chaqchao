import { ProductData } from "@/types";
import { ImageOff } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";
import { TableRow, TableCell } from "@/components/ui/table";

interface ProductRowProps {
  product: ProductData;
  categoryColors: { [key: string]: string };
}

export const ProductRow = ({ product, categoryColors }: ProductRowProps) => {
  const [imageError, setImageError] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    if (product.images.length <= 0) setImageError(false);
  }, [product.images]);

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
          <div>
            <Image
              src={product.images[0].url}
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
            <span className="text-sm font-light capitalize">
              {product.name}
            </span>
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
              className={`text-sm text-slate-500 ${
                isDescriptionExpanded ? "" : "line-clamp-2"
              }`}
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
    </TableRow>
  );
};
