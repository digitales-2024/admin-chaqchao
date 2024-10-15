"use client";

import { useClasses } from "@/hooks/use-class";
import { ClassesDataAdmin } from "@/types";
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
        .rows.filter((row) => row.getIsSelected())
        .map((row) => row.original); // Obtener solo la propiedad original

      if (selectedRows.length === 0) {
        exportClassesToPdf(table.getRowModel().rows.map((row) => row.original));
      } else {
        // Llamar a la función de exportación con los datos seleccionados
        exportClassesToPdf(selectedRows);
      }
    }
  };

  const handleExportToExcel = () => {
    if (table) {
      // Obtener las filas seleccionadas de la página actual
      const selectedRows = table
        .getRowModel()
        .rows.filter((row) => row.getIsSelected())
        .map((row) => row.original);

      // Llamar a la función de exportación con los datos seleccionados

      if (selectedRows.length === 0) {
        // Si no hay filas seleccionadas, exportar todas las filas
        exportClassesToExcel(
          table.getRowModel().rows.map((row) => row.original),
        );
      } else {
        exportClassesToExcel(selectedRows);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      <Button variant="outline" size="sm" onClick={handleExportToExcel}>
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
