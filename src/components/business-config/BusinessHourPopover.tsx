import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SchedulePopoverProps {
  day: string;
}

export function BusinessHourPopover({ day }: SchedulePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm">Configurar</Button>
      </PopoverTrigger>
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
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor={`closingTime-${day}`}>Hora de cierre</Label>
              <Input
                id={`closingTime-${day}`}
                type="time"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
