"use client";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const FilterDate = () => {
  const [date, setDate] = useState<Date>(new Date());

  const isNow = date && format(date, "PPP") === format(new Date(), "PPP");

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
              {isNow ? "Hoy" : format(date, "PPP", { locale: es })}
            </span>
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(day) => setDate(day ?? new Date())}
          initialFocus
          locale={es}
          // disabled={(date) =>
          //   date > new Date() || date < new Date("1900-01-01")
          // }
        />
      </PopoverContent>
    </Popover>
  );
};
