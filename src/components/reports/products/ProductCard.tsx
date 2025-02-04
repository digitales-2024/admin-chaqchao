import { ProductData } from "@/types";
import { ImageOff, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: ProductData;
  categoryColors: { [key: string]: string };
  expandedProduct: string | null;
  toggleExpand: (productId: string) => void;
}

export const ProductCard = ({
  product,
  categoryColors,
  expandedProduct,
  toggleExpand,
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false); // Estado para manejar la expansión de la descripción

  useEffect(() => {
    setImageError(false);
  }, [product.image]);

  const handleDescriptionClick = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  return (
    <div key={product.id} className="mb-4 rounded-md border">
      <div
        className={`flex p-4 ${expandedProduct ? "items-start" : "items-center"}`}
      >
        {imageError ? (
          <div className="flex size-24 flex-col items-center justify-center rounded-lg bg-slate-100 text-center">
            <ImageOff className="h-10 w-10 text-slate-400" strokeWidth={1} />
            <span className="text-xs text-slate-400">Imagen no disponible</span>
          </div>
        ) : (
          <Image
            src={product.image}
            alt={product.name}
            width={144}
            height={144}
            className="h-24 w-24 rounded-lg object-cover"
            onError={() => setImageError(true)}
          />
        )}
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <div>
              <span className="text-lg font-medium capitalize">
                {product.name}
              </span>
            </div>
            <button onClick={() => toggleExpand(product.id)}>
              {expandedProduct === product.id ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>
          </div>
          <div className="flex items-center space-x-1 text-sm text-slate-500">
            <span>S/. {product.price.toFixed(2)}</span>
          </div>
          <div>
            <Badge
              variant="outline"
              className="capitalize"
              style={{ borderColor: categoryColors[product.category.name] }}
            >
              {product.category.name}
            </Badge>
          </div>

          {expandedProduct === product.id && (
            <div className="mt-2 flex flex-col space-y-1">
              {/* Descripción expandible */}
              <div className="flex items-center space-x-1 text-justify">
                <span
                  className={`text-sm text-slate-500 ${
                    isDescriptionExpanded ? "" : "line-clamp-2"
                  }`} // Aplica "line-clamp-2" si no está expandida
                  onClick={handleDescriptionClick} // Maneja el clic para expandir/colapsar
                  style={{ cursor: "pointer" }} // Aplica un cursor de puntero para indicar que es interactivo
                >
                  {product.description}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
