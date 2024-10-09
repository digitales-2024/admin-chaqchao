"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useProducts } from "@/hooks/use-products";
import {
  CreateProductsSchema,
  productsSchema,
} from "@/schemas/products/createProductsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
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

import { CreateProductsForm } from "./CreateProductForm";

const dataForm = {
  button: "Crear producto",
  title: "Crear Productos",
  description:
    "Complete los detalles a continuación para crear nuevos productos.",
};

export function CreateProductDialog() {
  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onCreateProduct, isSuccessCreateProduct } = useProducts();
  const { onUploadImageProduct, isLoadingUploadImageProduct } = useProducts();

  const form = useForm<CreateProductsSchema>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      image: undefined,
      isRestricted: false,
    },
  });

  const onSubmit = async (input: CreateProductsSchema) => {
    try {
      let imageUrl = "";
      // Subir la imagen antes de crear el producto
      if (input.image) {
        const uploadResult = await onUploadImageProduct(input.image);
        imageUrl = uploadResult.data;
      }

      // Asignar la URL de la imagen al campo correspondiente
      const inputWithImage = {
        ...input,
        image: imageUrl || "",
        variations: [],
      };

      startCreateTransition(async () => {
        await onCreateProduct(inputWithImage);
      });
    } catch (error) {
      console.error("Error al subir la imagen o crear el producto", error);
    }
  };

  useEffect(() => {
    if (isSuccessCreateProduct) {
      form.reset();
      setOpen(false);
    }
  }, [isSuccessCreateProduct, form]);

  const handleClose = () => {
    form.reset();
  };

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="mr-2 size-4" aria-hidden="true" />
            {dataForm.button}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dataForm.title}</DialogTitle>
            <DialogDescription>{dataForm.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full max-h-[80vh] w-full justify-center gap-4">
            <CreateProductsForm form={form} onSubmit={onSubmit}>
              <DialogFooter className="gap-2 sm:space-x-0">
                <Button
                  disabled={isCreatePending || isLoadingUploadImageProduct}
                  className="w-full"
                >
                  {isCreatePending && (
                    <RefreshCcw
                      className="mr-2 size-4 animate-spin"
                      aria-hidden="true"
                    />
                  )}
                  Registrar
                </Button>
                <DialogClose asChild>
                  <Button
                    onClick={handleClose}
                    type="button"
                    variant="outline"
                    className="w-full"
                  >
                    Cancelar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </CreateProductsForm>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="mr-2 size-4" aria-hidden="true" />
          {dataForm.button}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{dataForm.title}</DrawerTitle>
          <DrawerDescription>{dataForm.description}</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="mt-4 max-h-[750px] w-full gap-4 overflow-y-auto pr-4">
          <CreateProductsForm form={form} onSubmit={onSubmit}>
            <DrawerFooter className="gap-2 sm:space-x-0">
              <Button disabled={isCreatePending || isLoadingUploadImageProduct}>
                {isCreatePending && (
                  <RefreshCcw
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Registrar
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </CreateProductsForm>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
