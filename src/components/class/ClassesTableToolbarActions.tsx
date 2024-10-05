"use client";

import { useClasses } from "@/hooks/use-class";
import { ClassData, ClassesDataAdmin } from "@/types";
import { type Table } from "@tanstack/react-table";
import { Download, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

export interface ClassesTableToolbarActionsProps {
  table?: Table<ClassesDataAdmin>;
}

export function ClassesTableToolbarActions({
  table,
}: ClassesTableToolbarActionsProps) {
  const { exportClassesToPdf, exportClassesToExcel } = useClasses();

  const handleExportToPdf = () => {
    if (table) {
      // Obtener las filas seleccionadas de la página actual
      const selectedRows = table
        .getRowModel()
        .rows.filter((row) => row.getIsSelected());

      // Mapear los datos de las filas seleccionadas
      const classesData = selectedRows.map((row) => {
        return {
          dateClass: row.getValue("fecha") as string,
          scheduleClass: row.getValue("horario") as string,
          totalParticipants: row.getValue("participantes") as number,
          classLanguage: row.getValue("lenguaje") as string,
          classes: (row.getValue("detalles") as ClassData[]).map(
            (classDetail: ClassData) => ({
              id: classDetail.id,
              userName: classDetail.userName,
              userEmail: classDetail.userEmail,
              userPhone: classDetail.userPhone,
              totalParticipants: classDetail.totalParticipants,
              totalAdults: classDetail.totalAdults,
              totalChildren: classDetail.totalChildren,
              totalPrice: classDetail.totalPrice,
              totalPriceAdults: classDetail.totalPriceAdults,
              totalPriceChildren: classDetail.totalPriceChildren,
              languageClass: classDetail.languageClass,
              typeCurrency: classDetail.typeCurrency,
              dateClass: classDetail.dateClass,
              scheduleClass: classDetail.scheduleClass,
            }),
          ),
        };
      });

      // Llamar a la función de exportación con los datos seleccionados
      exportClassesToPdf(classesData);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          if (table) {
            // Obtener los datos de las clases
            const classesData = table.getRowModel().rows.map((row) => {
              return {
                dateClass: row.getValue("fecha") as string,
                scheduleClass: row.getValue("horario") as string,
                totalParticipants: row.getValue("participantes") as number,
                classLanguage: row.getValue("lenguaje") as string,
                classes: (row.getValue("detalles") as ClassData[]).map(
                  (classDetail: ClassData) => ({
                    id: classDetail.id,
                    userName: classDetail.userName,
                    userEmail: classDetail.userEmail,
                    userPhone: classDetail.userPhone,
                    totalParticipants: classDetail.totalParticipants,
                    totalAdults: classDetail.totalAdults,
                    totalChildren: classDetail.totalChildren,
                    totalPrice: classDetail.totalPrice,
                    totalPriceAdults: classDetail.totalPriceAdults,
                    totalPriceChildren: classDetail.totalPriceChildren,
                    languageClass: classDetail.languageClass,
                    typeCurrency: classDetail.typeCurrency,
                    dateClass: classDetail.dateClass,
                    scheduleClass: classDetail.scheduleClass,
                  }),
                ),
              };
            });

            exportClassesToExcel(classesData);
          }
        }}
      >
        <Download className="mr-2 size-4" aria-hidden="true" />
        Exportar
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportToPdf}>
        <FileText className="mr-2 size-4" aria-hidden="true" />
        Descargar PDF
      </Button>
    </div>
  );
}
