"use client";

import { useClassCapacity } from "@/hooks/use-class-capacity";
import { useClassLanguages } from "@/hooks/use-class-language";
import { useClassPrices } from "@/hooks/use-class-price";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import {
  useCheckClassExistQuery,
  useGetClassesFuturesQuery,
} from "@/redux/services/classApi";
import { createClassSchema } from "@/schemas";
import { TypeClass, typeClassLabels } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertCircle, UsersRound } from "lucide-react";
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

import { TwoMonthCalendar } from "../common/calendar/TwoMonthCalendar";
import Loading from "../common/Loading";
import { PhoneInput } from "../ui/phone-input";
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
  const { pricesDolar } = useClassPrices(
    form.getValues("typeClass") as TypeClass,
  );

  const {
    dataClassSchedulesByTypeClass,
    errorClassSchedulesByTypeClass,
    isLoadingClassSchedulesByTypeClass,
  } = useClassSchedules(form.getValues("typeClass") as TypeClass);

  const [prices, setPrices] = useState({
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

  useEffect(() => {
    if (pricesDolar) {
      const priceAdult =
        pricesDolar &&
        pricesDolar.filter((price) => price.classTypeUser === "ADULT");
      const priceChildren = pricesDolar.filter(
        (price) => price.classTypeUser === "CHILD",
      );
      setPrices({
        adults: priceAdult[0]?.price ?? 0,
        children: priceChildren[0]?.price ?? 0,
      });
    }
  }, [pricesDolar]);

  useEffect(() => {
    if (prices) {
      form.setValue(
        "totalPriceAdults",
        prices.adults * form.getValues("totalAdults"),
      );
      form.setValue(
        "totalPriceChildren",
        prices.children * form.getValues("totalChildren"),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices, form.watch("totalAdults"), form.watch("totalChildren")]);

  useEffect(
    () => {
      form.setValue(
        "totalPrice",
        form.getValues("totalPriceAdults") +
          form.getValues("totalPriceChildren"),
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form.watch("totalPriceAdults"), form.watch("totalPriceChildren")],
  );

  const { dataClassLanguagesAll, isLoading } = useClassLanguages();
  const { classCapacities, isLoadingClassCapacities } = useClassCapacity();
  const { data, isLoading: isLoadingClassExist } = useCheckClassExistQuery(
    {
      schedule: form.getValues("scheduleClass"),
      date:
        form.getValues("dateClass") &&
        format(form.getValues("dateClass"), "yyyy-MM-dd"),
      typeClass: form.getValues("typeClass") as TypeClass,
    },
    {
      skip:
        !form.getValues("scheduleClass") ||
        !form.getValues("dateClass") ||
        !form.getValues("typeClass"),
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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("typeClass")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
        <div className="grid grid-cols-2 gap-4">
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
              {isLoadingClassCapacities ? (
                <Loading />
              ) : classCapacities &&
                classCapacities[form.getValues("typeClass") as TypeClass] ? (
                <span className="inline-flex items-center gap-2">
                  <UsersRound className="size-4" />
                  <span className="text-xs text-gray-500">min: </span>
                  {
                    classCapacities[form.getValues("typeClass") as TypeClass]
                      .minCapacity
                  }{" "}
                  <span className="text-xs text-gray-500">- max: </span>
                  {
                    classCapacities[form.getValues("typeClass") as TypeClass]
                      .maxCapacity
                  }
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
                ) : (
                  dataClassSchedulesByTypeClass && (
                    <ClassScheduleEditable
                      options={dataClassSchedulesByTypeClass}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )
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
                      {data &&
                        classCapacities &&
                        classCapacities[
                          form.getValues("typeClass") as TypeClass
                        ] && (
                          <Tooltip>
                            <TooltipTrigger type="button">
                              <div className="sticky top-0 flex items-center gap-2 rounded-md border border-emerald-500 px-2 py-1 text-xs text-gray-400">
                                <UsersRound
                                  className="size-4 text-emerald-600"
                                  strokeWidth={1}
                                />
                                <span className="text-sm">
                                  <span className="text-emerald-600">
                                    {data.totalParticipants}{" "}
                                  </span>
                                  /{" "}
                                  {
                                    classCapacities[
                                      form.getValues("typeClass") as TypeClass
                                    ].maxCapacity
                                  }
                                </span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-32">
                              <p>
                                En esta clase ya estan inscritos{" "}
                                <span className="font-semibold">
                                  {data.totalParticipants}
                                </span>{" "}
                                de un máximo de{" "}
                                <span className="font-semibold">
                                  {
                                    classCapacities[
                                      form.getValues("typeClass") as TypeClass
                                    ].maxCapacity
                                  }
                                </span>{" "}
                                cupos.
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
                  <Input
                    type="number"
                    defaultValue={1}
                    min={1}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (!isNaN(parsedValue)) {
                        field.onChange(parsedValue);
                      } else {
                        field.onChange(1);
                      }
                    }}
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
                  <Input
                    type="number"
                    defaultValue={0}
                    min={0}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (!isNaN(parsedValue)) {
                        field.onChange(parsedValue);
                      } else {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormDescription>Los niños de 5 a 12 años.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="totalPriceAdults"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio adultos</FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      defaultValue={field.value}
                      min={0}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;
                        const parsedValue = parseInt(value, 10);
                        if (!isNaN(parsedValue)) {
                          field.onChange(parsedValue);
                        } else {
                          field.onChange(0);
                        }
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
                <FormDescription>
                  {pricesDolar &&
                    `USD ${pricesDolar
                      .filter((item) => item.classTypeUser === "ADULT")
                      .map((item) => item.price)
                      .join(",")}`}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalPriceChildren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio niños</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    defaultValue={field.value}
                    min={0}
                    {...field}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = parseInt(value, 10);
                      if (!isNaN(parsedValue)) {
                        field.onChange(parsedValue);
                      } else {
                        field.onChange(0);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  {pricesDolar &&
                    `USD ${pricesDolar
                      .filter((item) => item.classTypeUser === "CHILD")
                      .map((item) => item.price)
                      .join(",")}`}
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="totalPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio total</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  type="number"
                  defaultValue={field.value}
                  min={0}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <span className="font-bold">Datos del cliente</span>
        <div className="grid grid-cols-2 gap-4">
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
                <PhoneInput
                  placeholder="984 521 113"
                  {...field}
                  defaultCountry="PE"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        <span className="font-bold">Información adicional</span>
        <FormField
          control={form.control}
          name="comments"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comentarios</FormLabel>
              <FormControl>
                <Textarea placeholder="Agrega un comentario" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {children}
      </form>
    </Form>
  );
}
