"use client";

import { ProductData } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface ProductImageDialogProps {
  imageUrl: string;
  children: React.ReactNode;
  product: ProductData;
}

export function ProductImageDialog({
  imageUrl,
  children,
  product,
}: ProductImageDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl shadow-none">
        <div className="mx-auto flex flex-col p-6 sm:flex-row sm:items-start">
          {/* Sección de Imagen: Alineación a la izquierda */}
          <div className="flex w-full items-center justify-center sm:w-1/3 sm:justify-start">
            <Image
              src={imageUrl}
              alt={product.name}
              width={400}
              height={400}
              className="transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Sección de Información */}
          <div className="mt-6 sm:ml-6 sm:mt-0 sm:w-2/3">
            {/* Nombre del Producto */}
            <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>

            {/* Categoría */}
            <Badge variant="outline" className="mb-4 capitalize">
              {product.category.name}
            </Badge>

            {/* Descripción */}
            <p className="mb-4 text-gray-700">{product.description}</p>

            {/* Precio */}
            <div className="mb-4 text-2xl font-semibold text-emerald-600">
              {new Intl.NumberFormat("es-PE", {
                style: "currency",
                currency: "PEN",
              }).format(product.price)}
            </div>

            {/* Disponibilidad */}
            <div className="mb-4 flex items-center">
              {product.isAvailable ? (
                <>
                  <CheckCircle className="mr-2 text-emerald-500" />
                  <span className="text-emerald-500">Disponible</span>
                </>
              ) : (
                <>
                  <XCircle className="mr-2 text-red-500" />
                  <span className="text-red-500">No Disponible</span>
                </>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
