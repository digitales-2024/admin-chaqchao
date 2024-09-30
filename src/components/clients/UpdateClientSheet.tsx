import { useClients } from "@/hooks/use-clients";
import {
  UpdateClientsSchema,
  updateClientsSchema,
} from "@/schemas/clients/updateClientsSchema";
import { Client } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { RefreshCcw } from "lucide-react";
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

import { DateInput } from "../ui/date-input";
import { PhoneInput } from "../ui/phone-input";

// Convierte la fecha en formato YYYY-MM-DD para inputs de tipo date
function formatDateToInput(value: string | undefined) {
  if (!value) return undefined;
  const date = new Date(value);
  return date.toISOString().split("T")[0]; // Devuelve una cadena en formato YYYY-MM-DD
}

interface UpdateClientSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  client: Client;
}

export function UpdateClientSheet({
  client,
  ...props
}: UpdateClientSheetProps) {
  const { onUpdateClient, isLoadingUpdateClient } = useClients();

  const defaultValues = {
    id: client.id ?? "",
    name: client?.name || "",
    phone: client?.phone || "",
    birthDate: formatDateToInput(client?.birthDate), // Cadena en lugar de Date
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
        birthDate: formatDateToInput(client.birthDate), // Cadena
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

  return (
    <Sheet {...props}>
      <SheetContent className="flex flex-col gap-6 sm:max-w-md">
        <SheetHeader className="text-left">
          <SheetTitle className="flex flex-col items-start">
            Actualizar Cliente
            <Badge className="bg-emerald-100 capitalize text-emerald-700">
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
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
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
              <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="client-birthDate">
                      Fecha de Nacimiento
                    </FormLabel>
                    <FormControl>
                      <DateInput
                        value={field.value ? new Date(field.value) : undefined}
                        onChange={(date: Date | undefined) => {
                          field.onChange(
                            date ? date.toISOString().split("T")[0] : "",
                          );
                        }}
                      />
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
                <Button type="submit" disabled={isLoadingUpdateClient}>
                  {isLoadingUpdateClient && (
                    <RefreshCcw
                      className="mr-2 size-4 animate-spin"
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
