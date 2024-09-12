"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { createUsersSchema, usersSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, RefreshCcw } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

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

import { CreateUsersForm } from "./CreateUsersForm";

const dataForm = {
  button: "Crear usuario",
  title: "Crear usuarios",
  description:
    "Complete los detalles a continuación para crear nuevos usuarios.",
};

export function CreateUsersDialog() {
  const [open, setOpen] = useState(false);
  const [isCreatePending, startCreateTransition] = useTransition();
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const form = useForm<createUsersSchema>({
    resolver: zodResolver(usersSchema),
  });

  function onSubmit(input: createUsersSchema) {
    console.log("🚀 ~ onSubmit ~ input:", input);
    startCreateTransition(async () => {
      // const { error } =;

      // if (error) {
      //   toast.error(error);
      //   return;
      // }

      form.reset();
      setOpen(false);
      toast.success("Task created");
    });
  }

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
          <CreateUsersForm form={form} onSubmit={onSubmit}>
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
                <Button type="button" variant="outline" className="w-full">
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </CreateUsersForm>
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
        <CreateUsersForm form={form} onSubmit={onSubmit}>
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
        </CreateUsersForm>
      </DrawerContent>
    </Drawer>
  );
}
