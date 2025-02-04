import { useClients } from "@/hooks/use-clients";
import {
  UpdateClientsSchema,
  updateClientsSchema,
} from "@/schemas/clients/updateClientsSchema";
import { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarCheck, RefreshCcw } from "lucide-react";
import { useEffect } from "react";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";

import { Calendar } from "../ui/calendar";
import { PhoneInput } from "../ui/phone-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface UpdateClientSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  client: Client;
}

export function UpdateClientSheet({
  client,
  ...props
}: UpdateClientSheetProps) {
  const { onUpdateClient, isLoadingUpdateClient, isSuccessUpdateClient } =
    useClients();

  const defaultValues = {
    id: client.id ?? "",
    name: client?.name || "",
    phone: client?.phone || "",
    birthDate: new Date(client?.birthDate) || new Date(), // Cadena en lugar de Date
  };

  const form = useForm<UpdateClientsSchema>({
    resolver: zodResolver(updateClientsSchema),
    defaultValues,
  });

  useEffect(() => {
    if (client) {
      form.reset({
        id: client.id ?? "",
        name: client.name ?? "",
        phone: client.phone ?? "",
        birthDate: new Date(client?.birthDate) ?? new Date(), // Cadena
      });
    }
  }, [client, form]);

  function onSubmit(input: UpdateClientsSchema) {
    const { name, phone, birthDate } = input;
    // Solo aquí se hace la llamada a la API
    onUpdateClient({
      id: client.id,
      name,
      phone,
      birthDate,
    });
  }

  useEffect(() => {
    if (isSuccessUpdateClient && props.onOpenChange) {
      props.onOpenChange(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccessUpdateClient]);

  return (
    <Sheet {...props}>
      <SheetContent
        className="flex flex-col gap-6 sm:max-w-md"
        tabIndex={undefined}
      >
        <SheetHeader className="text-left">
          <SheetTitle className="flex flex-col items-start">
            Actualizar Cliente
            <Badge
              className={cn("bg-emerald-100 capitalize text-emerald-700", {
                "bg-rose-100 text-rose-500": !client.isActive,
              })}
            >
              {client.name}
            </Badge>
          </SheetTitle>
          <SheetDescription>
            Actualiza la información del cliente y guarda los cambios
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="mt-4 w-full gap-4 rounded-md border p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel htmlFor="client-name">Nombre</FormLabel>
                      <FormControl>
                        <Input
                          id="client-name"
                          placeholder="Nombre del cliente"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel htmlFor="client-phone">Teléfono</FormLabel>
                      <FormControl>
                        <PhoneInput
                          international
                          defaultCountry="PE"
                          placeholder="Ingrese un número de teléfono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col gap-4">
                <FormField
                  control={form.control}
                  name="birthDate"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP", { locale: es })
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarCheck className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                            locale={es}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <SheetFooter className="flex justify-end gap-2 pt-2 sm:space-x-0">
                <div className="flex flex-row-reverse gap-2">
                  <Button type="submit" disabled={isLoadingUpdateClient}>
                    {isLoadingUpdateClient && (
                      <RefreshCcw
                        className="mr-2 size-4 animate-spin"
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
