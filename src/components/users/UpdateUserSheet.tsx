"use client";

import { useRol } from "@/hooks/use-rol";
import { useUsers } from "@/hooks/use-users";
import { updateUsersSchema, UpdateUsersSchema } from "@/schemas";
import { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Input } from "../ui/input";

const infoSheet = {
  title: "Actualizar Usuario",
  description: "Actualiza la información del usuario y guarda los cambios",
};

interface UpdateUserSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  user: User;
}

export function UpdateUserSheet({ user, ...props }: UpdateUserSheetProps) {
  const { data } = useRol();
  const { onUpdateUser, isSuccessUpdateUser, isLoadingUpdateUser } = useUsers();

  const form = useForm<UpdateUsersSchema>({
    resolver: zodResolver(updateUsersSchema),
    defaultValues: {
      name: user.name ?? "",
      phone: user.phone,
      roles: user.roles.map((rol) => rol.id),
    },
  });

  useEffect(() => {
    form.reset({
      name: user.name ?? "",
      phone: user.phone,
      roles: user.roles.map((rol) => rol.id),
    });
  }, [user, form]);

  function onSubmit(input: UpdateUsersSchema) {
    onUpdateUser({
      id: user.id,
      ...input,
    });
  }

  useEffect(() => {
    if (isSuccessUpdateUser) {
      form.reset();
      props.onOpenChange?.(false);
    }
  }, [isSuccessUpdateUser]);

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle>{infoSheet.title}</SheetTitle>
          <SheetDescription>{infoSheet.description}</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john smith"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teléfono</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="985523221"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roles"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="rol">Rol</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange([value])}
                    defaultValue={field.value[0] || ""}
                  >
                    <FormControl>
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Selecciona un rol" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        {data.map((rol) => (
                          <SelectItem
                            key={rol.id}
                            value={rol.id}
                            className="capitalize"
                          >
                            {rol.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter className="gap-2 pt-2 sm:space-x-0">
              <SheetClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </SheetClose>
              <Button disabled={isLoadingUpdateUser}>
                {isLoadingUpdateUser && (
                  <RefreshCcw
                    className="mr-2 size-4 animate-spin"
                    aria-hidden="true"
                  />
                )}
                Actualizar
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}