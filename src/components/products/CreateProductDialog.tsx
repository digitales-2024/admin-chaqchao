"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useProducts } from "@/hooks/use-products";
import { useDeleteProductPermanentMutation } from "@/redux/services/productsApi";
import {
  CreateProductsSchema,
  productsSchema,
} from "@/schemas/products/createProductsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RefreshCcw } from "lucide-react";
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
  const {
    onCreateProduct,
    isLoadingCreateProduct,
    cancelUploadImage,
    onUploadMultipleProductImages,
    isLoadingUploadMultipleImages,
    isSuccessCreateProduct,
  } = useProducts();

  const [deleteProduct] = useDeleteProductPermanentMutation();

  const [progress, setProgress] = useState(0);

  const form = useForm<CreateProductsSchema>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      price: "",
      images: [],
      isRestricted: false,
    },
  });

  const onSubmit = async (input: CreateProductsSchema) => {
    try {
      if (!input.images || input.images.length === 0) {
        throw new Error("Se requiere al menos una imagen");
      }

      // Primero crear el producto
      const productId = await onCreateProduct({
        name: input.name,
        categoryId: input.categoryId,
        description: input.description,
        price: parseFloat(input.price),
        isRestricted: input.isRestricted,
        variations: [],
      });
      // Luego subir las imágenes usando el ID del producto creado
      try {
        await onUploadMultipleProductImages(productId as string, input.images);
      } catch (error) {
        // Si falla la subida de imágenes, eliminamos el producto
        await deleteProduct({ productId: productId as string });
        throw error;
      }
    } catch (error) {
      throw error;
    }
  };

  // Actualiza el progreso de la subida de la imagen y la creacion del producto pero solo si esta en proceso
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isLoadingUploadMultipleImages || isLoadingCreateProduct) {
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
  }, [isLoadingUploadMultipleImages, isLoadingCreateProduct]);

  /**
   * Cancela la subida de la imagen y cierra el diálogo
   */
  const cancelUploadImageAndProduct = () => {
    cancelUploadImage();
    setProgress(0);
    setOpen(false);
  };

  useEffect(() => {
    if (isSuccessCreateProduct) {
      setProgress(0);
      form.reset();
      setOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <Dialog
          open={open}
          onOpenChange={(isOpen) => {
            // Si está intentando cerrar
            if (isOpen === false) {
              // Solo permitimos cerrar si no hay operaciones en progreso
              if (!isLoadingCreateProduct && !isLoadingUploadMultipleImages) {
                setOpen(false);
                form.reset();
              }
              return;
            }
            // Si está abriendo, siempre permitimos
            setOpen(true);
          }}
        >
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isLoadingCreateProduct || isLoadingUploadMultipleImages}
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
            <ScrollArea className="h-full max-h-[80vh] w-full justify-center gap-4 p-4">
              {open && (
                <CreateProductsForm form={form} onSubmit={onSubmit}>
                  {isLoadingCreateProduct || isLoadingUploadMultipleImages ? (
                    <ProgressIndicator />
                  ) : null}
                  <DialogFooter>
                    <div className="flex w-full flex-row-reverse gap-2">
                      <Button
                        disabled={
                          isLoadingCreateProduct ||
                          isLoadingUploadMultipleImages
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
      </>
    );

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(isOpen) => {
          // Si está intentando cerrar
          if (isOpen === false) {
            // Solo permitimos cerrar si no hay operaciones en progreso
            if (!isLoadingCreateProduct && !isLoadingUploadMultipleImages) {
              setOpen(false);
              form.reset();
            }
            return;
          }
          // Si está abriendo, siempre permitimos
          setOpen(true);
        }}
      >
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={isLoadingCreateProduct || isLoadingUploadMultipleImages}
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
              {isLoadingCreateProduct || isLoadingUploadMultipleImages ? (
                <ProgressIndicator />
              ) : null}
              <DrawerFooter className="gap-2 sm:space-x-0">
                <Button
                  disabled={
                    isLoadingCreateProduct || isLoadingUploadMultipleImages
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
    </>
  );
}
