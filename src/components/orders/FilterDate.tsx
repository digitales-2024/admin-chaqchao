"use client";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const TIMEZONE = "America/Lima";

interface FilterDateProps {
  date: Date;
  setDate: (date: Date) => void;
}

export const FilterDate = ({ date, setDate }: FilterDateProps) => {
  const zonedCurrentDate = toZonedTime(new Date(), TIMEZONE);
  const zonedSelectedDate = toZonedTime(date, TIMEZONE);

  const isNow =
    date &&
    formatInTimeZone(date, TIMEZONE, "PPP", { locale: es }) ===
      formatInTimeZone(new Date(), TIMEZONE, "PPP", { locale: es });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size="sm"
          className={cn(
            "inline-flex w-full justify-start gap-1 truncate text-left font-normal sm:w-72",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="size-4 flex-shrink-0" />
          <span className="inline-flex gap-2">
            Fecha:{" "}
            <span className="font-black">
              {isNow
                ? "Hoy"
                : formatInTimeZone(date, TIMEZONE, "PPP", { locale: es })}
            </span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={zonedSelectedDate}
          onSelect={(day) => {
            if (!day) return setDate(zonedCurrentDate);
            // La fecha del calendario viene en UTC midnight (00:00)
            // La convertimos a la zona horaria local manteniendo la misma hora
            const selectedDate = toZonedTime(day, TIMEZONE);
            setDate(selectedDate);
          }}
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>
  );
};
