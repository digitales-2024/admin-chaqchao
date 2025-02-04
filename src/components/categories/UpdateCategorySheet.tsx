"use client";

import { useCategories } from "@/hooks/use-categories";
import { UpdateCategoriesSchema, updateCategoriesSchema } from "@/schemas";
import { Category, familyOptions } from "@/types";
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

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
  const { onUpdateCategory, isLoadingUpdateCategory } = useCategories();

  const defaultValues = {
    id: category.id,
    name: category?.name || "",
    description: category?.description || "",
    family: category.family,
  };

  const form = useForm<UpdateCategoriesSchema>({
    resolver: zodResolver(updateCategoriesSchema),
    defaultValues,
  });
  useEffect(() => {
    if (category) {
      form.reset({
        id: category.id, // Solo resetear cuando category está disponible
        name: category.name ?? "",
        description: category.description ?? "",
        family: category.family,
      });
    }
  }, [category, form]);

  return (
    <Sheet {...props}>
      <SheetContent
        className="flex flex-col gap-6 sm:max-w-md"
        tabIndex={undefined}
      >
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
              onSubmit={form.handleSubmit(onUpdateCategory)}
              className="flex flex-col gap-4 p-4"
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
                      <Textarea
                        rows={5}
                        className="resize-y"
                        id="category-description"
                        placeholder="Descripción de la categoría"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="family"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="family">Familia</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="capitalize">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {familyOptions?.map((family) => (
                              <SelectItem
                                key={family.value}
                                value={family.value}
                                className="capitalize"
                              >
                                {family.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                <div className="flex flex-row-reverse flex-wrap gap-2">
                  <Button type="submit" disabled={isLoadingUpdateCategory}>
                    {isLoadingUpdateCategory && (
                      <RefreshCcw
                        className="mr-2 size-4 animate-spin"
                        aria-hidden="true"
                      />
                    )}
                    Actualizar
                  </Button>
                  <SheetClose asChild>
                    <Button type="button" variant="outline">
                      Cancelar
                    </Button>
                  </SheetClose>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
