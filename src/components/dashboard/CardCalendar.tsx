"use client";
import { es } from "date-fns/locale";

import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";

export const CardCalendar = () => {
  return (
    <Card className="flex flex-col gap-4 py-10">
      <p className="text-center font-medium">
        Hoy{" "}
        {new Date().toLocaleDateString("es-ES", {
          weekday: "long",
          day: "numeric",
          month: "long",
        })}
      </p>
      <Calendar className="flex justify-center" locale={es} />
    </Card>
  );
};
