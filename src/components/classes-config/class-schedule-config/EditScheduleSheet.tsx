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

import { InputTime } from "@/components/common/input/InputTime";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
      <SheetContent side="right" className="flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>Editar horario de la Clase</SheetTitle>
          <SheetDescription>
            Modifica el horario de la clase a continuación.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="w-full gap-4 rounded-md border p-4">
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-4 space-y-4 p-4"
            >
              <div className="space-y-4">
                {/* Input for start time */}
                <div className="flex flex-col items-center justify-between space-y-2 sm:flex-row">
                  <Label htmlFor="startTime">Hora de Inicio</Label>
                  <Controller
                    name="startTime"
                    control={control}
                    render={({ field }) => <InputTime {...field} />}
                  />
                  {errors.startTime && (
                    <p className="text-sm text-red-500">
                      {errors.startTime.message}
                    </p>
                  )}
                </div>
              </div>
              <SheetFooter>
                <div className="flex flex-row-reverse flex-wrap gap-2">
                  <Button type="submit">Actualizar Horario</Button>
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancelar
                  </Button>
                </div>
              </SheetFooter>
            </form>
          </FormProvider>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
