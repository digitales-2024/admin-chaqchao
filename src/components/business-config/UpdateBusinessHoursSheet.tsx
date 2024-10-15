import { useBusinessHours } from "@/hooks/use-business-hours";
import { BusinessHoursData } from "@/types";
import { Clock, DoorClosed, DoorOpen } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

import { InputTime } from "../common/input/InputTime";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

interface UpdateBusinessHoursSheetProps {
  daysOfWeek: { [key: string]: string };
  businessHoursArray: BusinessHoursData[];
  refetchBusinessHours: () => void;
}

export function UpdateBusinessHoursSheet({
  daysOfWeek,
  businessHoursArray,
  refetchBusinessHours,
}: UpdateBusinessHoursSheetProps) {
  const { onUpdateBusinessHour } = useBusinessHours();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");

  const handleDayChange = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSelectAll = () => {
    if (selectedDays.length === Object.keys(daysOfWeek).length) {
      setSelectedDays([]);
    } else {
      setSelectedDays(Object.keys(daysOfWeek));
    }
  };

  const handleSubmit = async () => {
    const promises = selectedDays.map((dayKey) => {
      const businessHour = businessHoursArray.find(
        (bh) => bh.dayOfWeek === dayKey,
      );
      if (businessHour) {
        return onUpdateBusinessHour({
          id: businessHour.id,
          openingTime: openingTime || businessHour.openingTime,
          closingTime: closingTime || businessHour.closingTime,
        });
      }
      return Promise.resolve();
    });

    await Promise.all(promises);
    // Refetch para actualizar los datos
    refetchBusinessHours();
    // Cerrar el Sheet
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="secondary"
          className="flex justify-center gap-2 capitalize hover:text-emerald-500"
        >
          <Clock className="flex-shrink-0" size={16} />
          Actualizar Horario Completo
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6" tabIndex={undefined}>
        <SheetHeader>
          <SheetTitle>Actualizar Horario de Atención</SheetTitle>
          <SheetDescription>
            Seleccione los días y establezca los horarios de apertura y cierre.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-fit w-full rounded-md border p-4">
          <div className="flex flex-col gap-6 p-3">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="selectAll"
                  checked={
                    selectedDays.length === Object.keys(daysOfWeek).length
                  }
                  onCheckedChange={handleSelectAll}
                />
                <Label htmlFor="selectAll">Seleccionar Todos</Label>
              </div>
              <div className="ml-4 grid grid-cols-2 gap-4">
                {Object.entries(daysOfWeek).map(([dayKey, dayLabel]) => (
                  <div key={dayKey} className="flex items-center space-x-2">
                    <Checkbox
                      id={`day-${dayKey}`}
                      checked={selectedDays.includes(dayKey)}
                      onCheckedChange={() => handleDayChange(dayKey)}
                    />
                    <Label htmlFor={`day-${dayKey}`}>{dayLabel}</Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div className="grid gap-4">
              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                <Label
                  htmlFor="openingTime"
                  className="flex items-center gap-2"
                >
                  <DoorOpen className="size-6 flex-shrink-0 text-emerald-400" />
                  Hora de Apertura
                </Label>
                <InputTime date={openingTime} onChange={setOpeningTime} />
              </div>
              <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
                <Label
                  htmlFor="closingTime"
                  className="flex items-center gap-2"
                >
                  <DoorClosed className="size-6 flex-shrink-0 text-emerald-400" />
                  Hora de Cierre
                </Label>
                <InputTime date={closingTime} onChange={setClosingTime} />
              </div>
            </div>
            <SheetFooter>
              <div className="flex flex-row-reverse flex-wrap gap-2">
                <Button onClick={handleSubmit}>Guardar Cambios</Button>
                <SheetClose asChild>
                  <Button type="button" variant="outline">
                    Cancelar
                  </Button>
                </SheetClose>
              </div>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
