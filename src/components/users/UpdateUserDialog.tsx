"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useUsers } from "@/hooks/use-users";
import { UpdateUsersSchema } from "@/schemas";
import { updateUsersSchema } from "@/schemas/users/createUsersSchema";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { ComponentPropsWithoutRef, useEffect } from "react";
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
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { UpdateUserForm } from "./UpdateUserForm";

const dataForm = {
  button: "Actualizar usuario",
  title: "Actualizar usuario",
  description: "Complete los detalles a continuación para actualizar usuarios.",
};

interface UpdateUserDialogProps
  extends ComponentPropsWithoutRef<typeof Dialog> {
  user: User;
}

export const UpdateUserDialog = ({ user, ...props }: UpdateUserDialogProps) => {
  const isDesktop = useMediaQuery("(min-width: 640px)");

  const { onUpdateUser, isSuccessUpdateUser, isLoadingUpdateUser } = useUsers();

  const form = useForm<UpdateUsersSchema>({
    resolver: zodResolver(updateUsersSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: "",
      roles: user.roles?.map((role) => role.id),
    },
  });

  useEffect(() => {
    if (isSuccessUpdateUser) {
      form.reset();
      props.onOpenChange?.(false);
    }
  }, [isSuccessUpdateUser, form, props]);

  const handleClose = () => {
    form.reset();
  };

  if (isDesktop)
    return (
      <Dialog {...props}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dataForm.title}</DialogTitle>
            <DialogDescription>{dataForm.description}</DialogDescription>
          </DialogHeader>
          <UpdateUserForm form={form} onSubmit={onUpdateUser}>
            <DialogFooter className="gap-2 sm:space-x-0">
              <Button disabled={isLoadingUpdateUser} className="w-full">
                {isLoadingUpdateUser && (
                  <RefreshCcw
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Actualizar
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
          </UpdateUserForm>
        </DialogContent>
      </Dialog>
    );

  return (
    <Drawer {...props}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{dataForm.title}</DrawerTitle>
          <DrawerDescription>{dataForm.description}</DrawerDescription>
        </DrawerHeader>
        <UpdateUserForm form={form} onSubmit={onUpdateUser}>
          <DrawerFooter className="gap-2 sm:space-x-0">
            <Button disabled={isLoadingUpdateUser}>
              {isLoadingUpdateUser && (
                <RefreshCcw
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                />
              )}
              Actualizar
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DrawerClose>
          </DrawerFooter>
        </UpdateUserForm>
      </DrawerContent>
    </Drawer>
  );
};
