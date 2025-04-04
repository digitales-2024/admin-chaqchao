"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useProducts } from "@/hooks/use-products";
import { familyLabels, ProductData } from "@/types";
import { DialogTitle as UIDialogTitle } from "@radix-ui/react-dialog";
import { PackageCheck, PackageX, ShieldAlert, ShieldMinus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
  DrawerTitle as UIDrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import Gallery from "../common/gallery/Gallery";
import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

interface ProductImageDialogProps
  extends React.ComponentPropsWithRef<typeof Dialog> {
  images?: { url: string }[];
  children: React.ReactNode;
  product: ProductData;
  borderColor: string;
}

export function ProductImageDialog({
  children,
  product,
  borderColor,
  ...props
}: ProductImageDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onToggleProductActivation } = useProducts();

  const handleToggle = async () => {
    const productId = product.id;
    await onToggleProductActivation(productId);
    props?.onOpenChange?.(false);
  };

  const content = (
    <div className="grid w-full grid-cols-1 gap-6 py-7 sm:grid-cols-2">
      {/* Imagen y detalles básicos */}
      <div className="space-y-4">
        <div className="relative flex h-auto w-full items-center justify-center">
          {product.images.length > 0 ? (
            <Gallery
              images={product.images}
              label={product.name + product.description}
            />
          ) : (
            <div className="inline-flex h-auto w-[500px] items-center justify-center rounded-lg bg-gray-200">
              <span className="text-sm text-gray-500">No hay imágenes</span>
            </div>
          )}
        </div>
      </div>
      {/* Información detallada */}
      <div className="w-full space-y-6">
        <Card className="border-slate-50">
          <CardContent className="flex flex-col gap-6 p-10">
            <div className="space-y-2">
              <Label htmlFor="description" className="font-bold">
                Descripción
              </Label>
              <p className="text-balance text-sm font-light text-gray-400">
                {product.description || "No hay descripción disponible."}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category" className="font-bold">
                Categoría
              </Label>
              <div className="mb-2 flex items-center">
                <Badge
                  variant="outline"
                  className="inline-flex gap-2 capitalize"
                  style={{ borderColor }}
                >
                  {product.category.name}
                  <span
                    style={{
                      color: borderColor,
                    }}
                    className="font-light"
                  >
                    {" / "}
                    {familyLabels[product.category.family]}
                  </span>
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio (PEN)</Label>
              <p className="text-balance text-lg font-semibold text-emerald-500">
                {new Intl.NumberFormat("es-PE", {
                  style: "currency",
                  currency: "PEN",
                }).format(product.price)}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Stock Máximo</Label>
              <p className="text-balance text-lg font-semibold text-emerald-500">
                {product.maxStock || 0}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Disponibilidad</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={product.isAvailable}
                  onCheckedChange={handleToggle}
                  onClick={(e) => e.stopPropagation()}
                  className="translate-y-0.5"
                />
                <span
                  className={cn(
                    "text-xs",
                    product.isAvailable ? "text-emerald-500" : "text-slate-500",
                  )}
                >
                  {product.isAvailable ? (
                    <span className="inline-flex gap-2 align-bottom">
                      <PackageCheck size={16} className="flex-shrink-0" />{" "}
                      Disponible
                    </span>
                  ) : (
                    <span className="inline-flex gap-2">
                      <PackageX size={16} className="flex-shrink-0" /> No
                      Disponible
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Restrincción</Label>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xs",
                    product.isRestricted ? "text-orange-500" : "text-slate-500",
                  )}
                >
                  {product.isRestricted ? (
                    <span className="inline-flex gap-2 align-bottom">
                      <ShieldAlert size={16} className="flex-shrink-0" />{" "}
                      Retrincción de Edad
                    </span>
                  ) : (
                    <span className="inline-flex gap-2">
                      <ShieldMinus size={16} className="flex-shrink-0" /> Sin
                      Retrincción de Edad
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Fecha de creación</Label>
              <p className="text-balance text-sm font-light text-gray-400">
                {new Date(product.createdAt).toLocaleString()}
              </p>
            </div>
            <div className="space-y-2">
              <Label>Fecha de actualización</Label>
              <p className="text-balance text-sm font-light text-gray-400">
                {new Date(product.updatedAt).toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  if (isDesktop)
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent
          className="max-w-2xl justify-start p-10 lg:max-w-4xl"
          tabIndex={undefined}
        >
          <DialogHeader>
            <UIDialogTitle className="w-full text-wrap text-2xl font-bold uppercase">
              {product.name}
            </UIDialogTitle>
            <DialogDescription></DialogDescription>
            <Separator className="my-4" />
          </DialogHeader>
          <ScrollArea>{content}</ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-4/5" tabIndex={undefined}>
        <DrawerHeader>
          <UIDrawerTitle className="text-wrap text-2xl font-bold uppercase">
            {product.name}
          </UIDrawerTitle>
          <DrawerDescription />
          <Separator className="my-4" />
        </DrawerHeader>

        <ScrollArea>{content}</ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
