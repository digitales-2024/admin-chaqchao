"use client";

import { useCategories } from "@/hooks/use-categories";
import { useMediaQuery } from "@/hooks/use-media-query"; // Asegúrate de tener este hook disponible
import { CreateCategoriesSchema, categoriesSchema } from "@/schemas";
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
} from "@/components/ui/drawer"; // Importa el componente Drawer

import { CreateCategoryForm } from "./CreateCategoryForm";

const dataForm = {
  button: "Crear categoría",
  title: "Crear categoría",
  description:
    "Complete los detalles a continuación para crear una nueva categoría.",
};

export function CreateCategoryDialog() {
  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)"); // Verificar si es pantalla de escritorio

  const { onCreateCategory, isSuccessCreateCategory } = useCategories();

  const form = useForm<CreateCategoriesSchema>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (input: CreateCategoriesSchema) => {
    startCreateTransition(async () => {
      await onCreateCategory(input);
    });
  };

  useEffect(() => {
    if (isSuccessCreateCategory) {
      form.reset();
      setOpen(false);
    }
  }, [isSuccessCreateCategory, form]);

  const handleClose = () => {
    form.reset();
  };

  // Si es escritorio, mostrar el Dialog
  if (isDesktop) {
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
          <CreateCategoryForm form={form} onSubmit={onSubmit}>
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
          </CreateCategoryForm>
        </DialogContent>
      </Dialog>
    );
  }

  // Si es una pantalla móvil o más pequeña, mostrar el Drawer
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
        <CreateCategoryForm form={form} onSubmit={onSubmit}>
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
        </CreateCategoryForm>
      </DrawerContent>
    </Drawer>
  );
}
