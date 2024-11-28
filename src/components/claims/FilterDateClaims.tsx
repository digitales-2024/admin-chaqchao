"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface FilterDateClaimsProps {
  date: Date | null;
  setDate: (date: Date | null) => void;
}

export const FilterDateClaims = ({ date, setDate }: FilterDateClaimsProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size="sm"
          className={cn(
            "inline-flex w-72 justify-start gap-1 text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="size-4 flex-shrink-0" />
          <span className="inline-flex gap-2">
            Fecha:{" "}
            <span className="font-black">
              {date
                ? format(date, "PPP", { locale: es })
                : "Fecha no seleccionada"}
            </span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date || undefined}
          onSelect={(day) => setDate(day || null)}
          initialFocus
          locale={es}
        />
      </PopoverContent>
    </Popover>
  );
};
