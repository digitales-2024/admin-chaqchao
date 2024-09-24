import { useUpdateBusinessHour } from "@/hooks/use-business-hours";
import { CalendarCog } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

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
  const [opening, setOpening] = useState(openingTime);
  const [closing, setClosing] = useState(closingTime);

  const handleOpeningChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newOpeningTime = e.target.value;
    setOpening(newOpeningTime);
    await onUpdateBusinessHour({ id, openingTime: newOpeningTime });
  };

  const handleClosingChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newClosingTime = e.target.value;
    setClosing(newClosingTime);
    await onUpdateBusinessHour({ id, closingTime: newClosingTime });
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
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Configurar {day}</h4>
            <p className="text-sm text-muted-foreground">
              Establezca el horario para {day}.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={`openingTime-${day}`}>Hora de apertura</Label>
              <Input
                id={`openingTime-${day}`}
                type="time"
                value={opening}
                onChange={handleOpeningChange}
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={`closingTime-${day}`}>Hora de cierre</Label>
              <Input
                id={`closingTime-${day}`}
                type="time"
                value={closing}
                onChange={handleClosingChange}
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
