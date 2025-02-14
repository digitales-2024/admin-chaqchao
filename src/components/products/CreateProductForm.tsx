"use client";

import { useCategories } from "@/hooks/use-categories";
import { CreateProductsSchema } from "@/schemas/products/createProductsSchema";
import {
  ShieldAlert,
  ShieldMinus,
  CloudUploadIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import {
  Dropzone,
  DropZoneArea,
  DropzoneDescription,
  DropzoneFileList,
  DropzoneFileListItem,
  DropzoneMessage,
  DropzoneRemoveFile,
  DropzoneTrigger,
  useDropzone,
} from "@/components/ui/dropzone";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";

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
  const currentImages = form.watch("images") || [];
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Obtener los valores más recientes
      const formImages = form.getValues("images") || [];
      const totalImages = formImages.length;

      // Verificación de límite considerando ambos estados
      if (totalImages >= MAX_FILES) {
        return {
          status: "error" as const,
          error: "Ya has alcanzado el límite máximo de 3 imágenes",
        };
      }

      // Verificar duplicados
      const isDuplicate = formImages.some(
        (img) => img.name === file.name && img.size === file.size,
      );

      if (isDuplicate) {
        return {
          status: "error" as const,
          error: "Esta imagen ya ha sido agregada",
        };
      }

      // Actualizar el formulario
      form.setValue("images", [...formImages, file], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true, // Asegurar que el campo se marque como tocado
      });

      return {
        status: "success" as const,
        result: URL.createObjectURL(file),
      };
    },
    onRemoveFile: (fileId) => {
      const fileStatus = dropzone.fileStatuses.find((f) => f.id === fileId);
      if (!fileStatus) return;

      // Obtener el estado más reciente del formulario
      const formImages = form.getValues("images") || [];

      // Filtrar la imagen a eliminar
      const updatedImages = formImages.filter(
        (img) =>
          !(
            img.name === fileStatus.file.name &&
            img.size === fileStatus.file.size
          ),
      );

      // Actualizar el formulario
      form.setValue("images", updatedImages, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      // Limpiar recursos
      if (fileStatus.status === "success" && fileStatus.result) {
        URL.revokeObjectURL(fileStatus.result as string);
      }
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
      },
      maxSize: 10 * 1024 * 1024, // 10MB
      maxFiles: MAX_FILES,
    },
  });

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
            render={() => (
              <FormItem>
                <FormLabel>Imágenes del Producto</FormLabel>
                <FormControl>
                  <div className="not-prose flex flex-col gap-4">
                    <Dropzone {...dropzone}>
                      <div>
                        <div className="flex justify-between">
                          <DropzoneDescription>
                            {currentImages.length >= MAX_FILES
                              ? "Has alcanzado el límite de 3 imágenes"
                              : `Selecciona hasta ${MAX_FILES} imágenes (${currentImages.length}/${MAX_FILES})`}
                          </DropzoneDescription>
                          <DropzoneMessage />
                        </div>
                        <DropZoneArea
                          className={cn(
                            "border-none",
                            currentImages.length >= MAX_FILES &&
                              "pointer-events-none opacity-50",
                          )}
                        >
                          <DropzoneTrigger className="flex flex-col items-center gap-4 border bg-transparent p-10 text-center text-sm">
                            <CloudUploadIcon className="size-8" />
                            <div>
                              <p className="font-semibold">
                                Sube imágenes del producto
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Haz clic aquí o arrastra las imágenes
                              </p>
                            </div>
                          </DropzoneTrigger>
                        </DropZoneArea>
                      </div>

                      <DropzoneFileList className="grid grid-cols-3 gap-3 p-0">
                        {dropzone.fileStatuses.map((file) => (
                          <DropzoneFileListItem
                            className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
                            key={file.id}
                            file={file}
                          >
                            {file.status === "pending" && (
                              <div className="aspect-video animate-pulse bg-black/20" />
                            )}
                            {file.status === "success" && (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={file.result}
                                alt={`uploaded-${file.fileName}`}
                                className="aspect-video object-cover"
                              />
                            )}
                            <div className="flex items-center justify-between p-2 pl-4">
                              <div className="min-w-0">
                                <p className="truncate text-sm">
                                  {file.fileName}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {(file.file.size / (1024 * 1024)).toFixed(2)}{" "}
                                  MB
                                </p>
                              </div>
                              <DropzoneRemoveFile
                                variant="ghost"
                                className="shrink-0 hover:outline"
                                onClick={() => {
                                  // Eliminar la imagen del formulario
                                  const updatedImages = currentImages.filter(
                                    (img) =>
                                      !(
                                        img.name === file.file.name &&
                                        img.size === file.file.size
                                      ),
                                  );
                                  form.setValue("images", updatedImages, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                  });
                                  // También eliminamos el archivo del dropzone
                                  dropzone.onRemoveFile(file.id);
                                }}
                              >
                                <Trash2Icon className="size-4" />
                              </DropzoneRemoveFile>
                            </div>
                          </DropzoneFileListItem>
                        ))}
                      </DropzoneFileList>
                    </Dropzone>
                  </div>
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
