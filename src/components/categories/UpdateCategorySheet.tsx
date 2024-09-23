"use client";

import { useCategories } from "@/hooks/use-categories";
import { UpdateCategoriesSchema, updateCategoriesSchema } from "@/schemas";
import { Category } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const infoSheet = {
  title: "Actualizar Categoría",
  description: "Actualiza la información de la categoría y guarda los cambios",
};

interface UpdateCategorySheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  category: Category;
}

export function UpdateCategorySheet({
  category,
  ...props
}: UpdateCategorySheetProps) {
  const { onUpdateCategory, isSuccessUpdateCategory, isLoadingUpdateCategory } =
    useCategories();

  const defaultValues = {
    name: category?.name || "",
    description: category?.description || "",
  };

  const form = useForm<UpdateCategoriesSchema>({
    resolver: zodResolver(updateCategoriesSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset({
      name: category.name ?? "",
      description: category.description ?? "",
    });
  }, [category, form]);

  function onSubmit(input: UpdateCategoriesSchema) {
    // Usar el id de category y el resto de input sin incluir id
    const { name, description } = input; // Solo extraemos las propiedades necesarias

    console.log("Enviando actualización para:", {
      id: category.id,
      name,
      description,
    });

    onUpdateCategory({
      id: category.id, // Usamos el id de la categoría
      name, // Pasamos solo name y description
      description,
    });
  }

  useEffect(() => {
    if (isSuccessUpdateCategory) {
      console.log("Actualización exitosa");
      form.reset();
      props.onOpenChange?.(false);
    }
  }, [isSuccessUpdateCategory]);

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="flex flex-col items-start">
            {infoSheet.title}
            <Badge
              className="bg-emerald-100 text-emerald-700"
              variant="secondary"
            >
              {category.name}
            </Badge>
          </SheetTitle>
          <SheetDescription>{infoSheet.description}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="mt-4 w-full gap-4 rounded-md border p-4">
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
                    <FormLabel htmlFor="category-name">Nombre</FormLabel>
                    <FormControl>
                      <Input
                        id="category-name"
                        placeholder="Nombre de la categoría"
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="category-description">
                      Descripción
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="category-description"
                        placeholder="Descripción de la categoría"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
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
                <Button type="submit" disabled={isLoadingUpdateCategory}>
                  {isLoadingUpdateCategory && (
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
