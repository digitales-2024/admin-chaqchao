import { useUpdateBusinessHour } from "@/hooks/use-business-hours";
import { BusinessHoursData } from "@/types";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const { onUpdateBusinessHour } = useUpdateBusinessHour();
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
        <Button variant="outline">Actualizar Horarios</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Actualizar Horario de Atención</SheetTitle>
          <SheetDescription>
            Seleccione los días y establezca los horarios de apertura y cierre.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="mb-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="selectAll"
                checked={selectedDays.length === Object.keys(daysOfWeek).length}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="selectAll">Seleccionar Todos</Label>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          <div className="mt-6 grid gap-4">
            <div className="grid items-center gap-4">
              <Label htmlFor="openingTime">Hora de Apertura</Label>
              <Input
                id="openingTime"
                type="time"
                value={openingTime}
                onChange={(e) => setOpeningTime(e.target.value)}
                className="h-10"
              />
            </div>
            <div className="grid items-center gap-4">
              <Label htmlFor="closingTime">Hora de Cierre</Label>
              <Input
                id="closingTime"
                type="time"
                value={closingTime}
                onChange={(e) => setClosingTime(e.target.value)}
                className="h-10"
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button onClick={handleSubmit}>Guardar Cambios</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
