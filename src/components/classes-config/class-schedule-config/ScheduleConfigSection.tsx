import { useClassSchedules } from "@/hooks/use-class-schedule";
import { ClassScheduleData } from "@/types";
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

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

import { AddScheduleDialog } from "./AddScheduleDialog";
import { DeleteScheduleDialog } from "./DeleteScheduleDialog";
import { EditScheduleSheet } from "./EditScheduleSheet";

export function ScheduleConfigSection() {
  const [selectedSchedule, setSelectedSchedule] =
    useState<ClassScheduleData | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] =
    useState<ClassScheduleData | null>(null);

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
        <AddScheduleDialog refetchClassSchedules={refetchClassSchedules} />
      </div>

      <div className="space-y-5">
        {isSuccessSchedules &&
        dataClassSchedulesAll &&
        dataClassSchedulesAll.length > 0 ? (
          dataClassSchedulesAll.map((schedule) => (
            <Card key={schedule.id}>
              <CardContent className="mt-4 flex items-center justify-between">
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
                      <DropdownMenuItem onSelect={() => handleEdit(schedule)}>
                        Editar
                        <DropdownMenuShortcut>
                          <Edit className="size-4" aria-hidden="true" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onSelect={() => handleDelete(schedule)}>
                        Eliminar
                        <DropdownMenuShortcut>
                          <Trash className="size-4" aria-hidden="true" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardContent>
            </Card>
          ))
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
