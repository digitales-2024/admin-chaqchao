import {
  useGetAllClassesQuery,
  useExportClassesToExcelMutation,
  useExportClassesToPdfMutation,
} from "@/redux/services/classApi";
import { socket } from "@/socket/socket";
import { ClassesDataAdmin, CustomErrorData } from "@/types";
import { translateError } from "@/utils/translateError";
import { toast } from "sonner"; // Importa toast

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
    const promise = () =>
      new Promise(async (resolve, reject) => {
        try {
          // Mapear los datos de las filas seleccionadas
          const data = mapSelectedRowsToClassesData(selectedRows);

          const result = await exportToExcel(data).unwrap();

          // Crear un enlace para descargar el archivo
          const url = window.URL.createObjectURL(new Blob([result]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "classes.xlsx");
          document.body.appendChild(link);
          link.click();
          link.remove();

          resolve(result);
        } catch (error) {
          if (error && typeof error === "object" && "data" in error) {
            const errorMessage = (error.data as CustomErrorData).message;
            const message = translateError(errorMessage as string);
            reject(new Error(message));
          } else {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
        }
      });

    return toast.promise(promise(), {
      loading: "Descargando clases en Excel...",
      success: "Clases descargadas con éxito en Excel",
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
          // Mapear los datos de las filas seleccionadas
          const data = mapSelectedRowsToClassesData(selectedRows);

          const result = await exportToPdf(data).unwrap();

          // Crear el enlace de descarga
          const url = window.URL.createObjectURL(result);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "class_report.pdf");

          // Añadir el enlace al DOM y disparar la descarga
          document.body.appendChild(link);
          link.click();

          // Eliminar el enlace temporal del DOM
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url); // Limpiar el objeto URL

          resolve(result);
        } catch (error) {
          if (error && typeof error === "object" && "data" in error) {
            const errorMessage = (error.data as CustomErrorData).message;
            const message = translateError(errorMessage as string);
            reject(new Error(message));
          } else {
            reject(
              new Error(
                "Ocurrió un error inesperado, por favor intenta de nuevo",
              ),
            );
          }
        }
      });

    return toast.promise(promise(), {
      loading: "Descargando clases en PDF...",
      success: "Clases descargadas con éxito en PDF",
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
