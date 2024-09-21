import { useBussinessConfig } from "@/hooks/use-business-config";
import { useUpdateClassSchedule } from "@/hooks/use-class-schedule";
import {
  createClassScheduleSchema,
  CreateClassScheduleSchema,
} from "@/schemas/classConfig/createClassScheduleSchema";
import { ClassScheduleData } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const { onUpdateClassSchedule } = useUpdateClassSchedule();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassScheduleSchema>({
    resolver: zodResolver(createClassScheduleSchema),
    defaultValues: {
      startTime: scheduleData.startTime,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  // Reset form when scheduleData changes
  useEffect(() => {
    reset({
      startTime: scheduleData.startTime,
    });
  }, [scheduleData, reset]);

  const onSubmit = async (data: CreateClassScheduleSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onUpdateClassSchedule({
        ...data,
        id: scheduleData.id,
        businessId,
      });
      reset();
      refetchClassSchedules();
      onClose();
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Editar horario de la Clase</SheetTitle>
          <SheetDescription>
            Modifica el horario de la clase a continuación.
          </SheetDescription>
        </SheetHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div className="space-y-4">
              {/* Input for start time */}
              <div className="space-y-2">
                <Label htmlFor="startTime">Hora de Inicio</Label>
                <Controller
                  name="startTime"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="startTime"
                      type="time"
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </div>
            <SheetFooter className="mt-6 flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">Actualizar Horario</Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
