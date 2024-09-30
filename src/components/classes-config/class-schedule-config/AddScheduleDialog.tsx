import { useBussinessConfig } from "@/hooks/use-business-config";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  createClassScheduleSchema,
  CreateClassScheduleSchema,
} from "@/schemas/classConfig/createClassScheduleSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Controller, FormProvider } from "react-hook-form";

import { InputTime } from "@/components/common/input/InputTime";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";

const formData = {
  button: "Agregar Horario",
  title: "Agregar Horario de la Clase",
};
interface AddScheduleDialogProps {
  refetchClassSchedules: () => void;
}

export function AddScheduleDialog({
  refetchClassSchedules,
}: AddScheduleDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { onCreateClassSchedule } = useClassSchedules();
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

  const onCancel = () => {
    setIsOpen(false);
    reset();
  };

  const isDesktop = useMediaQuery("(min-width: 640px)");

  if (isDesktop) {
    return (
      <>
        <div>
          <Button onClick={() => setIsOpen(true)}>
            <Plus className="h-4 w-4" />
            {formData.button}
          </Button>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{formData.title}</DialogTitle>
            </DialogHeader>
            <FormProvider {...methods}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4 space-y-4">
                  <div className="flex items-center justify-between gap-4">
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
                <div className="mt-6 flex w-full flex-row-reverse justify-start gap-x-2">
                  <Button type="submit">Agregar Horario</Button>
                  <DialogClose>
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancelar
                    </Button>
                  </DialogClose>
                </div>
              </form>
            </FormProvider>
          </DialogContent>
        </Dialog>
      </>
    );
  }
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          <Plus className="h-4 w-4" />
          {formData.button}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{formData.title}</DrawerTitle>
        </DrawerHeader>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
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
            <DrawerFooter>
              <Button type="submit">Agregar Horario</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </FormProvider>
      </DrawerContent>
    </Drawer>
  );
}
