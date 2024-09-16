"use client";
import { CreateBusinessConfigSchema } from "@/schemas/businessInformation/createBusinessConfigSchema";
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

interface CreateBusinessConfigFormProps
  extends Omit<React.ComponentPropsWithRef<"form">, "onSubmit"> {
  form: UseFormReturn<CreateBusinessConfigSchema>;
  onSubmit: (data: CreateBusinessConfigSchema) => void;
}

export const CreateBusinessConfigForm = ({
  form,
  onSubmit,
}: CreateBusinessConfigFormProps) => {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-6 p-4 sm:p-0">
          {/* Nombre */}
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

          {/* Número de Contacto */}
          <FormField
            control={form.control}
            name="contactNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="contactNumber">
                  Número de Contacto
                </FormLabel>
                <FormControl>
                  <Input
                    id="contactNumber"
                    placeholder="999 999 999"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Correo */}
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

          {/* Dirección */}
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

        <Button type="submit">Guardar Configuración</Button>
      </form>
    </Form>
  );
};
