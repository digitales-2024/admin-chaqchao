"use client";

import { useRol } from "@/hooks/use-rol";
import { createUsersSchema } from "@/schemas";
import { Bot } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface CreateUsersFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<createUsersSchema>;
  onSubmit: (data: createUsersSchema) => void;
}

export const CreateUsersForm = ({
  children,
  form,
  onSubmit,
}: CreateUsersFormProps) => {
  const { data } = useRol();
  console.log("🚀 ~ data:", data);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6 p-4 sm:p-0">
          <FormField
            control={form.control}
            name="nombre"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="nombre">Nombre completo</FormLabel>
                <FormControl>
                  <Input id="nombre" placeholder="john smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="example@chaqchao.com"
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
                <FormLabel htmlFor="phone">Teléfono</FormLabel>
                <FormControl>
                  <Input
                    id="phone"
                    placeholder="(+51) 999 999 999"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <Bot className="size-4" aria-hidden="true" />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rol"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="rol">Rol</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
        </div>
        {children}
      </form>
    </Form>
  );
};
