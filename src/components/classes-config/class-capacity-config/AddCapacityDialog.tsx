"use client";

import { useClassCapacity } from "@/hooks/use-class-capacity";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  createClassCapacitySchema,
  CreateClassCapacitySchema,
} from "@/schemas/classConfig/createClassCapacitySchema";
import { TypeClass, typeClassLabels } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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

interface AddCapacityDialogProps {
  refetchCapacity: () => void;
}

const formData = {
  button: "Agregar capacidad",
  title: "Agregar capacidad de la Clase",
};

export function AddCapacityDialog({ refetchCapacity }: AddCapacityDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { createClassCapacity } = useClassCapacity();

  const form = useForm<CreateClassCapacitySchema>({
    resolver: zodResolver(createClassCapacitySchema),
    defaultValues: {
      typeClass: TypeClass.NORMAL,
      minCapacity: 0,
      maxCapacity: 0,
    },
  });

  const onSubmit = async (values: CreateClassCapacitySchema) => {
    await createClassCapacity(values);
    setIsOpen(false);
    form.reset();
    refetchCapacity();
  };

  const FormCapacity = () => {
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 p-5">
          <FormField
            control={form.control}
            name="typeClass"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo de clase</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
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
          <Button type="submit">{formData.button}</Button>
        </form>
      </Form>
    );
  };

  const isDesktop = useMediaQuery("(min-width: 624px)");

  if (isDesktop) {
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="size-4" />
          Agregar Capacidad
        </Button>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent tabIndex={undefined}>
            <DialogHeader>
              <DialogTitle>{formData.title}</DialogTitle>
              <DialogDescription>
                Agrega la capacidad de la clase
              </DialogDescription>
            </DialogHeader>
            <FormCapacity />
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="size-4" />
        Agregar Capacidad
      </Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent tabIndex={undefined}>
          <DrawerHeader>
            <DrawerTitle>{formData.title}</DrawerTitle>
            <DrawerDescription>
              Agrega la capacidad de la clase
            </DrawerDescription>
          </DrawerHeader>
          <FormCapacity />
        </DrawerContent>
      </Drawer>
    </>
  );
}
