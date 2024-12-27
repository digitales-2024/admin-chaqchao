"use client";
import { createClassSchema } from "@/schemas";
import { TypeClass, typeClassColors, typeClassLabels } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, Clock, UsersRound } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface SummaryClassProps {
  class: UseFormReturn<createClassSchema>;
}
export const SummaryClass = ({ class: classForm }: SummaryClassProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de la clase</CardTitle>
        <CardDescription>
          Clase tipo{" "}
          <span
            className={cn(
              typeClassColors[classForm.getValues().typeClass as TypeClass],
            )}
          >
            {typeClassLabels[classForm.getValues().typeClass as TypeClass]}
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2">
          <li className="inline-flex items-center gap-3 text-sm text-gray-600">
            <CalendarDays className="size-4 text-cyan-500" /> Día:
            <span className="font-semibold text-gray-900">
              {format(classForm.getValues().dateClass, "PPP", { locale: es })}
            </span>
          </li>
          <li className="inline-flex items-center gap-3 text-sm text-gray-600">
            <Clock className="size-4 text-cyan-500" /> Hora:
            <span className="font-semibold text-gray-900">
              {classForm.getValues().scheduleClass}
            </span>
          </li>
          <li className="inline-flex items-center gap-3 text-sm text-gray-600">
            <UsersRound className="size-4 text-cyan-500" /> Participantes:{" "}
            <span className="font-semibold text-gray-900">
              {classForm.getValues().totalAdults +
                classForm.getValues().totalChildren}
            </span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
