"use client";

import { useCategories } from "@/hooks/use-categories";
import { useUpdateProduct } from "@/hooks/use-products";
import {
  CreateProductsSchema,
  productsSchema,
} from "@/schemas/products/createProductsSchema";
import { ProductData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImagePlus, RefreshCcw } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
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

import { Textarea } from "../ui/textarea";

const infoSheet = {
  title: "Actualizar Producto",
  description: "Actualiza la información del producto y guarda los cambios",
};
const URL_IMAGE =
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1998&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

interface UpdateProductSheetProps
  extends Omit<
    React.ComponentPropsWithRef<typeof Sheet>,
    "open" | "onOpenChange"
  > {
  product: ProductData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateProductSheet({
  product,
  open,
  onOpenChange,
}: UpdateProductSheetProps) {
  const { data } = useCategories();
  const { onUpdateProduct, isSuccessUpdateProduct, isLoadingUpdateProduct } =
    useUpdateProduct();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<CreateProductsSchema>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: product.name ?? "",
      description: product.description ?? "",
      categoryId: product.category.id ?? "",
      price: product.price ?? 0,
      image: product.image ?? "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: product.name ?? "",
        description: product.description ?? "",
        categoryId: product.category.id ?? "",
        price: product.price ?? 0,
        image: product.image ?? "",
      });
      setSelectedFile(null);
      setPreview(product.image ?? null);
    }
    // No incluyas 'product' ni 'form' en las dependencias
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      // Actualiza el valor del formulario para la imagen
      form.setValue("image", URL.createObjectURL(file));

      // Crea una vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      form.setValue("image", URL.createObjectURL(file));

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(input: CreateProductsSchema) {
    const inputWithVariations = { ...input, variationsUpdate: [] };
    onUpdateProduct({
      id: product.id,
      ...inputWithVariations,
      image: URL_IMAGE,
    });
  }

  useEffect(() => {
    if (isSuccessUpdateProduct) {
      form.reset();
      onOpenChange(false);
    }
  }, [isSuccessUpdateProduct, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="flex flex-col items-start">
            {infoSheet.title}
            <Badge
              className="bg-emerald-100 text-emerald-700"
              variant="secondary"
            >
              {product.name}
            </Badge>
          </SheetTitle>
          <SheetDescription>{infoSheet.description}</SheetDescription>
        </SheetHeader>
        <ScrollArea className="mt-4 w-full gap-4">
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
                    <FormLabel>Nombre del Producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ejemplo: Hamburguesa" {...field} />
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
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Ejemplo: Hamburguesa con papas"
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
                    <FormLabel>Precio</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingrese el precio del producto"
                        {...field}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          if (!isNaN(value)) {
                            field.onChange(value);
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

              {/* Área de Subida de Imagen */}
              <FormItem>
                <FormLabel>Imagen del Producto</FormLabel>
                <FormControl>
                  <div
                    className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center"
                    onClick={() => document.getElementById("image")?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
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
                          {selectedFile?.name}
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
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Campo de Categoría */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(value) => field.onChange(value)}
                        value={field.value || ""}
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

              <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </SheetClose>
                <Button type="submit" disabled={isLoadingUpdateProduct}>
                  {isLoadingUpdateProduct && (
                    <RefreshCcw
                      className="mr-2 h-4 w-4 animate-spin"
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
