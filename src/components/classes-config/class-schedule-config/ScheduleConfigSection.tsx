import { useClassCapacity } from "@/hooks/use-class-capacity";
import { useClassPrices } from "@/hooks/use-class-price";
import { useClassSchedules } from "@/hooks/use-class-schedule";
import {
  ClassScheduleData,
  TypeClass,
  typeClassColors,
  typeClassLabels,
} from "@/types";
import {
  Edit,
  Trash,
  Ellipsis,
  Clock1,
  Clock2,
  Clock3,
  Clock4,
  Clock5,
  Clock6,
  Clock7,
  Clock8,
  Clock9,
  Clock10,
  Clock11,
  Clock12,
  LucideIcon,
  Info,
} from "lucide-react";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";

import { AddScheduleDialog } from "./AddScheduleDialog";
import ConfigDialog from "./ConfigDialog";
import { DeleteScheduleDialog } from "./DeleteScheduleDialog";
import { EditScheduleSheet } from "./EditScheduleSheet";

export function ScheduleConfigSection() {
  const [selectedSchedule, setSelectedSchedule] =
    useState<ClassScheduleData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] =
    useState<ClassScheduleData | null>(null);
  const { classCapacities } = useClassCapacity();
  const { dataClassPricesAll } = useClassPrices();

  const {
    dataClassSchedulesAll,
    isSuccess: isSuccessSchedules,
    refetch: refetchClassSchedules,
  } = useClassSchedules();
  // Función para editar
  const handleEdit = (scheduleData: ClassScheduleData) => {
    setSelectedSchedule(scheduleData);
    setIsEditOpen(true);
  };

  // Función para eliminar
  const handleDelete = (scheduleData: ClassScheduleData) => {
    setScheduleToDelete(scheduleData);
    setShowDeleteDialog(true);
  };

  // Función para obtener el icono de reloj adecuado
  const getClockIcon = (startTime: string) => {
    const hour = parseInt(startTime.split(":")[0], 10) % 12 || 12;
    const ClockIcons: { [key: number]: LucideIcon } = {
      1: Clock1,
      2: Clock2,
      3: Clock3,
      4: Clock4,
      5: Clock5,
      6: Clock6,
      7: Clock7,
      8: Clock8,
      9: Clock9,
      10: Clock10,
      11: Clock11,
      12: Clock12,
    };
    const ClockIcon = ClockIcons[hour];
    return <ClockIcon className="mr-4 mt-4" aria-hidden="true" />;
  };

  return (
    <div className="container mx-auto flex flex-col py-5">
      <div className="mb-8 flex flex-wrap items-center justify-between px-4">
        <div>
          <h2 className="text-2xl font-bold">Configuración del Horario</h2>
          <span className="text-gray-600">
            Ingrese los horarios de las clases.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        {isSuccessSchedules && dataClassSchedulesAll ? (
          Object.keys(TypeClass).map((type) => {
            const schedules =
              dataClassSchedulesAll[type as keyof typeof dataClassSchedulesAll];
            return (
              <Card
                key={type}
                className={cn(
                  "border-l-4",
                  typeClassColors[type as keyof typeof TypeClass],
                )}
              >
                <CardHeader className="flex flex-row items-center justify-between px-3 py-2">
                  <CardTitle
                    className={cn(
                      "text-sm font-semibold",
                      typeClassColors[type as keyof typeof TypeClass],
                      "bg-transparent",
                    )}
                  >
                    {typeClassLabels[type as keyof typeof TypeClass]}
                  </CardTitle>
                  <AddScheduleDialog
                    refetchClassSchedules={refetchClassSchedules}
                    typeClass={type as TypeClass}
                  />
                </CardHeader>
                <CardContent className="space-y-5 p-3">
                  {schedules?.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center justify-between text-gray-700"
                    >
                      <div className="flex items-center">
                        {getClockIcon(schedule.startTime)}
                        <div>
                          <p className="mt-4 text-base font-semibold">
                            {schedule.startTime}
                          </p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              aria-label="Open menu"
                              variant="ghost"
                              className="flex size-8 p-0 data-[state=open]:bg-muted"
                            >
                              <Ellipsis className="size-4" aria-hidden="true" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onSelect={() => handleEdit(schedule)}
                            >
                              Editar
                              <DropdownMenuShortcut>
                                <Edit className="size-4" aria-hidden="true" />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onSelect={() => handleDelete(schedule)}
                            >
                              Eliminar
                              <DropdownMenuShortcut>
                                <Trash className="size-4" aria-hidden="true" />
                              </DropdownMenuShortcut>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div className="inline-flex w-full justify-end">
                      <ConfigDialog typeClass={type as TypeClass} />
                    </div>
                    {dataClassPricesAll &&
                    dataClassPricesAll[type as TypeClass]?.length > 0 ? (
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold">
                          Precios configurados:
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                          {dataClassPricesAll[type as TypeClass]
                            .filter((p) => p.typeCurrency === "USD")
                            .map((price) => (
                              <div key={price.id}>
                                <p>
                                  {price.classTypeUser === "ADULT"
                                    ? "Adultos"
                                    : "Niños"}
                                  :
                                  <span className="ml-1 font-medium">
                                    ${price.price}
                                  </span>
                                </p>
                              </div>
                            ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-700">
                          {dataClassPricesAll[type as TypeClass]
                            .filter((p) => p.typeCurrency === "PEN")
                            .map((price) => (
                              <div key={price.id}>
                                <p>
                                  {price.classTypeUser === "ADULT"
                                    ? "Adultos"
                                    : "Niños"}
                                  :
                                  <span className="ml-1 font-medium">
                                    S/. {price.price}
                                  </span>
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    ) : (
                      <Alert variant="destructive" className="py-2">
                        <Info className="size-4" />
                        <AlertTitle className="text-xs font-bold">
                          Precios no configurados
                        </AlertTitle>
                        <AlertDescription className="text-xs">
                          Configure los precios para este tipo de clase
                        </AlertDescription>
                      </Alert>
                    )}

                    {classCapacities?.[type as TypeClass] ? (
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">Capacidad:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-slate-800">
                          <p>
                            Mínimo:
                            <span className="ml-1 font-medium">
                              {classCapacities[type as TypeClass]?.minCapacity}
                            </span>
                          </p>
                          <p>
                            Máximo:
                            <span className="ml-1 font-medium">
                              {classCapacities[type as TypeClass]?.maxCapacity}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <Alert variant="destructive" className="py-2">
                        <Info className="size-4" />
                        <AlertTitle className="text-xs font-bold">
                          Capacidad no configurada
                        </AlertTitle>
                        <AlertDescription className="text-xs">
                          Configure la capacidad para este tipo de clase
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        ) : (
          <Badge className="font-medium text-slate-400" variant="outline">
            <Info className="mr-2 size-3" aria-hidden="true" />
            No hay horarios configurados
          </Badge>
        )}
      </div>

      {selectedSchedule && (
        <EditScheduleSheet
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          scheduleData={selectedSchedule}
          refetchClassSchedules={refetchClassSchedules}
        />
      )}

      {scheduleToDelete && (
        <DeleteScheduleDialog
          schedule={scheduleToDelete}
          onSuccess={refetchClassSchedules}
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
        />
      )}
    </div>
  );
}
