"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { ProductData } from "@/types";
import { DialogTitle as UIDialogTitle } from "@radix-ui/react-dialog";
import { PackageCheck, PackageX } from "lucide-react";
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

import { Switch } from "../ui/switch";

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
    <div className="grid gap-6 p-5 py-7 lg:grid-cols-[400px_1fr]">
      {/* Imagen y detalles básicos */}
      <div className="space-y-4">
        <div className="relative aspect-square h-auto w-full">
          <Image
            height={400}
            width={400}
            src={imageUrl}
            alt={product.name}
            objectFit="cover"
          />
        </div>
      </div>
      {/* Información detallada y formulario de edición */}
      <div className="space-y-6">
        <Card className="border-slate-50">
          <CardContent className="flex flex-col gap-10 p-10">
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
                  variant="default"
                  className="capitalize"
                  style={{ backgroundColor: color }}
                >
                  {product.category.name}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Precio (PEN)</Label>
              <p>
                {new Intl.NumberFormat("es-PE", {
                  style: "currency",
                  currency: "PEN",
                }).format(product.price)}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Disponibilidad</Label>
              <div className="flex items-center gap-2">
                <Switch checked={product.isAvailable} />
                <span
                  className={cn(
                    "text-xs text-emerald-500",
                    product.isAvailable ? "text-emerald-500" : "text-slate-500",
                  )}
                >
                  {product.isAvailable ? (
                    <span className="inline-flex gap-2">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const dialogContent = (
    <DialogContent className="max-h-lvh max-w-4xl overflow-y-auto p-10">
      <DialogHeader>
        <UIDialogTitle className="text-2xl font-bold uppercase">
          {product.name}
        </UIDialogTitle>
        <Separator className="my-4" />
      </DialogHeader>
      {content}
    </DialogContent>
  );

  const drawerContent = (
    <DrawerContent className="flex flex-col overflow-y-auto p-4">
      <DrawerHeader>
        <UIDrawerTitle className="text-2xl font-bold uppercase">
          {product.name}
        </UIDrawerTitle>
        <Separator className="my-4" />
      </DrawerHeader>
      {content}
    </DrawerContent>
  );

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        {dialogContent}
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      {drawerContent}
    </Drawer>
  );
}
