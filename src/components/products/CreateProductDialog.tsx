"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useProducts } from "@/hooks/use-products";
import {
  CreateProductsSchema,
  productsSchema,
} from "@/schemas/products/createProductsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RefreshCcw, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Progress } from "../ui/progress";
import { CreateProductsForm } from "./CreateProductForm";

const dataForm = {
  button: "Crear producto",
  title: "Crear Productos",
  description:
    "Complete los detalles a continuación para crear nuevos productos.",
};

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const {
    onCreateProduct,
    isLoadingCreateProduct,
    cancelUploadImage,
    onUploadImageProduct,
    isLoadingUploadImageProduct,
    isSuccessCreateProduct,
  } = useProducts();
  const [progress, setProgress] = useState(0);

  const form = useForm<CreateProductsSchema>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      price: "",
      image: undefined,
      isRestricted: false,
    },
  });

  const onSubmit = async (input: CreateProductsSchema) => {
    try {
      if (input.image) {
        const imageResponse = await onUploadImageProduct(input.image);
        const imageUrl = imageResponse?.data;

        const productData = {
          ...input,
          image: imageUrl,
          variations: [],
        };

        await onCreateProduct({
          ...productData,
          price: parseFloat(productData.price),
        });
      } else {
        throw new Error("Image file is required");
      }
    } catch (error) {
      throw error;
    }
  };

  const handleClose = () => {
    setOpen(!open);
    form.reset();
  };

  // Actualiza el progreso de la subida de la imagen y la creacion del producto pero solo si esta en proceso
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoadingUploadImageProduct || isLoadingCreateProduct) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            if (timer) clearInterval(timer);
            return 100;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLoadingUploadImageProduct, isLoadingCreateProduct]);

  // Minimiza el dialogo si la subida de la imagen esta en
  useEffect(() => {
    if (open) {
      setIsMinimized(false);
    }
    if (!open && isLoadingUploadImageProduct) {
      setIsMinimized(true);
    }
    if (!isLoadingUploadImageProduct) {
      setIsMinimized(false);
    }
  }, [open, isLoadingUploadImageProduct]);

  /**
   * Cancela la subida de la imagen, la creacion de un producto y minimiza el dialogo
   */
  const cancelUploadImageAndProduct = () => {
    cancelUploadImage();
    setProgress(0);
    setIsMinimized(false);
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccessCreateProduct) {
      setProgress(0);
      form.reset();
      setOpen(false);
      setIsMinimized(false);
    }
  }, [isSuccessCreateProduct]);

  const ProgressIndicator = () => (
    <div className="w-full space-y-2">
      <Progress value={progress} className="w-full" />
      <p className="text-sm">
        {progress < 100
          ? `Subiendo imagen... ${Math.round(progress)}%`
          : "Creando producto..."}
      </p>
      <p className="text-xs text-muted-foreground">
        Por favor, no cierre esta ventana.
      </p>
    </div>
  );

  if (isDesktop)
    return (
      <>
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isLoadingCreateProduct || isLoadingUploadImageProduct}
            >
              <Plus className="mr-2 size-4" aria-hidden="true" />
              {dataForm.button}
            </Button>
          </DialogTrigger>
          <DialogContent tabIndex={undefined}>
            <DialogHeader>
              <DialogTitle>{dataForm.title}</DialogTitle>
              <DialogDescription>{dataForm.description}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-full max-h-[80vh] w-full justify-center gap-4">
              {open && (
                <CreateProductsForm form={form} onSubmit={onSubmit}>
                  {isLoadingCreateProduct || isLoadingUploadImageProduct ? (
                    <ProgressIndicator />
                  ) : null}
                  <DialogFooter>
                    <div className="flex w-full flex-row-reverse gap-2">
                      <Button
                        disabled={
                          isLoadingCreateProduct || isLoadingUploadImageProduct
                        }
                        className="w-full"
                      >
                        {isLoadingCreateProduct && (
                          <RefreshCcw
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                          />
                        )}
                        Registrar
                      </Button>
                      <DialogClose asChild>
                        <Button
                          onClick={cancelUploadImageAndProduct}
                          type="button"
                          variant="outline"
                          className="w-full"
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </CreateProductsForm>
              )}
            </ScrollArea>
          </DialogContent>
        </Dialog>
        {isMinimized && (
          <div className="fixed bottom-4 right-4 z-50 w-64 rounded-lg border bg-background p-4 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="inline-flex text-sm text-emerald-500">
                <RefreshCcw className="mr-2 size-4 animate-spin" />
                Creando Producto <span className="animate-pulse">...</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={cancelUploadImageAndProduct}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ProgressIndicator />
          </div>
        )}
      </>
    );

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        onClose={() => {
          form.reset();
        }}
      >
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={isLoadingCreateProduct || isLoadingUploadImageProduct}
          >
            <Plus className="mr-2 size-4" aria-hidden="true" />
            {dataForm.button}
          </Button>
        </DrawerTrigger>

        <DrawerContent className="h-[90vh]" tabIndex={undefined}>
          <DrawerHeader>
            <DrawerTitle>{dataForm.title}</DrawerTitle>
            <DrawerDescription>{dataForm.description}</DrawerDescription>
          </DrawerHeader>
          <ScrollArea className="mt-4 max-h-full w-full gap-4 pr-4">
            <CreateProductsForm form={form} onSubmit={onSubmit}>
              {isLoadingCreateProduct || isLoadingUploadImageProduct ? (
                <ProgressIndicator />
              ) : null}
              <DrawerFooter className="gap-2 sm:space-x-0">
                <Button
                  disabled={
                    isLoadingCreateProduct || isLoadingUploadImageProduct
                  }
                >
                  {isLoadingCreateProduct && (
                    <RefreshCcw
                      className="mr-2 size-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Registrar
                </Button>
                <DrawerClose asChild>
                  <Button
                    variant="outline"
                    onClick={cancelUploadImageAndProduct}
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </CreateProductsForm>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
      {isMinimized && (
        <div className="fixed bottom-4 right-4 z-50 w-64 rounded-lg border bg-background p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="inline-flex text-sm text-emerald-500">
              <RefreshCcw className="mr-2 size-4 animate-spin" />
              Creando Producto <span className="animate-pulse">...</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={cancelUploadImageAndProduct}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ProgressIndicator />
        </div>
      )}
    </>
  );
}
