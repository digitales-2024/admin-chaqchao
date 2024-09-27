"use client";

import { useCategories } from "@/hooks/use-categories";
import { CreateProductsSchema } from "@/schemas/products/createProductsSchema";
import { ImagePlus, ShieldAlert, ShieldMinus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

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
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Crear una URL de vista previa para la imagen seleccionada
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Actualizar el valor del campo de imagen con el archivo seleccionado
      form.setValue("image", file);
    }
  };

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
                    id="price"
                    type="number"
                    placeholder="Ingrese el precio del producto"
                    {...field}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      if (!isNaN(value)) {
                        field.onChange(value);
                      } else {
                        field.onChange(0);
                      }
                    }}
                    min="0"
                    step="0.01"
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

          {/* Área de Subida de Imagen */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="image">Imagen del Producto</FormLabel>
                <FormControl>
                  <div
                    className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    {preview ? (
                      <div className="flex flex-col items-center">
                        <div className="relative h-40 w-40">
                          <Image
                            src={preview}
                            alt="Vista previa de la imagen"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                          />
                        </div>
                        <p className="mt-2 text-gray-600">
                          {(field.value as File)?.name}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <ImagePlus className="h-10 w-10 text-gray-400" />
                        <p className="mt-2 text-gray-600">
                          Haga clic o arrastre una imagen aquí
                        </p>
                      </div>
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleFileChange(e);
                        field.onChange(e.target.files?.[0] || null);
                      }}
                      className="hidden"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo de Categoría */}
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
        </div>
        {children}
      </form>
    </Form>
  );
};
