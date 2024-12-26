"use client";

import { useClasses } from "@/hooks/use-class";
import { useClassCapacity } from "@/hooks/use-class-capacity";
import { useClassLanguages } from "@/hooks/use-class-language";
import { useClassPrices } from "@/hooks/use-class-price";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import { useCheckClassExistQuery } from "@/redux/services/classApi";
import { createClassSchema } from "@/schemas";
import { ClassesDataAdmin, TypeClass, typeClassLabels } from "@/types";
import {
  CalendarDate,
  getLocalTimeZone,
  isEqualDay,
  isEqualMonth,
  isEqualYear,
  parseDate,
  today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { format } from "date-fns";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  UsersRound,
} from "lucide-react";
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

import { Calendar } from "../common/calendar";
import Loading from "../common/Loading";
import { Button } from "../ui/button";
import { PhoneInput } from "../ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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
  const [date, setDate] = useState(today(getLocalTimeZone()));

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
  };

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

  const { closedClasses } = useClasses(
    new Date().toISOString().split("T")[0],
    form.getValues("typeClass") as TypeClass,
  );
  const [classClosed, setClassClosed] = useState<ClassesDataAdmin[]>([]);
  useEffect(() => {
    if (closedClasses) {
      setClassClosed(closedClasses);

      // Si la clase cerrda es hoy se muestra la siguiente clase
      if (closedClasses.length > 0) {
        closedClasses.forEach((closedClass) => {
          const dateParse = parseDate(
            format(closedClass.dateClass, "yyyy-MM-dd"),
          );
          if (
            isEqualDay(dateParse, today(getLocalTimeZone())) &&
            isEqualMonth(dateParse, today(getLocalTimeZone())) &&
            isEqualYear(dateParse, today(getLocalTimeZone()))
          ) {
            setDate(new CalendarDate(date.year, date.month, date.day + 1));
            form.setValue(
              "dateClass",
              new Date(date.year, date.month - 1, date.day + 1),
            );
          } else {
            setDate(new CalendarDate(date.year, date.month, date.day));
            form.setValue(
              "dateClass",
              new Date(date.year, date.month - 1, date.day),
            );
          }
        });
      } else {
        // Si no hay clases cerradas se muestra la fecha actual
        setDate(today(getLocalTimeZone()));
        form.setValue(
          "dateClass",
          new Date(date.year, date.month - 1, date.day),
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closedClasses]);

  const disabledRanges =
    classClosed &&
    classClosed.map((closedClass) => {
      const dateParse = parseDate(format(closedClass.dateClass, "yyyy-MM-dd"));

      return [dateParse, dateParse];
    });
  const isDateUnavailable = (date: DateValue) => {
    if (!date) {
      return false;
    }

    if (!disabledRanges) {
      return false;
    }
    if (disabledRanges.length === 0) {
      return false;
    }

    return disabledRanges.some(
      (interval) =>
        date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0,
    );
  };

  useEffect(() => {
    form.setValue("dateClass", new Date(date.year, date.month - 1, date.day));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

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
  console.log("🚀 ~ classCapacities:", classCapacities);

  const { data, isLoading: isLoadingClassExist } = useCheckClassExistQuery(
    {
      schedule: form.getValues("scheduleClass"),
      date: format(form.getValues("dateClass"), "yyyy-MM-dd"),
      typeClass: form.getValues("typeClass") as TypeClass,
    },
    {
      skip:
        !form.getValues("scheduleClass") &&
        !form.getValues("dateClass") &&
        !form.getValues("typeClass"),
    },
  );
  useEffect(() => {
    if (data) {
      form.setValue("languageClass", data.languageClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
                      <TooltipTrigger>
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
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateClass"
            render={() => (
              <FormItem>
                <FormLabel>Selecciona la fecha de la clase</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full px-20"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date.toString()}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 lg:max-w-full">
                      <Calendar
                        minValue={today(getLocalTimeZone())}
                        defaultValue={today(getLocalTimeZone())}
                        value={date}
                        onChange={handleChangeDate}
                        isDateUnavailable={isDateUnavailable}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
        </div>
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
