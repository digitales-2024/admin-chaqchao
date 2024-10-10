import {
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
} from "@/redux/services/classApi";
import { socket } from "@/socket/socket";
import { ClassesDataAdmin } from "@/types";

/**
 * Mapear las filas seleccionadas a un objeto de datos de clases
 * @param selectedRows Filas seleccionadas
 * @returns Filas seleccionadas mapeadas a un objeto de datos de clases
 */
const mapSelectedRowsToClassesData = (
  selectedRows: ClassesDataAdmin[],
): ClassesDataAdmin[] => {
  return selectedRows.map((original) => {
    return {
      dateClass: original.dateClass,
      scheduleClass: original.scheduleClass,
      totalParticipants: original.totalParticipants,
      classLanguage: original.classLanguage,
      classes: original.classes.map((classDetail) => ({
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
        comments: classDetail.comments,
      })),
    };
  });
};

// Hook para obtener todas las clases
export const useClasses = (date?: string) => {
  // Validacion de la fecha de consulta o fecha actual
  const queryDate = date || new Date().toISOString().split("T")[0];

  const {
    data: allDataClasses,
    error,
    isLoading: isLoadingDataClasses,
    refetch: refetchClasses,
  } = useGetAllClassesQuery({ date: queryDate });

  socket.on("new-class-register", () => {
    refetchClasses();
  });

  const [
    exportToExcel,
    { isLoading: isLoadingExportExcel, error: errorExportExcel },
  ] = useExportClassesToExcelMutation();

  const [
    exportToPdf,
    { isLoading: isLoadingExportPdf, error: errorExportPdf },
  ] = useExportClassesToPdfMutation();

  /**
   * Descargar las clases seleccionadas en un archivo Excel
   * @param selectedRows Filas seleccionadas
   * @returns Excel Blob
   */
  const exportClassesToExcel = async (selectedRows: ClassesDataAdmin[]) => {
    try {
      // Mapear los datos de las filas seleccionadas
      const data = mapSelectedRowsToClassesData(selectedRows);

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

  /**
   * Descargar las clases seleccionadas en un archivo PDF
   * @param selectedRows Filas seleccionadas
   */
  const exportClassesToPdf = async (selectedRows: ClassesDataAdmin[]) => {
    try {
      // Mapear los datos de las filas seleccionadas
      const data = mapSelectedRowsToClassesData(selectedRows);

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
