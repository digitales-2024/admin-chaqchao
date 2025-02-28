"use client";
import { CreateBusinessConfigSchema } from "@/schemas/businessInformation/createBusinessConfigSchema";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

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

import { getCustomerData } from "@/lib/api/api-sunat";

import { PhoneInput } from "../ui/phone-input";

interface CreateBusinessConfigFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<CreateBusinessConfigSchema>;
  onSubmit: (data: CreateBusinessConfigSchema) => void;
}

export const CreateBusinessConfigForm = ({
  form,
  onSubmit,
}: CreateBusinessConfigFormProps) => {
  const {
    handleSubmit,
    formState: { isDirty },
  } = form;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!form.getValues().ruc) return;

    const fetchData = async () => {
      setIsLoading(true);
      const response = await getCustomerData("ruc", form.getValues().ruc);

      setIsLoading(false);
      form.setValue("businessName", response.razonSocial);
      form.setValue("address", response.direccion);
    };

    if (form.getValues().ruc.length === 11) {
      fetchData();
    } else {
      form.setValue("businessName", "");
      form.setValue("address", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("ruc")]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6 p-4 sm:p-0">
          <FormField
            control={form.control}
            name="ruc"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="ruc">RUC del Negocio</FormLabel>
                <FormControl>
                  <>
                    <Input id="ruc" placeholder="ruc" {...field} />
                    {isLoading && (
                      <span>
                        <RefreshCcw className="absolute right-2 top-2 animate-spin text-primary" />
                      </span>
                    )}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="businessName">Nombre del Negocio</FormLabel>
                <FormControl>
                  <Input
                    id="businessName"
                    placeholder="Nombre del negocio"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contactNumber">
                  Número de Contacto
                </FormLabel>
                <FormControl>
                  <PhoneInput
                    defaultCountry="PE"
                    placeholder="Número de contacto"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="example@negocio.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="address">Dirección</FormLabel>
                <FormControl>
                  <Input
                    id="address"
                    placeholder="Calle Ejemplo, 123"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={!isDirty}>
          Guardar Configuración
        </Button>
      </form>
    </Form>
  );
};
