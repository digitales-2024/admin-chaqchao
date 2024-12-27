"use client";
import { createClassSchema } from "@/schemas";
import { TypeClass, typeClassColors, typeClassLabels } from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  AlertCircle,
  CalendarDays,
  Clock,
  CreditCard,
  Languages,
  Users,
} from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Badge } from "../ui/badge";

interface SummaryClassProps {
  class: UseFormReturn<createClassSchema>;
}
export const SummaryClass = ({ class: classForm }: SummaryClassProps) => {
  return (
    <div className="space-y-6">
      <div>
        <Badge variant="secondary" className="mb-4">
          Clase tipo
          {""}
          <span
            className={cn(
              "ml-1",
              typeClassColors[classForm.getValues().typeClass as TypeClass],
            )}
          >
            {" "}
            {typeClassLabels[classForm.getValues().typeClass as TypeClass]}
          </span>
        </Badge>

        <div className="space-y-4">
          <div className="flex items-center gap-3 text-sm">
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Día:</span>
            <span className="font-medium">
              {format(classForm.getValues().dateClass, "PPP", {
                locale: es,
              })}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Hora:</span>
            <span className="font-medium">
              {classForm.getValues().scheduleClass}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Participantes:</span>
            <span className="font-medium">
              {classForm.getValues().totalAdults +
                classForm.getValues().totalChildren}
              <span className="ml-1 text-xs text-gray-400">
                ({classForm.getValues().totalAdults} Adultos -{" "}
                {classForm.getValues().totalChildren} Niños)
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <Languages className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Lenguaje:</span>
            <span className="font-medium capitalize">
              {classForm.getValues().languageClass}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Total:</span>
            <span className="font-medium">
              {classForm.getValues().totalPrice}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-2 rounded-lg bg-yellow-50 p-3 text-sm text-orange-500">
        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange-500" />
        <p>
          No se podrán inscribir más personas a esta clase. ¿Estás seguro de que
          quieres cerrar la clase?
        </p>
      </div>
    </div>
  );
};
