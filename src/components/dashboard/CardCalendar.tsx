"use client";
import { es } from "date-fns/locale";

import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";

export const CardCalendar = () => {
  return (
    <Card className="flex flex-col gap-4 p-10">
      <p className="flex flex-col text-right font-medium">
        <span>Hoy</span>
        <span className="text-4xl font-bold uppercase">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
          })}
        </span>
        <span>
          {new Date().toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
          })}
        </span>
      </p>
      <Calendar className="flex justify-center" locale={es} />
    </Card>
  );
};
