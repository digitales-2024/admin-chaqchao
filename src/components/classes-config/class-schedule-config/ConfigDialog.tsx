"use client";

import { useBussinessConfig } from "@/hooks/use-business-config";
import { useClassCapacity } from "@/hooks/use-class-capacity";
import { useClassPrices } from "@/hooks/use-class-price";
import { TypeClass, typeClassLabels } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Settings2 } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import SectionFields from "@/components/common/SectionFields";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface ConfigProps {
  typeClass: TypeClass;
}

const formSchema = z
  .object({
    priceDolarAdult: z.coerce.number().min(1, {
      message: "El precio debe ser mayor a 0",
    }),
    priceDolarChild: z.coerce.number().min(1, {
      message: "El precio debe ser mayor a 0",
    }),
    priceSolesAdult: z.coerce.number().min(1, {
      message: "El precio debe ser mayor a 0",
    }),
    priceSolesChild: z.coerce.number().min(1, {
      message: "El precio debe ser mayor a 0",
    }),
    min: z.coerce.number().min(1, { message: "El mínimo debe ser mayor a 0" }),
    max: z.coerce.number().min(1, { message: "El máximo debe ser mayor a 0" }),
  })
  .refine((data) => data.max >= data.min, {
    message: "El máximo debe ser mayor o igual que el mínimo",
    path: ["max"],
  });

export default function ConfigDialog({ typeClass }: ConfigProps) {
  const [open, setOpen] = useState(false);
  const {
    onCreateClassPrice,
    onUpdateClassPrice,
    dataClassPricesAll,
    isLoading: isLoadingPricesAll,
  } = useClassPrices();
  const {
    createClassCapacity,
    updateClassCapacity,
    classCapacities,
    isLoadingClassCapacities,
  } = useClassCapacity();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const existingPrices = useMemo(
    () => dataClassPricesAll?.[typeClass] || [],
    [dataClassPricesAll, typeClass],
  );
  const existingCapacity = useMemo(
    () => classCapacities?.[typeClass] || undefined,
    [classCapacities, typeClass],
  );
  const defaultValues =
    existingPrices.length > 0 || existingCapacity
      ? {
          priceDolarAdult:
            existingPrices.find(
              (p) => p.typeCurrency === "USD" && p.classTypeUser === "ADULT",
            )?.price || 0,
          priceDolarChild:
            existingPrices.find(
              (p) => p.typeCurrency === "USD" && p.classTypeUser === "CHILD",
            )?.price || 0,
          priceSolesAdult:
            existingPrices.find(
              (p) => p.typeCurrency === "PEN" && p.classTypeUser === "ADULT",
            )?.price || 0,
          priceSolesChild:
            existingPrices.find(
              (p) => p.typeCurrency === "PEN" && p.classTypeUser === "CHILD",
            )?.price || 0,
          min: existingCapacity?.minCapacity || 0,
          max: existingCapacity?.maxCapacity || 0,
        }
      : undefined;

  const isEditing =
    Boolean(dataClassPricesAll?.[typeClass]?.length) ||
    existingCapacity !== undefined;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Restablecer formulario cuando cambia el estado del diálogo
  useEffect(() => {
    if (open && (existingPrices.length > 0 || existingCapacity)) {
      form.reset({
        priceDolarAdult:
          existingPrices.find(
            (p) => p.typeCurrency === "USD" && p.classTypeUser === "ADULT",
          )?.price || 0,
        priceDolarChild:
          existingPrices.find(
            (p) => p.typeCurrency === "USD" && p.classTypeUser === "CHILD",
          )?.price || 0,
        priceSolesAdult:
          existingPrices.find(
            (p) => p.typeCurrency === "PEN" && p.classTypeUser === "ADULT",
          )?.price || 0,
        priceSolesChild:
          existingPrices.find(
            (p) => p.typeCurrency === "PEN" && p.classTypeUser === "CHILD",
          )?.price || 0,
        min: existingCapacity?.minCapacity || 0,
        max: existingCapacity?.maxCapacity || 0,
      });
    } else if (!open) {
      form.reset();
    }
  }, [open, existingPrices, existingCapacity, form]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (existingPrices.length > 0 || existingCapacity) {
      form.reset({
        priceDolarAdult:
          existingPrices.find(
            (p) => p.typeCurrency === "USD" && p.classTypeUser === "ADULT",
          )?.price || 0,
        priceDolarChild:
          existingPrices.find(
            (p) => p.typeCurrency === "USD" && p.classTypeUser === "CHILD",
          )?.price || 0,
        priceSolesAdult:
          existingPrices.find(
            (p) => p.typeCurrency === "PEN" && p.classTypeUser === "ADULT",
          )?.price || 0,
        priceSolesChild:
          existingPrices.find(
            (p) => p.typeCurrency === "PEN" && p.classTypeUser === "CHILD",
          )?.price || 0,
        min: existingCapacity?.minCapacity || 0,
        max: existingCapacity?.maxCapacity || 0,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [existingPrices, existingCapacity]);

  const onClose = () => {
    setOpen(false);
    form.reset();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!isSuccessBusinessConfig || !dataBusinessConfigAll) return;

    setIsSubmitting(true);
    try {
      const businessId = dataBusinessConfigAll[0].id;
      const {
        priceDolarAdult,
        priceDolarChild,
        priceSolesAdult,
        priceSolesChild,
        min,
        max,
      } = values;

      const promises = [];

      // Manejar precios en USD para adultos
      const existingPriceUsdAdult = existingPrices.find(
        (p) => p.typeCurrency === "USD" && p.classTypeUser === "ADULT",
      );
      if (existingPriceUsdAdult) {
        promises.push(
          onUpdateClassPrice({
            ...existingPriceUsdAdult,
            price: priceDolarAdult,
          }),
        );
      } else {
        promises.push(
          onCreateClassPrice({
            businessId,
            typeClass,
            typeCurrency: "USD",
            price: priceDolarAdult,
            classTypeUser: "ADULT",
          }),
        );
      }

      // Manejar precios en USD para niños
      const existingPriceUsdChild = existingPrices.find(
        (p) => p.typeCurrency === "USD" && p.classTypeUser === "CHILD",
      );
      if (existingPriceUsdChild) {
        promises.push(
          onUpdateClassPrice({
            ...existingPriceUsdChild,
            price: priceDolarChild,
          }),
        );
      } else {
        promises.push(
          onCreateClassPrice({
            businessId,
            typeClass,
            typeCurrency: "USD",
            price: priceDolarChild,
            classTypeUser: "CHILD",
          }),
        );
      }

      // Manejar precios en PEN para adultos
      const existingPricePenAdult = existingPrices.find(
        (p) => p.typeCurrency === "PEN" && p.classTypeUser === "ADULT",
      );
      if (existingPricePenAdult) {
        promises.push(
          onUpdateClassPrice({
            ...existingPricePenAdult,
            price: priceSolesAdult,
          }),
        );
      } else {
        promises.push(
          onCreateClassPrice({
            businessId,
            typeClass,
            typeCurrency: "PEN",
            price: priceSolesAdult,
            classTypeUser: "ADULT",
          }),
        );
      }

      // Manejar precios en PEN para niños
      const existingPricePenChild = existingPrices.find(
        (p) => p.typeCurrency === "PEN" && p.classTypeUser === "CHILD",
      );
      if (existingPricePenChild) {
        promises.push(
          onUpdateClassPrice({
            ...existingPricePenChild,
            price: priceSolesChild,
          }),
        );
      } else {
        promises.push(
          onCreateClassPrice({
            businessId,
            typeClass,
            typeCurrency: "PEN",
            price: priceSolesChild,
            classTypeUser: "CHILD",
          }),
        );
      }

      // Manejar capacidad
      if (existingCapacity) {
        promises.push(
          updateClassCapacity({
            ...existingCapacity,
            minCapacity: min,
            maxCapacity: max,
          }),
        );
      } else {
        promises.push(
          createClassCapacity({
            typeClass,
            minCapacity: min,
            maxCapacity: max,
          }),
        );
      }

      const results = await Promise.all(promises);
      if (results.every((result) => result)) {
        toast.success(
          isEditing
            ? "Configuración actualizada correctamente"
            : "Configuración creada correctamente",
        );
        onClose();
      }
    } catch (error) {
      console.error("Error al guardar la configuración:", error);
      toast.error(
        "Hubo un error al guardar la configuración. Intente nuevamente.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-xs [&>svg]:size-4"
          disabled={isLoadingPricesAll || isLoadingClassCapacities}
        >
          {isLoadingPricesAll || isLoadingClassCapacities ? (
            "Cargando..."
          ) : (
            <>
              {isEditing ? "Editar" : "Configurar"}
              <Settings2 className="ml-2" />
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent tabIndex={undefined}>
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Editar" : "Configurar"} el tipo de clase{" "}
            {typeClassLabels[typeClass]}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <SectionFields name="Precios">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="priceDolarAdult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Adultos</FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-cyan-500">
                            $
                          </span>
                          <Input
                            inputMode="decimal"
                            type="number"
                            className="w-full rounded-md border-2 py-2 pl-7 pr-4 text-lg"
                            placeholder="0.00"
                            {...field}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Precio en dólares para adultos
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceDolarChild"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Niños</FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-cyan-500">
                            $
                          </span>
                          <Input
                            inputMode="decimal"
                            type="number"
                            className="w-full rounded-md border-2 py-2 pl-7 pr-4 text-lg"
                            placeholder="0.00"
                            {...field}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Precio en dólares para niños
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="priceSolesAdult"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Adultos</FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-emerald-500">
                            S/.
                          </span>
                          <Input
                            inputMode="decimal"
                            type="number"
                            className="w-full rounded-md border-2 py-2 pl-11 pr-4 text-lg"
                            placeholder="0.00"
                            {...field}
                            disabled={isSubmitting}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Precio en soles para adultos
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priceSolesChild"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio Niños</FormLabel>
                      <FormControl>
                        <div className="relative mt-1">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-lg text-emerald-500">
                            S/.
                          </span>
                          <Input
                            inputMode="decimal"
                            type="number"
                            className="w-full rounded-md border-2 py-2 pl-11 pr-4 text-lg"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) => {
                              const value = e.target.value;
                              field.onChange(value === "" ? undefined : value);
                            }}
                          />
                        </div>
                      </FormControl>
                      <FormDescription className="text-xs">
                        Precio en soles para niños
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </SectionFields>
            <SectionFields name="Capacidad">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mínimo</FormLabel>
                      <FormControl>
                        <Input
                          inputMode="numeric"
                          type="number"
                          className="w-full rounded-md border-2 py-2 pl-4 text-lg"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              field.onChange(undefined);
                            } else {
                              // Elimina los ceros a la izquierda
                              const parsedValue = parseInt(
                                value,
                                10,
                              ).toString();
                              field.onChange(parsedValue);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Capacidad mínima
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Máximo</FormLabel>
                      <FormControl>
                        <Input
                          inputMode="numeric"
                          type="number"
                          className="w-full rounded-md border-2 py-2 pl-4 text-lg"
                          placeholder="0"
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === "") {
                              field.onChange(undefined);
                            } else {
                              // Elimina los ceros a la izquierda
                              const parsedValue = parseInt(
                                value,
                                10,
                              ).toString();
                              field.onChange(parsedValue);
                            }
                          }}
                        />
                      </FormControl>
                      <FormDescription className="text-xs">
                        Capacidad máxima
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </SectionFields>
            <DialogFooter>
              <div className="flex w-full flex-row-reverse gap-2">
                <Button
                  type="submit"
                  disabled={
                    isLoadingPricesAll ||
                    isLoadingClassCapacities ||
                    isSubmitting
                  }
                >
                  {isSubmitting
                    ? "Guardando..."
                    : isLoadingPricesAll || isLoadingClassCapacities
                      ? "Cargando..."
                      : "Guardar"}
                </Button>
                <Button variant="ghost" type="button" onClick={onClose}>
                  Cancelar
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
