import {
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
} from "@/redux/services/classApi";
import { ClassesDataAdmin } from "@/types";

// Hook para obtener todas las clases
export const useClasses = (date?: string) => {
  const {
    data: allDataClasses,
    error,
    isLoading: isLoadingDataClasses,
  } = useGetAllClassesQuery({ date });

  const [
    exportToExcel,
    { isLoading: isLoadingExportExcel, error: errorExportExcel },
  ] = useExportClassesToExcelMutation();

  const [
    exportToPdf,
    { isLoading: isLoadingExportPdf, error: errorExportPdf },
  ] = useExportClassesToPdfMutation();

  const exportClassesToExcel = async (data: ClassesDataAdmin[]) => {
    try {
      const response = await exportToExcel(data).unwrap();

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "classes.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();

      return response;
    } catch (error) {
      console.error("Error exporting to Excel:", error);
      throw error;
    }
  };

  const exportClassesToPdf = async (data: ClassesDataAdmin[]) => {
    try {
      // Llama a la mutación para exportar a PDF
      const response = await exportToPdf(data).unwrap();

      // Crear el enlace de descarga
      const url = window.URL.createObjectURL(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "class_report.pdf");

      // Añadir el enlace al DOM y disparar la descarga
      document.body.appendChild(link);
      link.click();

      // Eliminar el enlace temporal del DOM
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Limpiar el objeto URL
    } catch (error) {
      console.error("Error exporting to PDF:", error);
      throw error;
    }
  };

  return {
    allDataClasses,
    error,
    isLoadingDataClasses,
    exportClassesToExcel,
    isLoadingExportExcel,
    errorExportExcel,
    exportClassesToPdf,
    isLoadingExportPdf,
    errorExportPdf,
  };
};
