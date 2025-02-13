"use client";

import { Izipay, Paypal } from "@/assets/icons";
import { useClassLanguages } from "@/hooks/use-class-language";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import {
  useCheckClassExistQuery,
  useGetClassesCapacityQuery,
  useGetClassesFuturesQuery,
  usePricesQuery,
} from "@/redux/services/classApi";
import { createClassSchema } from "@/schemas";
import { TypeClass, typeClassLabels } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertCircle, UsersRound } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

import { TwoMonthCalendar } from "../common/calendar/TwoMonthCalendar";
import Counter from "../common/counter";
import Loading from "../common/Loading";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { PhoneInput } from "../ui/phone-input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import ClassScheduleEditable from "./ClassScheduleEditable";

interface CreateClassFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  children: React.ReactNode;
  form: UseFormReturn<createClassSchema>;
  onSubmit: (data: createClassSchema) => void;
}

export default function CreateClassForm({
  form,
  onSubmit,
  children,
}: CreateClassFormProps) {
  const {
    data: prices,
    isLoading: isLoadingPrices,
    error: errorPrices,
  } = usePricesQuery({
    typeCurrency: form.getValues("typeCurrency") || "USD",
    typeClass: (form.getValues("typeClass") as TypeClass) || "NORMAL",
  });
  const [counterMin, setCounterMin] = useState(1);

  const currency = form.watch("typeCurrency") || "USD";

  useEffect(() => {
    // Limpiar método de pago al cambiar moneda
    form.setValue("methodPayment", "");

    // Forzar recalculo de precios con la nueva moneda
    if (prices) {
      const priceAdult = prices.filter(
        (price) => price.classTypeUser === "ADULT",
      );
      const priceChildren = prices.filter(
        (price) => price.classTypeUser === "CHILD",
      );

      setPricesSelect({
        adults: priceAdult[0]?.price || 0,
        children: priceChildren[0]?.price || 0,
      });

      // Actualizar totales inmediatamente
      const totalAdults =
        priceAdult[0]?.price * form.getValues("totalAdults") || 0;
      const totalChildren =
        priceChildren[0]?.price * form.getValues("totalChildren") || 0;

      form.setValue("totalPriceAdults", totalAdults);
      form.setValue("totalPriceChildren", totalChildren);
      form.setValue("totalPrice", totalAdults + totalChildren);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("typeCurrency"), prices]);

  const {
    dataClassSchedulesByTypeClass,
    errorClassSchedulesByTypeClass,
    isLoadingClassSchedulesByTypeClass,
  } = useClassSchedules(form.getValues("typeClass") as TypeClass);

  const [pricesSelect, setPricesSelect] = useState({
    adults: 0,
    children: 0,
  });
  const { data: classesFutures } = useGetClassesFuturesQuery(
    {
      typeClass: form.getValues("typeClass") as TypeClass,
      schedule: form.getValues("scheduleClass"),
    },
    {
      skip: !form.getValues("typeClass") || !form.getValues("scheduleClass"),
    },
  );

  useEffect(() => {
    if (form.getValues("dateClass") && form.getValues("scheduleClass")) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("dateClass"), form.watch("scheduleClass")]);

  // Actualizar precios cuando cambian los precios del servidor o cantidades
  useEffect(
    () => {
      if (prices) {
        // Obtener precios actualizados
        const priceAdult = prices.filter(
          (price) => price.classTypeUser === "ADULT",
        );
        const priceChildren = prices.filter(
          (price) => price.classTypeUser === "CHILD",
        );

        // Actualizar precios unitarios
        const newPricesSelect = {
          adults: priceAdult[0]?.price || 0,
          children: priceChildren[0]?.price || 0,
        };
        setPricesSelect(newPricesSelect);

        // Calcular totales
        const totalAdults =
          newPricesSelect.adults * form.getValues("totalAdults");
        const totalChildren =
          newPricesSelect.children * form.getValues("totalChildren");

        // Actualizar todos los campos de precios
        form.setValue("totalPriceAdults", totalAdults);
        form.setValue("totalPriceChildren", totalChildren);
        form.setValue("totalPrice", totalAdults + totalChildren);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      prices,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      form.watch("totalAdults"),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      form.watch("totalChildren"),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      form.watch("typeCurrency"),
    ],
  );

  const { dataClassLanguagesAll, isLoading } = useClassLanguages();
  const {
    data,
    isLoading: isLoadingClassExist,
    refetch,
  } = useCheckClassExistQuery(
    {
      schedule: form.getValues("scheduleClass"),
      date:
        form.getValues("dateClass") &&
        format(form.getValues("dateClass"), "yyyy-MM-dd"),
      typeClass: form.getValues("typeClass") as TypeClass,
    },
    {
      skip:
        !form.getValues("scheduleClass") &&
        !form.getValues("dateClass") &&
        !form.getValues("typeClass"),
    },
  );
  const { data: classCapacity, isLoading: isLoadingCapacity } =
    useGetClassesCapacityQuery(
      {
        typeClass: form.getValues("typeClass") as TypeClass,
      },
      {
        skip: !form.getValues("typeClass"),
      },
    );
  useEffect(() => {
    if (data) {
      form.setValue("languageClass", data.languageClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (form.watch("typeClass")) {
      form.setValue("scheduleClass", "");
      form.resetField("dateClass");
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("typeClass")]);

  useEffect(() => {
    if (form.watch("scheduleClass")) {
      form.resetField("dateClass");
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("scheduleClass")]);

  // Mantener actualizado el total de participantes
  const [capacityError, setCapacityError] = useState<string | null>(null);

  useEffect(() => {
    const totalParticipants =
      form.watch("totalAdults") + form.watch("totalChildren");
    form.setValue("totalParticipants", totalParticipants);

    // Validación de capacidad máxima
    if (classCapacity) {
      const currentOccupancy = data?.totalParticipants || 0;
      const totalWithNew = currentOccupancy + totalParticipants;

      if (totalWithNew > classCapacity.maxCapacity) {
        const available = classCapacity.maxCapacity - currentOccupancy;
        setCapacityError(
          `La capacidad máxima es de ${classCapacity.maxCapacity} participantes. ${
            currentOccupancy > 0
              ? `Ya hay ${currentOccupancy} participantes registrados, solo quedan ${available} cupos disponibles.`
              : "No puedes exceder esta cantidad."
          }`,
        );
      } else {
        setCapacityError(null);
      }
    }

    // Si hay una clase creada con participantes, el mínimo es 1 adulto
    if (data && data.totalParticipants > 0) {
      const newMin = 1;
      setCounterMin(newMin);
      if (form.watch("totalAdults") < newMin) {
        form.setValue("totalAdults", newMin);
      }
      return;
    }

    // Si no hay clase creada o la clase tiene 0 participantes, validamos capacidad mínima
    if (classCapacity) {
      let newMin: number;

      // Si el total ya cumple la capacidad mínima, permite mínimo 1 adulto
      if (totalParticipants >= classCapacity.minCapacity) {
        newMin = 1;
      } else {
        // Si no cumple, el mínimo de adultos debe ser la capacidad mínima
        newMin = classCapacity.minCapacity;
      }

      setCounterMin(newMin);
      if (form.watch("totalAdults") < newMin) {
        form.setValue("totalAdults", newMin);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, form.watch("totalAdults"), form.watch("totalChildren")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="typeClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de clase</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un tipo de clase" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(typeClassLabels).map(([key, value]) => (
                      <SelectItem key={key} value={key}>
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex h-full flex-col gap-2">
            <span className="text-sm">Capacidad</span>
            <div className="inline-flex flex-1 items-center gap-2">
              {isLoadingCapacity ? (
                <Loading />
              ) : classCapacity ? (
                <span className="inline-flex items-center gap-2">
                  <UsersRound className="size-4" />
                  <span className="text-xs text-gray-500">min: </span>
                  {classCapacity.minCapacity}{" "}
                  <span className="text-xs text-gray-500">- max: </span>
                  {classCapacity.maxCapacity}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-rose-500">
                  <span className="text-xs">No configurado</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <AlertCircle className="size-5" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-64">
                        <p className="text-xs text-gray-400">
                          No se ha configurado una capacidad para el tipo de
                          clase{" "}
                          {
                            typeClassLabels[
                              form.getValues("typeClass") as TypeClass
                            ]
                          }
                          , por favor configure una en la secci&oacute;n de
                          capacidades de la clase en el panel de
                          administraci&oacute;n de la plataforma.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </span>
              )}
            </div>
          </div>
        </div>
        <Separator />
        <span className="font-bold">Datos de la clase</span>

        <FormField
          control={form.control}
          name="scheduleClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecciona el horario</FormLabel>
              <FormControl>
                {isLoadingClassSchedulesByTypeClass ? (
                  <span>Loading...</span>
                ) : errorClassSchedulesByTypeClass ? (
                  <span>Error</span>
                ) : dataClassSchedulesByTypeClass &&
                  dataClassSchedulesByTypeClass.length > 0 ? (
                  <ClassScheduleEditable
                    options={dataClassSchedulesByTypeClass}
                    value={field.value}
                    onChange={field.onChange}
                  />
                ) : (
                  <Alert className="border-rose-500 [&>svg]:text-rose-500">
                    <AlertCircle className="size-4" />
                    <AlertTitle className="text-rose-500">
                      Error de configuración
                    </AlertTitle>
                    <AlertDescription className="text-xs">
                      No se encontraron horarios para el tipo de clase
                      seleccionado. Por favor, configure un horario en la
                      sección de horarios de la clase en el panel de
                      administración de la plataforma.
                    </AlertDescription>
                    <Link
                      href="/bussiness/classes-configuration"
                      className="ml-2 mt-3 block w-fit rounded-md border border-rose-500 p-2 text-sm"
                    >
                      Ir a configuración
                    </Link>
                  </Alert>
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecciona la fecha de la clase</FormLabel>
              <FormControl>
                <>
                  {form.getValues("dateClass") && (
                    <div className="flex w-full flex-wrap justify-between">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span className="text-sm">Fecha:</span>
                        <span className="text-sm">
                          {format(form.getValues("dateClass"), "PPP", {
                            locale: es,
                          })}
                        </span>
                      </div>
                      {data && classCapacity && (
                        <Tooltip>
                          <TooltipTrigger type="button">
                            <div className="sticky top-0 flex items-center gap-2 rounded-md border border-emerald-500 px-2 py-1 text-xs text-gray-400">
                              <UsersRound
                                className="size-4 text-emerald-600"
                                strokeWidth={1}
                              />
                              <span className="text-sm">
                                <span className="text-emerald-600">
                                  {classCapacity.maxCapacity -
                                    data.totalParticipants}{" "}
                                </span>
                                cupos disponibles
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-32">
                            <p>
                              Quedan{" "}
                              <span className="font-semibold">
                                {classCapacity.maxCapacity -
                                  data.totalParticipants}
                              </span>{" "}
                              cupos disponibles de un total de{" "}
                              <span className="font-semibold">
                                {classCapacity.maxCapacity}
                              </span>
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
                  )}
                  <TwoMonthCalendar
                    value={field.value}
                    onChange={field.onChange}
                    classes={classesFutures}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="languageClass"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lenguaje de la clase</FormLabel>

              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                value={field.value}
                disabled={
                  isLoading ||
                  isLoadingClassExist ||
                  data?.languageClass === field.value
                }
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un lenguaje" />
                  </SelectTrigger>
                </FormControl>
                {isLoading ? (
                  <SelectContent>
                    <SelectItem value="loading">Loading...</SelectItem>
                  </SelectContent>
                ) : (
                  <SelectContent>
                    {dataClassLanguagesAll?.map((language) => (
                      <SelectItem
                        key={language.id}
                        value={language.languageName}
                      >
                        {language.languageName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalAdults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adultos</FormLabel>
                <FormControl>
                  <Counter
                    name={field.name}
                    control={form.control}
                    min={counterMin}
                  />
                </FormControl>
                <FormDescription>Los adultos de 12 años o más.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalChildren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Niños</FormLabel>
                <FormControl>
                  <Counter name={field.name} control={form.control} min={0} />
                </FormControl>
                <FormDescription>Los niños de 5 a 12 años.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {capacityError && (
          <Alert variant="destructive" className="mt-2">
            <AlertCircle className="size-4" />
            <AlertTitle>Error de capacidad</AlertTitle>
            <AlertDescription>{capacityError}</AlertDescription>
          </Alert>
        )}
        <div className="space-y-4 rounded-sm border border-gray-100 p-3">
          <span className="font-bold">Datos del cliente</span>
          <Separator />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="userPhone"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start">
                <FormLabel>Teléfono</FormLabel>
                <FormControl className="w-full">
                  <PhoneInput {...field} defaultCountry="PE" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comentarios</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Agrega un comentario"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-sm border border-gray-100 p-3">
          <span className="font-bold">Datos de la facturación</span>
          <Separator />
          {/* Currency Selection */}
          <FormField
            control={form.control}
            name="typeCurrency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecciona el tipo de moneda para el pago</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    value={field.value}
                    className="flex gap-4"
                  >
                    <FormItem>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="USD" />
                        <span>DOLAR ($)</span>
                      </label>
                    </FormItem>
                    <FormItem>
                      <label className="flex items-center gap-2">
                        <RadioGroupItem value="PEN" />
                        <span>SOL (S/.)</span>
                      </label>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="methodPayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Selecciona el método de pago</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    defaultValue={field.value}
                    className="grid grid-cols-1 gap-4 md:grid-cols-2"
                  >
                    {currency === "USD" && (
                      <FormItem className="m-0">
                        <label
                          htmlFor="PAYPAL"
                          className={cn(
                            "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent",
                            field.value === "PAYPAL"
                              ? "border-primary bg-accent"
                              : "border-muted",
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="PAYPAL"
                              id="PAYPAL"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Paypal</span>
                              <Paypal className="h-5 w-auto" />
                            </div>
                            {field.value === "PAYPAL" && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                        </label>
                      </FormItem>
                    )}

                    {currency === "PEN" && (
                      <FormItem className="m-0">
                        <label
                          htmlFor="IZIPAY"
                          className={cn(
                            "relative flex w-full cursor-pointer rounded-lg border-2 p-4 transition-all hover:bg-accent",
                            field.value === "IZIPAY"
                              ? "border-primary bg-accent"
                              : "border-muted",
                          )}
                        >
                          <FormControl>
                            <RadioGroupItem
                              value="IZIPAY"
                              id="IZIPAY"
                              className="sr-only"
                            />
                          </FormControl>
                          <div className="flex w-full items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Izipay</span>
                              <Izipay className="h-5 w-auto" />
                            </div>
                            {field.value === "IZIPAY" && (
                              <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </div>
                        </label>
                      </FormItem>
                    )}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isLoadingPrices ? <Loading /> : ""}
          {errorPrices ? (
            <Alert className="border-rose-500 [&>svg]:text-rose-500">
              <AlertCircle className="size-4" />
              <AlertTitle className="text-rose-500">
                Error de configuración
              </AlertTitle>
              <AlertDescription className="text-xs">
                Ocurrió un error al cargar los precios, por favor intenta de
                nuevo o revisa que los precios estén configurados en la sección
                de precios en el panel de administración de la plataforma.
              </AlertDescription>
              <Link
                href="/bussiness/classes-configuration"
                className="ml-2 mt-3 block w-fit rounded-md border border-rose-500 p-2 text-sm"
              >
                Ir a configuración
              </Link>
            </Alert>
          ) : (
            ""
          )}
          {!isLoadingPrices && !errorPrices ? (
            <>
              <div className="space-y-4 rounded-md border border-gray-100 p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Precio Adultos</h4>
                    <div className="rounded-md bg-gray-50 p-3">
                      <div className="text-sm text-gray-600">
                        Precio por persona:
                        <span className="ml-1 font-medium">
                          {currency === "USD" ? "$" : "S/."}{" "}
                          {pricesSelect.adults.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Cantidad:{" "}
                        <span className="ml-1 font-medium">
                          {form.watch("totalAdults")}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="font-medium">
                        Total: {currency === "USD" ? "$" : "S/."}{" "}
                        {form.watch("totalPriceAdults").toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Precio Niños</h4>
                    <div className="rounded-md bg-gray-50 p-3">
                      <div className="text-sm text-gray-600">
                        Precio por persona:
                        <span className="ml-1 font-medium">
                          {currency === "USD" ? "$" : "S/."}{" "}
                          {pricesSelect.children.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        Cantidad:{" "}
                        <span className="ml-1 font-medium">
                          {form.watch("totalChildren")}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="font-medium">
                        Total: {currency === "USD" ? "$" : "S/."}{" "}
                        {form.watch("totalPriceChildren").toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center justify-between rounded-md bg-primary/10 p-3">
                  <span className="text-lg font-medium">Total a Pagar:</span>
                  <span className="text-lg font-bold text-primary">
                    {currency === "USD" ? "$" : "S/."}{" "}
                    {form.watch("totalPrice").toFixed(2)}
                  </span>
                </div>
              </div>
              <FormField
                control={form.control}
                name="totalPrice"
                render={({ field }) => <Input type="hidden" {...field} />}
              />
              <FormField
                control={form.control}
                name="totalPriceAdults"
                render={({ field }) => <Input type="hidden" {...field} />}
              />
              <FormField
                control={form.control}
                name="totalPriceChildren"
                render={({ field }) => <Input type="hidden" {...field} />}
              />
            </>
          ) : (
            ""
          )}
        </div>

        {children}
      </form>
    </Form>
  );
}
