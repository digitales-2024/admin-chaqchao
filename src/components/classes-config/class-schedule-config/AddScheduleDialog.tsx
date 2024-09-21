import { useBussinessConfig } from "@/hooks/use-business-config";
import { useCreateClassSchedule } from "@/hooks/use-class-schedule";
import {
  createClassScheduleSchema,
  CreateClassScheduleSchema,
} from "@/schemas/classConfig/createClassScheduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddScheduleDialogProps {
  refetchClassSchedules: () => void;
}

export function AddScheduleDialog({
  refetchClassSchedules,
}: AddScheduleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { onCreateClassSchedule } = useCreateClassSchedule();
  const { dataBusinessConfigAll, isSuccess: isSuccessBusinessConfig } =
    useBussinessConfig();

  const methods = useForm<CreateClassScheduleSchema>({
    resolver: zodResolver(createClassScheduleSchema),
    defaultValues: {
      startTime: "",
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  const onSubmit = async (data: CreateClassScheduleSchema) => {
    if (
      isSuccessBusinessConfig &&
      dataBusinessConfigAll &&
      dataBusinessConfigAll.length > 0
    ) {
      const businessId = dataBusinessConfigAll[0].id;
      await onCreateClassSchedule({ ...data, businessId });
      reset();
      refetchClassSchedules();
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4" />
        Agregar Horario
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agregar Horario de la Clase</DialogTitle>
          </DialogHeader>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4 space-y-4">
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
              <div className="mt-6 flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit">Agregar Horario</Button>
              </div>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
}
