"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useToggleProductActivation } from "@/hooks/use-products";
import { ProductData } from "@/types";
import { DialogTitle as UIDialogTitle } from "@radix-ui/react-dialog";
import { PackageCheck, PackageX, ShieldAlert, ShieldMinus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle as UIDrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { ScrollArea } from "../ui/scroll-area";
import { Switch } from "../ui/switch";

interface ProductImageDialogProps {
  imageUrl: string;
  children: React.ReactNode;
  product: ProductData;
  borderColor: string;
}

export function ProductImageDialog({
  imageUrl,
  children,
  product,
  borderColor,
}: ProductImageDialogProps) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onToggleProductActivation } = useToggleProductActivation();
  const [isAvailable, setIsAvailable] = useState(product.isAvailable);

  const handleToggle = async (checked: boolean) => {
    const productId = product.id;
    await onToggleProductActivation(productId);
    setIsAvailable(checked);
  };

  const content = (
    <div className="flex snap-center flex-col place-items-center gap-6 py-7 sm:flex-row sm:place-items-start">
      {/* Imagen y detalles básicos */}
      <div className="space-y-4">
        <div className="relative flex h-auto w-full">
          <Image
            height={400}
            width={400}
            src={imageUrl}
            alt={product.name}
            objectFit="cover"
            className="flex-1"
          />
        </div>
      </div>
      {/* Información detallada */}
      <div className="space-y-6">
        <Card className="border-slate-50">
          <CardContent className="flex flex-col gap-6 p-10">
            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <p className="text-balance text-sm font-light text-gray-400">
                {product.description}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoría</Label>
              <div className="mb-2 flex items-center">
                <Badge
                  variant="outline"
                  className="capitalize"
                  style={{ borderColor }}
                >
                  {product.category.name}
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
              <Label htmlFor="stock">Disponibilidad</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={isAvailable}
                  onCheckedChange={handleToggle}
                  onClick={(e) => e.stopPropagation()}
                  className="translate-y-0.5"
                />
                <span
                  className={cn(
                    "text-xs",
                    isAvailable ? "text-emerald-500" : "text-slate-500",
                  )}
                >
                  {isAvailable ? (
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-2xl justify-start p-10 lg:max-w-4xl">
          <DialogHeader>
            <UIDialogTitle className="text-2xl font-bold uppercase">
              {product.name}
            </UIDialogTitle>
            <Separator className="my-4" />
          </DialogHeader>
          <ScrollArea>{content}</ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-4/5">
        <DrawerHeader>
          <UIDrawerTitle className="text-2xl font-bold uppercase">
            {product.name}
          </UIDrawerTitle>
          <Separator className="my-4" />
        </DrawerHeader>

        <ScrollArea>{content}</ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
