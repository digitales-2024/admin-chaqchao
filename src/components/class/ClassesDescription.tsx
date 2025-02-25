"use client";

import { Izipay, Paypal } from "@/assets/icons";
import { useClassCapacity } from "@/hooks/use-class-capacity";
import {
  ClassesDataAdmin,
  MethodPayment,
  TypeClass,
  typeClassColors,
  typeClassLabels,
} from "@/types";
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
  MessageSquare,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

// Función para formatear la moneda
const formatCurrency = (amount: number, currency: string) => {
  const currencyFormat: { [key: string]: Intl.NumberFormatOptions } = {
    PEN: { style: "currency", currency: "PEN" },
    USD: { style: "currency", currency: "USD" },
  };

  if (!(currency in currencyFormat)) {
    throw new Error(`Unsupported currency type: ${currency}`);
  }

  return new Intl.NumberFormat("es-PE", currencyFormat[currency]).format(
    amount,
  );
};

export const ClassesDescription = ({ row }: { row: ClassesDataAdmin }) => {
  const { classCapacities } = useClassCapacity();

  const { dateClass, scheduleClass, registers, totalParticipants, typeClass } =
    row;
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
                  {classCapacities && (
                    <span className="text-sm font-light">
                      {totalParticipants}/
                      {classCapacities[typeClass as TypeClass].maxCapacity ?? 0}{" "}
                    </span>
                  )}
                </Badge>
              </div>
              <div>
                <Badge
                  className={cn(
                    "bg-transparent font-medium hover:bg-transparent",
                    typeClassColors[typeClass],
                  )}
                >
                  {typeClassLabels[typeClass]}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {classCapacities && (
              <Progress
                value={
                  (totalParticipants /
                    (classCapacities[typeClass as TypeClass].maxCapacity ??
                      0)) *
                  100
                }
                className="mb-4 h-1"
              />
            )}
            <div className="space-y-4">
              {registers.map((classData) => (
                <Card key={classData.id} className="p-3">
                  <CardContent className="p-5">
                    <div className="grid w-full grid-cols-3 items-center gap-4">
                      {/* Columna del perfil del usuario */}
                      <div className="flex flex-shrink-0 flex-col items-start gap-2">
                        <div className="flex items-center gap-2 truncate">
                          <Avatar className="h-12 w-12 border-2 border-white capitalize shadow-sm">
                            <AvatarFallback className="bg-slate-100 text-slate-500">
                              {classData.userName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <h3 className="line-clamp-2 text-wrap font-semibold capitalize">
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
                      <div className="grid justify-items-center">
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
                          {classData.typeCurrency === "PEN" ? (
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
                          <span className="inline-flex items-center justify-center gap-2 text-lg font-semibold">
                            {classData.totalPrice.toFixed(2)}
                            {classData.methodPayment ===
                              MethodPayment.IZIPAY && (
                              <Izipay className="h-4" />
                            )}
                            {classData.methodPayment ===
                              MethodPayment.PAYPAL && (
                              <Paypal className="h-4" />
                            )}
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

                  <Separator className="my-4" />

                  <div className="flex w-full justify-between">
                    <div className="w-full">
                      <Accordion type="single" collapsible>
                        <AccordionItem value={`comments-${classData.id}`}>
                          <AccordionTrigger className="flex items-center justify-between p-4 text-justify">
                            <h4 className="mb-2 flex items-center font-semibold text-gray-700">
                              <MessageSquare className="mr-2 h-5 w-5" />
                              Comentarios
                            </h4>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="p-4">
                              <p className="text-sm italic text-gray-600">
                                {classData.comments
                                  ? classData.comments
                                  : "No hay comentarios"}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
