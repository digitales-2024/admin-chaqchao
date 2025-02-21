"use client";

import { useCategories } from "@/hooks/use-categories";
import { useProducts } from "@/hooks/use-products";
import { useDeleteProductImageMutation } from "@/redux/services/productsApi";
import {
  updateProductsSchema,
  UpdateProductsSchema,
} from "@/schemas/products/createProductsSchema";
import { ProductData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
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

import { FileUploader } from "../common/FileUploader";
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

  const [deleteImage, { isLoading: isLoadingDelete }] =
    useDeleteProductImageMutation();
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const {
    onUpdateProduct,
    isSuccessUpdateProduct,
    isLoadingUpdateProduct,
    onUploadMultipleProductImages,
    isLoadingUploadMultipleImages,
  } = useProducts();

  // Estado de carga general
  const isLoading =
    isLoadingDelete || isLoadingUpdateProduct || isLoadingUploadMultipleImages;
  const form = useForm<UpdateProductsSchema>({
    resolver: zodResolver(updateProductsSchema),
    defaultValues: {
      name: product.name ?? "",
      description: product.description ?? "",
      categoryId: product.category.id ?? "",
      price: product.price.toString() ?? 0,
      images: [],
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: product.name ?? "",
        description: product.description ?? "",
        categoryId: product.category.id ?? "",
        price: product.price.toString() ?? 0,
        images: [],
      });
    }
  }, [open, product, form]);

  const onSubmit = async (data: UpdateProductsSchema) => {
    try {
      // Primero eliminar las imágenes marcadas para eliminar
      for (const imageUrl of imagesToDelete) {
        const image = product.images.find((image) => image.url === imageUrl);
        if (!image) break;
        try {
          const isDelete = await deleteImage({
            productId: product.id,
            imageId: image.id,
          });

          // Si no se elimina no se sigue con el proceso y solo se envia un toast de fallo al actualizar el producto
          if (isDelete.error) {
            throw new Error("Error al actualizar las imágenes del producto");
          }
        } catch (error) {
          console.error("Error al eliminar imagen:", error);
        }
      }

      // Luego actualizar la información del producto
      await onUpdateProduct({
        ...data,
        images: undefined,
        id: product.id,
        price: parseFloat(data.price),
      });

      // Finalmente, si hay nuevas imágenes, subirlas
      if (data.images && data.images.length > 0) {
        await onUploadMultipleProductImages(product.id, data.images);
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (isSuccessUpdateProduct) {
      form.reset();
      setImagesToDelete([]);
      onOpenChange(false);
    }
  }, [isSuccessUpdateProduct, form, onOpenChange]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
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
                      <Input
                        placeholder="Ingrese el nombre del producto"
                        {...field}
                      />
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
                        placeholder="Ingrese la descripción del producto"
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
                        placeholder="Ingrese el precio del producto"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* FileUploader para múltiples imágenes */}
              <FormField
                control={form.control}
                name="images"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imágenes del Producto</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        {/* Calcular límites de imágenes */}
                        {(() => {
                          const newImagesCount = field.value?.length || 0;
                          const currentImagesCount =
                            product.images.length -
                            imagesToDelete.length +
                            newImagesCount;
                          const maxNewImages =
                            3 - (product.images.length - imagesToDelete.length);
                          const isMaxImagesReached = currentImagesCount >= 3;

                          return (
                            <FileUploader
                              value={field.value}
                              onValueChange={field.onChange}
                              maxSize={1024 * 1024 * 10}
                              multiple
                              className="h-64"
                              disabled={isMaxImagesReached || isLoading}
                              maxFileCount={maxNewImages}
                            />
                          );
                        })()}

                        {/* Vista previa de todas las imágenes */}
                        <div className="flex flex-col justify-center gap-4">
                          {/* Imágenes existentes */}
                          {product.images.map((image, index) => (
                            <div
                              key={`existing-${index}`}
                              className="relative px-2"
                            >
                              {!imagesToDelete.includes(image.url) && (
                                <div className="flex w-full flex-row items-center justify-between">
                                  <Image
                                    src={image.url}
                                    alt={`Producto ${index + 1}`}
                                    className="size-12 rounded-md object-cover"
                                    width={50}
                                    height={50}
                                    priority={index < 3}
                                  />
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="outline"
                                    className="size-7"
                                    onClick={() => {
                                      if (!imagesToDelete.includes(image.url)) {
                                        setImagesToDelete([
                                          ...imagesToDelete,
                                          image.url,
                                        ]);
                                      }
                                    }}
                                  >
                                    <X className="size-4" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter className="gap-2 pt-2 sm:space-x-0">
                <div className="flex flex-row-reverse gap-2">
                  <Button
                    type="submit"
                    disabled={
                      isLoadingUpdateProduct || isLoadingUploadMultipleImages
                    }
                  >
                    {(isLoadingUpdateProduct ||
                      isLoadingUploadMultipleImages) && (
                      <RefreshCcw
                        className="mr-2 h-4 w-4 animate-spin"
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
