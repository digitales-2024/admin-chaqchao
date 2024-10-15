"use client";
import { CreateCategoriesSchema } from "@/schemas";
import { UseFormReturn } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CreateCategoryFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<CreateCategoriesSchema>;
  onSubmit: (data: CreateCategoriesSchema) => void;
}

export const CreateCategoryForm = ({
  children,
  form,
  onSubmit,
}: CreateCategoryFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6 p-4 sm:p-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nombre de la categoría</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Ejemplo: chocolates"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <FormControl>
                  <Input
                    id="description"
                    placeholder="Descripción breve de la categoría"
                    {...field}
                  />
                </FormControl>
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
