"use client";

import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import {
  CreateProductsSchema,
  productsSchema,
} from "@/schemas/products/createProductsSchema";
import { ProductData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageOff, ImagePlus, RefreshCcw } from "lucide-react";
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

import { Progress } from "../ui/progress";
import { Textarea } from "../ui/textarea";

const infoSheet = {
  title: "Actualizar Producto",
  description: "Actualiza la información del producto y guarda los cambios",
};

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
    useProducts();
  const { onUpdateImageProduct, isLoadingUpdateImageProduct } = useProducts();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<CreateProductsSchema>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      name: product.name ?? "",
      description: product.description ?? "",
      categoryId: product.category.id ?? "",
      price: product.price ?? 0,
      image: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: product.name ?? "",
        description: product.description ?? "",
        categoryId: product.category.id ?? "",
        price: product.price ?? 0,
        image: undefined,
      });
      setSelectedFile(null);
      setPreview(product.image ?? null);
    }
  }, [open, product, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      form.setValue("image", file);
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

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      form.setValue("image", file);
    }
  };

  const onSubmit = async (input: CreateProductsSchema) => {
    let imageUrl = product.image; // Usamos la imagen existente por defecto

    if (selectedFile) {
      const existingFileName = product.image?.split("/").pop(); // Extraemos el nombre del archivo existente
      if (!existingFileName) {
        return;
      }
      try {
        const uploadResult = await onUpdateImageProduct(
          selectedFile,
          existingFileName,
        ); // Actualizamos la imagen
        imageUrl = uploadResult.data; // Obtenemos la nueva URL de la imagen
      } catch (error) {
        console.error("Error al subir la imagen", error);
        return;
      }
    }

    const inputWithImage = {
      ...input,
      image: imageUrl, // Actualizamos con la nueva URL o mantenemos la anterior
      variationsUpdate: [],
    };

    onUpdateProduct({
      id: product.id,
      ...inputWithImage,
    });
  };

  useEffect(() => {
    if (isSuccessUpdateProduct) {
      form.reset();
      onOpenChange(false);
    }
  }, [isSuccessUpdateProduct, form, onOpenChange]);

  const [processLoadingImage, setProcessLoadingImage] = useState(0);

  useEffect(() => {
    if (isLoadingUpdateImageProduct) {
      const interval = setInterval(() => {
        setProcessLoadingImage((prev) => (prev + 10) % 100);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isLoadingUpdateImageProduct]);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    // Restablecer el estado de error de la imagen
    setImageError(false);
  }, [preview]);

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
              className="flex flex-col gap-4 p-4"
            >
              {/* Nombre */}
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

              {/* Descripción */}
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

              {/* Precio */}
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

              {/* Subida de Imagen */}
              <FormItem>
                <FormLabel>Imagen del Producto</FormLabel>
                <FormControl>
                  <div className="space-y-4">
                    <div
                      className="cursor-pointer rounded-md border border-dashed border-gray-300 text-center transition-colors duration-300 hover:bg-gray-50"
                      onClick={() => document.getElementById("image")?.click()}
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                    >
                      {preview && !imageError ? (
                        <div className="flex flex-col items-center">
                          <div className="relative h-40 w-40">
                            <Image
                              src={preview}
                              alt={product.name}
                              key={product.id}
                              layout="fill"
                              objectFit="contain"
                              className="rounded-md"
                              onError={() => setImageError(true)}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex size-40 w-full flex-col items-center justify-center text-center">
                          {imageError ? (
                            <>
                              <ImageOff
                                className="size-14 text-slate-400"
                                strokeWidth={1}
                              />
                            </>
                          ) : (
                            <>
                              <ImagePlus
                                className="h-10 w-10 text-gray-400"
                                strokeWidth={1}
                              />
                              <p className="mt-2 text-gray-600">
                                Haga clic o arrastre una imagen aquí
                              </p>
                            </>
                          )}
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
                    {isLoadingUpdateImageProduct && (
                      <Progress value={processLoadingImage} className="h-2" />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>

              {/* Categoría */}
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
                <Button
                  type="submit"
                  disabled={
                    isLoadingUpdateProduct || isLoadingUpdateImageProduct
                  }
                >
                  {(isLoadingUpdateProduct || isLoadingUpdateImageProduct) && (
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
