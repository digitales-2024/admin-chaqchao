"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ProductData } from "@/types";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"; // Asegúrate de importar correctamente el Drawer

interface ProductImageDialogProps {
  imageUrl: string;
  children: React.ReactNode;
  product: ProductData;
  color: string;
}

export function ProductImageDialog({
  imageUrl,
  children,
  product,
  color,
}: ProductImageDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const content = (
    <div className="mt-0 flex flex-col sm:mt-6 lg:mt-0 lg:flex-row">
      {/* Sección de Imagen: Alineación a la izquierda */}
      <div className="flex w-full sm:justify-start">
        <Image
          src={imageUrl}
          alt={product.name}
          width={400}
          height={400}
          className="transform rounded-md object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Sección de Información */}
      <div className="mt-6 sm:ml-6 sm:w-2/3">
        {/* Nombre del Producto */}
        <h1 className="mb-2 text-2xl font-bold">{product.name}</h1>

        {/* Categoría */}
        <Badge
          variant="default"
          className="mb-4 capitalize"
          style={{ backgroundColor: color }}
        >
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
  );

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        <DialogContent className="max-w-md shadow-none lg:max-w-3xl">
          {content}
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="flex flex-col items-center justify-center">
        <DrawerHeader>
          <DrawerTitle></DrawerTitle>
          <DrawerDescription></DrawerDescription>
        </DrawerHeader>
        <div className="p-4">{content}</div>
      </DrawerContent>
    </Drawer>
  );
}
