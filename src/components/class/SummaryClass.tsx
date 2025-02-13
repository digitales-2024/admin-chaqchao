"use client";
import { Izipay, Paypal } from "@/assets/icons";
import { createClassSchema } from "@/schemas";
import {
  MethodPayment,
  TypeClass,
  typeClassColors,
  typeClassLabels,
} from "@/types";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import {
  AlertCircle,
  Banknote,
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

          {/* Sección de Precios */}
          <div className="space-y-3 rounded-md bg-gray-50 p-4">
            {/* Precios Adultos */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Adultos ({classForm.getValues().totalAdults})</span>
                <span>
                  {classForm.getValues().typeCurrency === "USD" ? "$" : "S/."}{" "}
                  {classForm.getValues().totalPriceAdults.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                Precio por persona:{" "}
                {classForm.getValues().typeCurrency === "USD" ? "$" : "S/."}{" "}
                {(
                  classForm.getValues().totalPriceAdults /
                  classForm.getValues().totalAdults
                ).toFixed(2)}
              </div>
            </div>

            {/* Precios Niños */}
            {classForm.getValues().totalChildren > 0 && (
              <>
                <div className="my-2 border-t border-gray-200" />
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>Niños ({classForm.getValues().totalChildren})</span>
                    <span>
                      {classForm.getValues().typeCurrency === "USD"
                        ? "$"
                        : "S/."}{" "}
                      {classForm.getValues().totalPriceChildren.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Precio por persona:{" "}
                    {classForm.getValues().typeCurrency === "USD" ? "$" : "S/."}{" "}
                    {(
                      classForm.getValues().totalPriceChildren /
                      classForm.getValues().totalChildren
                    ).toFixed(2)}
                  </div>
                </div>
              </>
            )}

            {/* Total */}
            <div className="mt-3 border-t border-gray-200 pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Banknote className="h-4 w-4 text-primary" />
                  <span className="font-medium">Total a Pagar</span>
                </div>
                <span className="text-lg font-bold text-primary">
                  {classForm.getValues().typeCurrency === "USD" ? "$" : "S/."}{" "}
                  {classForm.getValues().totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="mt-2 flex items-center gap-3 text-sm">
              <CreditCard className="h-4 w-4 text-muted-foreground" />
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Método de pago:</span>
                <span className="inline-flex items-center gap-2 rounded-md bg-white px-2 py-1 font-medium shadow-sm">
                  {classForm.getValues().methodPayment}
                  {classForm.getValues().methodPayment ===
                    MethodPayment.PAYPAL && <Paypal className="h-4 w-4" />}
                  {classForm.getValues().methodPayment ===
                    MethodPayment.IZIPAY && <Izipay className="h-4" />}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4 transition-all duration-200">
        <div className="flex items-start gap-3 rounded-lg border border-orange-200 bg-orange-50/80 p-4 shadow-sm">
          <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0 animate-pulse text-orange-500" />
          <div className="space-y-2">
            <p className="font-medium text-orange-800">
              ¿Estás seguro de cerrar la clase?
            </p>
            <p className="text-sm text-orange-600">Una vez cerrada la clase:</p>
            <ul className="ml-4 list-disc text-sm text-orange-600">
              <li>No se podrán inscribir más personas</li>
              <li>No se podrán modificar los datos</li>
              <li>La clase quedará marcada como completa</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
