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

import { PhoneInput } from "../ui/phone-input";

const infoSheet = {
  title: "Actualizar Cliente",
  description: "Actualiza la información del cliente y guarda los cambios",
};

interface UpdateClientSheetProps
  extends React.ComponentPropsWithRef<typeof Sheet> {
  client: Client;
}

// Función para convertir la fecha al formato YYYY-MM-DD compatible con el input de tipo date
function formatDateToInput(value: string | undefined) {
  if (!value) return "";
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function UpdateClientSheet({
  client,
  ...props
}: UpdateClientSheetProps) {
  const { onUpdateClient, isLoadingUpdateClient } = useClients();

  // Verificación de que el ID sea válido antes de pasar al formulario
  const defaultValues = {
    id: client.id ?? "", // Usa una cadena vacía si el id es indefinido o nulo.
    name: client?.name || "",
    phone: client?.phone || "",
    birthDate: formatDateToInput(client?.birthDate),
  };

  const form = useForm<UpdateClientsSchema>({
    resolver: zodResolver(updateClientsSchema),
    defaultValues,
  });

  useEffect(() => {
    if (client) {
      form.reset({
        id: client.id ?? "", // Resetea con una cadena vacía si el id es nulo o indefinido
        name: client.name ?? "",
        phone: client.phone ?? "",
        birthDate: formatDateToInput(client.birthDate),
      });
    }
  }, [client, form]);

  function onSubmit(input: UpdateClientsSchema) {
    const { name, phone, birthDate } = input;
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
            {infoSheet.title}
            <Badge
              className="bg-emerald-100 capitalize text-emerald-700"
              variant="secondary"
            >
              {client.name}
            </Badge>
          </SheetTitle>
          <SheetDescription>{infoSheet.description}</SheetDescription>
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
                      <Input type="date" id="client-birthDate" {...field} />
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
