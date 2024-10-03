"use client";
"use memo";

import { ClassesDataAdmin } from "@/types";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Globe,
  User,
  MailIcon,
  PhoneIcon,
  Calendar,
  Clock,
} from "lucide-react"; // Agrega los íconos que necesitas
import { useMemo, useState } from "react";

import { DataTableExpanded } from "@/components/data-table/DataTableExpanded";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Asegúrate de importar esto correctamente

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Collapsible, CollapsibleContent } from "../ui/collapsible"; // Importación completa
import { classesTableColumns } from "./ClassesTableColumns";
import { ClassesTableToolbarActions } from "./ClassesTableToolbarActions";

export const ClassesTable = ({ data }: { data: ClassesDataAdmin[] }) => {
  const columns = useMemo(() => classesTableColumns(), []);

  return (
    <DataTableExpanded
      data={data}
      columns={columns}
      getSubRows={(row) => row.classes as unknown as ClassesDataAdmin[]}
      toolbarActions={<ClassesTableToolbarActions />}
      placeholder="Buscar clases..."
      renderExpandedRow={(row) => <RolePermissions row={row} />}
    />
  );
};

const RolePermissions = ({ row }: { row: ClassesDataAdmin }) => {
  const { dateClass, scheduleClass, classes, totalParticipants } = row;

  // Estado para controlar qué grupos están abiertos
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>({});

  // Función para alternar el estado de apertura de los grupos
  const toggleGroup = (key: string) => {
    setOpenGroups((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  return (
    <div className="p-4">
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={() => toggleGroup(dateClass)}
      >
        <div className="flex items-center space-x-2">
          <Calendar className="mr-2 size-6" strokeWidth={1} />
          <h2 className="text-base font-light capitalize">
            {format(parseISO(dateClass), "EEEE, d MMMM yyyy", { locale: es })}
          </h2>
        </div>
        {openGroups[dateClass] ? <ChevronUp /> : <ChevronDown />}
      </div>

      {openGroups[dateClass] && (
        <div className="mt-4 space-y-4">
          <Collapsible
            key={`${dateClass}-${scheduleClass}`}
            open={!!openGroups[`${dateClass}-${scheduleClass}`]}
            onOpenChange={() => toggleGroup(`${dateClass}-${scheduleClass}`)}
          >
            <Card>
              <CardHeader>
                <div
                  className="flex w-full cursor-pointer items-center justify-between"
                  onClick={() => toggleGroup(`${dateClass}-${scheduleClass}`)}
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="mr-2 h-6 w-6" />
                    <CardTitle>Horario: {scheduleClass}</CardTitle>
                    <Badge variant="secondary">
                      <Users className="mr-1 h-4 w-4" />
                      <span className="text-sm font-light">
                        {totalParticipants}/8{" "}
                      </span>
                    </Badge>
                  </div>
                  {openGroups[`${dateClass}-${scheduleClass}`] ? (
                    <ChevronUp />
                  ) : (
                    <ChevronDown />
                  )}
                </div>
              </CardHeader>
              <CollapsibleContent>
                <CardContent>
                  <Progress
                    value={(totalParticipants / 8) * 100}
                    className="mb-4"
                  />{" "}
                  {/* Usamos totalParticipants */}
                  <div className="space-y-4">
                    {classes.map((classData) => (
                      <Card key={classData.id} className="p-4">
                        <CardContent>
                          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                            {/* Columna del perfil del usuario */}
                            <div className="flex items-center space-x-4">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-300 text-lg font-semibold capitalize">
                                {classData.userName.charAt(0)}
                              </div>
                              <div>
                                <h3 className="font-semibold capitalize">
                                  {classData.userName}
                                </h3>
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
                              <p className="flex items-center">
                                <Globe className="mr-2 h-4 w-4" />
                                Idioma: {classData.languageClass}
                              </p>
                              <p className="flex items-center">
                                <Users className="mr-2 h-4 w-4" />
                                Participantes: {classData.totalParticipants}
                              </p>
                              <p className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                Adultos: {classData.totalAdults}
                              </p>
                              <p className="flex items-center">
                                <User className="mr-2 h-4 w-4" />
                                Niños: {classData.totalChildren}
                              </p>
                            </div>

                            {/* Columna de precios */}
                            <div className="text-right">
                              <p className="text-xl font-semibold">
                                <span className="text-gray-500">$</span>{" "}
                                {classData.totalPrice} {classData.typeCurrency}
                              </p>
                              <div className="mt-2 flex flex-wrap justify-end gap-2">
                                <Badge variant="secondary">
                                  Adultos: {classData.totalPriceAdults}{" "}
                                  {classData.typeCurrency}
                                </Badge>
                                <Badge variant="secondary">
                                  Niños: {classData.totalPriceChildren}{" "}
                                  {classData.typeCurrency}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      )}
    </div>
  );
};
