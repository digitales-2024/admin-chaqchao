"use client";

import { ClassesDataAdmin } from "@/types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  Users,
  Globe,
  User,
  MailIcon,
  PhoneIcon,
  Calendar,
  Clock,
  DollarSign,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Función para formatear la moneda
const formatCurrency = (amount: number, currency: string) => {
  const currencyFormat: { [key: string]: Intl.NumberFormatOptions } = {
    SOL: { style: "currency", currency: "PEN" },
    DOLLAR: { style: "currency", currency: "USD" },
  };

  if (!(currency in currencyFormat)) {
    throw new Error(`Unsupported currency type: ${currency}`);
  }

  return new Intl.NumberFormat("es-PE", currencyFormat[currency]).format(
    amount,
  );
};

export const ClassesDescription = ({ row }: { row: ClassesDataAdmin }) => {
  const { dateClass, scheduleClass, classes, totalParticipants } = row;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calendar className="mr-2 size-6" strokeWidth={1} />
          <h2 className="text-base font-light capitalize">
            {format(parseISO(dateClass), "EEEE, d MMMM yyyy", { locale: es })}
          </h2>
        </div>
      </div>

      <div className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="mr-2 h-6 w-6" strokeWidth={1} />
                <CardTitle className="text-base font-light">
                  Horario: {scheduleClass}
                </CardTitle>
                <Badge variant="secondary">
                  <Users className="mr-1 h-4 w-4" />
                  <span className="text-sm font-light">
                    {totalParticipants}/8{" "}
                  </span>
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Progress
              value={(totalParticipants / 8) * 100}
              className="mb-4 h-1"
            />{" "}
            {/* Usamos totalParticipants */}
            <div className="space-y-4">
              {classes.map((classData) => (
                <Card key={classData.id} className="p-3">
                  <CardContent className="p-5">
                    <div className="grid w-full grid-cols-3 items-center justify-items-center gap-4">
                      {/* Columna del perfil del usuario */}
                      <div className="flex flex-shrink-0 flex-col items-start gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 font-semibold capitalize text-slate-500">
                            {classData.userName.charAt(0)}
                          </div>
                          <h3 className="font-semibold capitalize">
                            {classData.userName}
                          </h3>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">
                            <span className="flex items-center space-x-1">
                              <MailIcon className="h-4 w-4" />
                              <span>{classData.userEmail}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <PhoneIcon className="h-4 w-4" />
                              <span>{classData.userPhone}</span>
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Columna de detalles de la clase */}
                      <div>
                        <p className="flex items-center capitalize">
                          <Globe className="mr-2 h-4 w-4" />
                          Idioma: {classData.languageClass}
                        </p>
                        <p className="flex items-center">
                          <Users className="mr-2 h-4 w-4" />
                          Participantes: {classData.totalParticipants}
                        </p>
                        <div className="flex items-center gap-6">
                          <p className="flex items-center text-xs text-slate-600">
                            <User className="mr-2 size-4" />
                            Adultos: {classData.totalAdults}
                          </p>
                          <p className="flex items-center text-xs text-slate-600">
                            <User className="mr-2 size-4" />
                            Niños: {classData.totalChildren}
                          </p>
                        </div>
                      </div>

                      {/* Columna de precios */}
                      <div className="text-right">
                        <div className="flex items-center justify-end">
                          {classData.typeCurrency === "SOL" ? (
                            <>
                              <span
                                className="mr-2 cursor-default select-none text-lg font-medium text-green-500"
                                aria-hidden="true"
                              >
                                S/
                              </span>
                            </>
                          ) : (
                            <>
                              <DollarSign
                                className="size-6 text-green-500"
                                aria-hidden="true"
                              />
                            </>
                          )}
                          <span className="text-lg font-semibold">
                            {classData.totalPrice}
                          </span>
                        </div>
                        <div className="mt-2 flex flex-col items-end justify-end gap-2">
                          <Badge variant="secondary">
                            <span className="font-medium">
                              Adultos:{" "}
                              {formatCurrency(
                                classData.totalPriceAdults,
                                classData.typeCurrency,
                              )}
                            </span>
                          </Badge>
                          <Badge variant="secondary">
                            <span className="font-medium">
                              Niños:{" "}
                              {formatCurrency(
                                classData.totalPriceChildren,
                                classData.typeCurrency,
                              )}
                            </span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
