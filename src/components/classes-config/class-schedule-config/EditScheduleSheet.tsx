"use client";
import { useBussinessConfig } from "@/hooks/use-business-config";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import {
  createClassScheduleSchema,
  CreateClassScheduleSchema,
} from "@/schemas/classConfig/createClassScheduleSchema";
import { ClassScheduleData, TypeClass, typeClassLabels } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { InputTime } from "@/components/common/input/InputTime";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
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
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";

interface EditScheduleSheetProps {
  isOpen: boolean;
  onClose: () => void;
  scheduleData: ClassScheduleData;
  refetchClassSchedules: () => void;
}

export function EditScheduleSheet({
  isOpen,
  onClose,
  scheduleData,
  refetchClassSchedules,
}: EditScheduleSheetProps) {
  console.log("🚀 ~ scheduleData:", scheduleData);
  const { onUpdateClassSchedule } = useClassSchedules();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const form = useForm<CreateClassScheduleSchema>({
    resolver: zodResolver(createClassScheduleSchema),
    defaultValues: {
      startTime: scheduleData.startTime,
      typeClass: scheduleData.typeClass,
    },
  });
  console.log("🚀 ~ form:", form.watch());
  const onSubmit = async (data: Partial<CreateClassScheduleSchema>) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onUpdateClassSchedule({
        ...data,
        id: scheduleData.id,
        typeClass: scheduleData.typeClass as TypeClass,
        businessId,
      });
      form.reset();
      refetchClassSchedules();
      onClose();
    }
  };

  useEffect(() => {
    form.reset({
      startTime: scheduleData.startTime,
      typeClass: scheduleData.typeClass,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduleData]);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Editar horario de la Clase</SheetTitle>
          <SheetDescription>
            Modifica el horario de la clase a continuación.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="w-full gap-4 rounded-md border p-4">
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled
                      >
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
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hora de inicio</FormLabel>
                    <FormControl>
                      <InputTime date={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <SheetFooter>
                <div className="flex flex-row-reverse flex-wrap gap-2">
                  <Button>Actualizar Horario</Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
