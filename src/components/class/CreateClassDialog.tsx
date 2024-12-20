"use client";

import { useClasses } from "@/hooks/use-class";
import { useMediaQuery } from "@/hooks/use-media-query";
import { CreateClassSchema, createClassSchema } from "@/schemas";
import { TypeClass } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
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

import CreateClassForm from "./CreateClassForm";

const dataForm = {
  button: "Crear un registro de una clase",
  title: "Crear un registro de una clase",
  description: "Llena los campos para registrar una nueva clase en el sistema.",
};

export function CreateClassDialog() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const {} = useClasses();

  const form = useForm<createClassSchema>({
    resolver: zodResolver(CreateClassSchema),
    defaultValues: {
      typeClass: TypeClass.NORMAL,
      userName: "",
      userEmail: "",
      userPhone: "",
      scheduleClass: "",
      languageClass: "",
      dateClass: new Date(),
      totalAdults: 1,
      totalChildren: 0,
      totalPriceAdults: 0,
      totalPriceChildren: 0,
      totalPrice: 0,
    },
  });
  const onSubmit = async (input: createClassSchema) => {
    console.log("🚀 ~ onSubmit ~ input:", input);
    try {
    } catch (error) {
      throw error;
    }
  };

  const handleClose = () => {
    setOpen(!open);
    form.reset();
  };

  // Actualiza el progreso de la subida de la imagen y la creacion del producto pero solo si esta en proceso

  if (isDesktop)
    return (
      <>
        <Dialog open={open} onOpenChange={handleClose}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 size-4" aria-hidden="true" />
              {dataForm.button}
            </Button>
          </DialogTrigger>
          <DialogContent
            tabIndex={undefined}
            className="w-full lg:min-w-[800px]"
          >
            <DialogHeader>
              <DialogTitle>{dataForm.title}</DialogTitle>
              <DialogDescription>{dataForm.description}</DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-full max-h-[80vh] w-full justify-center gap-4">
              {open && (
                <CreateClassForm form={form} onSubmit={onSubmit}>
                  <DialogFooter>
                    <div className="flex w-full flex-row-reverse gap-2">
                      <Button className="w-full" type="submit">
                        {/* {isLoadingCreateProduct && (
                          <RefreshCcw
                            className="mr-2 size-4 animate-spin"
                            aria-hidden="true"
                          />
                        )} */}
                        Registrar
                      </Button>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full"
                        >
                          Cancelar
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </CreateClassForm>
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
        onOpenChange={setOpen}
        onClose={() => {
          form.reset();
        }}
      >
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
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
            <CreateClassForm form={form} onSubmit={onSubmit}>
              <DrawerFooter className="gap-2 sm:space-x-0">
                <Button>
                  {/* {isLoadingCreateProduct && (
                    <RefreshCcw
                      className="mr-2 size-4 animate-spin"
                      aria-hidden="true"
                    />
                  )} */}
                  Registrar
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancelar</Button>
                </DrawerClose>
              </DrawerFooter>
            </CreateClassForm>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
}
