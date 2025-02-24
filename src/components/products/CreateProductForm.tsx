"use client";

import { useCategories } from "@/hooks/use-categories";
import { CreateProductsSchema } from "@/schemas/products/createProductsSchema";
import { ShieldAlert, ShieldMinus } from "lucide-react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

import { FileUploader } from "../common/FileUploader";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
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
import { Switch } from "../ui/switch";
import { Textarea } from "../ui/textarea";

const MAX_FILES = 3;

interface CreateProductsFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<CreateProductsSchema>;
  onSubmit: (data: CreateProductsSchema) => void;
}

export const CreateProductsForm = ({
  children,
  form,
  onSubmit,
}: CreateProductsFormProps) => {
  const { data } = useCategories();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-1">
        <div className="flex flex-col gap-6 p-4 sm:p-0">
          {/* Campo de Nombre */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nombre del Producto</FormLabel>
                <FormControl>
                  <Input
                    id="name"
                    placeholder="Ingrese el nombre del producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Descripción */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    id="description"
                    placeholder="Ingrese la descripción del producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Precio */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">Precio</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Ingrese el precio del producto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="maxStock"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="price">Stock máximo</FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el stock máximo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Categoría */}
          {data && data?.length > 0 ? (
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="categoryId">Categoría</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value || ""}
                    >
                      <SelectTrigger className="capitalize">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {data?.map((category) => (
                            <SelectItem
                              key={category.id}
                              value={category.id}
                              className="capitalize"
                            >
                              {category.name}
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
          ) : (
            <Alert className="space-y-3 border-rose-500">
              <AlertTitle className="text-rose-600">Error</AlertTitle>
              <AlertDescription className="text-rose-600">
                No hay categorías disponibles. Por favor, crea una categoría
              </AlertDescription>
              <Link
                href="/products/categories"
                className="block w-fit rounded-md border border-rose-400 p-2"
              >
                Crear Categoría
              </Link>
            </Alert>
          )}

          {/* Área de Subida de Imágenes */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imágenes del Producto</FormLabel>
                <FormControl>
                  <FileUploader
                    maxFileCount={MAX_FILES}
                    maxSize={10 * 1024 * 1024} // 5MB
                    multiple
                    accept={{
                      "image/*": [".png", ".jpg", ".jpeg", ".webp"],
                    }}
                    value={field.value}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Restricción */}
          <FormField
            control={form.control}
            name="isRestricted"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel htmlFor="isRestricted">Restricción</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Switch
                      className="translate-y-0.5"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <span
                      className={cn(
                        "text-xs",
                        field.value ? "text-orange-500" : "text-slate-500",
                      )}
                    >
                      {field.value ? (
                        <span className="inline-flex gap-2 align-bottom">
                          <ShieldAlert size={16} className="flex-shrink-0" />{" "}
                          Restricción de Edad
                        </span>
                      ) : (
                        <span className="inline-flex gap-2">
                          <ShieldMinus size={16} className="flex-shrink-0" />{" "}
                          Sin Restricción de Edad
                        </span>
                      )}
                    </span>
                  </div>
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
