import { useUpdateBusinessHour } from "@/hooks/use-business-hours";
import { CalendarCog, DoorOpen } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { InputTime } from "../common/input/InputTime";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SchedulePopoverProps {
  day: string;
  openingTime: string;
  closingTime: string;
  id: string;
}

export function BusinessHourPopover({
  day,
  openingTime,
  closingTime,
  id,
}: SchedulePopoverProps) {
  const { onUpdateBusinessHour } = useUpdateBusinessHour();

  // Actualizar el horario de apertura
  const handleTimeOpenChange = async (date: string) => {
    await onUpdateBusinessHour({ id, openingTime: date });
  };

  // Actualizar el horario de cierre
  const handleTimeCloseChange = async (date: string) => {
    await onUpdateBusinessHour({ id, closingTime: date });
  };

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button size="sm" variant={"secondary"}>
                <CalendarCog className="size-6 text-slate-500 hover:text-emerald-500" />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cambiar el horario</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Configurar {day}</h4>
            <p className="text-sm text-muted-foreground">
              Establezca el horario para {day}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor={`openingTime-${day}`} className="flex gap-2">
                <DoorOpen className="size-6 flex-shrink-0 text-emerald-400" />
                Hora de apertura
              </Label>
              <InputTime date={openingTime} onChange={handleTimeOpenChange} />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor={`closingTime-${day}`} className="flex gap-2">
                <DoorOpen className="size-6 flex-shrink-0 text-emerald-400" />
                Hora de cierre
              </Label>
              <InputTime date={closingTime} onChange={handleTimeCloseChange} />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
