"use client";

import { Clock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Label } from "@/components/ui/label";
import { TimePickerInput } from "@/components/ui/time-picker";

interface InputTimeProps {
  date?: string;
  onChange: (date: string) => void;
}

export const InputTime = ({ onChange, date }: InputTimeProps) => {
  // Si el date el (09:00) se convierte a un objeto Date con la hora y minutos correspondientes (09:00)

  const initialDate = new Date(); // Fecha actual
  const [hours, minutes] = date?.split(":") ?? ["", ""];

  // Si el date es diferente a undefined, se establece la hora y minutos en el estado dateTime
  if (date) {
    initialDate.setHours(parseInt(hours));
    initialDate.setMinutes(parseInt(minutes));
  }

  // Referencias a los inputs de hora y minutos
  const minuteRef = useRef<HTMLInputElement>(null);
  const hourRef = useRef<HTMLInputElement>(null);
  const [dateTime, setDateTime] = useState<Date>(initialDate);
  // Convertir a hora tipo 09:00
  const convertToTime = (date: Date) => {
    const padZero = (num: number) => (num < 10 ? `0${num}` : num);
    return `${padZero(date.getHours())}:${padZero(date.getMinutes())}`;
  };

  // Date format HH:MM
  const time = convertToTime(dateTime);
  useEffect(() => {
    // Si el dateTime cambia, se ejecuta la función onChange pero solo si el tiempo es diferente al que ya estaba guardado en el estado dateTime (para evitar bucles infinitos)
    if (time !== date) {
      onChange(time);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time]);

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          Horas
        </Label>
        <TimePickerInput
          picker="hours"
          date={dateTime}
          setDate={(dateTime: Date | undefined) =>
            setDateTime(dateTime ?? new Date())
          }
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          Minutos
        </Label>
        <TimePickerInput
          picker="minutes"
          date={dateTime}
          setDate={(dateTime: Date | undefined) =>
            setDateTime(dateTime ?? new Date())
          }
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  );
};
