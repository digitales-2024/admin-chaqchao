"use client";

import { useCategories } from "@/hooks/use-categories";
import { CreateProductsSchema } from "@/schemas/products/createProductsSchema";
import {
  ShieldAlert,
  ShieldMinus,
  CloudUploadIcon,
  Trash2Icon,
} from "lucide-react";
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
  const dropzone = useDropzone({
    onDropFile: async (file: File) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        status: "success",
        result: URL.createObjectURL(file),
      };
    },
    validation: {
      accept: {
        "image/*": [".png", ".jpg", ".jpeg"],
      },
      maxSize: 10 * 1024 * 1024,
      maxFiles: 10,
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

          {/* Área de Subida de Imagen */}
          <FormField
            control={form.control}
            name="images"
            render={({}) => (
              <FormItem>
                <FormLabel htmlFor="image">Imagenes del Producto</FormLabel>
                <FormControl>
                  {/* <div
                    className="cursor-pointer rounded-md border border-dashed border-gray-300 text-center transition-colors duration-300 hover:bg-gray-50"
                    onClick={() => document.getElementById("image")?.click()}
                  >
                    {preview ? (
                      <div className="flex flex-col items-center gap-2">
                        <div className="relative h-40 w-40">
                          <Image
                            src={preview}
                            alt="Imagen del producto"
                            layout="fill"
                            objectFit="contain"
                            className="rounded-md"
                          />
                        </div>
                        <p className="py-4 text-xs text-gray-400">
                          {(field.value as File)?.name}
                        </p>
                      </div>
                    ) : (
                      <div
                        className="flex size-60 w-full flex-col items-center justify-center"
                        tabIndex={0}
                      >
                        <ImagePlus
                          className="h-10 w-10 text-gray-300"
                          strokeWidth={1}
                        />
                        <p className="text-xs text-gray-600">
                          Haga clic o arrastre una imagen aquí
                        </p>
                      </div>
                    )}
                    <Input
                      id="image"
                      type="file"
                      accept="['image/jpeg', 'image/png', 'image/gif', 'image/webp']"
                      onChange={(e) => {
                        handleFileChange(e);
                        field.onChange(e.target.files?.[0] || null);
                      }}
                      className="hidden"
                    />
                  </div> */}
                  <div className="not-prose flex flex-col gap-4">
                    <Dropzone {...dropzone}>
                      <div>
                        <div className="flex justify-between">
                          <DropzoneDescription>
                            Seleccione hasta 10 imágenes
                          </DropzoneDescription>
                          <DropzoneMessage />
                        </div>
                        <DropZoneArea className="border-none">
                          <DropzoneTrigger className="flex flex-col items-center gap-4 border bg-transparent p-10 text-center text-sm">
                            <CloudUploadIcon className="size-8 text-gray-500" />
                            <div>
                              <p className="font-semibold text-gray-600">
                                Cargar listado de imágenes
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Haga clic aquí o arrastre y suelte para cargar
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
