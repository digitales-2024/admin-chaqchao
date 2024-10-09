import {
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
} from "@/redux/services/classApi";
import { socket } from "@/socket/socket";
import { ClassesDataAdmin } from "@/types";
import { toast } from "sonner";

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
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await exportToExcel(selectedRows).unwrap();

          // Crear un enlace para descargar el archivo
          const url = window.URL.createObjectURL(new Blob([response]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "classes.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          resolve("Clases exportadas a Excel con éxito");
        } catch (error) {
          console.error("Error exporting to Excel:", error);
          reject(new Error("Error al exportar clases a Excel"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando clases a Excel...",
      success: "Clases exportadas a Excel con éxito",
      error: (err) => err.message,
    });
  };

  /**
   * Descargar las clases seleccionadas en un archivo PDF
   * @param selectedRows Filas seleccionadas
   */
  const exportClassesToPdf = async (selectedRows: ClassesDataAdmin[]) => {
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await exportToPdf(selectedRows).unwrap();

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

          resolve("Clases exportadas a PDF con éxito");
        } catch (error) {
          console.error("Error exporting to PDF:", error);
          reject(new Error("Error al exportar clases a PDF"));
        }
      });

    return toast.promise(promise(), {
      loading: "Exportando clases a PDF...",
      success: "Clases exportadas a PDF con éxito",
      error: (err) => err.message,
    });
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
