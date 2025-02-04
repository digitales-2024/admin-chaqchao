"use client";

import { useClassCapacity } from "@/hooks/use-class-capacity";
import {
  createClassCapacitySchema,
  CreateClassCapacitySchema,
} from "@/schemas/classConfig/createClassCapacitySchema";
import { ClassCapacityData, TypeClass, typeClassLabels } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface EditCapacitySheetProps {
  isOpen: boolean;
  onClose: () => void;
  capacityData: ClassCapacityData;
  refetchClassCapacities: () => void;
}

export function EditCapacitySheet({
  isOpen,
  onClose,
  capacityData,
  refetchClassCapacities,
}: EditCapacitySheetProps) {
  const form = useForm<CreateClassCapacitySchema>({
    resolver: zodResolver(createClassCapacitySchema),
    defaultValues: {
      typeClass: capacityData.typeClass,
      minCapacity: capacityData.minCapacity,
      maxCapacity: capacityData.maxCapacity,
    },
  });

  useEffect(() => {
    form.reset({
      typeClass: capacityData.typeClass,
      minCapacity: capacityData.minCapacity,
      maxCapacity: capacityData.maxCapacity,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capacityData]);

  const { updateClassCapacity } = useClassCapacity();

  const onSubmit = async (values: CreateClassCapacitySchema) => {
    await updateClassCapacity({
      ...values,
      id: capacityData.id,
      typeClass: values.typeClass as TypeClass,
    });
    onClose();
    form.reset();
    refetchClassCapacities();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editar capacidad de la Clase</SheetTitle>
          <SheetDescription>Modifica la capacidad de la clase</SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 p-5"
          >
            <FormField
              control={form.control}
              name="typeClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de clase</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger disabled>
                        <SelectValue placeholder="Selecciona el tipo de clase" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(TypeClass).map((type) => (
                          <SelectItem key={type} value={type}>
                            {typeClassLabels[type as keyof typeof TypeClass]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad mínima</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="maxCapacity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Capacidad máxima</FormLabel>
                  <FormControl>
                    <Input placeholder="" type="number" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Actualizar</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
