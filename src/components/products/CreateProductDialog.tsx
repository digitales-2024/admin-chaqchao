"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useCreateProduct } from "@/hooks/use-products";
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

  const { onCreateProduct, isSuccessCreateProduct } = useCreateProduct();

  const form = useForm<CreateProductsSchema>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: "",
      categoryId: "",
      description: "",
      image: "",
    },
  });

  const onSubmit = async (input: CreateProductsSchema) => {
    // Agregar un array vacío de "variations" al input
    const inputWithVariations = { ...input, variations: [] };

    startCreateTransition(async () => {
      await onCreateProduct(inputWithVariations);
    });
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
          <CreateProductsForm form={form} onSubmit={onSubmit}>
            <DialogFooter className="gap-2 sm:space-x-0">
              <Button disabled={isCreatePending} className="w-full">
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
        <CreateProductsForm form={form} onSubmit={onSubmit}>
          <DrawerFooter className="gap-2 sm:space-x-0">
            <Button disabled={isCreatePending}>
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
      </DrawerContent>
    </Drawer>
  );
}